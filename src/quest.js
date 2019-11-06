
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
            txt += `To do this, ${character_name} must gather`;
            for(var i=0;i<this.requires.length;i++){
                if(this.requires.length == 1){
                    txt += ` a ${this.requires[i].name}`
                }else if( i < this.requires.length-1 ){
                    txt += ` a ${this.requires[i].name}, `
                }else{ txt += ` and a ${this.requires[i].name}`}
            } 
            txt += '. ';
        }
        if(this.depends.length){
            txt += `To do this, ${character_name} must`
            for(var i=0;i<this.depends.length;i++){
                if(this.depends.length == 1){
                    txt += ` ${this.depends[i].name}`
                }else if( i < this.depends.length-1 ){
                    txt += ` ${this.depends[i].name}, `
                }else{ txt += `and ${this.depends[i].name}`}
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
    update(character){
        if( character.inventory.filter( i => i == this.required).length > 0 ){
            this.satisfied = true;
        }
        return this.satisfied;
    }
}

export class ActionRequirement extends BaseRequirement {
    action_triggered(){
        this.satisfied = true;
    }
}

export function build_quest(quest_tree){
    function assemble_quest(obj,name){
        console.log("assembling",name,obj);
        const q = new Quest(name);
        if( obj.depends != undefined ){
            obj.depends.forEach( subq => {
                q.add_dependency(assemble_quest(quest_tree[subq],subq));
            });
        }
        if( obj.requires_items != undefined){
            obj.requires_items.forEach( rqi => {
                q.add_requirement(new InventoryRequirement(`Find ${rqi}`,rqi)); 
            })
        }
        if( obj.requires_actions != undefined){
            obj.requires_actions.forEach( rqa => {
                q.add_requirement(new ActionRequirement(`Do ${rqa}`,rqa));
            })
        }
        return q;
    }
    
    return assemble_quest(quest_tree[quest_tree._main],quest_tree._main);
}