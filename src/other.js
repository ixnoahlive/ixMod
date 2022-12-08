import U from '../resources/util'
import Settings from '../resources/config'

register('chat', (message, event) => {
	if (Settings.gui_actionMsg && U.inHousing()) {
		ChatLib.chat(message)
		cancel(event)
	}
}).setCriteria('&r&7* ${message}')

let currentCoordinates = { x: 0, y: 0, z: 0 } // Putting this in an object in case anything else may need this
register('renderOverlay', () => {
	currentCoordinates.x=Player.getX().toFixed(0);
	currentCoordinates.y=Player.getY().toFixed(0);
	currentCoordinates.z=Player.getZ().toFixed(0)
	
	if (Settings.gui_xyzhotbar && U.inHousing()) {
		ChatLib.actionBar(`&b${currentCoordinates.x}&8 | &b${currentCoordinates.y}&9/195 &8|&b ${currentCoordinates.z}`)
	}
})
