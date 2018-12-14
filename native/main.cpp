#include <cstdio>
#include <emscripten.h>
#include "jsapi.h"


EM_JS(void, alertx, (), {
  alert('hello world!');
});
int main()
{
    alertx();
    printf("hello, world!\n");
    return 0;
}
