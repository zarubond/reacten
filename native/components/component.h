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
    Color borderColor = Color(0,0,0,0);
    Color backgroundColor = Color(0,0,0,0);

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
        printf("props: t:%f b:%f r:%f l:%f w:%f h:%f\n", props.top, props.bottom, props.right, props.left, props.width, props.height);
        YGNodeStyleSetWidth(_node, props.width);
        YGNodeStyleSetHeight(_node, props.height);
        YGNodeStyleSetPosition(_node, YGEdge::YGEdgeRight, props.right);
        YGNodeStyleSetPosition(_node, YGEdge::YGEdgeLeft, props.left);
        YGNodeStyleSetPosition(_node, YGEdge::YGEdgeTop, props.top);
        YGNodeStyleSetPosition(_node, YGEdge::YGEdgeBottom, props.bottom);
        memcpy(&(this->props), &props, sizeof(this->props));
    }

    void appendChild(Component *component) 
    { 
        _node->insertChild(component->node(), children.size());
        children.push_back(component);
    }

    virtual void render(Canvas &canvas)
    {
        //printf("%f %f %f %f\n", YGNodeLayoutGetLeft(_node), YGNodeLayoutGetTop(_node), YGNodeLayoutGetWidth(_node), YGNodeLayoutGetHeight(_node));
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
        
        if (props.borderWidth > 0) {
            canvas.setLineWidth(props.borderWidth);
        }
    	float w = YGNodeLayoutGetWidth(_node);
        float h = YGNodeLayoutGetHeight(_node);
        
        printf("%f %f %f %f \n", YGNodeLayoutGetLeft(_node), YGNodeLayoutGetRight(_node), w, h);
        printf("%d %d %d %d \n", int(props.backgroundColor.r), int(props.backgroundColor.g), int(props.backgroundColor.b), int(props.backgroundColor.a));
        if (props.backgroundColor.a > 0 && w != YGUndefined && h != YGUndefined) {
            canvas.setFillColor(props.backgroundColor);
            canvas.fillRect(YGNodeLayoutGetLeft(_node), YGNodeLayoutGetRight(_node), 50, 50);//YGNodeLayoutGetWidth(_node), YGNodeLayoutGetHeight(_node));
        }
    }

private:
    std::vector<Component *> children;
    Props props;
    YGNode *_node;
};

#endif