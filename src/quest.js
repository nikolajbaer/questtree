
// TODO Create Quest Dependency Tree
// Thoughts
// - depends - subquests to fulfill
// - requires - items to obtain for completing subquest
// - actions - actions to complete for satisfying subquest
// To play game, you solve dependency trees to achieve main quest
export class Quest{
    constructor(name,character){
        this.name = name;
        this.character = character;
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