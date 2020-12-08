import spritesheet from './colored_transparent.png';


export const items = {
    "yellow_key": {sprite:[32,11]},
    "blue_key": {sprite:[33,11]},
    "red_key": {sprite:[34,11]},
    "sword": {sprite:[33,8]}, 
    "shield": {sprite:[37,3]},
    "potion": {sprite:[32,13]},
    "boat": {sprite:[11,19]},
    "crossbow": {sprite:[37,5]},
    "shovel": {sprite:[42,5]},
    "crown": {sprite:[43,2]},
    "gauntlets":{sprite:[41,0]},
    "helm":{sprite:[34,0]},
    "scroll":{sprite:[33,15]}
}
export const npcs = {
    "ogre": {sprite:[24,3]}, 
    "ghost": {sprite:[26,6]}, 
    "demon": {sprite:[27,2]},
    "wizard": {sprite:[24,1]},
    "warlock": {sprite:[31,1]},
    "spider": {sprite:[28,5]},
    "kraken": {sprite:[25,8]},
    "bat": {sprite:[26,8]},
    "dwarf":{sprite:[26,9]},
    "troll":{sprite:[25,9]},
    "dragon":{sprite:[29,8]},
    "rat":{sprite:[31,8]},
}

// Using kenney.nl 1bit
// https://kenney.nl/assets/bit-pack
export var assetsObj = { "sprites": {} };
assetsObj.sprites[spritesheet] = {
    "tile": 16,
    "tileh": 16,
    "paddingX": 1,
    "paddingY": 1,
    "map": {
        "character": [31,0],
        // Environmental bits
        "dirt1": [1,0],"dirt2": [2,0],"dirt3":[3,0],
        "grass1": [5,0],"grass2": [6,0],"grass3": [7,0],
        "tree1": [0,1],"tree2": [1,1],"tree3": [2,1],"tree4": [3,1],
        "bones": [0,15],
    }
}
const map = assetsObj.sprites[spritesheet]['map']

for(var k in items){
    map[k] = items[k].sprite;
}
for(var k in npcs){
    map[k] = npcs[k].sprite;
}

