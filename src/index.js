import Quest from "./quest.js";
import { createVerify } from "crypto";
import spritesheet from './colored.png';
import './style.css';
import './components'
import './scenes'

function build_quest(){
    const quest = {
        "_main":"find-golden-fleece",
        "find-golden-fleece":{
            "depends":["row-across-sea","put-dragon-to-sleep"],
        },
        "row-across-sea":{
            "depends":["find-boat","find-paddle"],
            "requires":["row-across-sea"],
        },
        "find-boat":{
            "requires":["boat"],
        },
        "find-paddle":{
            "requires":["paddle"],
        },
        "put-dragon-to-sleep":{
            "depends":["make-sleep-potion"],
            "requires":["convince-dragon","feed-sleeping-potion-to-dragon"],
        },
        "make-sleep-potion":{
            "requires":["get-sleepy-tree-leaf"],
            "actions":["mix-potion"],
        },
    }
    return quest;
}

function main(){
    const quest = build_quest();

    console.log(spritesheet);

    // Using kenney.nl 1bit
    var assetsObj = { "sprites": {} };
    assetsObj.sprites[spritesheet] = {
        "tile": 16,
        "tileh": 16,
        "paddingX": 1,
        "paddingY": 1,
        "map": {
            "character": [31,0],
            "grass1": [5,0],"grass2": [6,0],"grass3": [7,0],
            "tree1": [0,1],"tree2": [1,1],"tree3": [2,1],"tree4": [3,1],
            "fleece": [16,30],
        }
    }

    Crafty.init(window.innerWidth,window.innerHeight, document.getElementById('game'))

    Crafty.load(assetsObj, // preload assets
        function() {
            Crafty.enterScene("world");
        },
        function(e) { },
        function(e) { console.error(e)}
    );

}

main();
