import { ePedBoneId, PedController } from '../../../../server/streamers/ped';
import { IPed } from '../../../../shared/interfaces/iPed';
import * as alt from 'alt-server';
import { PolygonShape } from '../../../../server/extensions/extColshape';
import { ServerBlipController } from '../../../../server/systems/blip';
import { Blip } from '../../../../shared/interfaces/blip';
import { InteractionController } from '../../../../server/systems/interaction';
import { ItemFactory } from '../../../../server/systems/item';
import { OSS, OSS_TRANSLATIONS } from '../index';
import IShop, { IShopLocation, ShopType } from './interfaces/IShop';
import { ShopRegistry } from './shopRegistry';
import { Athena } from '../../../../server/api/athena';
import { takePedshot } from '../../../warstekhun-pedshot/server/src/pedhsot';
import { SpeechParams } from '../../../../shared/enums/SpeechParams';
import { IgnoredWeapons, shopkeeperWeapons } from './weapons';
import { randomInt } from 'crypto';
import { ShopkeeperLines } from './shopkeeperLines';
import { ANIMATION_FLAGS } from '../../../../shared/flags/animationFlags';
import IAttachable from '../../../../shared/interfaces/iAttachable';
import { ShopEvents } from '../../shared/events';
import { CashRegisterState } from '../../shared/enums/cashRegisterState';
import { Ipanic } from '../../shared/interfaces/Ipanic';
import { ShopCrimes } from '../../shared/enums/ShopCrimes';
import { takeCCTVPicture } from './cctv';
import { CurrencyTypes } from '../../../../shared/enums/currency';
import { Interaction } from '../../../../shared/interfaces/interaction';
//import Logger from '../../../../server/utility/athenaLogger';
import { Marker } from '../../../../shared/interfaces/marker';
import { MARKER_TYPE } from '../../../../shared/enums/markerTypes';
import { getWeaponByName } from '../../../../shared/information/weaponList';
import { Character } from '../../../../shared/interfaces/character';
import { ForceTypes } from '../../../../shared/enums/forceTypes';

const PAGENAME = 'ShopUI';

export class ShopInitializer {
    static readonly robberyCooldownForPlayer = 3600; //1 perc
    static readonly robberyCooldownForShop = 10800; //3p
    static readonly robberyShopkeeperAimTime = 10000; //10 mp
    static readonly shopkeeperSpeakCooldown = 3000; //3 mp
    static readonly shopkeeperMadCooldown: 600000; //10p
    private static shopkeeperSpeakTimes: { [uid: string]: number } = {};

    private static shopkeeperGreetAmbients = [
        'SHOP_GREET',
        'SHOP_GREET_END',
        'SHOP_GREET_START',
        'KIFFLOM_GREET',
        'GENERIC_HI',
    ];

    private static shopkeeperByeAmbients = ['GENERIC_BYE', 'SHOP_GOODBYE'];

    static async startupSpecificShop(shop: IShop, locationId: number) {
        var location: IShopLocation = shop.locations[locationId];
        var shopkeeperLastPlayerMad: { [uid: string]: number } = {};
        let isGettingRobbed = false;
        let isFighting = false;

        var shopBlip: Blip;
        if (location.isBlip) {
            shopBlip = {
                pos: new alt.Vector3(location.x, location.y, location.z),
                shortRange: true,
                sprite: shop.blipSprite,
                color: shop.blipColor,
                text: shop.name,
                scale: shop.blipScale,
                uid: `Shop-${shop.dbName}-${locationId}`,
            };
            ServerBlipController.append(shopBlip);
        }

        var shopkeeper: IPed = {
            model: location.ped.model,
            //randomizeAppearance: true,
            pos: location.ped.pos,
            heading: location.ped.heading,
            maxDistance: 100,
            animations: location.ped.animations,
            dimension: 0,
            canBeTargeted: true,
            collision: true,
            invicible: location.robbery ? false : true,
            ragdoll: location.robbery ? true : false,
            //randomiseAppearance: false,
            sufferCriticalHits: true,
            canUseCover: location.robbery ? true : false,
            canChaseTargetOnFoot: true,
            maintainMinDistanceToTarget: true,
            disableFleeFromCombat: true,
            dispawn10MinutesAfterDeath: true,
            sex: 'male',
            uid: `PED-${shop.dbName}-${locationId}`,
            weapon: shopkeeperWeapons[randomInt(0, shopkeeperWeapons.length - 1)],
        };

        PedController.append(shopkeeper);
        PedController.Callbacks.setDeathCallback(shopkeeper.uid, shopkeeperDeathCallback);
        shopkeeper = PedController.globalPeds.find((el) => el.uid == shopkeeper.uid);

        const shopInteraction: Interaction = {
            position: new alt.Vector3(location.x, location.y, location.z),
            description: OSS_TRANSLATIONS.openShop,
            range: shop.interactionRange ? shop.interactionRange : OSS.interactionRange,
            uid: `SHOP-IC-${shop.dbName}-${locationId}`,
            debug: false,
            callback: (player: alt.Player) => ShopInitializer.initShopCallback(player, shop),
            isPlayerOnly: true,
        };

        const shopMarker: Marker = {
            pos: {
                x: location.x,
                y: location.y,
                z: location.z,
            },
            color: new alt.RGBA(255, 255, 255, 150),
            type: MARKER_TYPE.CYLINDER,
            scale: new alt.Vector3(1, 1, 1),
            faceCamera: false,
            bobUpAndDown: false,
            rotate: false,
            uid: `SHOP-MC-${shop.dbName}-${locationId}`,
        };

        var playersInShape: alt.Player[] = [];

        const shopShape = new PolygonShape(
            location.colshape.minZ,
            location.colshape.maxZ,
            location.colshape.vertices,
            location.colshape.isPlayerOnly,
            location.colshape.isVehicleOnly,
        );
        function getDayTime() {
            const hour: number = Athena.systems.world.getWorldHour();
            if (hour >= 0 && hour < 5) {
                return 'night';
            } else if (hour >= 5 && hour < 10) {
                return 'morning';
            } else if (hour >= 10 && hour < 18) {
                return 'day';
            } else if (hour >= 18 && hour < 21) {
                return 'evening';
            } else {
                return 'night';
            }
        }

        function colshapeLeave(shape: PolygonShape, player: alt.Player) {
            if (!(player instanceof alt.Player)) return;
            if (!PedController.isPedAlive(shopkeeper.uid)) return;
            if (
                ShopInitializer.shopkeeperSpeakTimes[shopkeeper.uid] + ShopInitializer.shopkeeperSpeakCooldown >
                Date.now()
            )
                return;

            if (Date.now() - shopkeeperLastPlayerMad[player.socialID] > ShopInitializer.shopkeeperMadCooldown) {
                const byeCategory = ShopkeeperLines.goodbye[getDayTime()][player.data.appearance.sex];

                PedController.speakWithAmbient(
                    shopkeeper,
                    playersInShape,
                    byeCategory[randomInt(0, byeCategory.length - 1)],
                    {
                        speechName:
                            ShopInitializer.shopkeeperByeAmbients[
                                randomInt(0, ShopInitializer.shopkeeperByeAmbients.length - 1)
                            ],
                        speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                    },
                );
            }

            playersInShape.splice(playersInShape.findIndex((element) => element.socialID == player.socialID));
            if (playersInShape.length == 0 && isGettingRobbed) {
                abortRobbery();
            }
        }

        function shopkeeper_isMadAtPlayer(player: alt.Player) {
            if (
                shopkeeperLastPlayerMad[player.socialID] &&
                shopkeeperLastPlayerMad[player.socialID] !== null &&
                Date.now() - shopkeeperLastPlayerMad[player.socialID] < ShopInitializer.shopkeeperMadCooldown
            ) {
                return true;
            } else {
                return false;
            }
        }

        async function colshapeEnter(shape: PolygonShape, player: alt.Player) {
            if (!(player instanceof alt.Player)) return;
            playersInShape.push(player);
            alt.log('a1');
            if (!PedController.isPedAlive(shopkeeper.uid)) return;
            alt.log('a2');

            if (canStartRobbery()) {
                alt.log('a3');
                if (!isOfficerInDuty(player)) {
                    alt.log('a4');
                    if (!IgnoredWeapons.includes(player.currentWeapon) || shopkeeper_isMadAtPlayer(player)) {
                        alt.log('a5');
                        removeInteraction();
                        if (playersInShape.length > 1) {
                            alt.log('a6');
                            //Többen vannak
                            PedController.playAmbientSpeech(
                                shopkeeper,
                                {
                                    speechName: 'APOLOGY_NO_TROUBLE',
                                    speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                                },
                                true,
                            );
                            alt.log('a7');
                        } else {
                            //Egyedül van
                            if (randomInt(0, 100) < 40 * location.robbery.shopkeeperAttackModifier) {
                                alt.log('a8-9');
                                //Fegyver rántás
                                shopkeeper_aimAtNearestPlayer(true);
                                alt.log('a10');
                            } else {
                                PedController.speakWithAmbient(
                                    shopkeeper,
                                    playersInShape,
                                    'Kérem tegye el a fegyvert!',
                                    {
                                        speechName: 'APOLOGY_NO_TROUBLE',
                                        speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                                    },
                                    true,
                                );
                            }
                        }
                    } else if (player.getClothes(1).drawable != 0) {
                        removeInteraction();
                        alt.log('a13');
                        //There is a mask on the player's face
                        if (isOfficerInDuty(player)) {
                            alt.log('a14');
                            shopkeeper_greet(player);
                            alt.log('a15');
                        } else {
                            alt.log('a16');
                            PedController.playAmbientSpeech(shopkeeper, {
                                speechName: 'SHOP_GREET_UNUSUAL',
                                speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                            });
                            alt.log('a17');
                            PedController.speak(
                                shopkeeper,
                                playersInShape,
                                ShopkeeperLines.TenSeconds[randomInt(0, ShopkeeperLines.TenSeconds.length - 1)],
                                true,
                            );
                            alt.log('a18');
                        }
                    } else {
                        alt.log('a19');
                        //There is no mask
                        shopkeeper_greet(player);
                        alt.log('a20');
                    }

                    alt.log('a21');
                } else {
                    //Rendőr jött be
                    shopkeeper_greet(player);
                }
            } else {
                shopkeeper_greet(player);
            }
        }

        shopShape.addEnterCallback(colshapeEnter);
        shopShape.addLeaveCallback(colshapeLeave);

        function shopkeeperDeathCallback() {
           // Logger.info('HALOTT SHOPKEEPER');

            if (location.robbery) {
                //LSPD Riasztás - Gyilkosság
                alt.off('playerWeaponChange', playerWeaponChange);
                if (isGettingRobbed) abortRobbery();
            }

            removeInteraction();
            shopInitialiserTimeout();
        }

        function createInteraction() {
            InteractionController.add(shopInteraction);
            Athena.controllers.marker.append(shopMarker);
        }

        function removeInteraction() {
            InteractionController.remove(shopInteraction.uid);
            Athena.controllers.marker.remove(shopMarker.uid);
        }

        createInteraction();

        async function shopkeeperDamageCallback(source: alt.Player, weaponHash: number, damage: number, bone: number) {
            if (isFighting) return;
            isFighting = true;

            if (isGettingRobbed) {
                abortRobbery();
            }

            if (location.ped.model == 'mp_m_shopkeep_01') {
                PedController.speakWithAmbient(
                    shopkeeper,
                    playersInShape,
                    ShopkeeperLines.TenSeconds[randomInt(0, ShopkeeperLines.TenSeconds.length - 1)],
                    {
                        speechName: 'SHOP_BRAVE',
                        speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                    },
                    true,
                );
            }

            await shopkeeper_shootAtPlayer(source);
            await shopkeeper_shootAtAllHostilePlayersInShop();
            await shopkeeper_goBackToSalePosition();
            PedController.holsterWeapon(shopkeeper);
            isFighting = false;
        }

        PedController.Callbacks.setDamageCallback(shopkeeper.uid, shopkeeperDamageCallback);

        function shopkeeper_panic(panicType: Ipanic) {
            //LSPD riasztása - Silent Alarm (211A)
            if (!PedController.isPedAlive(shopkeeper.uid)) return;
        }

        function abortRobbery() {
            PedController.clearTasks(shopkeeper);
            PedController.stopAnimation(shopkeeper);
            PedController.holsterWeapon(shopkeeper);
            PedController.removeObject(polybag.uid);
            shopkeeper_panic({
                arePlayersArmed: true,
                crime: ShopCrimes.RobberyAttempt,
                playersInShop: playersInShape.length,
            });
            isGettingRobbed = false;

            alt.emitAllClients(ShopEvents.abortRobbery);
        }

        function canStartRobbery(): Boolean {
            if (
                location.robbery &&
                Date.now() - location.robbery.lastRobbery >= ShopInitializer.robberyCooldownForShop
            ) {
                return true;
            } else {
                return false;
            }
        }

        function isOfficerInDuty(player: alt.Player) {
            return false;
        }

        async function shopkeeper_aimAtNearestPlayer(shootAfterWait: boolean) {
            if (!PedController.isPedAlive(shopkeeper.uid)) return;
            alt.log('b1');
            alt.log('b2');
            PedController.speakWithAmbient(
                shopkeeper,
                playersInShape,
                ShopkeeperLines.TenSeconds[randomInt(0, ShopkeeperLines.TenSeconds.length - 1)],
                {
                    speechName: 'CALL_COPS_THREAT',
                    speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                },
                true,
            );
            alt.log('b4');
            alt.log('b5');

            const targetPlayer = await shopkeeper_selectTargetPlayer();
            alt.log('b6');
            alt.log(`id: ${targetPlayer.id}`);
            PedController.aimAtEntity(shopkeeper, targetPlayer, ShopInitializer.robberyShopkeeperAimTime);
            alt.log('b7');
            if (shootAfterWait) {
                setTimeout(async () => {
                    if (playersInShape.includes(targetPlayer)) {
                        alt.log('b8');
                        await shopkeeper_shootAtPlayer(targetPlayer);
                        PedController.holsterWeapon(shopkeeper);
                        alt.log('b9');
                    }
                }, ShopInitializer.robberyShopkeeperAimTime);
            }
        }

        function shopkeeper_aimAtPlayer(player: alt.Player, shootAfterWait: boolean) {
            if (!PedController.isPedAlive(shopkeeper.uid)) return;
            isFighting = true;
            removeInteraction();
            PedController.speakWithAmbient(
                shopkeeper,
                playersInShape,
                ShopkeeperLines.TenSeconds[randomInt(0, ShopkeeperLines.TenSeconds.length - 1)],
                {
                    speechName: 'SHOP_BRAVE',
                    speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                },
                true,
            );

            shopkeeperLastPlayerMad[player.socialID] = Date.now();

            PedController.aimAtEntity(shopkeeper, player, 10000);

            setTimeout(async () => {
                if (
                    (shootAfterWait && !isFighting && !isGettingRobbed) ||
                    !IgnoredWeapons.includes(player.currentWeapon)
                ) {
                    if (playersInShape.includes(player)) {
                        await shopkeeper_shootAtPlayer(player);
                        PedController.holsterWeapon(shopkeeper);
                    }
                }
                await shopkeeper_goBackToSalePosition();
            }, ShopInitializer.robberyShopkeeperAimTime);
        }

        async function shopkeeper_goBackToSalePosition() {
            return new Promise(async (resolve, reject) => {
                if (!PedController.isPedAlive(shopkeeper.uid)) return;
                PedController.Tasks.taskGotoCoordByAnyMeans(shopkeeper, location.ped.pos).then(() => {
                    PedController.Tasks.taskTurnPedToFaceCoord(shopkeeper, {
                        x: location.x,
                        y: location.y,
                        z: location.z,
                    } as alt.Vector3);
                    PedController.holsterWeapon(shopkeeper);
                    isGettingRobbed = false;
                    isFighting = false;
                    createInteraction();
                    PedController.Callbacks.setAimCallback(shopkeeper.uid, aimCallback);
                }) /*.then(()=>{
                    PedController.remove(shopkeeper.uid);
                    PedController.append(shopkeeper);
                    InteractionController.add(shopInteraction);
                })*/;
            });
        }

        function shopkeeper_greet(player: alt.Player) {
            console.log('d1');
            if (!PedController.isPedAlive(shopkeeper.uid)) return;
            console.log('d2');
            const greetCategory = ShopkeeperLines.greetings[getDayTime()][player.data.appearance.sex.toString()];
            console.log('d3');
            PedController.speakWithAmbient(
                shopkeeper,
                playersInShape,
                greetCategory[randomInt(0, greetCategory.length - 1)],
                {
                    speechName:
                        randomInt(0, 10) > 5
                            ? ShopInitializer.shopkeeperGreetAmbients[
                                  randomInt(0, ShopInitializer.shopkeeperGreetAmbients.length - 1)
                              ]
                            : 'CHAT_STATE',
                    speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                },
            );

            console.log('d4');
        }

        function playerWeaponChange(player, oldWeapon, newWeapon) {
            if (
                shopShape.isEntityIn(player) &&
                !IgnoredWeapons.includes(newWeapon) &&
                PedController.isPedAlive(shopkeeper.uid)
            ) {
                if (oldWeapon !== getWeaponByName('unarmed').hash) return;
                if (playersInShape.length > 1) {
                    //Többen vannak
                    PedController.playAmbientSpeech(
                        shopkeeper,
                        {
                            speechName: 'APOLOGY_NO_TROUBLE',
                            speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                        },
                        true,
                    );
                } else {
                    //Egyedul van
                    if (randomInt(0, 100) < 40 * location.robbery.shopkeeperAttackModifier) {
                        //Fegyver rántás
                        shopkeeper_aimAtPlayer(player, true);
                    }
                    //Felszólítás
                    PedController.playAmbientSpeech(
                        shopkeeper,
                        {
                            speechName: 'APOLOGY_NO_TROUBLE',
                            speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                        },
                        true,
                    );
                }
            }
        }

        function shopInitialiserTimeout() {
            setTimeout(() => {
                if (PedController.isPedAlive(shopkeeper.uid) !== undefined) {
                    PedController.remove(shopkeeper.uid);
                }
                Athena.controllers.blip.remove(shopBlip.uid);
                setTimeout(() => {
                    ShopInitializer.startupSpecificShop(shop, locationId);
                }, 5000);
            }, ShopInitializer.robberyCooldownForShop);
        }

        async function shopkeeper_selectTargetPlayer(): Promise<alt.Player> {
            return new Promise((resolve, reject) => {
                const nears = PedController.getPlayersInSortOfDistance(shopkeeper, 30).filter((el) =>
                    shopShape.isEntityIn(el),
                );

                for (let j = 0; j < nears.length; j++) {
                    if (canPlayerRob(nears[j]) && !nears[j].isDead && !nears[j].isCuffed) {
                        resolve(nears[j]);
                    }
                }
            });
        }

        async function shopkeeper_shootAtPlayer(player: alt.Player) {
            return new Promise(async (resolve, reject) => {
                if (!PedController.isPedAlive(shopkeeper.uid)) return;
                isFighting = true;
                shopkeeperLastPlayerMad[player.socialID] = Date.now();
                PedController.attackEntity(shopkeeper, player).then(() => {
                    resolve(true);
                });
            });
        }

        function aimCallback(player: alt.Player) {
            if (isGettingRobbed || isFighting || isOfficerInDuty(player) || !shopShape.isEntityIn(player)) return;
            isGettingRobbed = true;
            removeInteraction();
            alt.log('a23');
            if (canPlayerRob(player)) {
                alt.log('a24');
                if (!canStartRobbery()) {
                    alt.log('a24.1');
                    PedController.speakWithAmbient(
                        shopkeeper,
                        playersInShape,
                        ShopkeeperLines.TenSeconds[randomInt(0, ShopkeeperLines.TenSeconds.length - 1)],
                        {
                            speechName: 'CALL_COPS_THREAT',
                            speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                        },
                        true,
                    );
                    Athena.player.emit.notification(player, 'Most nem rabolhatsz, mert a bolt nem rég lett kirabolva.');
                } else if (playersInShape.length > 1) {
                    alt.log('a25');
                    //Többen vannak
                    randomPanic();
                    alt.log('a26');
                } else {
                    //Egyedül van
                    if (randomInt(0, 100) < 15 * location.robbery.shopkeeperAttackModifier) {
                        alt.log('a27');
                        //Ellenállás
                        shopkeeper_aimAtPlayer(player, true);
                        alt.log('a28');
                    } else {
                        //Engedelmesség
                        alt.log('a29');
                        randomPanic();
                        alt.log('a30');
                    }
                }
            } else {
                alt.log('a31');
                Athena.player.emit.notification(
                    player,
                    `Még nem rabolhatsz újra, nem telt le a(z) ${
                        ShopInitializer.robberyCooldownForPlayer / 1000 / 60 / 60
                    } óra`,
                );
                alt.log('a32');
                PedController.playAmbientSpeech(
                    shopkeeper,
                    {
                        speechName: 'SHOP_BRAVE',
                        speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                    },
                    true,
                );
                alt.log('a33');
                shopkeeper_aimAtPlayer(player, false);
                alt.log('a34');
            }

            async function randomPanic() {
                alt.log('panic1');

                player.data.lastRobbery = Date.now();
                alt.log('panic2');
                PedController.holsterWeapon(shopkeeper);
                if (randomInt(0, 100) < 50 * location.robbery.alertModifier) {
                    alt.log('panic3');
                    //Pánikgomb
                    shopkeeper_panic({
                        arePlayersArmed: true,
                        crime: ShopCrimes.ActiveShopRobbery,
                        playersInShop: playersInShape.length,
                    });
                    alt.log('panic4');
                }
                alt.log('panic5');

                await PedController.Tasks.taskGotoCoordByAnyMeans(shopkeeper, location.ped.pos);

                alt.log('panic6');

                await PedController.Tasks.taskTurnPedToFaceCoord(shopkeeper, {
                    x: location.x,
                    y: location.y,
                    z: location.z,
                } as alt.Vector3);

                PedController.playAmbientSpeech(
                    shopkeeper,
                    {
                        speechName: 'SHOP_SCARED',
                        speechParam: SpeechParams.SPEECH_PARAMS_FORCE,
                    },
                    true,
                );
                shopkeeper_robRegister(player);
            }
        }

        const polybag: IAttachable = {
            bone: ePedBoneId.SKEL_L_Finger32, //SKEL_L_FINGER_32
            model: 'prop_poly_bag_01',
            pos: {
                x: -0.068,
                y: -0.009,
                z: -0.108,
            } as alt.Vector3,
            rot: {
                x: 0,
                y: 0,
                z: 0,
            } as alt.Vector3,
            uid: Athena.utility.hash.sha256Random('Shop:Polybag'),
        };

        alt.on('playerWeaponChange', playerWeaponChange);

        function shopkeeper_robRegister(player: alt.Player) {
            if (!PedController.isPedAlive(shopkeeper.uid)) return;
            //A teljes anim... scenario kb 23mp.
            removeInteraction();

            const callbackName = Athena.utility.hash.sha256Random('ShopRobbery:robbery');

            alt.Player.all
                .filter((el) => el.pos.distanceTo({ x: location.x, y: location.y, z: location.z } as alt.Vector3) < 50)
                .forEach((el) => {
                    alt.emitClient(el, ShopEvents.loadProps);
                });

            /*PedController.getPlayersInSortOfDistance(shopkeeper, 100).forEach(players =>{
                alt.emitClient(players, ShopEvents.test, shopkeeper.uid, callbackName);
            });*/

            PedController.playAnimation(shopkeeper, {
                dict: 'mp_am_hold_up',
                name: 'holdup_victim_20s',
                duration: -1,
                flags: ANIMATION_FLAGS.REPEAT /*ANIMATION_FLAGS.NORMAL */ /*| ANIMATION_FLAGS.UPPERBODY_ONLY VAGY REPEAT*/,
            });

            setTimeout(async () => {
                if (!isGettingRobbed || isFighting) return;
                //Az animáció kb 10-11. másodpercében veszi elő a zsebéből a zacskót a boltos, ekkor attach egyet a kezéhet.
                const robbedMoney = randomInt(
                    location.robbery.registerMoneyInterval[0],
                    location.robbery.registerMoneyInterval[1],
                );

                PedController.attachObject(shopkeeper, polybag);
                setCashRegisterState(shopkeeper.pos, CashRegisterState.open);

                for (let i = 0; i < location.robbery.cameras.length; i++) {
                    location.robbery.cameras[i].cctvImage = await takeCCTVPicture(
                        player,
                        location.robbery.cameras[i].cctvPos,
                        location.robbery.cameras[i].lookAtPos,
                    );
                }

                setTimeout(() => {
                    if (!isGettingRobbed) return;
                    // PedController.stopAnimation(shopkeeper);
                    setCashRegisterState(shopkeeper.pos, CashRegisterState.closed);

                    PedController.detachObjectDynamic(shopkeeper, polybag);

                    alt.setTimeout(async () => {
                        var bagPos = await PedController.applyForceToAttachment(
                            polybag.uid,
                            ForceTypes.MinForce,
                            new alt.Vector3(0, 0, 0),
                        );

                        alt.log(bagPos);

                        const pickUpMoneyMarkerUid = Athena.controllers.marker.append({
                            color: new alt.RGBA(0, 230, 0),
                            pos: new alt.Vector3(bagPos.x, bagPos.y, bagPos.z + 0.5),
                            type: MARKER_TYPE.DOLLAR_SIGN,
                            bobUpAndDown: true,
                            faceCamera: true,
                            maxDistance: 100,
                        });

                        const pickUpmoneyInteraction: Interaction = {
                            description: 'Pénz felvétele',
                            position: {
                                x: location.x,
                                y: location.y,
                                z: location.z,
                            },
                            isPlayerOnly: true,
                            isVehicleOnly: false,
                            uid: Athena.utility.hash.sha256Random('PenzfelveteleInteractionUid'),
                            callback: (player) => {
                                Athena.player.emit.animation(
                                    player,
                                    'pickup_object',
                                    'pickup_low',
                                    ANIMATION_FLAGS.NORMAL,
                                    1000,
                                );

                                Athena.controllers.interaction.remove(pickUpmoneyInteraction.uid);
                                Athena.controllers.marker.remove(pickUpMoneyMarkerUid);
                                Athena.player.currency.add(player, CurrencyTypes.CASH, robbedMoney);
                                PedController.removeObject(polybag.uid);

                                alt.setTimeout(() => {
                                    if (!isFighting && PedController.isPedAlive(shopkeeper.uid)) {
                                        createInteraction();
                                    }
                                }, ShopInitializer.robberyCooldownForShop);
                            },
                        };

                        Athena.controllers.interaction.add(pickUpmoneyInteraction);

                        setTimeout(async () => {
                            if (!isGettingRobbed) return;
                            PedController.stopAnimation(shopkeeper);
                            PedController.clearTasks(shopkeeper);

                            shopkeeper_panic({
                                arePlayersArmed: true,
                                crime: ShopCrimes.RobbedShop,
                                playersInShop: playersInShape.length,
                                robbedMoney: robbedMoney,
                            });

                            const CCTVInteraction: Interaction = {
                                description: 'CCTV felvételek lekérése',
                                isPlayerOnly: true,
                                isVehicleOnly: false,
                                position: location.robbery.getCCTVRecording.interactPos,
                                uid: Athena.utility.hash.sha256Random('CCTVInteractShopIze'),
                                callback: CCTVInteract,
                            };

                            Athena.controllers.interaction.add(CCTVInteraction);
                            PedController.Callbacks.setAimCallback(shopkeeper.uid, aimCallback);
                        }, 2500);
                    }, 1100);
                }, 9300);
            }, 11400);
        }

        /**
         * Kinyit vagy becsuk minden prop_till_01 kasszát a megadott pozíción 3-es radius-ban
         * @param pos
         * @param state
         */
        function setCashRegisterState(
            pos: alt.Vector3 | { x: number; y: number; z: number },
            state: CashRegisterState,
        ) {
            alt.emitAllClients(
                ShopEvents.setCashRegisterState,
                {
                    x: pos.x,
                    y: pos.y,
                    z: pos.z,
                },
                state,
                3,
            );
        }

        async function shopkeeper_shootAtAllHostilePlayersInShop() {
            return new Promise(async (resolve, reject) => {
                if (!PedController.isPedAlive(shopkeeper.uid) || playersInShape.length == 0) resolve(false);
                while (playersInShape.some((el: alt.Player) => canPlayerRob(el) && !el.isDead && !el.isCuffed)) {
                    await shopkeeper_shootAtPlayer(await shopkeeper_selectTargetPlayer());
                }
                resolve(true);
            });
        }

        function canPlayerRob(player: alt.Player) {
            if (
                !player.isDead &&
                !IgnoredWeapons.includes(player.currentWeapon) &&
                Date.now() - (player.data.lastRobbery ?? 0) > ShopInitializer.robberyCooldownForPlayer
            )
                return true;
            return false;
        }

        function CCTVInteract(player: alt.Player) {
            //if(!isOfficerInDuty(player)) return;

            Athena.player.emit.taskTimeline(player, [
                {
                    nativeName: 'taskGoToCoordAnyMeans',
                    params: [
                        location.robbery.getCCTVRecording.interactPos.x,
                        location.robbery.getCCTVRecording.interactPos.y,
                        location.robbery.getCCTVRecording.interactPos.z,
                        1,
                        0,
                        false,
                        786603,
                        0xbf800000,
                    ],
                    timeToWaitInMs: 0,
                },
                {
                    nativeName: 'TaskTurnPedToFaceCoord',
                    params: [
                        location.robbery.getCCTVRecording.lookAtPos.x,
                        location.robbery.getCCTVRecording.lookAtPos.y,
                        location.robbery.getCCTVRecording.lookAtPos.z,
                        1000,
                    ],
                    timeToWaitInMs: 0,
                },
            ]);

            const waitInt = setInterval(() => {
                if (player.pos == location.robbery.getCCTVRecording.interactPos) {
                    clearInterval(waitInt);
                }
            }, 500);

            Athena.player.emit.scenario(player, 'WORLD_HUMAN_STAND_MOBILE_FACILITY', 5000);
            Athena.player.emit.createProgressBar(player, {
                color: new alt.RGBA(50, 168, 82),
                distance: 0.5,
                milliseconds: 5000,
                position: {
                    x: player.pos.x,
                    y: player.pos.y,
                    z: player.pos.z,
                },
                text: 'CCTV felvételek lekérése...',
            });

            setTimeout(() => {
                /*
                    MEGJELENÍTI A KÉPET
                    */
            }, 5000);
        }

        PedController.Callbacks.setAimCallback(shopkeeper.uid, aimCallback);

       // Logger.passed(
       //     `${shop.name}: ${locationId}. bolt sikeresen elindítva | Rabolható: ${location.robbery ? 'Igen' : 'Nem'}`,
       // );
    }

    static async startupAllShops() {
        ShopRegistry.forEach(async (shop) => {
            if (
                (OSS.randomizeSellers && shop.shopType === ShopType.SELL) ||
                (OSS.randomizeBuyers && (!shop.shopType || shop.shopType === ShopType.BUY))
            ) {
                shop.data.items.forEach((item) => {
                    let registryPrice = shop.data.items.find((itemToFind) => itemToFind.dbName === item.dbName).price;
                    item.price = randomInt(registryPrice * 0.6, registryPrice - 1);
                });
            }

            for (let i = 0; i < shop.locations.length; i++) {
                this.startupSpecificShop(shop, i);
            }
        });
    }

    static async initShopCallback(player: alt.Player, shop: IShop) {
        let currentShop = shop;
        let dataItems = [];
        for (const item of currentShop.data.items) {
            let factoryItem = await ItemFactory.get(item.dbName);
            if (!factoryItem) {
                alt.log(`~lr~${OSS.name} ${OSS.version}: Item ${item.dbName} is not in your ItemFactory!`);
            } else {
                let itemIcon: string;
                let itemName: string;
                let itemDbName = item.dbName;
                let itemPrice = item.price;
                if (!item.icon || !item.name) {
                    itemIcon = item.icon ? item.icon : factoryItem.icon;
                    itemName = item.name ? item.name : factoryItem.name;
                } else {
                    itemIcon = item.icon;
                    itemName = item.name;
                }
                dataItems.push({ name: itemName, dbName: itemDbName, price: itemPrice, image: itemIcon });
            }
        }
        alt.emitClient(player, `${PAGENAME}:Client:OpenShop`, dataItems, shop.shopType);
    }
}
