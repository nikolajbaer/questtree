import './style.css';
import './components'
import './scenes'
import { assetsObj } from './assets'
import * as _ from 'lodash'
import { gen_music } from "./music"
import * as quest_template from "./quest_display.ejs"
import * as inventory_template from "./inventory_display.ejs"

// Debug
import * as sprite_debug_template from "./sprite_debug.ejs"
import spritesheet from './colored_transparent.png';

var popup_div = null;
const popup_queue = [];
var popup_displayed = false;
var music = null

function show_popup(html){
    popup_displayed = true;
    popup_div.children[0].innerHTML = html;
    popup_div.style.display = "block";
}

function ack_popup(){
   if(popup_queue.length > 0){
        show_popup(popup_queue.shift());
    }else{
        popup_div.style.display = "none";
        popup_displayed = false;
        if(Crafty.isPaused()){
            Crafty.pause();
        }
    }
}

function main(){

    // Wire up our popup
    popup_div = document.querySelectorAll(".popup")[0];
    document.querySelectorAll(".popup .close")[0].addEventListener("click", e => {
        // if this is the intro and the music box is checked, start with music
        if(document.getElementById("music_at_start") && document.getElementById("music_at_start").checked){
            music = gen_music() 
        }
        ack_popup();
    })

    document.getElementById("new_quest").addEventListener("click", e => {
        Crafty.enterScene("world")
    })

    document.getElementById("describe_quest").addEventListener("click", e => {
        show_popup(quest.describe("You"))
    })


    var music_on = true
    document.getElementById("mute").addEventListener("click", e => {
        if( music == null){
            music = gen_music()
            e.target.innerHTML= "music off"
        }else{
            music.toggle()
            e.target.innerHTML= "music "  + ((music.state == "started")?"off":"on")
        }
    })

    /*
    if(window.localStorage != undefined && window.localStorage.getItem("questtree-intro") == null){
        show_popup(document.getElementById("intro").innerHTML); // show intro popup
        window.localStorage.setItem("questtree-intro","shown");
    }*/
    show_popup(document.getElementById("intro").innerHTML); // show intro popup

    Crafty.init(window.innerWidth,window.innerHeight, document.getElementById('game'))

    Crafty.bind("showMessages", messages => {
        if(!Crafty.isPaused()){ Crafty.pause(); }
        messages.forEach( msg => { popup_queue.push(msg) })
        if(!popup_displayed){
            show_popup(popup_queue.shift());
        }
    })

    Crafty.bind("KeyUp", e => { 
        if(e.key == Crafty.keys.ENTER){
            ack_popup() 
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
        },
        function(e) { },
        function(e) { console.error(e)}
    );

}

main();


window.show_sprite_debug = function(){
    show_popup(
        sprite_debug_template({
            src: spritesheet,
            tsz: 17,
            w: 64,
            h: 32
        })
    )
}
