class U {
    constructor() {
        this.commafy = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        this.inHousing = () => {
            if (Scoreboard.getLines()==undefined) return false
            return Scoreboard.getTitle().match('HOUSING') && Scoreboard.getLines()[Scoreboard.getLines().length-1].toString().toLowerCase().match('m')
        }
    }
}

export default new U();