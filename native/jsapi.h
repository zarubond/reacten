#include <emscripten.h>
#include "./components/component.h"
#include "./components/text.h"
#include "./components/button.h"
#include "./components/textinput.h"
#include "./container.h"

enum class Components: int {
    UNKNOWN = 0,
    Text,
    TextInput,
    Button
};

Container container;

#ifdef __cplusplus  
extern "C" {
#endif

    EMSCRIPTEN_KEEPALIVE
    Component * createInstance(Components type)
    {
        Component *child;
        switch (type)
        {
        case Components::Text:
            child = new Text;
            break;
        case Components::Button:
            child = new Button;
            break;
        case Components::TextInput:
            child = new TextInput;
            break;
        }

        return child;
    }

    EMSCRIPTEN_KEEPALIVE
    void appendChild(Component *parent, Component *child) {
        parent->appendChild(child);
    }    
    
    EMSCRIPTEN_KEEPALIVE
    void containerAppendChild(Component *child) {
        container.appendChild(child);
    }

    void updateProps(Component *component, float width, float height, float top, float bottom, float right, float left, int zIndex) {
        Props props;

        props.width = width;
        props.height = height;
        props.top = top;
        props.bottom = bottom;
        props.right = right;
        props.left = left;
        props.zIndex = INT_MIN;
    //int borderWidth = INT_MIN;
    //int borderColor = INT_MIN;

        component->updateProps(props);
    }

    EMSCRIPTEN_KEEPALIVE
    void render() {
        container.render();
    }

// EVENTS
    EMSCRIPTEN_KEEPALIVE
    void onKeyPress() {

    }

    EMSCRIPTEN_KEEPALIVE
    void onClick() {

    }

    EMSCRIPTEN_KEEPALIVE
    void onMouseMove() {

    }
#ifdef __cplusplus
}
#endif