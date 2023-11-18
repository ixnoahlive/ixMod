const { isCreative, hypixelLore } = require("../../utils/generic")

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
                
                Player.getHeldItem().setName( '&a' + args[0] )
                Player.getHeldItem().setLore( hypixelLore(args[1], args[2]?.split(';')) )
            }, create(trigger) trigger.setName('buildbutton')
        }
    ]
}