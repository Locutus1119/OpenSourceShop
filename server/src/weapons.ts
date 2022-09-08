import { Weapon, getWeaponList, getWeaponByName } from "../../../../shared/information/weaponList"

export const IgnoredWeapons = [
    getWeaponByName("bat").hash,
    getWeaponByName("ball").hash,
    getWeaponByName("snowball").hash,
    getWeaponByName("fireextinguisher").hash,
    getWeaponByName("hazardcan").hash,
    getWeaponByName("jerrycan").hash,
    getWeaponByName("parachute").hash,
    getWeaponByName("unarmed").hash,
    getWeaponByName("stungun").hash,
    getWeaponByName("raypistol").hash,
    getWeaponByName("flare").hash
]

export const shopkeeperWeapons = [
    getWeaponByName("pistol"),
    getWeaponByName("pistol50"),
    getWeaponByName("pumpshotgun"),
    getWeaponByName("sawnoffshotgun")
]