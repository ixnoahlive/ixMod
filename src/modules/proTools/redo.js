const PacketClientChat = Java.type('net.minecraft.network.play.client.C01PacketChatMessage') 
const PROTOOLS_COMMANDS = ['cut','fill','paste','replace','set','walls','wireframe']

let CommandHistory     = [] // Highest index = earliest, index 0 = last command.
let CommandHistoryDate = [] // Highest index = earliest, index 0 = last command.

// for the above: i am aware i could make an object but this is more convenient imo 

let RedoInProgress = false // Prevent packetSent taking a redo command packet

let lastOperation = [];

module.exports = {
    name: '//redo',
    description: 'Adds a redo command. \n&cWarning: Breaks when pasting and when the selection is changed',
    subcategory: 'Pro Tools',

    options: [],

    registers: [
        {
            name: 'command',
            run(config, event) {
                ChatLib.chat(JSON.stringify(CommandHistory))
                ChatLib.chat(JSON.stringify(CommandHistoryDate))

                if (!CommandHistory[0]) return ChatLib.chat('&cNothing to redo.')
                if (CommandHistoryDate[0]>Date.now()) return ChatLib.chat(`&cYou must wait &e${Math.ceil((CommandHistoryDate[0]-Date.now())/1000)}s &cto do that!`)

                RedoInProgress = true

                ChatLib.command(CommandHistory[0])

                CommandHistory.shift()
                CommandHistoryDate.shift()
            }, create(trigger) trigger.setName('/redo').setAliases(['redo'])
        },
        {
            name: 'packetSent',
            run(config, packet, event) {
                let command = packet.func_149439_c().replace(/\//g, '').replace('hypixelcommand:','')
                let commandArgless = command.split(' ')[0]

                if (!PROTOOLS_COMMANDS.includes(commandArgless)) return

                lastOperation = [command,Date.now()+4000]

                if (!RedoInProgress) {
                    CommandHistory.unshift(command)
                    CommandHistoryDate.unshift(Date.now()+5000)
                }
                RedoInProgress = false
            }, create(trigger) trigger.setFilteredClass(PacketClientChat)
        },
        {
            name: 'chat',
            run() {
                CommandHistory.shift()
                CommandHistoryDate.shift()
            }, create(trigger) trigger.setCriteria('&r&cNothing to change!&r')
        },
        {
            name: 'chat',
            run() {
                CommandHistory.unshift(lastOperation[0])
                CommandHistoryDate.unshift(lastOperation[1])
            }, create(trigger) trigger.setCriteria('&r&aYour last operation has been undone.&r')
        }
    ]
}