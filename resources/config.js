import { @Vigilant, @SwitchProperty, @CheckboxProperty, @ButtonProperty, @PercentSliderProperty, @TextProperty } from 'Vigilance'; // Works fine, VSCode is a bitch.
const Manual = new TextComponent('&b[&9&nClick here to view the House Tracker Manual!&b]').setClick('open_url', 'https://github.com/NoahTheNerd/ixMod/tree/main/housetracker/README.md')

@Vigilant("ixMod", "ixMod Config", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Interface', 'Commands', 'House Tracker', 'Miscellaneous'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Settings {
    /////////////////
    //// General ////

    @TextProperty({
        name: "Prefix",
        description: "Changes the prefix for ixMod's important messages.",
        category: "General",
        placeholder: "&9[&7ixMod&9]"
    })
    gen_prefix = '&9[&7ixMod&9]'

    /*@TextProperty({
        name: "API Key",
        description: "Used to communicate with the Hypixel API. Generate with /api new! Only required for a few commands.",
        category: "General",
        placeholder: "API Key"
    })
    key = "";
    */
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
    @PercentSliderProperty({
        name: 'House Info Pos X',
        description: 'Position of House Info on X Axis',
        category: 'Interface',
        subcategory: 'House Info',
    })
    gui_houseinfoX = 0.01;
    @PercentSliderProperty({
        name: 'House Info Pos Y',
        description: 'Position of House Info on Y Axis',
        category: 'Interface',
        subcategory: 'House Info',
    })
    gui_houseinfoY = 0.01;


    @SwitchProperty({
        name:"Coordinate Actionbar",
        description: 'Shows coordinates above hotbar with all the limits (Only supports 101x101)',
        category:"Interface"
    })
    gui_xyzhotbar = false

    @SwitchProperty({
        name: 'Hide Action Asterisk',
        description: 'Disables the asterisk in messages sent by actions',
        category: 'Interface',
    })
    gui_actionMsg = false

    @SwitchProperty({
        name: 'Creative Tabs',
        description: 'Adds a Creative Tab for Housing Items (Restart required)',
        category: 'Interface'
    })
    gui_creativeTabs = false

    //////////////////
    //// Commands ////
    @CheckboxProperty({
        name: "/saveitem",
        description: "Save your held item to a creative tab\nAlso enables: /removeitem, /clearitems",
        category: "Commands",
    })
    cmd_saveitem = true
    @CheckboxProperty({
        name: "/unbreakable",
        description: "Makes your held item unbreakable",
        category: "Commands",
    })
    cmd_unbreakable = false
    @CheckboxProperty({
        name: "/unicode",
        description: "Shows a bunch of unicode symbols you can copy\nAlias: /uni",
        category: "Commands",
    })
    cmd_unicode = true
    @CheckboxProperty({
        name: "/stats",
        description: "Shows your stats if you have permissions to view them\nAlias: /mystats",
        category: "Commands",
    })
    cmd_stats = true
    @CheckboxProperty({
        name: "/bookmark <player?>",
        description: "Bookmark a players house, type /bookmark with no argument to view your bookmarks\nAliasses: /bm, /book, /bookmarks",
        category: "Commands",
    })
    cmd_bookmark = true
    @CheckboxProperty({
        name: "/settexture <id>",
        description: "Sets an item's texture for Texture Packs that support CAL\nNote: If the item's name is changed, you must set the ID again\nAlias: /st",
        category: "Commands"
    })
    cmd_3rdparty_cal = false
    @SwitchProperty({
        name: "Extra Aliasses",
        description: "Adds aliasses for more commands like /housing invite or /visit",
        category: "Commands"
    })
    cmd_alias = true
    /*@CheckboxProperty({
        name: "Pro Tools Override",
        description: "Override Pro Tool commands to allow for newer block ids, such as light_blue_stained_glass instead of stained_glass:3",
        category: "Commands"
    })
    cmd_ptoverride = false*/

    @ButtonProperty({
        name: "Reload ChatTriggers",
        description: "This is required to make the command changes take effect!",
        placeholder: "Reload ChatTriggers",
        category: "Commands"
    })
    reloadCT() {
        ChatLib.command('chattriggers load')
        Client.currentGui.close()
    }

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
        ChatLib.command('/chattriggers console js', true)
    }
    @SwitchProperty({
        name: "rat!!!! ogm!!!",
        description: "Keep on plz\n&8(joke option, ixmod is open source! github.com/noahthenerd/ixmod)",
        category: "Miscellaneous",
        subcategory: 'ignore me!!'
    })
    jokeoption = true

    constructor() {
        this.initialize(this);
        this.setSubcategoryDescription('Commands', 'Slash Commands','ChatTriggers must be reloaded for this to take effect.')
    }
}

export default new Settings();