#include "canvas.h"

EM_JS(void, callFillRect, (int x, int y, float width, float height), {
  alert('hello world!');
  console.log(document);
});

EM_JS(void, callFillText, (int x, int y), {
  alert('hello world!');
  console.log(document);
});

EM_JS(void, callClearRect, (int x, int y, int width, int height), {
  //clearRect(x, y, width, height);
});

void Canvas::fillRect(int x, int y, int width, int height) const
{
    callFillRect(x, y, width, height);
}

void Canvas::fillText(int x, int y, const std::string &text) const
{
    callFillText(x, y);
}

void Canvas::setLineWidth(float width) {

}

void Canvas::clearRect(int x, int y, float width, float height) const {
    callClearRect(x, y, width, height);
}