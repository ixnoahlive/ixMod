import U from '../resources/util'
import Settings from '../resources/config'
import request from 'requestV2';

request('http://dev.ixnoah.live:7777/')

register('chat', (message, event) => {
	if (U.inHousing() && Settings.gui_actionMsg) {
		ChatLib.chat(message)
		cancel(event)
	}
}).setCriteria('&r&7* ${message}')