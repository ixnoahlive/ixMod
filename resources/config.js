import { @Vigilant, @SwitchProperty, @CheckboxProperty, @ButtonProperty } from 'Vigilance'; // Works fine, VSCode is a bitch.

@Vigilant("ixMod", "ixMod Config", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Interface', 'Commands', 'House Tracker', 'Miscellaneous'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = ["Slash Commands", "Developer","Definitely Real Options"];

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
            subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    },
})
class Settings {
    ///////////////////
    //// Interface ////
    @SwitchProperty({
        name: "House Info",
        description: "Display House information in the top left",
        category: "Interface",
    })
    gui_houseinfo = false
    @SwitchProperty({
        name: 'Hide Action Asterisk',
        description: 'Disables the asterisk in messages sent by actions',
        category: 'Interface',
    })
    gui_actionMsg = false

    //////////////////
    //// Commands ////
    @CheckboxProperty({
        name: "/unbreakable",
        description: "Makes your held item unbreakable",
        category: "Commands",
        subcategory: "Slash Commands"
    })
    cmd_unbreakable = true

    ///////////////////////
    //// House Tracker ////
    @SwitchProperty({
        name: "Enable Tracking",
        description: "Logs your House's guest & cookie counter to a file every 5 minutes. Good for making charts & collecting info on your house while AFK.",
        category: "House Tracker",
    })
    tracker_enabled = false
    

    ///////////////////////
    //// Miscellaneous ////
    @SwitchProperty({
        name: "Developer Mode",
        description: "Enables logging & other developer utilities\n&cThis does not give any important or experimental features!",
        category: "Miscellaneous",
        subcategory:"Developer"
    })
    misc_dev = false

    @ButtonProperty({
        name: "Console",
        description: "Open the ChatTriggers console",
        category: "Miscellaneous",
        placeholder: "Open",
        subcategory:'Developer'
    })
    openConsole() {
        ChatLib.command('ct console js', true)
    }
    @SwitchProperty({
        name: "rat!!!! ogm!!!",
        description: "Keep on plz\n&8(joke option, ixmod is open source! github.com/noahthenerd/ixmod)",
        category: "Miscellaneous",
        subcategory: 'Definitely Real Options'
    })
    jokeoption = true

    constructor() {
        this.initialize(this);
        this.setSubcategoryDescription('Commands', 'Slash Commands','ChatTriggers must be reloaded for this to take effect.')
    }
}

export default new Settings();