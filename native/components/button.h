#include "component.h"
#include <stdio.h>

class Button: public Component {
    public:
    Button() {
        printf("button");
    }
};