import Settings from '../resources/config'
import CreativeTab from 'CreativeTabs'
import U from '../resources/util'

const HeadsRaw = JSON.parse(FileLib.read('ixMod', 'resources/heads.json')) // Apparently VSCode doesn't like it when i put a 10km wide variable in my file
let HeadsStacks = []
HeadsRaw.forEach((head) => {
    HeadsStacks.push(U.getItemFromNBT(head).getItemStack())
})

const Heads2Raw = JSON.parse(FileLib.read('ixMod', 'resources/heads2.json'))
let Heads2Stacks = []
Heads2Raw.forEach((head) => {
    Heads2Stacks.push(U.getItemFromNBT(head).getItemStack())
})

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
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"ba49a254-ebef-27fd-9a5c-8dfd7e074241",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMzY4NWEwYmU3NDNlOTA2N2RlOTVjZDhjNmQxYmEyMWFiMjFkMzczNzFiM2Q1OTcyMTFiYjc1ZTQzMjc5In19fQ=="}]}},display:{Lore:[0:"§7When people right click this head they",1:"§7will be notified of your Twitter username!",2:"",3:"§c§lCan only be placed once!",4:"",5:"§6Alias: §7§7/social twitter username <Username>"],Name:"§bTwitter"}},Damage:3s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"c207393b-dfe0-233a-8341-c76281912942",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjQzNTNmZDBmODYzMTQzNTM4NzY1ODYwNzViOWJkZjBjNDg0YWFiMDMzMWI4NzJkZjExYmQ1NjRmY2IwMjllZCJ9fX0="}]}},display:{Lore:[0:"§7When people right click this head they",1:"§7will be notified of your YouTube clean!",2:"",3:"§c§lCan only be placed once!",4:"",5:"§6Aliases:",6:"§7§7/social youtube clean <Clean>",7:"§7§7/social youtube channel <Channel>"],Name:"§cYouTube"}},Damage:3s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"d92016e3-85bd-236c-985a-74413227362b",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjViM2YyY2ZhMDczOWM0ZTgyODMxNmYzOWY5MGIwNWJjMWY0ZWQyN2IxZTM1ODg4NTExZjU1OGQ0Njc1In19fQ=="}]}},display:{Lore:[0:"§7When people right click this head they",1:"§7will be notified of your Instagram username!",2:"",3:"§c§lCan only be placed once!",4:"",5:"§6Alias: §7§7/social instagram username <Username>"],Name:"§7Instagram"}},Damage:3s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"b45ce565-c84b-2534-87ea-1268d148479e",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNDZiZTY1ZjQ0Y2QyMTAxNGM4Y2RkZDAxNThiZjc1MjI3YWRjYjFmZDE3OWY0YzFhY2QxNThjODg4NzFhMTNmIn19fQ=="}]}},display:{Lore:[0:"§7When people right click this head they",1:"§7will be notified of your Twitch channel!",2:"",3:"§c§lCan only be placed once!",4:"",5:"§6Alias: §7§7/social twitch channel <Channel>"],Name:"§5Twitch"}},Damage:3s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"0abf10ce-5c02-251f-a6e7-6a89e8380e63",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNzg3M2MxMmJmZmI1MjUxYTBiODhkNWFlNzVjNzI0N2NiMzlhNzVmZjFhODFjYmU0YzhhMzliMzExZGRlZGEifX19"}]}},display:{Lore:[0:"§7When people right click this head they",1:"§7will be notified of your Discord server!",2:"",3:"§c§lCan only be placed once!",4:"",5:"§6Aliases:",6:"§7§7/social discord server <Server>",7:"§7§7/social discord username <Username>"],Name:"§5Discord"}},Damage:3s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT('{id:"minecraft:cookie",Count:1b,tag:{overrideMeta:1b,HideFlags:254,display:{Lore:[0:"§7Right Click to give the owner of ",1:"§7this house a pack of §bBasic§b Cookies§7.",2:"",3:"§7Cookies are used as a rating system,",4:"§7Other players can sort homes based on them!",5:"§7Cookies are reset every week!"],Name:"§bBasic Cookies§7 (Right Click)"},ExtraAttributes:{COOKIE_ITEM:1b},AttributeModifiers:[]},Damage:0s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:log",Count:1b,tag:{display:{Lore:[0:"§7Data Value: 12",1:"§7§1",2:"§7Place this block in your house",3:"§7to place a 6-Side Oak Log!"],Name:"§a6-Side Oak Log"}},Damage:0s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:log",Count:1b,tag:{display:{Lore:[0:"§7Data Value: 13",1:"§7§1",2:"§7Place this block in your house",3:"§7to place a 6-Side Spruce Log!"],Name:"§a6-Side Spruce Log"}},Damage:1s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:log",Count:1b,tag:{display:{Lore:[0:"§7Data Value: 14",1:"§7§1",2:"§7Place this block in your house",3:"§7to place a 6-Side Birch Log!"],Name:"§a6-Side Birch Log"}},Damage:2s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:log",Count:1b,tag:{display:{Lore:[0:"§7Data Value: 15",1:"§7§1",2:"§7Place this block in your house",3:"§7to place a 6-Side Jungle Log!"],Name:"§a6-Side Jungle Log"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:log2",Count:1b,tag:{display:{Lore:[0:"§7Data Value: 12",1:"§7§1",2:"§7Place this block in your house",3:"§7to place a 6-Side Acacia Log!"],Name:"§a6-Side Acacia Log"}},Damage:0s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:log2",Count:1b,tag:{display:{Lore:[0:"§7Data Value: 13",1:"§7§1",2:"§7Place this block in your house",3:"§7to place a 6-Side Dark Oak Log!"],Name:"§a6-Side Dark Oak Log"}},Damage:1s}').getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:barrier",Count:1b,tag:{display:{Lore:[0:"§7Place this in your house as",1:"§7an invisible block!"],Name:"§aBarrier"}}}`).getItemStack(),
    new Item("minecraft:dragon_egg").getItemStack()
]
const exclusive = [
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"be6e30b6-4633-4ff5-8e2d-96121c776257",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMTNjZmJmMmJkZmQ0ODUxNGJmYmFjZTk1MThjNzY2NDExMmRmMmMxNzNlOGM3YWQ5MmIzZTY1NjIxYTllZDZlMCJ9fX0="}]}},display:{Lore:[0:"§7Found in §aHoliday Mystery Boxes§7!"],Name:"§6Green Present"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"864ef5ae-e746-4bfb-8053-52ae07944b0e",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjNiYTdiYzhlM2MwOTNiZDQ4YzFmNzdiZjQ4ZTM1YmZhMGVhYzlhYjQ4ZDBhZDEzZWJkOWUzYzIyZjcxYWZhIn19fQ=="}]}},display:{Lore:[0:"§7Found in §aHoliday Mystery Boxes§7!"],Name:"§6Blue Present"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"e724c865-6db1-4fea-96c0-27101ad19a31",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZmY2ODQ5NzE5NzVmMjA5ZTY4NjEzM2Y2ZjNjZTNkYWFiM2YyYmZjZmE0Yzc4N2I3MDMyNzNjYmI4NGFhZWEifX19"}]}},display:{Lore:[0:"§7Found in §aHoliday Mystery Boxes§7!"],Name:"§6Red Ornament"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"c52c0f21-7230-49de-aebd-632baa670866",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYTRlODk1ZjY5ZDYzNTgzYWQ1ODAyNDVkNDIzODhiZGRjODk1MjZhODk0NjFjNzliZmU5NzA5ZDE2ODJhNDAifX19"}]}},display:{Lore:[0:"§7Found in §aHoliday Mystery Boxes§7!"],Name:"§6Yellow Ornament"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"4a70f176-c4d2-4e0a-a8ee-05a29fa59751",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvN2JiZThmZDFhYTM5ZjE1MDc2ZTg4NGRmZTZkZGI5YTNmMzc2MWRiMzFlMmIxZjk5NDBiNWRmZDM0ZDFjNGQifX19"}]}},display:{Lore:[0:"§7Found in §aHoliday Mystery Boxes§7!"],Name:"§6Holiday Toy"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT(`{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:"§1"}},Damage:8s}`).getItemStack(),
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"ce9eadab-4814-4cf9-a7fc-193d50f9e941",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNWE1YWIwNWVhMjU0YzMyZTNjNDhmM2ZkY2Y5ZmQ5ZDc3ZDNjYmEwNGU2YjVlYzJlNjhiM2NiZGNmYWMzZmQifX19"}]}},display:{Lore:[0:"§7Found in §eSummer Mystery Boxes§7!"],Name:"§6Beach Ball"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"3aea8905-90a5-464d-bbce-3747185ee7d1",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZjk2NmFmMzc2MGUyODMzOGMwNjU3ZjlmMzhjYzU4ZDhjY2ZhM2VlYTM2NDg2M2Q4N2JlOTljODc2ZDVmMzMwIn19fQ=="}]}},display:{Lore:[0:"§7Found in §eSummer Mystery Boxes§7!"],Name:"§6Red Cooler"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"967f9ab3-ba3c-4bc4-9857-ecc7e6104bba",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMzE4ZTM1ZWM0YjRiNGMxNTkxYzUxNzczODZkZTE4Nzk3NDU0Mjk4Yjc0NTU5ODJlM2FlODNiYWNjZWQwZjFhMiJ9fX0="}]}},display:{Lore:[0:"§7Found in §eSummer Mystery Boxes§7!"],Name:"§6Portable Grill"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"9b3538dc-aa2a-4e71-91e1-49027c8cf5f5",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOTUzNjZjYTE3OTc0ODkyZTRmZDRjN2I5YjE4ZmViMTFmMDViYTJlYzQ3YWE1MDM1YzgxYTk1MzNiMjgifX19`"}]}},display:{Lore:[0:"§7Found in §eSummer Mystery Boxes§7!"],Name:"§6Ice Cream"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"8d000e2f-7dd2-4c76-a3ea-956bf314bf8a",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvM2I3N2Q5ZWM0MmNlNmRjMzk0MTQ1MDI1ZDhiYWVkZjRmZjk1ODIwMjZiMzZhZGY3NGM0YzZhZDljYzM5MCJ9fX0="}]}},display:{Lore:[0:"§7Found in §eSummer Mystery Boxes§7!"],Name:"§6Frozen Yogurt"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"2a9c988d-ba0e-45c8-8028-7dde0728a948",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMDZiZTAyZGU5ZjYxYTJjYzdjNTJhNzNjZmFkYzgxMGI1ZTQ1NTVhMmU4NzZkNTY5YTU0NjkxYTIyNmMzYiJ9fX0="}]}},display:{Lore:[0:"§7Found in §eSummer Mystery Boxes§7!"],Name:"§6Chocolate Mint Scoop"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"c6d46460-05bb-4ea4-bc8a-f512073f9ab9",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjhhMzRkODZhN2JiMTNkNDVhZmRjNTBkM2RjZTVlZWQ5NWUxODQ0ZmJkZWUwY2NhNzUzYzZkMzM0NmUzMzllIn19fQ=="}]}},display:{Lore:[0:"§7Found in §eSummer Mystery Boxes§7!"],Name:"§6Soda Can"}},Damage:3s}').getItemStack(),
    U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"df5fdb07-5b85-4735-b476-8ba687376d3f",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0aW1lc3RhbXAiOjE0NjQzNjk5Mzg3NjksInByb2ZpbGVJZCI6ImI0MDA3MmM4Y2RmOTQ1OGFhZmM0NDZmNWU1N2U2ZjcwIiwicHJvZmlsZU5hbWUiOiJTaGVyb20iLCJzaWduYXR1cmVSZXF1aXJlZCI6dHJ1ZSwidGV4dHVyZXMiOnsiU0tJTiI6eyJ1cmwiOiJodHRwOi8vdGV4dHVyZXMubWluZWNyYWZ0Lm5ldC90ZXh0dXJlLzM0MzVmNDIyODQxNmQyYzZlMzU1N2Y5MWUzZjY5MGQ1OGQyM2I0NDFmZjlmOWY0OGU3ODllYmIzNWIxIn19fQ=="}]}},display:{Lore:[0:"§7Found in §eSummer Mystery Boxes§7!"],Name:"§6Sand Bucket"}},Damage:3s}').getItemStack()
]

//new Item("").setName("§a")
if (Settings.gui_creativeTabs) {
    const itemstab = CreativeTab.createTab('ixmod_housing');
    itemstab.setTitle('Housing Items')
    itemstab.setIcon(new Item("emerald").getItemStack())
    itemstab.setItems(items)

    const headtab = CreativeTab.createTab('ixmod_heads');
    headtab.setTitle('Skull Packs')
    headtab.setIcon(U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"9eab7ce2-ad41-48c2-a1a8-98e64d07d374",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMzEzMzg0YTI5M2NmYmJhMzQ4OWI0ODNlYmMxZGU3NTg0Y2EyNzI2ZDdmNWMzYTYyMDUxMzQ3NDkyNWU4N2I5NyJ9fX0="}]}},display:{Lore:[0:"§7§7Browse Skull Packs you have",1:"§7unlocked.",2:"",3:"§eClick to browse!"],Name:"§aSkull Packs"}},Damage:3s}').getItemStack())
    headtab.setItems(HeadsStacks)
    headtab.setSearchBar(true)

    const exclusivetab = CreativeTab.createTab('ixmod_exclusive')
    exclusivetab.setTitle('Seasonal')
    exclusivetab.setItems(exclusive)
    exclusivetab.setIcon(U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"864ef5ae-e746-4bfb-8053-52ae07944b0e",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjNiYTdiYzhlM2MwOTNiZDQ4YzFmNzdiZjQ4ZTM1YmZhMGVhYzlhYjQ4ZDBhZDEzZWJkOWUzYzIyZjcxYWZhIn19fQ=="}]}},display:{Lore:[0:"§7Found in §aHoliday Mystery Boxes§7!"],Name:"§6Blue Present"}},Damage:3s}').getItemStack())

    const headtab2 = CreativeTab.createTab('ixmod_heads2');
    headtab2.setTitle('Rewards')
    headtab2.setItems(Heads2Stacks)
    headtab2.setIcon(U.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{overrideMeta:1b,SkullOwner:{Id:"5cfa4ce0-e1ee-25e8-934f-a59ad85dd508",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvN2NkM2Q5OWFkMmVlNjNmYmU5ZjEzZGIzYWM2NDdiMjI4NWIyMTdhYjJkZGMzMWY2NGNhYjQ1ZmJiZjdhNCJ9fX0="}]}},display:{Lore:[0:"§7Browse rewards you have unlocked.",1:"§eRewards: §a18/18 §8(100%)",2:"",3:"§eClick to browse!"],Name:"§aRewards"},AttributeModifiers:[]},Damage:3s}').getItemStack())
}