import { @Vigilant, @SwitchProperty, @CheckboxProperty, @ButtonProperty } from 'Vigilance'; // Works fine, VSCode is a bitch.
const Manual = new TextComponent('&b[&9&nClick here to view the House Tracker Manual!&b]').setClick('open_url', 'https://github.com/NoahTheNerd/ixMod/tree/main/housetracker/README.md')

@Vigilant("ixMod", "ixMod Config", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Interface', 'Commands', 'House Tracker', 'Miscellaneous'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = ["Actions","House Info","Slash Commands", "Developer","Definitely Real Options"];

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
            subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    },
})
class Settings {
    ///////////////////
    //// Interface ////
    @SwitchProperty({
        name: "Enable House Info",
        description: "Display House information in the top left",
        category: "Interface",
        subcategory: "House Info"
    })
    gui_houseinfo = false
    @SwitchProperty({
        name: "Shorten Info",
        description: "Compacts the House information into a single line",
        category: "Interface",
        subcategory: "House Info"
    })
    gui_houseinfocompact = false
    @SwitchProperty({
        name: 'Hide Action Asterisk',
        description: 'Disables the asterisk in messages sent by actions',
        category: 'Interface',
        subcategory: "Actions"
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
        description: "Release your inner data scientist and log your House's guest & cookie counter to a file every 5 minutes. Must be in Creative Mode for it to work!",
        category: "House Tracker",
    })
    tracker_enabled = false
    @SwitchProperty({
        name: "Unlimited Size",
        description: "ONLY USE THIS IF YOU REALLY HAVE TO, THIS REMOVES ALL LIMITS FROM THE TRACKER AND MAY CAUSE A VERY LARGE FILE.",
        category: "House Tracker",
    })
    tracker_unlimited = false
    @ButtonProperty({
        name: "About Tracking",
        description: "Open the official House Tracker manual.",
        category: "House Tracker",
        placeholder: "Open Manual"
    })
    openManual() {
        Client.currentGui.close()
        ChatLib.chat(Manual)
    }

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