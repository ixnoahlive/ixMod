export function timestamp(ms) {
    let secs = Math.ceil(Math.abs(ms) / 1000)
    if (secs < 0) secs = 0
    let days = Math.floor(secs / 86400)
    if (days) secs -= days * 86400
    let timestamp = `${ms < 0 ? "-" : ""}${days ? days+'d + ' : ""}${[Math.floor(+secs / 3600), Math.floor(+secs / 60) % 60, +secs % 60].map(v => v < 10 ? "0" + v : v).filter((v, i) => v !== "00" || i > 0).join(":")}`
    if (timestamp.length > 5) timestamp = timestamp.replace(/^0+/, "")
    
    return timestamp
}

export function isCreative() {
    return Player.asPlayerMP().player.field_71075_bZ.field_75098_d
}

/**
 * Generates Hypixel lores with faithful formatting guidelines, all fact-checked using an auto-wrapped part of lore in Housing.
 * - Wraps using the same word-by-word system as Hypixel
 * - Adds punctuation automatically if needed like Hypixel
 * 
 * @param {string} str The string to add wrapping to
 * @param {string[]} labels Additional labels for the bottom (e.g. `Left Click to edit!`)
 * @returns {string[]} The formatted lines with colour codes
 */
export function hypixelLore(str, labels = []) {
    let lines = [];

    if (new RegExp('(.*)[!.?]').exec(str)==null) str += '.'; // Add . to end if necessary

    let line = "";
    str.split(' ').forEach(word => {
        line += `${word} `;

        if (line.length>28) {
            lines.push(line.trim());
            line = "";
        };
    });
    if (line) (lines.push(line));

    lines = lines.map(line => {return '§7'+line});

    if (labels?.length) lines.push('');
    labels.forEach(label => {
        lines.push('§e'+label);
    });

    return lines;
};