import spritesheet from './colored_transparent.png';


export const items = {
    "yellow_key": {sprite:[32,11],lvl:3},
    "blue_key": {sprite:[33,11],lvl:3},
    "red_key": {sprite:[34,11],lvl:3},
    "sword": {sprite:[33,8],lvl:3}, 
    "shield": {sprite:[37,3],lvl:3},
    "potion": {sprite:[32,13],lvl:3},
    "boat": {sprite:[11,19],lvl:4},
    "crossbow": {sprite:[37,5],lvl:4},
    "shovel": {sprite:[42,5],lvl:4},
    "crown": {sprite:[43,2],lvl:1},
    "gauntlets":{sprite:[41,0],lvl:3},
    "helm":{sprite:[34,0],lvl:2},
    "scroll":{sprite:[33,15],lvl:1}
}
export const npcs = {
    "ogre": {sprite:[24,3],lvl:3}, 
    "ghost": {sprite:[26,6],lvl:3}, 
    "demon": {sprite:[27,2],lvl:1},
    "wizard": {sprite:[24,1],lvl:1},
    "warlock": {sprite:[31,1],lvl:2},
    "spider": {sprite:[28,5],lvl:4},
    "kraken": {sprite:[25,8],lvl:1},
    "bat": {sprite:[26,8],lvl:4},
    "dwarf":{sprite:[26,9],lvl:2},
    "troll":{sprite:[25,9],lvl:2},
    "dragon":{sprite:[29,8],lvl:1},
    "rat":{sprite:[31,8],lvl:4},
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
        "tree1": [0,1],"tree2": [1,1],"tree3": [2,1],"tree4": [3,1],"tree5":[4,1],
        "rocks":[5,2],
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

