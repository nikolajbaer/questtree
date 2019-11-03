import './style.css';
import './components'
import './scenes'
import { assetsObj } from './assets'
import * as _ from 'lodash'

var popup_div = null;
const popup_queue = [];

function show_popup(html){
    if(html != null){
        popup_div.children[0].innerHTML = html;
    }
    popup_div.style.display = "block";
}
window.show_popup = show_popup;

function main(){

    // Wire up our popup
    popup_div = document.querySelectorAll(".popup")[0];
    document.querySelectorAll(".popup .close")[0].addEventListener("click", e => {
        if(popup_queue.length > 0){
            show_popup(popup_queue.shift());
        }else{
            popup_div.style.display = "none";
            if(Crafty.isPaused()){
                Crafty.pause();
            }
        }
    })

    if(window.localStorage != undefined && window.localStorage.getItem("questtree-intro") == null){
        show_popup(); // show intro popup
        window.localStorage.setItem("questtree-intro","shown");
    }

    Crafty.init(window.innerWidth,window.innerHeight, document.getElementById('game'))

    Crafty.bind("showMessages", messages => {
        if(!Crafty.isPaused()){ Crafty.pause(); }
        messages.forEach( msg => { popup_queue.push(msg) })
        show_popup(popup_queue.shift());
    })

    Crafty.load(assetsObj, // preload assets
        function() {
            Crafty.enterScene("world");
        },
        function(e) { },
        function(e) { console.error(e)}
    );

}

main();
