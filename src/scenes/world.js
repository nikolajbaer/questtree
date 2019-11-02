import SimplexNoise from 'simplex-noise';
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

    Crafty.e('2D, DOM, character, Fourway, Collision').attr(
        {x:400,y:400,w:32,h:32}
        ).fourway(100, {normalize: true}) 
        .onHit('StaticBody',function(){
            this.velocity({x:0,y:0})
        })

    Crafty.e('2D, DOM, fleece, StaticBody').attr(
        {x:(Math.random()*Crafty.viewport.width), y:Math.random()* Crafty.viewport.height}
    )
})