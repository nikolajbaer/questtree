import perlin from 'perlin-noise';
import { build_quest } from "../quest.js";
import { generate_quest } from "../questgen";
import { items,npcs } from "../assets";

const TILESZ = {x:32,y:32};

Crafty.scene("world", function(){
    // Generate trees
    console.log("generating environment")

    const width = Crafty.viewport.width;
    const height = Crafty.viewport.height;
    const twidth = Math.ceil(width/TILESZ.x);
    const theight = Math.ceil(height/TILESZ.y);
  
    // Use Perlin noise to make the world interesting
    // TODO just render this to a base layer canvas rather than creating entities
    const noise_opt = {octabeCount:4,amplitude:0.2,persistence:0.2};
    const noise = perlin.generatePerlinNoise(twidth,theight,noise_opt);
    console.log(noise);
    for(var i=0; i < noise.length; i++){
        const tx = i%twidth;
        const ty = Math.floor(i/twidth);
        const v = noise[i];
        const pos = {x:tx*TILESZ.x,y:ty*TILESZ.y}
        if( v > 0.75){
            Crafty.e('Tree').attr(pos);
        }else if(v > 0.6){
            Crafty.e('Grass').attr(pos);
        }else if(v > 0.5){
            Crafty.e('Dirt').attr(pos);
        }else if(v < 0.02){
            Crafty.e('EnvObj, bones').attr(pos);
        }
    }
    
    const player = Crafty.e('Character').attr({x:400,y:400,z:1000,name:"Wilbur"});

    console.log("Building Quest");

    const quest = generate_quest(items,npcs);
    console.log(quest);
    Crafty.trigger("questUpdate",quest);
    generate_quest_items(quest);

    console.log("Setting quest: ",quest.describe(player.name));
    player.attr({quest:quest});

});


// Assumptions:
// Each item is unique in quest-tree
// and each item is unique in the world
// TODO accommodate for multiple items
function generate_quest_items(quest){
    function walk_quest(q){
        q.requires.forEach( f => {
            console.log("adding ",f.required)
            Crafty.e(`Pickup, ${f.required}`).attr({ 
                // For now we randomly place items for quest
                x:Math.random()*Crafty.viewport.width, 
                y:Math.random()*Crafty.viewport.height,
                item: f.required
            });
        })
        q.depends.forEach( subq => { walk_quest(subq); });
    }
    walk_quest(quest);
}