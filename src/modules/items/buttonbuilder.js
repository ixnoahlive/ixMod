const { isCreative, hypixelLore } = require("../../utils/generic")
const { setItemName, setItemLore, giveItem, nbtToItem } = require("../../utils/item")

module.exports = {
    name: 'Button Builder',
    description: 'Adds the /buildbutton command\nSyntax: /buildbutton <title> | <description> &8| <label1?>;<label2...',
    subcategory: 'Commands',

    options: [],

    registers: [
        {
            name: 'command',
            run(config, ...args) {
                args = args.join(' ').split(' | ')

                if (!isCreative()) return ChatLib.chat('&cYou must be in Creative Mode to use this!')
                if (!Player.getHeldItem()) return ChatLib.chat('&cYou must hold an item to use this!')
                if (!args[0]) return ChatLib.chat('&cUsage: /buildbutton &n<title>&c | <description> | <label1?>;<label2...')
                if (!args[1]) return ChatLib.chat('&cUsage: /buildbutton <title> | &n<description>&c | <label1?>;<label2...')

                let heldItemNBT = Player.getHeldItem().getNBT().toObject()
                
                heldItemNBT = setItemName( heldItemNBT, '§a'+args[0] )
                heldItemNBT = setItemLore( heldItemNBT, hypixelLore(args[1], args[2].split(';')) )

                giveItem(nbtToItem(heldItemNBT))
            }, create(trigger) trigger.setName('buildbutton')
        }
    ]
}