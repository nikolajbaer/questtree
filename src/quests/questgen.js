import { npcs, items } from "../assets";
import { InventoryRequirement,ActionRequirement } from "./quest";

export function generate_quest(items,npcs){

    const items_to_use = _.shuffle(_.clone(_.keys(items)));
    const npcs_to_use = _.shuffle(_.clone(_.keys(npcs)));

    const npc = npcs_to_use.pop();
    const base_quest = new ActionRequirement(`Defeat the ${npc}`,`defeat-${npc}`,npc)

    function build_quest(q,d){
        // Add requirements?
        var inv_rqs = Math.floor(Math.random() * 3); 
        const act_rqs = Math.floor(Math.random() * 3);
        if(inv_rqs == 0 && act_rqs == 0){ inv_rqs += 1 }

        if(inv_rqs){
            for(var i=0;i<inv_rqs && items_to_use.length > 0;i++){
                const inv = items_to_use.pop()
                console.log("adding inv req",inv,items_to_use)
                const inv_req = new InventoryRequirement(`Find a ${inv}`,inv)
                q.subreq.push(inv_req); 

                // Sub Requirements
                if( d > 0 && (items_to_use.length > 0 || npcs_to_use.length > 0)){
                    if(Math.random() > 0.5){  
                        build_quest(inv_req,d-1);
                    }
                }
            }
        }

        if(act_rqs){
            for(var i=0; i<act_rqs && npcs_to_use.length > 0; i++){
                const npc = npcs_to_use.pop();
                const action_rq = new ActionRequirement(`Defeat the ${npc}`,`defeat-${npc}`,npc)
                q.subreq.push( action_rq ); 
                Crafty.bind(`defeat-${npc}`, e => { 
                    console.log(`Action defeat-${npc} triggered`)
                    action_rq.satisfied = true; 
                });

                // Add Sub Requirements 
                if( d > 0 && (items_to_use.length > 0 || npcs_to_use.length > 0)){
                    if(Math.random() > 0.5){  
                        build_quest(action_rq,d-1);
                    }
                }
            } 
        }


        return q;
    }
    return build_quest(base_quest,3)
}
