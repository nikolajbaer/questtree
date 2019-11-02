
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

    is_complete(){
        var complete = true;
        this.depends.forEach( dep => { complete &= dep.is_complete(); });
        this.requires.forEach( rq => { complete &= rq.is_satisfied(this.character); });
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
    constructor(name,bound_object){
        this.name = name;
        this.bound_object = bound_object;
    }

    is_satisfied(character){
        return false;
    } 
} 

export class InventoryRequirement extends BaseRequirement {
    is_satisfied(character){
        return character.has_in_inventory(this.bound_object);
    }
}

export class ActionRequirement extends BaseRequirement {
    constructor(name,bound_object,character){
        super(name,bound_object);
        this.action_complete = false;
        // TODO listen somewhere for action?
    }
}


export function build_quest(){
    const quest_tree = {
        "_main":"find-golden-fleece",
        "find-golden-fleece":{
            "depends":["row-across-sea","put-dragon-to-sleep"],
            "requires_items":["fleece"],
        },
        "row-across-sea":{
            "requires_items":["boat","paddle"],
            "requires_actions":["row-across-sea"],
        },
        "put-dragon-to-sleep":{
            "depends":["make-sleep-potion"],
            "requires_actions":["convince-dragon","feed-sleeping-potion-to-dragon"],
        },
        "make-sleep-potion":{
            "requires_items":["sleepy-tree-leaf"],
            "requires_actions":["mix-potion"],
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
                q.add_requirement(new InventoryRequirement(rqi,null)); 
            })
        }
        if( obj.requires_actions != undefined){
            obj.requires_actions.forEach( rqa => {
                q.add_requirement(new ActionRequirement(rqa,null));
            })
        }
        return q;
    }
    
    return assemble_quest(quest_tree[quest_tree._main],quest_tree._main);
}