#include "component.h"
#include <stdio.h>

class TextInput: public Component {
    public:
    TextInput(): Component() {
        printf("textinput");
    }
};