#include <emscripten.h>
#include "./components/component.h"
#include "./components/text.h"
#include "./components/button.h"
#include "./components/textinput.h"
#include "./container.h"

enum class Components: int {
    UNKNOWN = 0,
    View,
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
        case Components::View:
            child = new Component;
        default:
            child = new Component;
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

    EMSCRIPTEN_KEEPALIVE
    void updateProps(Component *component, float width, float height, float top, float bottom, float right, float left, int zIndex, 
        unsigned char bgR, unsigned char bgG, unsigned char bgB, float borderWidth, 
        unsigned char brR, unsigned char brG, unsigned char brB) {
        Props props;
        printf("%f %f %f %f\n", width, height, top, bottom);
        props.width = isnan(width) ? YGUndefined : width;
        props.height = isnan(height) ? YGUndefined : height;
        props.top = isnan(top) ? YGUndefined : top;
        props.bottom = isnan(bottom) ? YGUndefined : bottom;
        props.right = isnan(right) ? YGUndefined : right;
        props.left = isnan(left) ? YGUndefined : left;
        props.zIndex = INT_MIN;
        props.borderWidth = borderWidth;
        props.borderColor = Color(brR, brG, brB);
        props.backgroundColor = Color(bgR, bgG, bgB);

        component->updateProps(props);
    }

    EMSCRIPTEN_KEEPALIVE
    void render() {
        printf("render\n");
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