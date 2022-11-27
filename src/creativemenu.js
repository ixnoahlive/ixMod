import Settings from '../resources/config'
import CreativeTab from 'CreativeTabs'
import U from '../resources/util'

const items = [
    U.getItemFromNBT(`{id:"minecraft:end_portal_frame",Count:1b,tag:{overrideMeta:1b,display:{Lore:[0:"§7Place this block in your house",1:"§7to place a Teleport Pad!"],Name:"§aTeleport Pad"},AttributeModifiers:[]},Damage:0s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:slime",Count:1b,tag:{display:{Lore:[0:"§7Place this block in your house",1:"§7to place a Launch Pad!"],Name:"§aLaunch Pad"}},Damage:0s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:light_weighted_pressure_plate",Count:1b,tag:{display:{Lore:[0:"§7Place this block in your house",1:"§7to add a checkpoint to your",2:"§7parkour!"],Name:"§aParkour Block"}},Damage:0s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:heavy_weighted_pressure_plate",Count:1b,tag:{display:{Lore:[0:"§7Place this block in your house",1:"§7to place an Action Pad!"],Name:"§aAction Pad"}},Damage:0s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:name_tag",Count:1b,tag:{display:{Lore:[0:"§7Place this in your house to",1:"§7place a Hologram!"],Name:"§aHologram"}},Damage:0s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:skull",Count:1b,tag:{display:{Lore:[0:"§7Place this in your house to",1:"§7place an NPC!"],Name:"§aNPC"}},Damage:3s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stone_button",Count:1b,tag:{overrideMeta:1b,display:{Lore:[0:"§7Place this block in your house",1:"§7to place an Action Button!"],Name:"§aAction Button"},AttributeModifiers:[]},Damage:0s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:book",Count:1b,tag:{display:{Lore:[0:"§7Place this in your house to",1:"§7place a Stat Leaderboard!"],Name:"§aStat Leaderboard"}},Damage:0s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:book",Count:1b,tag:{display:{Lore:[0:"§7Place this in your house to",1:"§7place a Parkour Leaderboard!"],Name:"§aParkour Leaderboard"}},Damage:0s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:cauldron",Count:1b,tag:{display:{Lore:[0:"§7Place this item in your house to",1:"§7place a Trash Can!"],Name:"§aTrash Can"},ExtraAttributes:{ITEM_ID:"TRASH_CAN"}},Damage:0s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"c5acc312-e1b6-2b02-853c-2d6558fd4ae3",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjRiZDlkZDEyOGM5NGMxMGM5NDVlYWRhYTM0MmZjNmQ5NzY1ZjM3YjNkZjJlMzhmN2IwNTZkYzdjOTI3ZWQifX19"}]}},display:{Lore:[0:"§7Place this block in your house",1:"§7to add a mailbox!"],Name:"§aMailbox"}},Damage:3s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"ba49a254-ebef-27fd-9a5c-8dfd7e074241",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMzY4NWEwYmU3NDNlOTA2N2RlOTVjZDhjNmQxYmEyMWFiMjFkMzczNzFiM2Q1OTcyMTFiYjc1ZTQzMjc5In19fQ=="}]}},display:{Lore:[0:"§7When people right click this head they",1:"§7will be notified of your Twitter username!",2:"",3:"§c§lCan only be placed once!",4:"",5:"§6Alias: §7§7/social twitter username <Username>"],Name:"§bTwitter"}},Damage:3s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"c207393b-dfe0-233a-8341-c76281912942",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjQzNTNmZDBmODYzMTQzNTM4NzY1ODYwNzViOWJkZjBjNDg0YWFiMDMzMWI4NzJkZjExYmQ1NjRmY2IwMjllZCJ9fX0="}]}},display:{Lore:[0:"§7When people right click this head they",1:"§7will be notified of your YouTube clean!",2:"",3:"§c§lCan only be placed once!",4:"",5:"§6Aliases:",6:"§7§7/social youtube clean <Clean>",7:"§7§7/social youtube channel <Channel>"],Name:"§cYouTube"}},Damage:3s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"d92016e3-85bd-236c-985a-74413227362b",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjViM2YyY2ZhMDczOWM0ZTgyODMxNmYzOWY5MGIwNWJjMWY0ZWQyN2IxZTM1ODg4NTExZjU1OGQ0Njc1In19fQ=="}]}},display:{Lore:[0:"§7When people right click this head they",1:"§7will be notified of your Instagram username!",2:"",3:"§c§lCan only be placed once!",4:"",5:"§6Alias: §7§7/social instagram username <Username>"],Name:"§7Instagram"}},Damage:3s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"b45ce565-c84b-2534-87ea-1268d148479e",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNDZiZTY1ZjQ0Y2QyMTAxNGM4Y2RkZDAxNThiZjc1MjI3YWRjYjFmZDE3OWY0YzFhY2QxNThjODg4NzFhMTNmIn19fQ=="}]}},display:{Lore:[0:"§7When people right click this head they",1:"§7will be notified of your Twitch channel!",2:"",3:"§c§lCan only be placed once!",4:"",5:"§6Alias: §7§7/social twitch channel <Channel>"],Name:"§5Twitch"}},Damage:3s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"0abf10ce-5c02-251f-a6e7-6a89e8380e63",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNzg3M2MxMmJmZmI1MjUxYTBiODhkNWFlNzVjNzI0N2NiMzlhNzVmZjFhODFjYmU0YzhhMzliMzExZGRlZGEifX19"}]}},display:{Lore:[0:"§7When people right click this head they",1:"§7will be notified of your Discord server!",2:"",3:"§c§lCan only be placed once!",4:"",5:"§6Aliases:",6:"§7§7/social discord server <Server>",7:"§7§7/social discord username <Username>"],Name:"§5Discord"}},Damage:3s}`).getItemStack(),
    U.getItemFromNBT('{id:"minecraft:cookie",Count:1b,tag:{overrideMeta:1b,HideFlags:254,display:{Lore:[0:"§7Right Click to give the owner of ",1:"§7this house a pack of §bBasic§b Cookies§7.",2:"",3:"§7Cookies are used as a rating system,",4:"§7Other players can sort homes based on them!",5:"§7Cookies are reset every week!",6:"",7:"§7A pack of §bBasic§b Cookies§7 contains §bsome§7 cookies."],Name:"§bBasic Cookies§7 (Right Click)"},ExtraAttributes:{COOKIE_ITEM:1b},AttributeModifiers:[]},Damage:0s}').getItemStack(),
]
const states = [
    U.getItemFromNBT('{id:"minecraft:log",Count:1b,tag:{display:{Lore:[0:"§7Data Value: 12",1:"§7§1",2:"§7Place this block in your house",3:"§7to place a 6-Side Oak Log!"],Name:"§a6-Side Oak Log"}},Damage:0s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:log",Count:1b,tag:{display:{Lore:[0:"§7Data Value: 13",1:"§7§1",2:"§7Place this block in your house",3:"§7to place a 6-Side Spruce Log!"],Name:"§a6-Side Spruce Log"}},Damage:1s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:log",Count:1b,tag:{display:{Lore:[0:"§7Data Value: 14",1:"§7§1",2:"§7Place this block in your house",3:"§7to place a 6-Side Birch Log!"],Name:"§a6-Side Birch Log"}},Damage:2s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:log",Count:1b,tag:{display:{Lore:[0:"§7Data Value: 15",1:"§7§1",2:"§7Place this block in your house",3:"§7to place a 6-Side Jungle Log!"],Name:"§a6-Side Jungle Log"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:log2",Count:1b,tag:{display:{Lore:[0:"§7Data Value: 12",1:"§7§1",2:"§7Place this block in your house",3:"§7to place a 6-Side Acacia Log!"],Name:"§a6-Side Acacia Log"}},Damage:0s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:log2",Count:1b,tag:{display:{Lore:[0:"§7Data Value: 13",1:"§7§1",2:"§7Place this block in your house",3:"§7to place a 6-Side Dark Oak Log!"],Name:"§a6-Side Dark Oak Log"}},Damage:1s}').getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:barrier",Count:1b,tag:{display:{Lore:[0:"§7Place this in your house as",1:"§7an invisible block!"],Name:"§aBarrier"}}}`).getItemStack(),
]
//new Item("").setName("§a")
if (Settings.gui_creativeTabs) {
    const itemstab = CreativeTab.createTab('ixmod_housing');
    itemstab.setTitle('Housing Items')
    itemstab.setIcon(new Item("emerald").getItemStack())
    itemstab.setItems(items)

    const statetab = CreativeTab.createTab('ixmod_states');
    statetab.setTitle('Special Blocks')
    statetab.setIcon(new Item('prismarine').getItemStack())
    statetab.setItems(states)
}