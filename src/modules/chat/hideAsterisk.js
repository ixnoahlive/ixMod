module.exports = {
    name: 'Hide Asterisk',
    description: 'Hides the asterisk from messages sent by actions',
    subcategory: 'Chat',

    options: [],

    registers: [
        {
            name: 'chat',
            run(config, event) {
                const msg = new Message(event);
                new Message(...msg.getMessageParts().slice(2)).chat()
                cancel(event)
            }, create(trigger) trigger.setCriteria("&r&7* ${}")
        }
    ]
}