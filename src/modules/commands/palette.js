import { isCreative } from '../../utils/generic'
import { getHouseData, inHousing } from '../../utils/housing'
import { getItemFromNBT, giveItem } from '../../utils/item'

const Items = {
    "teleportpad":  getItemFromNBT(`{id:"minecraft:end_portal_frame",Count:64b,tag:{secretScramble:4573654,overrideMeta:1b,display:{Lore:[0:"§7Place this block in your house",1:"§7to place a Teleport Pad!§7§r§7"],Name:"§aTeleport Pad"},AttributeModifiers:[]},Damage:0s}`),
    "launchpad":    getItemFromNBT(`{id:"minecraft:slime",Count:64b,tag:{secretScramble:4573654,overrideMeta:1b,display:{Lore:[0:"§7Place this block in your house",1:"§7to place a Launch Pad!§7§r§7"],Name:"§aLaunch Pad"},AttributeModifiers:[]},Damage:0s}`),
    "parkourblock": getItemFromNBT(`{id:"minecraft:light_weighted_pressure_plate",Count:64b,tag:{secretScramble:4573654,display:{Lore:[0:"§7Place this block in your house",1:"§7to add a checkpoint to your",2:"§7parkour!§7§r§7"],Name:"§aParkour Block"}},Damage:0s}`),
    "actionpad":    getItemFromNBT(`{id:"minecraft:heavy_weighted_pressure_plate",Count:64b,tag:{secretScramble:4573654,display:{Lore:[0:"§7Place this block in your house",1:"§7to place an Action Pad!§7§r§7"],Name:"§aAction Pad"}},Damage:0s}`),
    "hologram":     getItemFromNBT(`{id:"minecraft:name_tag",Count:64b,tag:{secretScramble:4573654,display:{Lore:[0:"§7Place this in your house to",1:"§7place a Hologram!§7§r§7"],Name:"§aHologram"}},Damage:0s}`),
    "npc":          getItemFromNBT(`{id:"minecraft:skull",Count:64b,tag:{secretScramble:4573654,display:{Lore:[0:"§7Place this in your house to",1:"§7place an NPC!§7§r§7"],Name:"§aNPC"}},Damage:3s}`),
    "actionbutton": getItemFromNBT(`{id:"minecraft:stone_button",Count:64b,tag:{secretScramble:4573654,display:{Lore:[0:"§7Place this block in your house",1:"§7to place an Action Button!§7§r§7"],Name:"§aAction Button"}},Damage:0s}`),
}

const PaletteMessage = new Message([
    new TextComponent('&eItem Palette (click to spawn!)\n'),
        new TextComponent(`&6-&6 Teleport Pad\n`).setClick('run_command', '/palette teleportpad').setHover('show_text','&7Give Teleport Pad'),
        new TextComponent(`&6-&6 Launch Pad\n`).setClick('run_command', '/palette launchpad').setHover('show_text','&7Give Launch Pad'),
        new TextComponent(`&6-&6 Parkour Block\n`).setClick('run_command', '/palette parkourblock').setHover('show_text','&7Give Parkour Block'),
        new TextComponent(`&6-&6 Action Pad\n`).setClick('run_command', '/palette actionpad').setHover('show_text','&7Give Action Pad'),
        new TextComponent(`&6-&6 Hologram\n`).setClick('run_command', '/palette hologram').setHover('show_text','&7Give Hologram'),
        new TextComponent(`&6-&6 NPC\n`).setClick('run_command', '/palette npc').setHover('show_text','&7Give NPC'),
        new TextComponent(`&6-&6 Action Button`).setClick('run_command', '/palette actionbutton').setHover('show_text','&7Give Action Button'),
])

module.exports = {
    name: '/palette',
    description: 'Opens a list of items obtained thru the menu for houses that disable it',
    subcategory: 'Commands',

    options: [
        // {
        //     type: "checkbox",
        //     id: "scramble",
        //     name: "Scramble NBT",
        //     description: "Adds junk data to the items to make them harder to detect by item blacklists"
        // }
    ],

    registers: [
        {
            name: 'command',
            run(config, itemName) {
                if (Items[itemName]) {
                    if (!isCreative()) return ChatLib.chat('&cYou must be in Creative Mode to use this!')

                    ChatLib.chat('&aYour item has been spawned in!')

                    giveItem(Items[itemName])
                } else return ChatLib.chat(PaletteMessage)
            }, create(trigger) trigger.setName('palette') 
        },
    ]
}