import { IShopLocation } from '../interfaces/IShop';
import { Vector3, Vector2 } from 'alt-server';
import { CashRegisterState } from '../../../shared/enums/cashRegisterState';

export const robsLiquorLocations: IShopLocation[] = [
    /*{ x: 1135.9544677734375, y: -981.8599853515625, z: 45.41580581665039, isBlip: true },
    { x: -1222.91162109375, y: -907.1942749023438, z: 11.326356887817383, isBlip: true },
    { x: -1487.08349609375, y: -379.2518005371094, z: 39.163429260253906, isBlip: true },
    { x: -2967.888427734375, y: 390.76654052734375, z: 14.043313026428223, isBlip: true },*/
    {
        x: -1487.6439208984375,
        y: -379.3846130371094,
        z: 40.14794921875-1,
        isBlip: true,
        ped: {
            model: 'mp_m_shopkeep_01',
            heading: 128.660400390625,
            //def: pos: {x:-1820.373779296875, y:794.7379760742188, z: 137.089599609375} as Vector3,
            //CashRegister: pos: {x: -1820.465, y: 793.8166, z: 138.09} as Vector3,
            pos: {x: -1486.2989501953125, y: -378, z: 40.14794921875-1,} as Vector3,
            /*pos: {
                x: -1819.378662109375,tt
                y: 793.6986083984375,
                z: 137.08192443847656,
            } as Vector3,*/
        },
        colshape: {
            minZ: 40,
            maxZ: 42,
            vertices: [
                {x:-1487.6966552734375,y:-384.8439636230469,z:41.93408203125} as Vector3,
                {x:-1480.6285400390625,y:-377.9736328125,z:41.125244140625} as Vector3,
                {x:-1485.217529296875,y:-372.9362487792969,z:41.125244140625} as Vector3,
                {x:-1491.8505859375,y:-380.0967102050781,z:40.14794921875} as Vector3,
            ],
            isPlayerOnly: true,
            isVehicleOnly: false
        },
        robbery: {
            registerMoneyInterval: [14000, 18000],
            getCCTVRecording: {
                interactPos: new Vector3(
                    -1487.156005859375,
                    -376.4307556152344,
                    40.14794921875
                ),
                lookAtPos: new Vector3(
                    -1487.6175537109375,
                    -376.5758361816406,
                    40.14794921875
                )
            },
            cameras: [
                {
                    cctvPos: new Vector3(
                        -1486.0615234375,
                        -380.3999938964844,
                        40.923095703125
                    ),
                    lookAtPos: new Vector3(
                        -1490.05712890625,
                        -379.6351623535156,
                        40.063720703125
                    ),
                    cctvImage: ""
                },
            ],
            lastRobbery: 0,
            alertModifier: 1,
            shopkeeperAttackModifier: 1
        }
    }, //Prosperty st. 
];
