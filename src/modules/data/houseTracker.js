module.exports = {
    name: 'House Tracker',
    description: 'When enabled tracks the amount of players & cookies in your house \nType /housetracker for more info',
    subcategory: 'Data & Analytics',

    options: [
        {
            type: 'slider',
            id: 'delay',

            name: 'Entry Delay',
            description: 'Delay between entries in minutes',

            min: 10,
            max: 1000,

            value: 300
        }
    ],

    registers: [
        {
            name: 'step',
            run() {

            }, create() {}
        }
    ]
}