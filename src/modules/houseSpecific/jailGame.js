const { timestamp } = require("../../utils/generic")
const { getHouseData } = require("../../utils/housing")

const GuiUtils = Java.type('net.minecraftforge.fml.client.config.GuiUtils')

let heistData = {
    jewelry: {
        lockdown: false,
        startAt: null
    },
    bank: {
        startAt: null
    }
}

let renderData = {
    shouldRender: false,
    jewelry: '&fJewelry: &7Unknown',
    bank:    '&fBank: &7Unknown'
}

module.exports = {
    name: 'Jail Game',
    description: 'Enables a special HUD when in Jail Game by oPancakes',
    category: 'House Specific',
    subcategory: 'oPancakes',

    options: [],

    registers: [
        {
            name: 'chat',
            run() {
                heistData.jewelry.startAt = Date.now()+177000
                heistData.jewelry.lockdown = false
            }, create(trigger) trigger.setCriteria("&r&7* &r&f&r&c&l - &r&fThe &r&bJewelry Store&r&f was robbed for &r&c${amount}g &r&7(it's now closed for 3m)&r")
        },
        {
            name: 'chat',
            run() {
                heistData.bank.startAt = Date.now()+237000
            }, create(trigger) trigger.setCriteria("&r&7* &r&f&r&c&l - &r&fThe &r&6bank&r&f was robbed for &r&c${amount}g&r&7 (it's now closed for 4m)&r")
        },
        {
            name: 'chat',
            run() {
                heistData.jewelry.lockdown = true
            }, create(trigger) trigger.setCriteria("&r&7* &r&f&r&c&l ! &r&fThe &r&bJewelry Store&r&f's&r&c alarm&r&f was triggered!&r")
        },


        {
            name: 'step',
            run() {
                const houseData = getHouseData()
                const isJailGame = (houseData && houseData.name.includes('jail game') && houseData.owner=="oPancakes")

                if (!houseData || !isJailGame) {
                    heistData = { jewelry: {lockdown: false, startAt: null}, bank: {startAt: null} }
                    renderData = { shouldRender: false, jewelry: '&fJewelry: &7Unknown', bank: '&fBank: &7Unknown' }
                    return
                } else {
                    renderData.shouldRender = true
                    
                    // Jewelry Store
                    if (heistData.jewelry.startAt) renderData.jewelry = `Jewelry: &e${timestamp(heistData.jewelry.startAt - Date.now())}`
                    if (heistData.jewelry.startAt && heistData.jewelry.startAt<Date.now()) renderData.jewelry = 'Jewelry: &aOpen'   
                    if (heistData.jewelry.lockdown) renderData.jewelry = 'Jewelry: &cLockdown'    

                    // Bank Heist
                    if (heistData.bank.startAt) renderData.bank = `Bank: &e${timestamp(heistData.bank.startAt - Date.now())}`
                    if (heistData.bank.startAt && heistData.bank.startAt<Date.now()) renderData.bank = 'Bank: &aOpen'      
                }
            }, create(trigger) trigger.setDelay(1)
        },

        {
            name: 'renderOverlay',
            run() {
                if (!renderData.shouldRender) return

                Renderer.drawString(renderData.jewelry, 7,7,  true)
                Renderer.drawString(renderData.bank,    7,22, true)
            }
        }
    ]
}