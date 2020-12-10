
Crafty.c('NPC', {
    init: function(){
        this.addComponent('2D, Canvas, Collision, Mouse');
        this.attr({w:32,h:32,z:0,requirement:null,name:null});
        this.bind('MouseUp', e => {
            Crafty.trigger("showMessages",
                [`You lay eyes upon the ${this.name}`]
            )
        })
    },
    interact(character){
        if(!this.requirement.can_complete(character)){
            Crafty.trigger("showMessages", [this.requirement.describe('You',true)])
            return;
        }else{
            this.requirement.action_triggered()
            Crafty.trigger("showMessages", 
                [`You have defeated ${this.name}`])
            return  `defeat-${this.name}`;
        }
    }
})