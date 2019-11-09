import { npcs, items } from "./assets";
import { InventoryRequirement,ActionRequirement,Quest } from "./quest";

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

export function generate_quest(items,npcs){

    const base_quest = new Quest("Quest");

    const items_to_use = _.shuffle(_.clone(_.keys(items)));
    const npcs_to_use = _.shuffle(_.clone(_.keys(npcs)));

    function build_quest(q,d){
        // Add requirements?
        var inv_rqs = Math.floor(Math.random() * 3); 
        const act_rqs = Math.floor(Math.random() * 3);
        if(inv_rqs == 0 && act_rqs == 0){ inv_rqs += 1 }

        if(inv_rqs){
            for(var i=0;i<inv_rqs && items_to_use.length > 0;i++){
                const inv = items_to_use.pop()
                q.add_requirement(new InventoryRequirement(`Find a ${inv}`,inv)); 
            }
        }
        if(act_rqs){
            for(var i=0; i<act_rqs && npcs_to_use.length > 0; i++){
                const npc = npcs_to_use.pop();
                const action_rq = new ActionRequirement(`Defeat the ${npc}`,`defeat-${npc}`,npc)
                q.add_requirement( action_rq ); 
                Crafty.bind(`defeat-${npc}`, e => { 
                    console.log(`Action defeat-${npc} triggered`)
                    action_rq.satisfied = true; 
                });
            } 
        }


        // Add SubQuests?
        if( d > 0 && (items_to_use.length > 0 || npcs_to_use.length > 0)){
            if(Math.random() > 0.75){  
                q.add_dependency(build_quest(new Quest("subquest"),d-1));
            }
        }
        return q;
    }
    return build_quest(base_quest,3)
    //return quest_tree;
}
