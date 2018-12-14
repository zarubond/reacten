#include "component.h"
#include <stdio.h>

class Text: public Component {
    public:
    Text() {
        printf("text widget");
    }
};