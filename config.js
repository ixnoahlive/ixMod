import { @Vigilant, @SwitchProperty, @CheckboxProperty, @ButtonProperty, @SelectorProperty } from 'Vigilance'; // Works fine, VSCode is a bitch.

@Vigilant("ixMod", "ixMod Config", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Interface', 'Commands', 'Miscellaneous'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = ["Slash Commands", "Hotkey Commands","Developer"];

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
            subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    },
})
class Settings {
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


    //// Commands ////
    @CheckboxProperty({
        name: "/unbreakable",
        description: "Makes your held item unbreakable",
        category: "Commands",
        subcategory: "Slash Commands"
    })
    cmd_unbreakable = true
    
    // Command Hotkeys
    @SwitchProperty({
        name: "[M] for Menu",
        description: "Press [M] to open the Housing Menu",
        category: "Commands",
        subcategory: "Hotkey Commands"
    })
    cmd_keymenu = false


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

    constructor() {
        this.initialize(this);
        this.setSubcategoryDescription('Commands', 'Slash Commands','ChatTriggers must be reloaded for this to take effect.')
    }
}

export default new Settings();