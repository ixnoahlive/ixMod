import Input from "../../utils/types/Input"

const isHoveredField = net.minecraft.client.gui.GuiButton.class.getDeclaredField("field_146123_n");
isHoveredField.setAccessible(true);

// the real shit down here

const BBGui = new Gui();
BBGui.addButton(1, Renderer.screen.getWidth()/2-64, Renderer.screen.getHeight()/2, 128, 20, "Apply NBT");

BBGui.registerClicked((mouseX, mouseY, mouseButton) => {
    if (isHoveredField.get(BBGui.getButton(1))) {
        ChatLib.chat('hiya :3')
    }
})

const NameField = new Input(Renderer.screen.getWidth()/2-64, Renderer.screen.getHeight()/2-60, 128, 20)
NameField.setEnabled(true)
NameField.setText('Button Name')

const LoreField = new Input(Renderer.screen.getWidth()/2-64, Renderer.screen.getHeight()/2-30, 128, 20)
LoreField.setEnabled(true)
LoreField.setText('Button Description')

module.exports = {
    name: 'Button Builder',
    description: 'Allows you to build simple Hypixel-styled UI elements for your Custom Menu. Open editor with the &e/btn &rcommand!',
    subcategory: 'Items',

    options: [],

    registers: [
        {
            name: 'command',
            run() {
                BBGui.open()
            }, create(trigger) trigger.setName('btn')
        },
        {
            name: 'renderOverlay',
            run() {
                if (BBGui.isOpen()) {
                    NameField.render()
                    LoreField.render()
                }  
            }
        }
    ]
}