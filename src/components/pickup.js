
Crafty.c('Pickup', {
    init: function(){
        this.addComponent('2D, Canvas, Collision, Mouse');
        this.attr({w:32,h:32,z:0,requirement:null});
        this.bind('MouseUp', e => {
            Crafty.trigger("showMessages",
                [`This appears to be a ${this.item}`]
            )
        })

    },
    interact(character){
        if(!this.requirement.can_complete(character)){
            Crafty.trigger("showMessages",[this.requirement.describe('You',true)])
            return null;
        }else{
            Crafty.trigger("showMessages", 
                [`You have acquired the ${this.item}`])
            return  this.item;
        }
    }
})