import spritesheet from './colored_transparent.png';


export const items = {
    "fleece": {sprite:[16,22]},
    "sword": {sprite:[0,31]}, 
    "shield": {sprite:[6,25]},
    "potion": {sprite:[30,16]},
}
export const npcs = {
    "ogre": {sprite:[24,3]}, 
    "ghost": {sprite:[26,6]}, 
    "demon": {sprite:[27,2]},
    "wizard": {sprite:[24,1]},
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

