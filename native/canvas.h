#include <emscripten.h>
#include <string>

#ifndef CANVAS_H
#define CANVAS_H

struct Color  {
    Color(unsigned char r, unsigned char g, unsigned char b, unsigned char a = 255):r(r), g(g), b(b), a(a) {}
    Color(const Color& color): r(color.r), g(color.g), b(color.b), a(color.a) {}
    Color& operator=(const Color &other){
        r = other.r;
        g = other.g;
        b = other.b;
        a = other.a;
        return *this;
    }
    unsigned char r,g,b,a;
};

class Canvas {
public:
    void clearRect(int x, int y, float width, float height) const;
    void fillRect(int x, int y, int width, int height) const;
    void strokeRect(int x, int y, float width, float height) const;
    
    void fillText(int x, int y, const std::string &text) const;

    void setLineWidth(float width);
    void setFillColor(Color color);
    void setStrokeColor(Color color);
};

#endif