   

export class BaseRequirement{
    constructor(name,required){
        this.name = name;
        this.required = required;
        this.subreq = [];
        this.satisfied = false;
    }

    can_complete(character){
        var fulfilled = true;
        this.subreq.forEach( rq => { fulfilled &= rq.update(character); });
        return fulfilled;
    }

    update(character){
        if(!this.can_complete(character)){
            return false
        }
        return this.satisfied;
    } 

    describe(character_name,explain=false){
        var txt = `${character_name} must ${this.name}. `;

        const satisfied = this.subreq.filter( r => r.satisfied)
        const incomplete = this.subreq.filter( r => !r.satisfied)
        
        if(explain && satisfied.length == 0){ txt = "First, " }

        if(incomplete.length){
            txt += `To do this, ${character_name} must `;

            for(var i=0;i<incomplete.length;i++){
                if(incomplete.length == 1){
                    txt += ` ${incomplete[i].name.toLowerCase()}`
                }else if( i < incomplete.length-1 ){
                    txt += ` ${incomplete[i].name.toLowerCase()}, `
                }else{ txt += ` and ${incomplete[i].name.toLowerCase()}`}
            } 
            txt += '. ';
        }

        if(satisfied.length){
            if(character_name == "You"){
                txt += ` ${character_name} have completed `;
            }else{
                txt += ` ${character_name} has completed `;
            }

            for(var i=0;i<satisfied.length;i++){
                if(satisfied.length == 1){
                    txt += ` ${satisfied[i].name.toLowerCase()}`
                }else if( i < satisfied.length-1 ){
                    txt += ` ${satisfied[i].name.toLowerCase()}, `
                }else{ txt += ` and ${satisfied[i].name.toLowerCase()}`}
            } 
            txt += '. ';
        }
        return txt
    }
} 

export class InventoryRequirement extends BaseRequirement {
    constructor(name,required){
        super(name,required);
        this.type = "inventory";
    }

    update(character){
        this.satisfied = super.update(character)
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

