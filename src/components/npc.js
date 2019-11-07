
Crafty.c('NPC', {
    init: function(){
        this.addComponent('2D, Canvas, Collision');
        this.attr({w:32,h:32,z:0,required_to_defeat:null,name:null});
    },
    interact(character){
        if(this.required_to_defeat != null &&
           character.inventory.indexOf(this.required_to_defeat) < 0  ){
            Crafty.trigger("showMessages", 
                [`To defeat ${this.name} you must have a ${this.required_to_defeat}`])
            return;
        }else{
            Crafty.trigger("showMessages", 
                [`You have defeated ${this.name}`])
            return  `defeat-${this.name}`;
        }
    }
})