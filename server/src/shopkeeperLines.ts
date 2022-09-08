export class ShopkeeperLines{
    static TenSeconds = [
        "Ideje elsétálni, haver! Visszaszámolok 10-től. Ha utána meglátlak itt, golyót repítek a fejedbe. Értve?",
        "Na azt már nem! Most húzol innen! 10... 9.... 8...",
        "Csak szeretnéd töpörtyű! Taka van!",
        "Azt próbáld csak meg! Egy lövés és halott vagy! Húzz el anyádba innen. Van 10 másodperced.",
        "Van 10 másodperced elhúzni a csíkot, vagy lövök. Ketyeg az óra.",
        "Szép próbálkozás, legközelebb golyót is kapsz a fejedbe, de ha nem tűnsz el azonnal, akár most rögtön. Tűnés! 10... 9... 8...",
        "Menők vagyunk, menők vagyunk? Boltot raboláznánk, mi? Tíz másodperc és még a jó Isten se kapar fel a földről!",
        "10... 9... 8...",
        "Na akkor fegyvert elrak, maszkot levesz, anyuba elhúz! Ja, és szép nagy mosolyt kérek a kamerába!",
        "Azt hitted kirabolhatsz mi, aranyom? 10 másodperc. Taka van!",
        "Kérlek nyugtass meg, hogy ma reggel a szaros gatyádat vetted fel, mert most olyat kapsz, hogy összeszarod magad!",
        "Remélem reggel a szaros gatyádat fetted fel, mert a most vár rád attól tuti összeszarod magad.",
        "Kár, hogy nem rég mostam fel. Úgy tűnik véres lesz a padló.",
        "A jobb kezem veszélyes, a másiktól még én is félek.",
        "Az egyetlen hibád, hogy anyád magzatvízében nem volt cápa",
        "Öregem, te egy hatalmas érv vagy az abortusz mellett.",
        "Úgy pofánváglak, hogy a fogaid körmérkőzést játszanak a bentmaradásért!",
        "Az igaz ember járta ösvényt mindkét oldalról szegélyezi az önző emberek igazságtalansága és a gonoszok zsarnoksága. Áldott legyen az, ki az irgalmasság és a jóakarat nevében átvezeti a gyöngéket a sötétség völgyén, mert ő valóban testvérének őrizője és az elveszett gyermekek meglelője. Én pedig lesújtok majd tereád hatalmas bosszúval és rettentő haraggal, és amazokra is, akik testvéreim ármányos elpusztítására törnek, és majd megtudjátok, hogy az én nevem az Úr, amikor szörnyű bosszúm lesújt rátok. Ezekiel 25:17",
        "Anyámmal élek, Babettával járok, macskám van, és ne legyek kemény?",
        "Semmi sem reménytelen, míg nincs a föld alatt, de te mindjárt 6 lábbal leszel alatta!",
        "Tartsd meg a golyót, te mocskos állat!",
        "Állj! Szükségem van a ruháidra.",
        "Megmondom hogy lesz veled és velem. Nem lesz olyan, hogy te meg én... Soha többé. Még ma elutazol... este. És ha elutazol, egy vagy utazva, különben véged. Los Santos-ban nincs maradásod. Na húzd el a beled!"
    ]

    static greetings = {
        night: {
            1: [
                "Üdvözlöm! Válogasson nyugodtan!",
                "Üdv a boltban, mit kér?",
                "Szép, jó estét!",
                "Mi tetszik?",
                "Fúh... Nem kéne már aludni? Na mindegy. Mit tehetek önért?",
                "Jó... éjszakát?",
                "24/7 nyitva vagyunk, a legjobb árak!",

                "Pfúh... Pont zárni akartam. Na mindegy, jöjjön csak, uram!",
                "Üdv az úrnak! Mit adhatok?",
                "Szép estét, uram! Válogasson nyugodtan!",
                "Üdv uram, szépek a csillagok kint, nemde?"
            ],
            0:[
                "Üdvözlöm! Válogasson nyugodtan!",
                "Üdv a boltban, mit kér?",
                "Szép, jó estét!",
                "Mi tetszik?",
                "Fúh... Nem kéne már aludni? Na mindegy. Mit tehetek önért?",
                "Jó... éjszakát?",
                "24/7 nyitva vagyunk, a legjobb árak!",
                
                "Pfúh... Pont zárni akartam... Na mindegy, jöjjön csak, hölgyem!",
                "Üdv a hölgynek! Mit adhatok?",
                "Szép estét, uram! Válogasson nyugodtan!",
                "Üdv hölgyem, szépek a csillagok kint, nemde?"
            ]
        },
        morning: {
            1: [
                "Üdvözlöm! Válogasson nyugodtan!",
                "Üdv a boltban, mit kér?",
                "Mi tetszik?",
                "Szép jó reggelt! Mit adhatok?",
                "Jó reggelt!",
                "Szép reggelt!",
                "Gyönyörű reggelünk van nemde?",
                "24/7 nyitva vagyunk, a legjobb árak!",
                "Hjaaaj. Új nap, új én! Jöjjön csak, jöjjön csak!",

                "Jó reggelt, uram! Válogasson nyugodtan!",
                "Szép, jó reggelt az úrnak!",
                "Szép reggelt, uram!",
            ],
            0:[
                "Üdvözlöm! Válogasson nyugodtan!",
                "Üdv a boltban, mit kér?",
                "Mi tetszik?",
                "Szép jó reggelt! Mit adhatok?",
                "Jó reggelt!",
                "Szép reggelt!",
                "Gyönyörű reggelünk van nemde?",
                "24/7 nyitva vagyunk, a legjobb árak!",
                "Hjaaaj. Új nap, új én! Jöjjön csak, jöjjön csak!",

                "Jó reggelt, hölgyem! Válogasson nyugodtan!",
                "Szép, jó reggelt az hölgyemények!",
                "Szép reggelt, hölgyem!",
            ]
        },
        day: {
            1: [
                "Üdvözlöm! Válogasson nyugodtan!",
                "Üdv a boltban, mit kér?",
                "Mi tetszik?",
                
            ],
            0:[
                "Üdvözlöm! Válogasson nyugodtan!",
                "Üdv a boltban, mit kér?",
                "Mi tetszik?",
            ]
        },
        evening:{
            1: [
                "Üdvözlöm! Válogasson nyugodtan!",
                "Üdv a boltban, mit kér?",
                "Mi tetszik?",
            ],
            0:[
                "Üdvözlöm! Válogasson nyugodtan!",
                "Üdv a boltban, mit kér?",
                "Mi tetszik?",
            ]
        }
    }

    static goodbye = {
        //1: férfi player, 0: nő player
        night: {
            1: [
                "Viszlát!",
                "Hasta la proxima!",
                "Viszont látásra!",
                "Köszönjük, hogy minket válaszott!",
                "Jöjjön máskor is!",
                "Kérem értékeljen Lifeinvader-en!",
                "Csak óvatosan! Éjjel veszélyesek az utcák.",
                "További jó éjszakát!",
            ],
            0:[
                "Viszlát!",
                "Hasta la proxima!",
                "Viszont látásra!",
                "Köszönjük, hogy minket válaszott!",
                "Jöjjön máskor is!",
                "Kérem értékeljen Lifeinvader-en!",
            ]
        },
        morning: {
            1: [
                "Viszlát!",
                "Hasta la proxima!",
                "Viszont látásra!",
                "Köszönjük, hogy minket válaszott!",
                "Jöjjön máskor is!",
                "Kérem értékeljen Lifeinvader-en!",
            ],
            0:[
                "Viszlát!",
                "Hasta la proxima!",
                "Viszont látásra!",
                "Köszönjük, hogy minket válaszott!",
                "Jöjjön máskor is!",
                "Kérem értékeljen Lifeinvader-en!",
            ]
        },
        day: {
            1: [
                "Viszlát!",
                "Hasta la proxima!",
                "Viszont látásra!",
                "Köszönjük, hogy minket válaszott!",
                "Jöjjön máskor is!",
                "Kérem értékeljen Lifeinvader-en!",
            ],
            0:[
                "Viszlát!",
                "Hasta la proxima!",
                "Viszont látásra!",
                "Köszönjük, hogy minket válaszott!",
                "Jöjjön máskor is!",
                "Kérem értékeljen Lifeinvader-en!",
            ]
        },
        evening:{
            1: [
                "Viszlát!",
                "Hasta la proxima!",
                "Viszont látásra!",
                "Köszönjük, hogy minket válaszott!",
                "Jöjjön máskor is!",
                "Kérem értékeljen Lifeinvader-en!",
            ],
            0:[
                "Viszlát!",
                "Hasta la proxima!",
                "Viszont látásra!",
                "Köszönjük, hogy minket válaszott!",
                "Jöjjön máskor is!",
                "Kérem értékeljen Lifeinvader-en!",
            ]
        }
    }

    static noTroubleMask = {
        alone: [
            "Kérem vegye le a maszkot!",
            "Nem akarok bajt, csak vegye le a maszkot!",
            "Megkérhetném arra, hogy levegye a maszkot?",
            "Elnézést! Megteszi, hogy leveszi a maszkot?",
            "Üdv, levenné a maszkot? Szeretném látni az arcát.",
            "Húh... Picit ijesztő ez a maszk. Nem venné le?",
            "Megtenné, hogy leveszi a maszkot?",
            "Nagyon örülnék, ha levenné a maszkot.",
            "Szeretem a maszkokat, de ez nem álarcosbál. Kérem vegye le a maszkot!",
            "Levenné a maszkot? Félek, hogy megrémülök tőle, és véletlen kihívom az LSPD-t."
        ],
        company: [
            "Kérem vegyék le a maszkot!",
            "Nem akarok bajt, csak vegyék le a maszkot!",
            "Megkérhetném önöket arra, hogy levegyék a maszkot?",
            "Elnézést! Megteszik, hogy leveszik a maszkot?",
            "Üdv, levennék a maszkot? Szeretném látni az arcukat.",
            "Húh... Picit ijesztő ez a maszk. Nem vennék le?",
            "Megtennék, hogy leveszik a maszkot?",
            "Nagyon örülnék, ha levennék a maszkot.",
            "Szeretem a maszkokat, de ez nem álarcosbál. Kérem vegyék le a maszkot!",
            "Levennék a maszkot? Félek, hogy megrémülök tőle, és véletlen kihívom az LSPD-t."
        ]
    }
}

//Hasta la proxima!