
Crafty.c('Character', {
    init: function(){
        this.addComponent("2D, Canvas, character, Fourway, Collision");
        this.attr({w:32,h:32,z:1000})
        this.fourway(200, {normalize: true}) 
        this.inventory = [];
        this.name = "Unnamed";
        this.checkHits("Pickup, StaticBody")
        this.onHit("StaticBody", h => {
            console.log("stop")
            const v = this.velocity();
            v.x = 0;
            v.y = 0;
        })
        this.onHit("Pickup",function(hitData){
            console.log("hit",hitData);
            hitData.forEach( pickup => {
                const item = pickup.obj
                console.log("pickup up a ",item.item);
                this.inventory.push(item.item);
                item.destroy();
            });
            console.log(this.inventory);
        })

    },
})