import alt from 'alt-server';

export interface IRobShop{
    registerMoneyInterval: number[];
    cameras: Array<CCTV>;
    getCCTVRecording: CCTVRecording;
    lastRobbery: number;
    alertModifier: number;
    shopkeeperAttackModifier: number;
}

export interface CCTVRecording{
    interactPos: alt.Vector3;
    lookAtPos: alt.Vector3;
}

export interface CCTV{
    cctvPos: alt.Vector3;
    lookAtPos: alt.Vector3;
    cctvImage: string
}