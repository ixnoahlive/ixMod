import Settings from '../resources/config'
import U from '../resources/util'

let HouseInfo = {
	guests:0,
	cookies:0
}
let HouseInfo_Text = new Text(``, 5, 5).setShadow(true)

register('step', () => {
	if (TabList.getFooter()==null) return
	let SplitFooter;
	try {
		SplitFooter = TabList.getFooter().split('\n')
	} catch (error) {U.log(error)}	

	if (U.inHousing()) {
		if (Settings.gui_houseinfo==true && SplitFooter) {
			if (SplitFooter[SplitFooter.length-3].match(/Guests:/)==null) return; // We don't necessarily need a full match, this partial one should be enough.
			let LineOfInterest = SplitFooter[SplitFooter.length-3] // This is required because House Owners have additional details on their footer. 
			HouseInfo.guests = parseInt(U.removeColor(LineOfInterest).replace('Guests: ', '').replace(/ \| Cookies:*/, '').split(' ')[0]) // I'm so fucking done with regex i have resorted to splitting
			HouseInfo.cookies = parseInt(U.removeColor(LineOfInterest).replace('Guests: ', '').replace(/ \| Cookies:*/, '').split(' ')[1])
		}
	}
}).setFps(1)

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


// House Tracker
register('step', () => {
	if (!Settings.tracker_enabled) return;
	if (U.inHousing()==false && U.isCreative()==false) return
	if (!FileLib.exists('ixMod', 'housetracker/data.json')) FileLib.write('ixMod', 'housetracker/data.json', '[]', true)
	let TrackedData = JSON.parse(FileLib.read('ixMod', 'housetracker/data.json'))
	if (TrackedData.length>288 && Settings.tracker_unlimited==false) return U.chat('Housing Tracker exceeded limit of 288!')
	let NewDataEntry = {
		time: Date.now(),
		date: new Date().toString(),
		guests: HouseInfo.guests,
		cookies: HouseInfo.cookies
	}
	TrackedData.push(NewDataEntry)
	FileLib.write('ixMod', 'housetracker/data.json', JSON.stringify(TrackedData), true)
}).setDelay(300)