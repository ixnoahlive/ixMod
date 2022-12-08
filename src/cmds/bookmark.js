import Settings from '../../resources/config'
import U from '../../resources/util'
import request from 'requestV2';
// Ive been working on this hell all day put me out of my misery
if (Settings.cmd_bookmark) register('command', (player, target) => {
	if (player && player.startsWith('-r')) { // this is bullshit but it doesn't work otherwise
		let popResult = U.popFile('resources/bookmark.json', 'id', target)
		if (popResult==200) {ChatLib.chat('&cSuccessfully removed this bookmark!')} else {ChatLib.chat('&cSomething went wrong trying to perform this action!')}
		return;
	}
	if (player && player.match(/^[a-zA-Z0-9_]{2,16}$/mg)) {
		request(`https://api.mojang.com/users/profiles/minecraft/${player}`)
		.then((data) => {
			let appendResult = U.appendFile('resources/bookmark.json', {name: JSON.parse(data).name, id: JSON.parse(data).id})
			if (appendResult==400) return ChatLib.chat('&aThis house is already bookmarked!')
			if (appendResult==200) return ChatLib.chat('&aSuccessfully bookmarked this house!')	
		})
	} else if (!player && U.inHousing(true)) {
		const Bookmarks = JSON.parse(FileLib.read('ixMod', 'resources/bookmark.json'))
		let BookmarkMsg = []
		if (Bookmarks.length<1) return ChatLib.chat('&cYou have no bookmarks! Type /bookmark <player> to bookmark a house!')
		ChatLib.chat(`&9&m${'-'.repeat(32)}`)
		ChatLib.chat('&6            &6  Your Bookmarks') // Spaces so it's centered properly
		Bookmarks.forEach(v => {
			let message = new Message()
			message.addTextComponent(new TextComponent('&c ✖ ').setClick('run_command', `/bookmark -r ${v.id}`).setHover('show_text',`&cRemove bookmark "${v.name}"`))
			message.addTextComponent(new TextComponent(`&8|&e ${v.name}`).setHover('show_text',`&aVisit bookmark "${v.name}"`).setClick('run_command', `/visit ${U.addStr(U.addStr(U.addStr(U.addStr(v.id, 8, '-'), 13, '-'), 18, '-'), 23, '-')}`))
			ChatLib.chat(message)
		})
		ChatLib.chat(`&9&m${'-'.repeat(32)}`)
	} else if (!player && U.inHousing(true)==false) {
		ChatLib.chat('&cYou need to be in Housing or a Housing lobby to use this command!')
	}
}).setName('bookmark').setAliases('bm','book','bookmarks')
