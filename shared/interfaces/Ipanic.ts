import { ShopCrimes } from "../enums/ShopCrimes";

export interface Ipanic{
    playersInShop: number,
    arePlayersArmed: boolean,
    crime: ShopCrimes,
    robbedMoney?: number
}