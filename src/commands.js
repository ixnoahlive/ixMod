import Settings from '../resources/config'
import U from '../resources/util'

// Unicode Command setup
const UniObj = JSON.parse(FileLib.read('ixMod', 'resources/unicode.json'))
const UniTexts = []
Object.keys(UniObj).forEach(v => {UniTexts.push(new TextComponent(`&e&l${v}:&r ${UniObj[v]}`).setClick('run_command', `chattriggers copy ${UniObj[v]}`).setHover('show_text', `&fClick to copy all symbols!`))})

register('command', () => Settings.openGUI()).setName('ixmod').setAliases(["ix","ixm"])
register('command', () => {FileLib.write('ixMod', 'housetracker/data.json', "[]", true);ChatLib.chat('&aResetted housetracker/data.json!')}).setName('resethousingtracker')
if (Settings.cmd_unicode) register('command', () => {ChatLib.chat(`&9&m${'-'.repeat(52)}`);UniTexts.forEach(txt => ChatLib.chat(txt));ChatLib.chat(`&9&m${'-'.repeat(52)}`)}).setName('unicode').setAliases(['uni'])

if (Settings.cmd_unbreakable) {register('command', () => { if (Player.getHeldItem()) {
	if (!U.isCreative()) return ChatLib.chat('&cYou need to be in Creative mode for this command!')
	U.setHeldItemTag('Unbreakable', 1)
}}).setCommandName('unbreakable')}