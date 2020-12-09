Crafty.c('Tree', {
    init: function(){
        const i = Math.floor(Math.random()*4)+1;
        this.addComponent(`2D, Canvas, Collision, tree${i}`);
        this.attr({w:32,h:32})
    }
})

Crafty.c('Rocks', {
    init: function(){
        this.addComponent(`2D, Canvas, StaticBody, Collision, rocks`);
        this.attr({w:32,h:32})
    }
})


Crafty.c('Grass', {
    init: function(){
        const i = Math.floor(Math.random()*3)+1;
        this.addComponent(`2D, Canvas, grass${i}`);
        this.attr({w:32,h:32})
    }
})

Crafty.c('Dirt', {
    init: function(){
        const i = Math.floor(Math.random()*2)+1;
        this.addComponent(`2D, Canvas, dirt${i}`);
        this.attr({w:32,h:32})
    }
})

Crafty.c('EnvObj', {
    init: function(){
        this.addComponent(`2D, Canvas`);
        this.attr({w:32,h:32})
    }
})