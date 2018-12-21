#include "canvas.h"

EM_JS(void, callFillRect, (int x, int y, float width, float height), {
    document.canvasContext.fillRect(x, y, width, height);
});

EM_JS(void, callStrokeRect, (int x, int y, float width, float height), {
    document.canvasContext.strokeRect(x, y, width, height);
});

EM_JS(void, callFillText, (int x, int y), {
    alert('hello world!');
    console.log(document);
});

EM_JS(void, callClearRect, (int x, int y, int width, int height), {
    document.canvasContext.clearRect(x, y, width, height);
});

EM_JS(void, callLineWidth, (float width), {
    document.canvasContext.lineWidth = width;
});

EM_JS(void, callFillColor, (int r, int g, int b, float a), {
    document.canvasContext.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
});

EM_JS(void, callStrokeColor, (int r, int g, int b, float a), {
    document.canvasContext.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
});

void Canvas::fillRect(int x, int y, int width, int height) const
{
    callFillRect(x, y, width, height);
}

void Canvas::strokeRect(int x, int y, float width, float height) const
{
    callStrokeRect(x, y, width, height);
}

void Canvas::fillText(int x, int y, const std::string &text) const
{
    callFillText(x, y);
}

void Canvas::setLineWidth(float width)
{
    callLineWidth(width);
}

void Canvas::clearRect(int x, int y, float width, float height) const
{
    callClearRect(x, y, width, height);
}

void Canvas::setFillColor(Color color) {
    callFillColor(color.r, color.g, color.b, float(color.a) / 255);
}

void Canvas::setStrokeColor(Color color) {
    callStrokeColor(color.r, color.g, color.b, float(color.a) / 255);
}