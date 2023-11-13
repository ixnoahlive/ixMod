const EssentalAPI = Java.type('gg.essential.api.EssentialAPI')
const Notifications = EssentalAPI.getNotifications()

const ToolDataset = {
    'Filled the selected region with':                     { command: '/fill',      name: 'Fill'      },
    'Set selected region with':                            { command: '/set',       name: 'Set'       },
    'Wireframed the selected region with':                 { command: '/wireframe', name: 'Wireframe' },
    'Walled the selected region with':                     { command: '/walls',     name: 'Walls'     },
    'Copied selected region to the clipboard':             { command: '/copy',      name: 'Copy'      },
    'Successfully pasted region':                          { command: '/paste',     name: 'Paste'     },
    'Cut selected region. Use the Paste Tool to paste it': { command: '/cut',       name: 'Cut'       },
    'Replaced the selected region with':                   { command: '/replace',   name: 'Replace'   },
    'Your last operation has been undone':                 { command: '/undo',      name: 'Undo'      },
    'Nothing to change':                                   { command: '',          name: 'Pro Tools' },
}

module.exports = {
    name: 'Cooldown Ping',
    description: 'Sends a little notification when your Pro Tools cooldown is up',
    subcategory: 'Pro Tools',

    options: [
        {
            type: "checkbox",
            id: 'useEssential',

            name: 'Essential Notifications',
            description: 'Whether or not to use the Essential Notification system or the ingame chat'
        },
        {
            type: "checkbox",
            id: 'quiet',

            name: 'Quiet Mode',
            description: 'Disables the ping sound when your cooldown is up'
        }
    ],

    registers: [
        {
            name: 'chat',
            run(config, message, event) {
                const ToolData = ToolDataset[message]

                if (!ToolData) ChatLib.chat('&cUhoh! This shouldn\'t happen! (RegEx Failure)')
                
                setTimeout(() => {
                    if (!config.options.notify.quiet) {
                        World.playSound('note.hat', 0.5, 1)
                    }

                    if (config.options.notify.useEssential) {
                        // Fucking miserable
                        Notifications.push('Pro Tools', `${ToolData.name} is off cooldown!`, 2, () => Client.setCurrentChatMessage(ToolData.command), () => {})
                    } else {
                        ChatLib.chat(new Message(
                            new TextComponent(`&a${ToolData.name} &7is off cooldown!`)
                            .setClick('suggest_command', ToolData.command || '')
                            .setHover('show_text',       '&aClick to copy!')
                        ).setChatLineId(9901))
                    }
                }, 4000);

            }, create(trigger) {trigger.setCriteria(/(?:(Filled the selected region with|Set selected region with|Wireframed the selected region with|Walled the selected region with|Copied selected region to the clipboard|Successfully pasted region|Cut selected region\. Use the Paste Tool to paste it|Replaced the selected region with|Nothing to change|Your last operation has been undone)(?:.*))/)}
        },
    ]
}