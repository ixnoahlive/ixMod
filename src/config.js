import { @Vigilant, @ButtonProperty, createPropertyAttributesExt } from 'Vigilance';
import { Modules } from "./loader";

const PropertyData = Java.type("gg.essential.vigilance.data.PropertyData");
const PropertyType = Java.type("gg.essential.vigilance.data.PropertyType");
const ValueBackedPropertyValue = Java.type(
  "gg.essential.vigilance.data.ValueBackedPropertyValue"
);

let Registers = {}

@Vigilant("ixMod", "§b§lixMod §eConfig", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Modules', 'House Specific'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
})

class Config {
    constructor() {
        this.initialize(this);

        this.setCategoryDescription('Modules','&b&lixMod\n&eModules\n\nNote: Commands & Creative Tabs cannot be removed without a game restart.');
        this.setCategoryDescription('House Specific','&b&lixMod\n&eHouse Specific\n\nModules made for certain houses');

        this.modules = {} // id: boolean
        this.options = {} // id: setting: any

        Object.values( Modules ).forEach(ModuleData => {

            // Register the base toggle for the module into the settings menu
            const attributes = createPropertyAttributesExt(
                PropertyType.SWITCH,
                {
                    name:        ModuleData.name,
                    description: ModuleData.description,
                    subcategory: ModuleData.subcategory || null,
                    category:    ModuleData.category || 'Modules'
                }
            );

            const data = new PropertyData(
                attributes,
                new ValueBackedPropertyValue(false),
                this.getConfig(),
            );

            this.registerProperty(data)
            this.modules[ModuleData.id] = data.getAsBoolean() // Exposes the on/off value

            // Add the listener to register/unregister & update the value
            this.registerListener(ModuleData.name, (value) => {
                this.modules[ModuleData.id] = value
                
                if (value) {
                    Registers[ModuleData.id] = []
                    ModuleData.registers.forEach(registerData => {
                        // cursed as fuck but it will do
                        const BuiltTrigger = register(registerData.name, (...args) => { 
                            registerData.run({
                                options: this.options, 
                                modules: this.modules
                            }, ...args) 
                        })

                        registerData?.create(BuiltTrigger)

                        Registers[ModuleData.id].push(BuiltTrigger)
                    })

                    ModuleData?.onActivate()
                } else {
                    Registers[ModuleData.id]?.forEach(trigger => {
                        if ( trigger.unregister ) {
                            trigger.unregister()
                            console.log('unregistered')
                        }
                    })

                    ModuleData?.onDeactivate()
                }

            })

            this.options[ModuleData.id] = {}
            ModuleData?.options?.forEach(optionData => {
                const subAttributes = createPropertyAttributesExt(
                    PropertyType[optionData.type.toUpperCase()],
                    {
                        name: `&7${ModuleData.name}: ${optionData.name}`,
                        category: "Modules",
                        description: '&8'+optionData.description,
                        subcategory: ModuleData.subcategory || null,
                        
                        min: optionData.min ? new java.lang.Integer(optionData.min) : undefined,
                        max: optionData.max ? new java.lang.Integer(optionData.max) : undefined,
                    }
                );

                let optionvalue = false
                if (Number.isInteger(optionData.value)) optionvalue = new java.lang.Integer(optionData.value)

                const subData = new PropertyData(
                    subAttributes,
                    new ValueBackedPropertyValue(optionvalue),
                    this.getConfig(),
                )

                this.registerProperty(subData);

                this.addDependency(`&7${ModuleData.name}: ${optionData.name}`, ModuleData.name)

                this.options[ModuleData.id][optionData.id] = subData.getAsAny()
                this.registerListener(`&7${ModuleData.name}: ${optionData.name}`, (value) => {
                    this.options[ModuleData.id][optionData.id] = value
                })
            })
        })
    }
}

export { Registers }
export default new Config()