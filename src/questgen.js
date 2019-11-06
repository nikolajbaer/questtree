import { npcs, items } from "./assets";

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

const quest_types = {
    "find-item": {
        name: n => { `find-${n}` },
        requires_items: n => { [n] },
    },
    "defeat-npc": {
        name: n => { `defeat-${n}` },
        requires_actions: n => { [`${n}-died`] },
    },
    "rescue-npc": {
        name: n => { `defeat-${n}` },
        requires_actions: n => { [`${n}-released`] },
    }
}


export function generate_quest(items,npcs){

    return quest_tree;
}
