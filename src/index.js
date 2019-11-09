import './style.css';
import './components'
import './scenes'
import { assetsObj } from './assets'
import * as _ from 'lodash'
import { gen_music } from "./music"
import * as quest_template from "./quest_display.ejs"
import * as inventory_template from "./inventory_display.ejs"

var popup_div = null;
const popup_queue = [];
var popup_displayed = false;
function show_popup(html){
    popup_displayed = true;
    popup_div.children[0].innerHTML = html;
    popup_div.style.display = "block";
}

function main(){

    // Wire up our popup
    popup_div = document.querySelectorAll(".popup")[0];
    document.querySelectorAll(".popup .close")[0].addEventListener("click", e => {
        if(popup_queue.length > 0){
            show_popup(popup_queue.shift());
        }else{
            popup_div.style.display = "none";
            popup_displayed = false;
            if(Crafty.isPaused()){
                Crafty.pause();
            }
        }
    })

    if(window.localStorage != undefined && window.localStorage.getItem("questtree-intro") == null){
        show_popup(document.getElementById("intro").innerHTML); // show intro popup
        window.localStorage.setItem("questtree-intro","shown");
    }

    Crafty.init(window.innerWidth,window.innerHeight, document.getElementById('game'))

    Crafty.bind("showMessages", messages => {
        if(!Crafty.isPaused()){ Crafty.pause(); }
        messages.forEach( msg => { popup_queue.push(msg) })
        if(!popup_displayed){
            show_popup(popup_queue.shift());
        }
    })

    Crafty.bind("questUpdate", quest => {
        document.getElementById("quest_display").innerHTML = quest_template({quest:quest});
    })

    Crafty.bind("characterUpdate", character => {
        document.getElementById("inventory_display").innerHTML = inventory_template({inventory:character.inventory});
    })

    Crafty.load(assetsObj, // preload assets
        function() {
            Crafty.enterScene("world");
            //gen_music();  must be triggered after start 
        },
        function(e) { },
        function(e) { console.error(e)}
    );

}

main();
