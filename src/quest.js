
// TODO Create Quest Dependency Tree
// Thoughts
// - depends - subquests to fulfill
// - requires - items to obtain for completing subquest
// - actions - actions to complete for satisfying subquest
// To play game, you solve dependency trees to achieve main quest
export class Quest{
    constructor(name){
        this.name = name;
        this.requires = [];
        this.depends = [];
    }

    add_dependency(subquest){ this.depends.push(subquest) }
    add_requirement(requirement){ this.requires.push(requirement) }

    is_complete(character){
        var complete = true;
        this.depends.forEach( dep => { complete &= dep.is_complete(character); });
        this.requires.forEach( rq => { complete &= rq.is_satisfied(character); });
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
    }

    is_satisfied(character){
        return false;
    } 
} 

export class InventoryRequirement extends BaseRequirement {
    is_satisfied(character){
        return character.inventory.filter( i => i == this.required).length > 0;
    }
}

export class ActionRequirement extends BaseRequirement {
    constructor(name,bound_object,character){
        super(name,bound_object);
        this.action_complete = false;
    }

    is_satisfied(character){
        return this.action_complete;
    }

    action_triggered(){
        this.action_complete = true;
    }
}


export function build_quest(){
    const quest_tree = {
        "_main":"find-fleece",
        "find-fleece":{
            "depends":["find-sword"],
            "requires_items":["fleece"],
        },
        "find-sword":{
            "requires_items":["sword","shield"],
        },
    }

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