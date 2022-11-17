import Settings from './config'

NBTTagCompound = Java.type("net.minecraft.nbt.NBTTagCompound");
NBTTagList = Java.type("net.minecraft.nbt.NBTTagList");

const C10PacketCreativeInventoryAction = Java.type("net.minecraft.network.play.client.C10PacketCreativeInventoryAction");

class U {
    constructor() {
        this.chat = (str) => {
            return ChatLib.chat(`&9[&7ixMod&9] &f${str}`)
        }
        this.commafy = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        this.inHousing = () => {
            if (Scoreboard.getLines()[Scoreboard.getLines().length-1]==undefined) return false
            return Scoreboard.getTitle().match('HOUSING') && Scoreboard.getLines()[Scoreboard.getLines().length-1].toString().toLowerCase().match('m')
        }
        this.log = (str) => {
            if (Settings.dev) {
                console.log(str)
            }
        }
        this.isCreative = () => {
            return Player.asPlayerMP().player.field_71075_bZ.field_75098_d
        }
        this.loadItemstack = (itemStack, slot) => {
            Client.sendPacket(
                new C10PacketCreativeInventoryAction(
                    slot, // slot, 36=hotbar slot 1
                    itemStack // item to get as a minecraft item stack object
                )
            );
        }
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