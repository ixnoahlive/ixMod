import Settings from './config'

NBTTagCompound = Java.type("net.minecraft.nbt.NBTTagCompound");
NBTTagList = Java.type("net.minecraft.nbt.NBTTagList");

const C10PacketCreativeInventoryAction = Java.type("net.minecraft.network.play.client.C10PacketCreativeInventoryAction");

class U {
    constructor() {
        /**
         * Returns a ixMod message, good to provide clarity when a message may not obviously be from ixMod.
         * @param {string} message The message to send
         * @returns {Message} The message sent
         */
        this.chat = (message) => {
            return ChatLib.chat(`&9[&7ixMod&9] &f${message}`)
        }
        /**
         * Adds commas to a number
         * Example: 1000000 -> 1,000,000
         * @param {number} number The number to commafy
         * @returns {string} Commafied number
         */
        this.commafy = (number) => {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        /**
         * Appends to an array which is written to a JSON file
         * @param {string} file File path
         * @param {*} item The item to add
         * @returns {number} Status code, 200 = success, 400 = duplicate, none = something went wrong
         */
        this.appendFile = (file, item) => {
            let x = JSON.parse(FileLib.read('ixMod', file))
            if (x==null) return 400
            if (x.includes(item)) return 400
            if (!Array.isArray(x)) x = [] // Reset it idgaf you fucked with it probably
            x.push(item)
            FileLib.write('ixMod', file, JSON.stringify(x), true)
            return 200
        }
        /**
         * Pops something from an array string in a file then writes it back.
         * @param {string} file The file to pop something from
         * @param {*} property The property to target
         * @param {*} value The value to meet  
         * @returns {number} Status code, 200 = success, 400 = Does not exist, none = something went wrong
         */
        this.popFile = (file, property, value) => {
            let x = JSON.parse(FileLib.read('ixMod', file))
            console.log(1)
            x.forEach(y => {
                console.log(2)
                if (y[property] == value) {
                    console.log(3)
                    if (x.indexOf(y) < 0) return 400
                    console.log(4)
                    x.splice(x.indexOf(y), 1)
                }
            })
            FileLib.write('ixMod', file, JSON.stringify(x), true)
            return 200
        }
        /**
         * Check if the player is in Housing
         * @param {boolean} lobbyAllowed If true the lobby will return true aswell 
         * @returns {boolean} If the player is in Housing
         */
        this.inHousing = (lobbyAllowed) => {
            if (Scoreboard.getLines()[Scoreboard.getLines().length-1]==undefined) return false
            if (!lobbyAllowed) return Scoreboard.getTitle().includes('HOUSING') && Scoreboard.getLines()[Scoreboard.getLines().length-1].toString().toLowerCase().includes('m')
            if (lobbyAllowed) return Scoreboard.getTitle().includes('HOUSING')
            
        }
        /**
         * Check if the player in Housing Lobby
         * @returns {boolean} If the player is in Housing Lobby
         */
        this.inHousingLobby = () => {
            if (Scoreboard.getLines()[Scoreboard.getLines().length-1]==undefined) return false
            return Scoreboard.getTitle().includes('HOUSING') && !Scoreboard.getLines()[Scoreboard.getLines().length-1].toString().toLowerCase().includes('m')
        }
        /**
         * Used instead of console.log for things that should stay after debugging.
         * Only visible when developer mode is on.
         * @param {*} args Thing to log to console
         */
        this.log = (string) => {
            if (Settings.dev) {
                console.log(string)
            }
        }
        /**
         * Adds a string into another string at a certain index
         * @param {string} string Target
         * @param {number} index Index to insert new string
         * @param {string} stringToAdd The string to insert
         * @returns {string} Result of this insertion
         */
        this.addStr = (string, index, stringToAdd) => {
            return string.substring(0, index) + stringToAdd + string.substring(index, string.length);
        }
        /**
         * Check if the player is in Creative mode
         * @returns {boolean}
         */
        this.isCreative = () => {
            return Player.asPlayerMP().player.field_71075_bZ.field_75098_d
        }
        /**
         * FIXME: Gonna be honest i have no fucking clue what this does 
         * @param {} itemStack 
         * @param {*} slot 
         */
        this.loadItemstack = (itemStack, slot) => {
            Client.sendPacket(
                new C10PacketCreativeInventoryAction(
                    slot, // slot, 36=hotbar slot 1
                    itemStack // item to get as a minecraft item stack object
                )
            );
        }
        /**
         * Creates a new item from NBT
         * @param {string} nbtStr NBT string to turn into item
         * @returns {Item} The created item
         */
        this.getItemFromNBT = (nbtStr) => {
            let nbt = net.minecraft.nbt.JsonToNBT.func_180713_a(nbtStr); // Get MC NBT object from string
            let count = nbt.func_74771_c('Count') // get byte
            let id = nbt.func_74779_i('id') // get string
            let damage = nbt.func_74765_d('Damage') // get short
            let tag = nbt.func_74781_a('tag') // get tag
            let item = new Item(id); // create ct item object
            item.setStackSize(count);
            item = item.getItemStack(); // convert to mc object
            item.func_77964_b(damage); // set damage of mc item object
            if (tag) item.func_77982_d(tag); // set tag of mc item object
            item = new Item(item); // convert back to ct object
            return item;
        }
        /**
         * Creates a tag compound for the held item and adds a new value
         * @param {*} key Key of new value
         * @param {*} value Value of the new value
         */
        this.setHeldItemTag = (key, value) => {
            new_nbt = new NBTTagCompound();
            new_nbt.func_74774_a(key, value)
            this.loadItemstack(
                this.getItemFromNBT(
                    Player.getHeldItem().getItemNBT().setNBTBase("tag", new_nbt)
                ).itemStack, Player.getHeldItemIndex() + 36
        )}}
}
export default new U();