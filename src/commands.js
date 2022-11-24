import Settings from '../resources/config'
import U from '../resources/util'
import request from 'requestV2';

// Unicode Command setup
const UniObj = JSON.parse(FileLib.read('ixMod', 'resources/unicode.json'))
const UniTexts = []
Object.keys(UniObj).forEach(v => {UniTexts.push(new TextComponent(`&e&l${v}:&r ${UniObj[v]}`).setClick('run_command', `/chattriggers copy ${UniObj[v]}`).setHover('show_text', `&fClick to copy all symbols!`))})

register('command', () => Settings.openGUI()).setName('ixmod').setAliases(["ix","ixm"])
register('command', () => {FileLib.write('ixMod', 'housetracker/data.json', "[]", true);ChatLib.chat('&aResetted housetracker/data.json!')}).setName('resethousingtracker')

if (Settings.cmd_stats) register('command', () => {if (U.inHousing()) { ChatLib.command(`viewstats ${Player.getName()}`) }}).setName('mystats')
if (Settings.cmd_unicode) register('command', () => {ChatLib.chat(`&9&m${'-'.repeat(52)}`);UniTexts.forEach(txt => ChatLib.chat(txt));ChatLib.chat(`&9&m${'-'.repeat(52)}`)}).setName('unicode').setAliases(['uni']) 

// Ive been working on this hell all day put me out of my misery

if (Settings.cmd_bookmark) register('command', (player) => {
	if (player && player.startsWith('-r')) { // this is bullshit but it doesn't work otherwise
		let v = U.popFile('resources/bookmark.json', 'id', player.split(' ')[1])
		if (v==200) {
			ChatLib.chat('&cSuccessfully removed this bookmark!')
		} else {
			ChatLib.chat('&cSomething went wrong trying to perform this action!')
		}
		
		return;
	}
	if (player && player.match(/^[a-zA-Z0-9_]{2,16}$/mg)) {
		request(`https://api.mojang.com/users/profiles/minecraft/${player}`)
		.then((stuff) => {
			let v = U.appendFile('resources/bookmark.json', {name: JSON.parse(stuff).name, id: JSON.parse(stuff).id})
			if (v==400) return ChatLib.chat('&aThis house is already bookmarked!')
			if (v==200) return ChatLib.chat('&aSuccessfully bookmarked this house!')	
		})
	} else if (!player && U.inHousing(true)) {
		const Bookmarks = JSON.parse(FileLib.read('ixMod', 'resources/bookmark.json'))
		let BookmarkMsg = []
		ChatLib.chat(`&8&m${'-'.repeat(52)}`)
		Bookmarks.forEach(v => {
			let message = new Message()
			message.addTextComponent(new TextComponent('&c[X] ').setClick('run_command', `/bookmark -r ${v.id}`).setHover('show_text',`&cRemove bookmark "${v.name}"`))
			message.addTextComponent(new TextComponent(`&8|&7 ${v.name}`).setHover('show_text',`&aVisit bookmark "${v.name}"`).setClick('run_command', `/visit ${U.addStr(U.addStr(U.addStr(U.addStr(v.id, 8, '-'), 13, '-'), 18, '-'), 23, '-')}`))
			ChatLib.chat(message)
		})
		ChatLib.chat(`&8&m${'-'.repeat(52)}`)
	} else if (!player && U.inHousing(true)==false) {
		ChatLib.chat('&cYou need to be in Housing or a Housing lobby to use this command!')
	}
}).setName('bookmark')
register('command', () => {console.log(Player.getHeldItem().getRawNBT())}).setName('yoink')


if (Settings.cmd_unbreakable) {register('command', () => { if (Player.getHeldItem()) { 
	if (!U.isCreative()) return ChatLib.chat('&cYou need to be in Creative mode for this command!')
	U.setHeldItemTag('Unbreakable', 1)
}}).setCommandName('unbreakable')} 
