import { GamemodeError } from "./types/errors";

const PacketCreativeInventoryAction = Java.type("net.minecraft.network.play.client.C10PacketCreativeInventoryAction");

const MCItemStack = Java.type("net.minecraft.item.ItemStack");

/**
 * Gives an item to the specified slot, or held hand if left blank
 * @param {Item} item The item to give to the player
 * @param {Number} slot The slot to put it in (leave blank for held, 36 is 1st hotbar slot)
 */
export function giveItem(item, slot) {
    if (!Player.asPlayerMP().player.field_71075_bZ.field_75098_d) throw new GamemodeError(1)

    Client.sendPacket(
        new PacketCreativeInventoryAction(
            slot || Player.getHeldItemIndex()+36,
            item?.getItemStack() || item // If it can't get the item stack, simply pray that the thing itself is, in fact, an item stack.
        )
    );
}

export function getItemFromNBT(nbtStr) {
    const nbt = net.minecraft.nbt.JsonToNBT.func_180713_a(nbtStr);
    return new Item(MCItemStack.func_77949_a(nbt));
}

/**
 * Converts NBT Object into an Item
 * @param {object} nbtObject 
 */
export function nbtToItem(nbtObject) {
    let str = JSON.stringify(nbtObject, 0, 4),
        arr = str.match(/".*?":/g);

    for (let i = 0; i < arr.length; i++)
        str = str.replace(arr[i], arr[i].replace(/"/g,''));

    return getItemFromNBT(str);
}

export function setItemName(nbt, newName) {
    if (!nbt.tag) nbt.tag = {}
    if (!nbt.tag.display) nbt.tag.display = {}
    nbt.tag.display.Name = newName

    return nbt
}

export function setItemLore(nbt, newLore) {
    if (!nbt.tag) nbt.tag = {}
    if (!nbt.tag.display) nbt.tag.display = {}
    nbt.tag.display.Lore = newLore
    
    return nbt
}

export function getItemLore(nbt) {
    if (!nbt.tag) nbt.tag = {}
    if (!nbt.tag.display) nbt.tag.display = {}

    return nbt.tag.display.Lore || []
}