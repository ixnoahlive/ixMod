import { @Vigilant, @SwitchProperty } from 'Vigilance';

@Vigilant("ixMod")
class Settings {
    @SwitchProperty({
        name: "House Info",
        description: "Display House information in the top left",
        category: "GUI",
    })
    houseinfo = false

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("GUI", "ixMod GUI Settings")
    }
}

export default new Settings();