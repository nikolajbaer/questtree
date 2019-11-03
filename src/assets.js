import spritesheet from './colored_transparent.png';

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
        "dirt1": [1,0],"dirt2": [2,0],"dirt3":[3,0],
        "grass1": [5,0],"grass2": [6,0],"grass3": [7,0],
        "tree1": [0,1],"tree2": [1,1],"tree3": [2,1],"tree4": [3,1],
        "bones": [0,15],
        // Pickups
        "fleece": [16,22],"sword": [0,31], "shield": [6,25],
    }
}

