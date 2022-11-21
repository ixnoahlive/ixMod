import U from '../resources/util'

let Keybind_Menu = new KeyBind("Housing Menu", Keyboard.KEY_M, 'ixMod')
let Keybind_GlobalStat = new KeyBind("View Global Stats", Keyboard.KEY_NONE, 'ixMod')

Keybind_Menu.registerKeyPress(() => {if (U.inHousing()) { ChatLib.command('menu') }})
Keybind_GlobalStat.registerKeyPress(() => {if (U.inHousing()) { ChatLib.command('viewglobalstats') }})