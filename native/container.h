#include "components/component.h"
#include "canvas.h"
#include <vector>

class Container
{
public:
    Container(): root(YGNodeNew()) {}
    ~Container() {
        YGNodeFree(root);
    }
    void appendChild(Component *component)
    {
        YGNodeInsertChild(root, component->node(), children.size());
        children.push_back(component);
        resize(800, 600);
    }

    void render()
    {
        resize(800, 600);
        canvas.clearRect(YGNodeLayoutGetLeft(root), YGNodeLayoutGetTop(root), YGNodeLayoutGetWidth(root), YGNodeLayoutGetHeight(root));
        printf("component: %f %f %f %f\n", YGNodeLayoutGetLeft(root), YGNodeLayoutGetTop(root), YGNodeLayoutGetWidth(root), YGNodeLayoutGetHeight(root));
        for (Component *child: children) {
            child->render(canvas);
        }
    }

    void onClick(int x, int y)
    {
    }

    void onKeyPress(int keyCode)
    {
    }

    void resize(float width, float height) 
    {
        //YGNodeStyleSetWidth(root, width);
        //YGNodeStyleSetHeight(root, height);
        YGNodeCalculateLayout(root, width, height, YGDirection::YGDirectionLTR);
        YGNodePrint(root, YGPrintOptionsChildren);
    }

    void onClick(float x, float y) {
        if (x >= 0 && y >= 0 && x <= YGNodeLayoutGetWidth(root) && y <= YGNodeLayoutGetHeight(root)) {
            for (Component *child: children) {
                if (child->onClick(x, y))  {
                    break;
                }
            }
        }
    }

private:
    std::vector<Component *> children;
    YGNode *root;
    Canvas canvas;
};