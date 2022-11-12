import { @Vigilant, @SwitchProperty, @CheckboxProperty } from 'Vigilance'; // Works fine, VSCode is a bitch.

@Vigilant("ixMod")
class Settings {
    //// Interface ////
    @SwitchProperty({
        name: "House Info",
        description: "Display House information in the top left",
        category: "Interface",
    })
    houseinfo = false
    
    //// Hotkeys ////
    @CheckboxProperty({
        name: "[M] for Housing Menu",
        description: "Allows you to press [M] to open the Housing Menu",
        category: "Hotkeys"
    })
    mformenu = false

    constructor() {
        this.initialize(this);
    }
}

export default new Settings();