import { InventoryRequirement, ActionRequirement, Quest } from "./quest.js";
import spritesheet from './colored.png';
import './style.css';
import './components'
import './scenes'

function build_quest(character){
    const quest_tree = {
        "_main":"find-golden-fleece",
        "find-golden-fleece":{
            "depends":["row-across-sea","put-dragon-to-sleep"],
        },
        "row-across-sea":{
            "requires_items":["boat","paddle"],
            "requires_actions":["row-across-sea"],
        },
        "put-dragon-to-sleep":{
            "depends":["make-sleep-potion"],
            "requires_actions":["convince-dragon","feed-sleeping-potion-to-dragon"],
        },
        "make-sleep-potion":{
            "requires_items":["sleepy-tree-leaf"],
            "requires_actions":["mix-potion"],
        },
    }

    function assemble_quest(obj,name){
        console.log("assembling",name,obj);
        const q = new Quest(name);
        if( obj.depends != undefined ){
            obj.depends.forEach( subq => {
                q.add_dependency(assemble_quest(quest_tree[subq],subq));
            });
        }
        if( obj.requires_item != undefined){
            obj.requires_item.forEach( rqi => {
                q.add_requirement(new InventoryRequirement(rqi,null)); 
            })
        }
        if( obj.requires_actions != undefined){
            obj.requires_actions.forEach( rqa => {
                q.add_requirement(new ActionRequirement(rqa,null));
            })
        }
        return q;
    }
    
    return assemble_quest(quest_tree[quest_tree._main],quest_tree._main);
}

function main(){
    const quest = build_quest();
    console.log("Quest: ",quest.describe());
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
            // Pickups
            "fleece": [16,22],"sword": [0,31], "shield": [6,25],
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
