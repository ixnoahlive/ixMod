import Settings from '../../resources/config'
import U from '../../resources/util'

import CreativeTab from 'CreativeTabs'

function reloadSavedItems() {
    const SavedRaw = JSON.parse(FileLib.read('ixMod', 'resources/creative/items.json'))
        let SavedStacks = []
    SavedRaw.forEach((item) => {
        SavedStacks.push(U.getItemFromNBT(item).getItemStack())
    })

    const saved = CreativeTab.createTab('ixmod_saved')
    if (SavedStacks.length==0) {
        SavedStacks.push(new Item('paper').setName('Use /saveitem to add items!').getItemStack())
    }
    saved.setItems(SavedStacks)
}

if (Settings.cmd_saveitem) {
    register('command', () => {
        if (Player.getHeldItem()==null) return ChatLib.chat('&cYou have no held item!')
        U.appendFile('resources/creative/items.json', Player.getHeldItem().getRawNBT().toString())
        ChatLib.chat(`&aAdded &e"${Player.getHeldItem().getName()}&e" &ato your saved items!`)

        reloadSavedItems()
    }).setName('saveitem').setAliases(['isave'])

    register('command', () => {
        if (Player.getHeldItem()==null) return ChatLib.chat('&cYou have no held item!')
        U.popFile2('resources/creative/items.json', Player.getHeldItem().getRawNBT().toString())
        ChatLib.chat(`&cRemoved &e"${Player.getHeldItem().getName()}&e" &cfrom your saved items!`)

        reloadSavedItems()
    }).setName('removeitem').setAliases(['deleteitem','unsaveitem','idelete','iremove','iunsave'])
    
    register('command', () => {
        FileLib.write('ixMod', 'resources/creative/items.json', '[]')
        ChatLib.chat(`&aCleared all items!`)
        reloadSavedItems()
    }).setName('clearitems')
}
