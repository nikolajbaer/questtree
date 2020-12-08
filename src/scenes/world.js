import perlin from 'perlin-noise';
import { build_quest } from "../quest.js";
import { generate_quest } from "../questgen";
import { items,npcs } from "../assets";

const TILESZ = {x:32,y:32};
const margin = 0.1

Crafty.scene("world", function(){
    // Generate trees
    console.log("generating environment")

    const width = Crafty.viewport.width * (1-margin*2);
    const height = Crafty.viewport.height * (1-margin*2);
    const twidth = Math.ceil(width/TILESZ.x);
    const theight = Math.ceil(height/TILESZ.y);
    const left = Crafty.viewport.width * margin 
    const top = Crafty.viewport.height * margin
  
    // Use Perlin noise to make the world interesting
    // TODO just render this to a base layer canvas rather than creating entities
    const noise_opt = {octabeCount:4,amplitude:0.2,persistence:0.2};
    const noise = perlin.generatePerlinNoise(twidth,theight,noise_opt);
    console.log(noise);
    for(var i=0; i < noise.length; i++){
        const tx = i%twidth;
        const ty = Math.floor(i/twidth);
        const v = noise[i];
        const pos = {
            x: tx * TILESZ.x + left,
            y: ty * TILESZ.y + top
        }
        if( v > 0.75){
            Crafty.e('Tree').attr(pos);
        }else if(v > 0.6){
            Crafty.e('Grass').attr(pos);
        }else if(v > 0.5){
            Crafty.e('Dirt').attr(pos);
        }else if(v < 0.02){
            Crafty.e('EnvObj, bones').attr(pos).attr({touched:false});
        }
    }
    
    const player = Crafty.e('Character').attr({x:400,y:400,z:1000,name:"Wilbur"});


    const west = Crafty.e('2D, Collision, Wall').attr({
        x:left-5,y:top,w:5,h:height,name:"west"
    })
    const east = Crafty.e('2D, Collision, Wall').attr({
        x:width + left,y:top,w:5,h:height,name:"east"
    })
    const north = Crafty.e('2D, Collision, Wall').attr({
        x:left,y:top-5,w:width,h:5,name:"north"
    })
    const south = Crafty.e('2D, Collision, Wall').attr({
        x:left,y:height + top,w:width,h:5,name:"south"
    })



    console.log("Building Quest");

    const quest = generate_quest(items,npcs);
    console.log(quest);
    Crafty.trigger("questUpdate",quest);
    generate_quest_items(quest);

    player.attr({quest:quest});
    Crafty.trigger("showMessages", [`Your name is ${player.name}.<br><br>${quest.describe(player.name)}`]);

});


// Assumptions:
// Each item is unique in quest-tree
// and each item is unique in the world
// TODO accommodate for multiple items
function generate_quest_items(quest){
    function walk_quest(q){
        q.requires.forEach( f => {
            console.log("requires",typeof(f));
            if(f.type == "inventory"){
                console.log("adding ",f.required)
                Crafty.e(`Pickup, ${f.required}`).attr({ 
                    // For now we randomly place items for quest
                    x: Crafty.viewport.width*margin + Math.random()*Crafty.viewport.width * (1-margin*2) , 
                    y: Crafty.viewport.height*margin + Math.random()*Crafty.viewport.height * (1-margin*2),
                    item: f.required
                });
            }else if(f.type == "action"){
                console.log(`Adding ${f.npc}`)
                Crafty.e(`NPC, ${f.npc}`).attr({
                    // For now we randomly place items for quest
                    x: Crafty.viewport.width*margin + Math.random()*Crafty.viewport.width * (1-margin*2), 
                    y: Crafty.viewport.height*margin + Math.random()*Crafty.viewport.height * (1-margin*2),
                    name: f.npc
                })
            }
        })
        q.depends.forEach( subq => { walk_quest(subq); });
    }
    walk_quest(quest);
}