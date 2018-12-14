#include <emscripten.h>
#include "../yoga/Yoga.h"
#include "../yoga/YGNode.h"
#include "../canvas.h"
#include <vector>

#ifndef COMPONENT_H
#define COMPONENT_H

struct Props
{
    float width = YGUndefined;
    float height = YGUndefined;
    float top = YGUndefined;
    float bottom = YGUndefined;
    float right = YGUndefined;
    float left = YGUndefined;

    int zIndex = INT_MIN;
    int borderWidth = INT_MIN;
    int borderColor = INT_MIN;
    int backgroundColor = INT_MIN;

    bool onClick = false;
};

class Component
{
public:
    Component(): _node(YGNodeNew())
    {
        printf("component");
    }

    ~Component() 
    {
        YGNodeFree(_node);
    }

    void updateProps(const Props &props)
    {
        YGNodeStyleSetWidth(_node, props.width);
        YGNodeStyleSetHeight(_node, props.height);
        YGNodeStyleSetPosition(_node, YGEdge::YGEdgeRight, props.right);
        YGNodeStyleSetPosition(_node, YGEdge::YGEdgeLeft, props.left);
        YGNodeStyleSetPosition(_node, YGEdge::YGEdgeTop, props.top);
        YGNodeStyleSetPosition(_node, YGEdge::YGEdgeBottom, props.bottom);
        this->props = props;
    }

    void appendChild(Component *component) 
    { 
        _node->insertChild(component->node(), children.size());
        children.push_back(component);
    }

    virtual void render(Canvas &canvas)
    {
        renderRect(canvas);
        for(Component * child: children) {
            child->render(canvas);
        }
    }
    
    YGNode *node() {
        return _node;
    }

    Component * onClick(float x, float y) {
        if (x >= 0 && y >= 0 && x <= YGNodeLayoutGetWidth(_node) && y <= YGNodeLayoutGetHeight(_node)) {
            
            for (Component *child: children) {
                if (child->onClick(x, y))  {
                    return child;
                }
            }
            /*if (props.onClick) {
                //trigger props
            }*/
        }
        return nullptr;
    }

protected:
    void renderRect(Canvas &canvas) {
        canvas.setLineWidth(10);
        canvas.fillRect(0, 0, 800, 600);
    }

private:
    std::vector<Component *> children;
    Props props;
    YGNode *_node;
};

#endif