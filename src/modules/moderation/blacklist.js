import request from 'requestV2';
import { hypixelLore } from '../../utils/generic';

let blacklist = {};
request('https://dev.ixnoah.live/mods/ixmod/blacklist.json')
    .then(function(response) {
        blacklist = JSON.parse(response)
    });



module.exports = {
    name: 'Blacklist',
    description: 'Warns you about potentially dangerous users',
    subcategory: 'Moderation',

    options: [],

    registers: [
        {
            name: 'chat',
            run(config, name) {
                request('https://api.mojang.com/users/profiles/minecraft/'+encodeURI(name))
                    .then(function(response) {
                        const playerinfo = JSON.parse(response)
                        if (blacklist[playerinfo.id]) {
                            ChatLib.chat(
                                new TextComponent(`&e${playerinfo.name}&c is listed for &e${blacklist[playerinfo.id].type}&c. Hover for info.`)
                                .setHover('show_text', `&a${playerinfo.name}\n${ hypixelLore(blacklist[playerinfo.id].reason || 'No reason provided', ['Click to paste name!']).join('\n') }`)
                                .setClick('suggest_command', `${playerinfo.name}`)
                            )
                            World.playSound('note.pling')
                        }
                    });

            }, create(trigger) {trigger.setCriteria(/(?:\[[^\]]+\] )?(\w{1,16}) (?:entered|left) the world\./)}
        }
    ]
}