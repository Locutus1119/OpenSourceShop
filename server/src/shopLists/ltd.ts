import { IShopLocation } from '../interfaces/IShop';
import { Vector3, Vector2 } from 'alt-server';
import { CashRegisterState } from '../../../shared/enums/cashRegisterState';

export const ltdLocations: IShopLocation[] = [
    /* { x: -48.5690803527832, y: -1757.6961669921875, z: 28.4210147857666, isBlip: true },
     { x: 1163.400634765625, y: -323.938232421875, z: 68.20509338378906, isBlip: true },
     { x: -707.4390258789062, y: -914.5612182617188, z: 18.21558952331543, isBlip: true },
     { x: 1697.968505859375, y: 4924.54833984375, z: 41.06367492675781, isBlip: true },*/
    {
        x: -1819.912109375,
        y: 794.3208618164062,
        z: 138.0791015625,
        isBlip: true,
        ped: {
            model: 'mp_m_shopkeep_01',
            heading: 128.660400390625,
            //def: pos: {"x":-1820.373779296875, "y":794.7379760742188, "z": 137.089599609375} as Vector3,
            //CashRegister: pos: {x: -1820.465, y: 793.8166, z: 138.09} as Vector3,
            pos: {x: -1819.912109375, y: 794.3208618164062, z: 138.0791015625-1,} as Vector3,
            /*pos: {
                x: -1819.378662109375,tt
                y: 793.6986083984375,
                z: 137.08192443847656,
            } as Vector3,*/
        },
        colshape: {
            minZ: 137.169189453125,
            maxZ: 140.859375,
            vertices: [
                { x: -1827.4549560546875, y: 783.8373413085938, z: 137.4051513671875 } as Vector3,
                { x: -1832.5450439453125, y: 789.3890380859375, z: 137.5567626953125 } as Vector3,
                { x: -1829.947265625, y: 798.896728515625, z: 138.197021484375 } as Vector3,
                { x: -1826.13623046875, y: 802.7999877929688, z: 137.2872314453125 } as Vector3,
                { x: -1817.4329833984375, y: 793.2131958007812, z: 140.4718017578125 } as Vector3
            ],
            isPlayerOnly: true,
            isVehicleOnly: false
        },
        robbery: {
            registerMoneyInterval: [14000, 18000],
            getCCTVRecording: {
                interactPos: new Vector3(
                    -1827.6263427734375,
                    796.7077026367188,
                    138.18017578125
                ),
                lookAtPos: new Vector3(
                    -1828.04833984375,
                    796.3384399414062,
                    138.4498291015625
                )
            },
            cameras: [
                {
                    cctvPos: new Vector3(
                        1127.116455078125,
                        980.4132080078125,
                        45.4051513671875
                    ),
                    lookAtPos: new Vector3(
                        -1828.10107421875,
                        796.2461547851562,
                        138.230712890625
                    ),
                    cctvImage: ""
                },
                {
                    cctvPos: new Vector3(
                        -1827.230712890625,
                        784.8527221679688,
                        140.4718017578125
                    ),
                    lookAtPos: new Vector3(
                        -1826.7032470703125,
                        790.03515625,
                        137.4388427734375
                    ),
                    cctvImage: ""
                },
                {
                    cctvPos: new Vector3(
                        -1825.92529296875,
                        802.2197875976562,
                        139.865234375
                    ),
                    lookAtPos: new Vector3(
                        -1824.4747314453125,
                        798.7384643554688,
                        137.2872314453125
                    ),
                    cctvImage: ""
                },
                {
                    cctvPos: new Vector3(
                        -1829.5252685546875,
                        798.2373657226562,
                        140
                    ),
                    lookAtPos: new Vector3(
                        -1826.08349609375,
                        798.7120971679688,
                        137.2872314453125
                    ),
                    cctvImage: ""
                }
            ],
            lastRobbery: 0,
            alertModifier: 1,
            shopkeeperAttackModifier: 1
        }
    }, //Richman 
];
