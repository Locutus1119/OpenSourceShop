import alt from 'alt-server';
import { ShopEvents } from '../../shared/events';

/**
 * Visszaad egy képet
 * @param player 
 * @param transparent Default: true
 * @returns {Promise<string>} Base64 string
 */
export async function takeCCTVPicture(player: alt.Player, cameraPos: alt.Vector3, lookAtPos: alt.Vector3): Promise<string>{
    return new Promise((resolve, reject) =>{
        alt.emitClient(player, ShopEvents.takeCCTVPicture, cameraPos, lookAtPos);
        
        function done(player, image){
            alt.offClient("Shops:getCCTVImageFromClient", done);
            resolve(image);
        }
        
        alt.onClient("Shops:getCCTVImageFromClient", done);
    });
}

alt.on("takePedshot", takeCCTVPicture);