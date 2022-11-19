import Settings from "./resources/config";
import U from './resources/util';
import 'Vigilance'

// to the chattriggers review team
// i am so sorry

let HouseInfo = {
	guests:0,
	cookies:0
}
let HouseInfo_Text = new Text(``, 5, 5).setShadow(true)

///////////////
// RENDERING //
///////////////

register('renderOverlay', () => {
	if (U.inHousing()) {
		if (Settings.gui_houseinfo==true) {
			if (Settings.gui_houseinfocompact==false) {
				HouseInfo_Text.setString(`&e&lHOUSE INFO\n&fGuests: &a${U.commafy(HouseInfo.guests)}\n&fCookies: &6${U.commafy(HouseInfo.cookies)}`)
			} else {
				HouseInfo_Text.setString(`&e[ℹ] &a✌${U.commafy(HouseInfo.guests)}&7 | &6❤${U.commafy(HouseInfo.cookies)}`)
			}
			
			HouseInfo_Text.draw()
		}
	}	
})
// probably not rendering but relevant enough
register('chat', (message, event) => {
	if (U.inHousing() && Settings.gui_actionMsg) {
		ChatLib.chat(message)
		cancel(event)
	}
}).setCriteria('&r&7* ${message}')

//////////////
// COMMANDS //
//////////////

register('command', () => Settings.openGUI()).setName('ixmod').setAliases(["ix","ixm"])
register('command', () => {FileLib.write('ixMod', 'housetracker/data.json', "[]", true);ChatLib.chat('&aResetted housetracker/data.json!')}).setName('resethousingtracker')

if (Settings.cmd_unbreakable) {register('command', () => { if (Player.getHeldItem()) { 
	if (!U.isCreative()) return ChatLib.chat('&cYou need to be in Creative mode for this command!')
	U.setHeldItemTag('Unbreakable', 1)
}}).setCommandName('unbreakable')} 

////////////////////
// STEP REGISTERS //
////////////////////

register('step', () => {
	if (TabList.getFooter()==null) return
	const tab = TabList.getFooter().split('\n')
		if (U.inHousing()) {
			if (Settings.gui_houseinfo==true && tab) {
				HouseInfo.guests = parseInt(tab[tab.length-3].replace(/§([a-z]|[0-9])/g, '').replace(/!([0-9])/, '').replace(/,/, '').split(' | ')[0].replace('Guests: ', ''))
				HouseInfo.cookies = parseInt(tab[tab.length-3].replace(/§([a-z]|[0-9])/g, '').replace(/!([0-9])/, '').replace(/,/, '').split(' | ')[1].replace('Cookies: ', ''))
			}
		}
}).setFps(1)

register('step', () => {
	if (!Settings.tracker_enabled) return;
	if (U.inHousing()==false && U.isCreative()==false) return
	if (!FileLib.exists('ixMod', 'housetracker/data.json')) FileLib.write('ixMod', 'housetracker/data.json', '[]', true)
	let x = JSON.parse(FileLib.read('ixMod', 'housetracker/data.json'))
	if (x.length>288 && Settings.tracker_unlimited==false) return U.chat('Housing Tracker exceeded limit of 288!')
	let y = {
		time: Date.now(),
		date: new Date().toString(),
		guests: HouseInfo.guests,
		cookies: HouseInfo.cookies
	}
	x.push(y)
	FileLib.write('ixMod', 'housetracker/data.json', JSON.stringify(x), true)
}).setDelay(300)