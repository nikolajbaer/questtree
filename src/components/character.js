
Crafty.c('Character', {
    init: function(){
        this.addComponent("2D, Canvas, character, Fourway, Collision, Mouse");
        this.attr({w:32,h:32,z:1000})
        this.fourway(200, {normalize: true}) 
        this.inventory = [];
        this.name = "Unnamed";
        this.quest = null;
        this.checkHits("Pickup, StaticBody, Wall, bones")
        this.bind('Move', function(evt) { // after player moved
            var hitDatas, hitData;
            if ((hitDatas = this.hit('Wall'))) { // check for collision with walls
              hitData = hitDatas[0]; // resolving collision for just one collider
              if (hitData.type === 'SAT') { // SAT, advanced collision resolution
                // move player back by amount of overlap
                this.x -= hitData.overlap * hitData.nx;
                this.y -= hitData.overlap * hitData.ny;
              } else { // MBR, simple collision resolution
                // move player to previous position
                this.x = evt._x;
                this.y = evt._y;
              }
            }
        });
        this.bind('MouseUp', e => {
            Crafty.trigger("showMessages",
                [`${this.name}, you handsome devil!`]
            )
        })
        this.onHit("Pickup",function(hitData){
            hitData.forEach( pickup_hit => {
                const pickup = pickup_hit.obj
                const item = pickup.interact(this) 

                if( item != null){
                    this.inventory.push(item);
                    Crafty.trigger("characterUpdate",this);
                    pickup.destroy();
                }
                const complete = this.quest.update(this);
                if(complete){
                    Crafty.trigger("showMessages", [`${this.quest.name} is complete!`]);
                }
                Crafty.trigger("questUpdate",this.quest);
            });
        })
        this.onHit("NPC",function(hitData){
            hitData.forEach( npc_hit => {
                const npc = npc_hit.obj
                //Crafty.trigger("showMessages",[`${this.name} picked up a ${item.item}`]);
                const action = npc.interact(this);
                if(action != null){
                    console.log(`triggering ${action}`)
                    Crafty.trigger(action,npc);
                    npc.destroy();
                }
                const complete = this.quest.update(this);
                if(complete){
                    Crafty.trigger("showMessages", [`${this.quest.name} is complete!`]);
                }
                Crafty.trigger("questUpdate",this.quest);
            });
        })
        this.onHit("bones",function(hitData){
            const bones = hitData[0].obj
            console.log(bones,bones.touched)
            if( !bones.touched ){                    
                bones.touched = true
                Crafty.trigger("showMessages", [`Nothing but some old bones here.`])
            }
        })
    },
})