import { getHouseData, inHousing } from '../../utils/housing'
let HouseData;

module.exports = {
    name: '/rejoin',
    description: 'Adds a rejoin command to rejoin the current house',
    subcategory: 'Commands',

    options: [],

    registers: [
        {
            name: 'command',
            run() {
                if (!inHousing()) return ChatLib.chat('&cYou\'re not in a house!')
                HouseData = getHouseData()
                ChatLib.command('l housing')
            }, create(trigger) trigger.setName('rejoin').setAliases(['relog']) 
        },
        {
            name: 'worldLoad',
            run() {
                if (!HouseData) return

                ChatLib.command(`visit ${HouseData.owner} ${HouseData.name.removeFormatting()}`)
                HouseData = null
            }
        }
    ]
}