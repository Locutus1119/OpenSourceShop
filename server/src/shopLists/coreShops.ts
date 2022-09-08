import { IShopLocation } from '../interfaces/IShop';
import { Vector3, Vector2 } from 'alt-server';
import { CashRegisterState } from '../../../shared/enums/cashRegisterState';

export const coreShopLocations: IShopLocation[] = [
    /*  { x: 25.980966567993164, y: -1345.6417236328125, z: 28.497024536132812, isBlip: true }, 
      { x: 374.3475341796875, y: 328.112060546875, z: 102.56637573242188, isBlip: true }, 
      { x: -3041.32763671875, y: 585.155029296875, z: 6.908928871154785, isBlip: true }, 
      { x: -3243.743408203125, y: 1001.3903198242188, z: 11.830706596374512, isBlip: true }, 
      { x: 548.0447387695312, y: 2669.48876953125, z: 41.156490325927734, isBlip: true }, 
      { x: 1960.2322998046875, y: 3742.317138671875, z: 31.343746185302734, isBlip: true }, 
      { x: 1730.01171875, y: 6416.22021484375, z: 34.03722381591797, isBlip: true }, 
      { x: 2555.4609375, y: 382.1643371582031, z: 107.62295532226562, isBlip: true }, */

      {
        x:26.123077392578125,y:-1346.914306640625,z:29.4820556640625,
        isBlip: true,
        ped: {
            model: 'mp_m_shopkeep_01',
            heading: 271.10360717773444,
            //def: pos: {x:-1820.373779296875, y:794.7379760742188, z: 137.089599609375} as Vector3,
            //CashRegister: pos: {x: -1820.465, y: 793.8166, z: 138.09} as Vector3,
            pos: {x:24.461538314819336,y:-1347.3363037109375,z:29.4820556640625-1,} as Vector3,
            /*pos: {
                x: -1819.378662109375,tt
                y: 793.6986083984375,
                z: 137.08192443847656,
            } as Vector3,*/
        },
        colshape: {
            minZ: 29,
            maxZ: 30.6,
            vertices: [
                { x:31.120880126953125,y:-1346.993408203125,z:30.5098876953125 } as Vector3,
                {x:31.450550079345703,y:-1344.17138671875,z:30.4930419921875} as Vector3,
                {x:28.694507598876953,y:-1340.6505126953125,z:29.9033203125} as Vector3,
                {x:25.041757583618164,y:-1341.3099365234375,z:30.5772705078125} as Vector3,
                {x:25.648351669311523,y:-1345.89892578125,z:29.24609375} as Vector3
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
                    cctvImage: "",
                },
               
            ],
            lastRobbery: 0,
            alertModifier: 1,
            shopkeeperAttackModifier: 1
        }
    }, //Richman 
];