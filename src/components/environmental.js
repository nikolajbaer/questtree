Crafty.c('Tree', {
    init: function(){
        this.addComponent(`2D, Canvas, StaticBody, Collision, tree1`);
        this.attr({w:32,h:32})
    }
})

Crafty.c('Grass', {
    init: function(){
        this.addComponent(`2D, Canvas, grass1`);
        this.attr({w:32,h:32})
    }
})