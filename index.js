import { Registers } from "./src/config"
import { Modules }   from "./src/loader";
import   Config      from './src/config';

Object.values(Modules).forEach(ModuleData => {
    Registers[ModuleData.id] = []
    if (Config.modules[ModuleData.id]) {
        ModuleData.registers.forEach(registerData => {
            // cursed as fuck but it will do
            const BuiltTrigger = register(registerData.name, (...args) => { 
                registerData.run({
                    options: Config.options, 
                    modules: Config.modules
                }, ...args) 
            })
    
            registerData?.create(BuiltTrigger)
    
            Registers[ModuleData.id].push(BuiltTrigger)
        })
    }
});

register('command', () => {
    Config.openGUI()
}).setCommandName('ixmod').setAliases(['ix','ixm'])