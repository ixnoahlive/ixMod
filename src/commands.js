import Settings from '../resources/config'
import U from '../resources/util'

import './cmds/bookmark' // Command is flooding this file and makes it a bit tedious to focus on other things

const UniObj = JSON.parse(FileLib.read('ixMod', 'resources/unicode.json'))
const UniTexts = []
Object.keys(UniObj).forEach(group => {
	groupCodes = UniObj[group].split('')
	groupMessage = new Message(`&e&l${group}: &f`)
	groupCodes.forEach((code) => {
		groupMessage.addTextComponent(new TextComponent(code).setClick('run_command', `/chattriggers copy ${code}`).setHover('show_text', `&aCopy symbol &e"${code}"`))
	})
	UniTexts.push(groupMessage)
})

register('command', () => Settings.openGUI()).setName('ixmod').setAliases(["ix","ixm"])
register('command', () => {
	FileLib.write('ixMod', 'housetracker/data.json', "[]", true)
	ChatLib.chat('&aResetted housetracker/data.json!')
}).setName('resethousingtracker')

if (Settings.misc_dev) register('command', () => {console.log(Player.getHeldItem().getRawNBT())}).setName('yoink')
if (Settings.cmd_stats) register('command', () => {if (U.inHousing()) { ChatLib.command(`viewstats ${Player.getName()}`) }}).setName('mystats')
if (Settings.cmd_unicode) register('command', () => {ChatLib.chat(`&9&m${'-'.repeat(52)}`);UniTexts.forEach(txt => ChatLib.chat(txt));ChatLib.chat(`&9&m${'-'.repeat(52)}`)}).setName('unicode').setAliases(['uni']) 

if (Settings.cmd_unbreakable) {register('command', () => { if (Player.getHeldItem()) { 
	if (!U.isCreative()) return ChatLib.chat('&cYou need to be in Creative mode for this command!')
    if ((!Player.getHeldItem().getNBT().getTag('tag')?.getByte('Unbreakable'))) {
        if (Player.getHeldItem().getNBT().getTag('tag')) {
            Player.getHeldItem().getItemNBT().getTag('tag').setByte('Unbreakable', 1)
        } else {
            U.setHeldItemTag('Unbreakable', 1);
        }
		ChatLib.chat('&aYour held item is now unbreakable!')
    } else {
        if (Player.getHeldItem().getNBT().getTag('tag')) {
            Player.getHeldItem().getItemNBT().getTag('tag').setByte('Unbreakable', 0)
			ChatLib.chat('&cYour held item is no longer unbreakable!')
        }
    } // This is 100% my code it just looks coincidentally similar to the code in housingeditor
}}).setCommandName('unbreakable')} 

if (Settings.cmd_alias) {
	register('command', (name) => ChatLib.command(`housing invite ${name}`)).setName('ixmod:invite').setAliases(['invite','inv'])
	register('command', (name) => ChatLib.command(`visit ${name}`)).setName('ixmod:visit').setAliases(['vis','vi'])
	register('command', () => ChatLib.command(`housing logs`)).setName('ixmod:logs').setAliases(['logs','log'])
	register('command', (name) => ChatLib.command(`viewstats ${name}`)).setName('ixmod:stats').setAliases(['st','stats','stat'])
	register('command', () => ChatLib.command(`viewglobalstats`)).setName('ixmod:globalstats').setAliases(['gst','gstats','gstat'])
	register('command', (name) => ChatLib.command(`housing ban ${name}`)).setName('ixmod:ban').setAliases(['hban','b'])
	register('command', (name) => ChatLib.command(`housing mute ${name}`)).setName('ixmod:mute').setAliases(['hmute','m'])
	register('command', (name) => ChatLib.command(`housing kick ${name}`)).setName('ixmod:kick').setAliases(['hkick','k'])
}

register('command', () => {
	ChatLib.chat('&9&lIXMOD')
	ChatLib.chat('&bLead Developer: &fixNoah\n&bwith help from: &fArisings\n&bUseful Libraries: &fCreativeTabs, requestV2, Vigilance\n\n&bThank you to &fthe ChatTriggers server, Housing Community and HousingEditor!')
}).setName('ixmod:credits')

if (Settings.cmd_3rdparty_cal) register('command', (textureId) => {
	if (!U.inHousing(false) && !U.isCreative()) return ChatLib.chat('&cYou must be in Housing and be in Creative mode!')
	if(!textureId | textureId<1 | textureId>32767 )return ChatLib.chat('&cProvide a valid id!');
	if (textureId.length==2) { textureId = U.addStr(textureId.toString(), 0, '0') }
	if (textureId.length==1) { textureId = U.addStr(U.addStr(textureId.toString(), 0, '0'), 0, '0') }
	ChatLib.chat(`&aSet held item to &eTexture ${textureId}&a!`)
	Player.getHeldItem().setName(Player.getHeldItem().getName().replace(/§[0-9]§[0-9]§[0-9]/, ''))
	Player.getHeldItem().setName(Player.getHeldItem().getName()+`&${textureId[0]}&${textureId[1]}&${textureId[2]}`)
}).setName('settexture').setAliases(['st'])

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
