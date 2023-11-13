const LoaderRegistry = JSON.parse( FileLib.read('ixMod','src/loaderRegistry.json') )

const Modules = {}

LoaderRegistry.forEach(fileName => {
    const ModuleData = require(`./modules/${fileName}`)
    ModuleData.id = /([^\/]+$)/.exec(fileName)[1]

    Modules[fileName] = ModuleData    
});



export { Modules }