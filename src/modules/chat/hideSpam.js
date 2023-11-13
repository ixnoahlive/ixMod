module.exports = {
    name: 'Hide Spam',
    description: 'Hides common spammy messages in Housing',
    subcategory: 'Chat',

    options: [
        {
            type: "checkbox",
            id: 'join',

            name: 'Join Messages',
            description: '[MVP+] ixNoah joined the world!'
        },
        {
            type: "checkbox",
            id: 'death',

            name: 'Death Messages',
            description: 'ixNoah was slain by ImaDoofus!'
        }
    ],

    registers: [
        {
            name: 'chat',
            run(config, event) {
                console.log(JSON.stringify(config))
                if (config.options.hideSpam.death) {
                    cancel(event)
                }
            }, create(trigger) {trigger.setCriteria(/&r&7(?:[a-zA-Z0-9_]{1,16}) (?:.*)/)} // This will break if the admin ConnorLinfoot kills someone since he has a golden kill message.
        },
        {
            name: 'chat',
            run(config, event) {
                if (config.options.hideSpam.join) {
                    cancel(event)
                }
            }, create(trigger) {trigger.setCriteria(/(?:\[[^\]]+\] )?(?:\w{1,16}) (?:entered|left) the world\./)}
        }
    ]
}