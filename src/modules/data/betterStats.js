let latest = {} // An unorganised, as seen in vanilla list of all stats
let latestSorted = {} // An organised list of all stats
let date = 0

module.exports = {
    name: 'Improved Stats',
    description: 'Various improvements to the /viewstats and /editstats command',
    subcategory: 'Data & Analytics',

    options: [
        {
            type: 'checkbox',
            id: 'viewCopy',

            name: 'Copy JSON',
            description: 'Adds a button to copy a JSON of the stats being viewed',

            value: true
        },
        {
            type: 'checkbox',
            id: 'viewSort',

            name: 'Alphabetical',
            description: 'Rearranges stats to be sorted alphabetically',

            value: true
        },
        {
            type: 'checkbox',
            id: 'viewCategory',

            name: 'Categories',
            description: 'Makes the colors displayed in the stat name different based on categories, e.g. "category/statname"',

            value: true
        }
    ],

    registers: [
        {
            name: 'chat',
            run(config, statName, statValue, event) {
                cancel(event)

                const Components = []

                latest[statName] = parseInt(statValue)
                let latestKeys = Object.keys(latest).sort()
                
                latestKeys.forEach( (key) => {
                    Components.push(`&r  &r&e${config.options.betterStats.viewCategory ? key.replace(new RegExp('/', 'g'), '&7/') : key}: &r&b${latest[key]}&r\n`)
                })
                

                latestSorted = Object.keys(latest).sort().reduce(
                    (obj, key) => { 
                    obj[key] = latest[key]; 
                    return obj;
                    }, 
                    {}
                );

                if (config.options.betterStats.viewCopy) Components.push(
                    new TextComponent("&7[Copy JSON] ")
                        .setClickAction('run_command')
                        .setClickValue(`/ct copy ${JSON.stringify(latestSorted, null, 4)}`)
                        .setHover('show_text', '&7Copy stats to JSON')
                    )

                ChatLib.chat(new Message(Components).setChatLineId( date ));
            }, create(trigger) {trigger.setCriteria(/&r  &r&e(.*): &r&b(.*)&r/)}
        },
        {
            name: 'chat',
            run() {
                date = Date.now()/1000 // Now, this will break in 2038... or will it just roll into negatives? Should not be a big deal!
                latest = {}
                latestSorted = {}
            }, create(trigger) {trigger.setCriteria(/&r&a(.*?)(?:'s)? Stats:&r/)}
        }
    ]
}