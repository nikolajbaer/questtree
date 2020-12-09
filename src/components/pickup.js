
Crafty.c('Pickup', {
    init: function(){
        this.addComponent('2D, Canvas, Collision, Mouse');
        this.attr({w:32,h:32,z:0});
        this.bind('MouseUp', e => {
            Crafty.trigger("showMessages",
                [`This appears to be a ${this.item}`]
            )
        })

    } 
})