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


register('renderOverlay', () => {
	const lines = Scoreboard.getLines()
	const sblines = TabList.getFooter().split('\n')
	if (U.inHousing()) {
		if (Settings.houseinfo==true) {
			let x = new Text(`&e&lHOUSE INFO\nHouse Owner: &b${HouseInfo.owner}\n&fGuests: &a${U.commafy(HouseInfo.guests)}\n&fCookies: &6${U.commafy(HouseInfo.cookies)}`, 5, 5).setShadow(true)
			x.draw()
		}
	}	
})

//////////////
// COMMANDS //
//////////////

register('command', () => Settings.openGUI()).setName('ixmod').setAliases(["ix","ixm"])
register('command', () => Settings.save()).setName('ixsave')

////////////////////
// STEP REGISTERS //
////////////////////
register('step', () => {
	const lines = Scoreboard.getLines()
	const sblines = TabList.getFooter().split('\n')
		if (U.inHousing()) {
			if (Settings.houseinfo==true) {
				HouseInfo.owner = sblines[1].split(' ')
    			HouseInfo.owner = HouseInfo.owner[HouseInfo.owner.length-1].replace(/§([a-z]|[0-9])/g, '')

				HouseInfo.guests = parseInt(sblines[sblines.length-3].replace(/§([a-z]|[0-9])/g, '').replace(/!([0-9])/, '').replace(/,/, '').split(' | ')[0].replace('Guests: ', ''))
				HouseInfo.cookies = parseInt(sblines[sblines.length-3].replace(/§([a-z]|[0-9])/g, '').replace(/!([0-9])/, '').replace(/,/, '').split(' | ')[1].replace('Cookies: ', ''))
			}
		} else {
			HouseInfo = {
				owner:'Steve',
				guests:0,
				cookies:0
			}
		}
}).setFps(1)

////////////////////
// BUTTON GO BOOP //
////////////////////