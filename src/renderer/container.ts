import {Instance, TextInstance} from './instance';
import yoga, { Node, YogaNode, YogaDisplay } from "yoga-layout";

export default class Container {
    private _children: (Instance | TextInstance)[] = [];
    private _root = Node.create();
    private _lastFPS = performance.now();
    private _frameCount = 0;
    private _frameShow = 60;

    constructor() {
        this._root.setHeight(600);
        this._root.setWidth(800);
        this._root.setDisplay(yoga.DISPLAY_FLEX);
    }
  
    appendChild(child: Instance | TextInstance) {
        this._root.insertChild(child._node, this._children.length);
        this._children.push(child);
    }
  
    updateLayout() {
        this._root.calculateLayout(800, 600, yoga.DIRECTION_LTR);
    }
  
    private _renderFPS(context: CanvasRenderingContext2D) {
        context.font = "18px Arial";
        if (performance.now() - this._lastFPS > 1000) {
            this._lastFPS = performance.now();
            this._frameShow = this._frameCount;
            this._frameCount = 0;
        }
  
        const text = "FPS " + this._frameShow;
        const width = context.measureText(text).width;
        const layout = this._root.getComputedLayout();
  
        context.fillText(text, layout.width - width, 18);
        this._frameCount++;
    }
  
    render(context: CanvasRenderingContext2D) {
        for (let index = 0; index < this._children.length; index++) {
            this._children[index].render(context);
        }
        this._renderFPS(context);
    }
  
    onClick = (ev: MouseEvent) => {
        ev.preventDefault();
        for (let index = 0; index < this._children.length; index++) {
            this._children[index].onClick(ev);
        }
    };
  
    onScroll = (ev: UIEvent) => {};
  
    onWheel = (ev: WheelEvent) => {
        ev.preventDefault();
        for (let index = 0; index < this._children.length; index++) {
            this._children[index].onWheel(ev);
        }
    };
  
    onKeyPress = (ev: KeyboardEvent) => {
        ev.preventDefault();
        for (let index = 0; index < this._children.length; index++) {
            this._children[index].onKeyPress(ev);
        }
    };
  }