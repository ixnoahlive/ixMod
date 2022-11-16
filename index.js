import Settings from "./config";
import U from './util';
import 'Vigilance'

// to the chattriggers review team
// i am so sorry

let HouseInfo = {
	owner:'Steve',
	guests:0,
	cookies:0
}
let x = new Text(``, 5, 5).setShadow(true)

///////////////
// RENDERING //
///////////////

register('renderOverlay', () => {
	const lines = Scoreboard.getLines()
	const sblines = TabList.getFooter().split('\n')
	if (U.inHousing()) {
		if (Settings.gui_houseinfo==true && HouseInfo.owner) {
			x.setString(`&e&lHOUSE INFO\nHouse Owner: &b${HouseInfo.owner}\n&fGuests: &a${U.commafy(HouseInfo.guests)}\n&fCookies: &6${U.commafy(HouseInfo.cookies)}`)
			x.draw()
		}
	}	
})
// probably not rendering but relevant enough
register('chat', (message, event) => {
	if (U.inHousing() && Settings.gui_actionMsg) {
		ChatLib.chat(message)
		cancel(event)
	}
}).setCriteria('&r&7* &r&f${message}')

//////////////
// COMMANDS //
//////////////

register('command', () => Settings.openGUI()).setName('ixmod').setAliases(["ix","ixm"])

if (Settings.cmd_unbreakable) {register('command', () => { if (Player.getHeldItem()) { 
	if (!U.isCreative()) return ChatLib.chat('&cYou need to be in Creative mode for this command!')
	U.setHeldItemTag('Unbreakable', 1)
}}).setCommandName('unbreakable')} 

////////////////////
// STEP REGISTERS //
////////////////////
register('step', () => {
	const lines = Scoreboard.getLines()
	const sblines = TabList.getFooter().split('\n')
		if (U.inHousing()) {
			if (Settings.gui_houseinfo==true && sblines) {
				HouseInfo.owner = sblines[1].split(' ')
    			HouseInfo.owner = HouseInfo.owner[HouseInfo.owner.length-1].replace(/§([a-z]|[0-9])/g, '')
				HouseInfo.guests = parseInt(sblines[sblines.length-3].replace(/§([a-z]|[0-9])/g, '').replace(/!([0-9])/, '').replace(/,/, '').split(' | ')[0].replace('Guests: ', ''))
				HouseInfo.cookies = parseInt(sblines[sblines.length-3].replace(/§([a-z]|[0-9])/g, '').replace(/!([0-9])/, '').replace(/,/, '').split(' | ')[1].replace('Cookies: ', ''))
			}
		}
}).setFps(1)

////////////////////
// BUTTON GO BOOP //
////////////////////

const openHousingMenu = new KeyBind('Open Menu', Keyboard.KEY_M)
openHousingMenu.registerKeyPress(() => {if (U.inHousing() && Settings.cmd_keymenu) {ChatLib.command('menu')}})