const { inHousing } = require("../../utils/housing")

let playerList = []

module.exports = {
    name: 'Crash Log',
    description: 'When a house crashes, generates a file containing all player names so you can pick out any suspects (Scans tablist, so works best at UNLIMITED visibility)',
    subcategory: 'Moderation',

    options: [],

    registers: [
        {
            name: 'chat',
            run(config) {
                ChatLib.chat(
                    new TextComponent('&cClick to open a list of affected players!')
                        .setHover('show_text','&7Click to list players')
                        .setClick('run_command', '/internal:logplayercache')
                )
            }, create(trigger) {trigger.setCriteria('&cAn exception occurred in your connection, so you were put in the Housing Lobby!&r')}
        },
        {
            name: 'step',
            run(config) {
                if (inHousing()) {
                    playerList = []
                    World.getAllPlayers().forEach(player => {
                        const ver = player.getUUID().version()

                        if ((ver==4 || ver==1) && player.getDisplayName().getText().trim()) {
                            playerList.push(player.getDisplayName())
                        }
                    })
                }
            }, create(trigger) {trigger.setDelay(1)}
        },
        {
            name: 'command',
            run(config) {
                ChatLib.chat('\n&aPlayer Log:')
                playerList.forEach(playerName => {
                    ChatLib.chat(`&7 &7- ${playerName.getText()}`)
                });
                ChatLib.chat('')
            }, create(trigger) {trigger.setName('internal:logplayercache')}
        }
    ]
}