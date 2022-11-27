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
if (Settings.cmd_unbreakable) {register('command', () => { if (Player.getHeldItem()) { 
	if (!U.isCreative()) return ChatLib.chat('&cYou need to be in Creative mode for this command!')
	U.setHeldItemTag('Unbreakable', 1)
}}).setCommandName('unbreakable')} 
if (Settings.misc_dev) register('command', () => {console.log(Player.getHeldItem().getRawNBT())}).setName('yoink')


// Ive been working on this hell all day put me out of my misery
if (Settings.cmd_bookmark) register('command', (player, target) => {
	if (player && player.startsWith('-r')) { // this is bullshit but it doesn't work otherwise
		let v = U.popFile('resources/bookmark.json', 'id', target)
		if (v==200) {ChatLib.chat('&cSuccessfully removed this bookmark!')} else {ChatLib.chat('&cSomething went wrong trying to perform this action!')}
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
		if (Bookmarks.length<1) return ChatLib.chat('&cYou have no bookmarks! Type /bookmark <player> to bookmark a house!')
		ChatLib.chat(`&9&m${'-'.repeat(32)}`)
		ChatLib.chat('&6            &6  Your Bookmarks')
		Bookmarks.forEach(v => {
			let message = new Message()
			message.addTextComponent(new TextComponent('&c[X] ').setClick('run_command', `/bookmark -r ${v.id}`).setHover('show_text',`&cRemove bookmark "${v.name}"`))
			message.addTextComponent(new TextComponent(`&8|&e ${v.name}`).setHover('show_text',`&aVisit bookmark "${v.name}"`).setClick('run_command', `/visit ${U.addStr(U.addStr(U.addStr(U.addStr(v.id, 8, '-'), 13, '-'), 18, '-'), 23, '-')}`))
			ChatLib.chat(message)
		})
		ChatLib.chat(`&9&m${'-'.repeat(32)}`)
	} else if (!player && U.inHousing(true)==false) {
		ChatLib.chat('&cYou need to be in Housing or a Housing lobby to use this command!')
	}
}).setName('bookmark').setAliases('bm','book','bookmarks')

/* This feature needs some polish, will be available in 1.4 mostlikely.
if (Settings.cmd_ptoverride) {
	register('command', (...args) => {
		if (!args) return
		args.forEach(v => {
			v.replace('white_stained_glass','95')
			.replace('orange_stained_glass','95:1')
			.replace('magenta_stained_glass','95:2')
			.replace('light_blue_stained_glass','95:3')
			.replace('yellow_stained_glass','95:4')
			.replace('lime_stained_glass','95:5')
			.replace('pink_stained_glass','95:6')
			.replace('gray_stained_glass','95:7')
			.replace('light_gray_stained_glass','95:8')
			.replace('cyan_stained_glass','95:9')
			.replace('purple_stained_glass','95:10')
			.replace('blue_stained_glass','95:11')
			.replace('brown_stained_glass','95:12')
			.replace('green_stained_glass','95:13')
			.replace('red_stained_glass','95:14')
			.replace('black_stained_glass','95:15')
		})
	}).setName('fill').setAliases(['/fill'])
}*/