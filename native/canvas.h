#include <emscripten.h>
#include <string>

#ifndef CANVAS_H
#define CANVAS_H

class Canvas {
public:
    void clearRect(int x, int y, float width, float height) const;
    void fillRect(int x, int y, int width, int height) const;
    
    void fillText(int x, int y, const std::string &text) const;
    void setLineWidth(float width);
    
};

#endif