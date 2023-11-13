export class GamemodeError extends Error {
    constructor(message) {
        switch(message) {
            case 0: super('Player must be in Survival Mode, but is not!');
            case 1: super('Player must be in Creative Mode, but is not!');
            case 2: super('Player must be in Adventure Mode, but is not!');
            
            default: super(message)
        }

        this.name = "GamemodeError"
    }
}