
// TODO Create Quest Dependency Tree
// Thoughts
// - depends - subquests to fulfill
// - requires - items to obtain for completing subquest
// - actions - actions to complete for satisfying subquest
// - triggers - trigger event when a subquest is complete
// To play game, you solve dependency trees to achieve main quest
export class Quest{
    constructor(name){
        this.name = name;
        this.requires = [];
        this.depends = [];
        this.complete = false;
    }

    add_dependency(subquest){ this.depends.push(subquest) }
    add_requirement(requirement){ this.requires.push(requirement) }

    update(character){
        var complete = true;
        this.depends.forEach( dep => { complete &= dep.update(character); });
        this.requires.forEach( rq => { complete &= rq.update(character); });
        this.complete = complete;
        return complete;
    }

    describe(character_name){
        var txt = `${character_name} must ${this.name}. `;
        if(this.requires.length){
            txt += `To do this, ${character_name} must `;
            for(var i=0;i<this.requires.length;i++){
                if(this.requires.length == 1){
                    txt += ` ${this.requires[i].name.toLowerCase()}`
                }else if( i < this.requires.length-1 ){
                    txt += ` ${this.requires[i].name.toLowerCase()}, `
                }else{ txt += ` and ${this.requires[i].name.toLowerCase()}`}
            } 
            txt += '. ';
        }
        if(this.depends.length){
            txt += `To do this, ${character_name} must`
            for(var i=0;i<this.depends.length;i++){
                if(this.depends.length == 1){
                    txt += ` ${this.depends[i].name.toLowerCase()}`
                }else if( i < this.depends.length-1 ){
                    txt += ` ${this.depends[i].name.toLowerCase()}, `
                }else{ txt += `and ${this.depends[i].name.toLowerCase()}`}
            } 
            txt += '.';
            this.depends.forEach( subq => {
                txt += subq.describe(character_name);
            })
        }
        return txt;
    }
}

export class BaseRequirement{
    constructor(name,required){
        this.name = name;
        this.required = required;
        this.satisfied = false;
    }

    update(character){
        return this.satisfied;
    } 
} 

export class InventoryRequirement extends BaseRequirement {
    constructor(name,required){
        super(name,required);
        this.type = "inventory";
    }
    update(character){
        if( character.inventory.filter( i => i == this.required).length > 0 ){
            this.satisfied = true;
        }
        return this.satisfied;
    }
}

export class ActionRequirement extends BaseRequirement {
    constructor(name,required,npc){
        super(name,required);
        this.npc = npc;
        this.type = "action";
    }
    action_triggered(){
        this.satisfied = true;
    }
}

