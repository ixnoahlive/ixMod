import Settings from '../resources/config'
import U from '../resources/util'

let HouseInfo = {
	guests:0,
	cookies:0
}
let HouseInfo_Text = new Text(``, 5, 5).setShadow(true)

register('renderOverlay', () => {
	if (U.inHousing()) {
		if (Settings.gui_houseinfo==true) {
			let x = Math.round(Settings.gui_houseinfoX * Renderer.screen.getWidth())
			let y = Math.round(Settings.gui_houseinfoY * Renderer.screen.getHeight())

			if (Settings.gui_houseinfoX>0.75) { HouseInfo_Text.setAlign('right')
			} else if (Settings.gui_houseinfoX<0.25) { HouseInfo_Text.setAlign('left')
			} else if (Settings.gui_houseinfoX>0.24 && Settings.gui_houseinfoX<0.76) {HouseInfo_Text.setAlign('center')}
			if (Settings.gui_houseinfoX==1) x = x - 5
			if (Settings.gui_houseinfoX==0) x = x + 5
			if (Settings.gui_houseinfoY==1) y = y - 5
			if (Settings.gui_houseinfoY==0) y = y + 5
			HouseInfo_Text.setX(x)
			HouseInfo_Text.setY(y)

			if (Settings.gui_houseinfocompact==false) {
				HouseInfo_Text.setString(`&e&lHOUSE INFO\n&fGuests: &a${U.commafy(HouseInfo.guests)}\n&fCookies: &6${U.commafy(HouseInfo.cookies)}`)
			} else {
				HouseInfo_Text.setString(`&e[ℹ] &a✌${U.commafy(HouseInfo.guests)}&7 | &6❤${U.commafy(HouseInfo.cookies)}`)
			}
			HouseInfo_Text.draw()
		}
	}	
})

register('step', () => {
	if (TabList.getFooter()==null) return
	const tab = TabList.getFooter().split('\n')
		if (U.inHousing()) {
			if (Settings.gui_houseinfo==true && tab) {
				if (tab[tab.length-3]==undefined) { return }
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