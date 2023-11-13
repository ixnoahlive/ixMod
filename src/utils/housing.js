/**
 * Checks if the player is in a house
 * @returns {boolean}
 */
export function inHousing() {
    const tablistFooter = TabList?.getFooter()?.split('\n')
    if (!tablistFooter || !tablistFooter[1]) return false
    return /§r§r§fYou are in §r§a(.*?)§r§f, by (.*)/.test(tablistFooter[1])
}

/**
 * Checks if the player is the owner of the current house
 * @returns {boolean}
 */
export function isHouseOwner() {
    if (!inHousing()) return false

    const tablistFooter = TabList?.getFooter()?.split('\n')
    if (/§r§r§fVisiting Rules: §r(.*?)§r/.test(tablistFooter[4])) return true

    return false
}

/**
 * Get tablist data from the house
 * @returns {Object} `{name: string, owner: string}`
 */
export function getHouseData() {
    if (!inHousing()) return null

    const tablistFooter = TabList?.getFooter()?.split('\n')
    const playerData = /You are in (.*?), by (?:\[[^\]]+\] )?(\w{1,16})/.exec(tablistFooter[1].removeFormatting())
    
    playerData.shift()

    if (!playerData[0] || !playerData[1]) return null

    return { name: playerData[0], owner: playerData[1] }
} 