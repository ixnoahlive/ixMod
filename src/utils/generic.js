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