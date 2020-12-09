
Crafty.c('Pickup', {
    init: function(){
        this.addComponent('2D, Canvas, Collision, Mouse');
        this.attr({w:32,h:32,z:0,required_to_pickup:null});
        this.bind('MouseUp', e => {
            Crafty.trigger("showMessages",
                [`This appears to be a ${this.item}`]
            )
        })

    },
    interact(character){
        if(this.required_to_pickup != null){
           //character.inventory.indexOf(this.required_to_defeat) < 0  ){
            Crafty.trigger("showMessages", 
                [`To acquire ${this.item} you must ${this.required_to_defeat}`])
            return null;
        }else{
            Crafty.trigger("showMessages", 
                [`You have acquired the ${this.item}`])
            return  this.item;
        }
    }
})