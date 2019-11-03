import perlin from 'perlin-noise';
import { build_quest } from "../quest.js";

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
        }else if(v < 0.05){
            Crafty.e('EnvObj, bones').attr(pos);
        }
    }
    
    ['fleece','sword','shield'].forEach( f => {
        Crafty.e(`Pickup, ${f}`).attr({ 
            x:Math.random()*Crafty.viewport.width, 
            y:Math.random()*Crafty.viewport.height,
            item: f
        });
    })
    const player = Crafty.e('Character').attr({x:400,y:400,z:1000,name:"Wilbur"});

    console.log("Building Quest");
    const quest = build_quest();
    console.log("Setting quest: ",quest.describe(player.name));
    player.attr({quest:quest});

});