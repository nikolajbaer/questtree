import SimplexNoise from 'simplex-noise';
import { build_quest } from "../quest.js";

const TILESZ = {x:32,y:32};

Crafty.scene("world", function(){
    // Generate trees
    console.log("generating environment")
    var simplex = new SimplexNoise();

    const width = Crafty.viewport.width;
    const height = Crafty.viewport.height;

    for(var x=0; x< width/TILESZ.x; x++){
        for(var y=0; y < height/TILESZ.y; y++){
            const v = simplex.noise2D(x,y);
            if( v > 0.98){
                Crafty.e('Tree').attr({x:x*TILESZ.x,y:y*TILESZ.y});
            }else if(v > 0.9){
                Crafty.e('Grass').attr({x:x*TILESZ.x,y:y*TILESZ.y});
            }
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