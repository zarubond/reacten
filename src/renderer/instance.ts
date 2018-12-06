import Yoga, { Node, YogaNode, Layout } from 'yoga-layout';
import {FlexBoxStyle} from '../components/view';

type Props = { [key: string]: any };
type Type = string; // number;

//https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
export class TextInstance {
    _node = Node.create();
    private _children: (Instance | TextInstance)[] = [];
    private _text: string;
  
    constructor(text: string) {
        this._text = text;
        this._node.setHeight(18);
        this._node.setWidth(100);
    }
  
    appendChild(child: Instance | TextInstance) {
        this._children.push(child);
    }
  
    render(context: CanvasRenderingContext2D) {
    }
  
    onClick(ev: MouseEvent) {}
    onWheel(ev: WheelEvent) {}
    onKeyPress(ev: KeyboardEvent) {}

    updateProps(props: Props) {
    }
}

export class Instance {
    _props: Props;
    _node: YogaNode;
    _hasFocus = false;
    protected _children: (Instance | TextInstance)[] = [];
    private _type: Type;
  
    constructor(type: Type, props: Props) {
        this._node = Node.create();
        this._props = props;
        this._type = type;
        if (this._props.style) {
            this._updateFlexBox(this._props);
        }
    }
  
    appendChild(child: Instance | TextInstance) {
        this._node.insertChild(child._node, this._children.length);
        this._children.push(child);
    }

    private _updateFlexBox(box: FlexBoxStyle) {
        box.width ? this._node.setWidth(box.width) : undefined;
        box.height ? this._node.setHeight(box.height) : undefined;
        box.borderWidth ? this._node.setBorder(Yoga.EDGE_ALL, box.borderWidth * 2) : undefined;
    }

    updateProps(props: Props) {
        if (props.style) {
            this._updateFlexBox(props.style);
        }
        return false;
    }
  
    render(context: CanvasRenderingContext2D) {
        if (this._props.style) {
            const layout = this._node.getComputedLayout();
            this._renderBoundBox(context, layout);

            if (this._props.style.color) {
                context.fillStyle = this._props.style.color;
            }
        }

        if (this._type === 'text') {
            context.font = "18px Arial";
            this._node.setWidth(context.measureText(this._props.children).width);
            
            const layout = this._node.getComputedLayout();
            context.fillText(this._props.children, layout.left, layout.top + layout.height);
        }
  
        for (let index = 0; index < this._children.length; index++) {
            this._children[index].render(context);
        }
    }

    protected _renderBoundBox(context: CanvasRenderingContext2D, layout: Layout) {

        if (this._props.style.borderWidth) {
            context.strokeStyle = this._props.style.borderColor;
            context.lineWidth = this._props.style.borderWidth * 2;
            context.strokeRect(layout.left, layout.top, layout.width, layout.height);

            if (this._props.style.backgroundColor) {
                context.fillStyle = this._props.style.backgroundColor;
    
                context.fillRect(
                    layout.left + context.lineWidth / 2,
                    layout.top + context.lineWidth / 2,
                    layout.width - context.lineWidth,
                    layout.height - context.lineWidth
                );
            }
        } else {
            if (this._props.style.backgroundColor) {
                context.fillStyle = this._props.style.backgroundColor;
    
                context.fillRect(
                    layout.left,
                    layout.top,
                    layout.width,
                    layout.height
                );
            }
        }
    }
  
    onClick(ev: MouseEvent) {
        const layout = this._node.getComputedLayout();
        if (
            ev.clientX >= layout.left &&
            ev.clientX <= layout.height &&
            ev.clientY >= layout.top &&
            ev.clientY <= layout.bottom
        ) {
            
            for (let index = 0; index < this._children.length; index++) {
                if (this._children[index].onClick(ev)) {
                    return true;
                }
            }

            this._hasFocus = true;

            if (this._props.onClick) {
                return this._props.onClick(ev);
            }
        }
    }

    onWheel(ev: WheelEvent) {
        const layout = this._node.getComputedLayout();
        if (
            ev.clientX >= layout.left &&
            ev.clientX <= layout.height &&
            ev.clientY >= layout.top &&
            ev.clientY <= layout.bottom
        ) {
        }
    }

    onKeyPress(ev: KeyboardEvent)  {
        
        if (this._hasFocus) {

        } else {
            for (let index = 0; index < this._children.length; index++) {
                this._children[index].onKeyPress(ev);
            }
        }
    }
}

export class ButtonInstance extends Instance {
    render(context: CanvasRenderingContext2D) {
        const layout = this._node.getComputedLayout();
        if (this._props.style) {
            this._renderBoundBox(context, layout);
            if (this._props.style.color) {
                context.fillStyle = this._props.style.color;
            } else {
                context.fillStyle = 'black';
            }
        } else {
            context.fillStyle = 'black';
        }

        
        context.font = "18px Arial";
        this._node.setWidth(context.measureText(this._props.title).width);
        
        context.fillText(this._props.title, layout.left, layout.top + layout.height - (layout.height - 18) / 2);
    }
}

export class TextInputInstance extends Instance {
    private _text = '';
    private _textWidth: undefined | number;
    onKeyPress(ev: KeyboardEvent)  {
        if (ev.keyCode === 8) {
            this._text = this._text.substring(0, this._text.length - 1);
        } else {
            this._text += ev.key;
        }
        this._textWidth = undefined;
    }

    render(context: CanvasRenderingContext2D) {
        context.font = "18px Arial";
        if (!this._textWidth) {
            this._textWidth = context.measureText(this._text).width;
            this._node.setHeight(18 + 5);
        }
        const layout = this._node.getComputedLayout();

        let x = layout.left, y = layout.top + layout.height - 5;
        if (this._props.style) {
            this._renderBoundBox(context, layout);
            if (this._props.style.borderWidth) {
                x += this._props.style.borderWidth;
                y -= this._props.style.borderWidth;
            }
        }

        context.save();
        context.rect(layout.left, layout.top, layout.width, layout.height);
        context.clip();

        context.fillStyle = 'black';
            
        if (performance.now() % 1000 > 500) {
            context.fillRect(
                layout.left + this._textWidth,
                layout.top,
                1,
                layout.height
            );
        }

        if(this._props.style) {
            if (this._props.style.color) {
                context.fillStyle = this._props.style.color;
            }
        }
        
        context.fillText(this._text, x, y);
        context.restore();
    }
}