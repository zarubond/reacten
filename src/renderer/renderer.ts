import ReactReconciler, { Update } from "react-reconciler";
import {FlexBoxStyle} from '../components/view';
import { any } from "prop-types";
import { Renderer } from "react-dom";
//import { Instance, TextInstance, TextInputInstance, ButtonInstance } from "./instance";
//import Container from "./container";
// @ts-ignore
//const wasm = require("./cpp_with_emscripten_val.js");
//const wasm = require("../reacten.js").default;
//https://github.com/snowcoders/boilerplate-emscripten-typescript

// @ts-ignore
let wasm: any = undefined;
const rootHostContext = {};
const childHostContext = {};

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;

class HostContext {}

class PublicInstance {}

class NoTimeout {}

class TimeoutHandle {}

class OpaqueHandle {}

class UpdatePayload {}

interface Props {
    style?: FlexBoxStyle;
}

type Type = string; // number;

type Deadline = number;

type Instance = number;

type Container = number;

type TextInstance = number;

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r: 0, g: 0, b: 0};
}

enum Components {
    UNKNOWN = 0,
    View,
    Text,
    TextInput,
    Button
}


const hostConfig: ReactReconciler.HostConfig<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  {},
  PublicInstance,
  HostContext,
  UpdatePayload,
  {},
  TimeoutHandle,
  NoTimeout
> = {
    now: Date.now,
    getRootHostContext: () => {
        return rootHostContext;
    },
    prepareForCommit: () => {},
    resetAfterCommit: () => {},
    getChildHostContext: () => {
        return childHostContext;
    },
    shouldSetTextContent: (type: Type, props: Props) => {
        return false;
    },
    createInstance: (
        type: Type,
        props: Props,
        rootContainerInstance: Container,
        hostContext: HostContext,
        internalInstanceHandle: OpaqueHandle
    ) => {
        Object.keys(props).forEach(propName => {
        const propValue = props[propName];
        if (propName === "children") {
            if (type !== "text") {
                if (typeof propValue === "string" || typeof propValue === "number") {
                    throw new Error("Text strings must be rendered within a <Text> component.");
                }
/*
          if (propValue instanceof Array) {
            propValue.forEach(item => {
              if (typeof item === "string") {
                throw new Error(
                  "Text strings must be rendered within a <Text> component."
                );
              }
            });
          }*/
                }
            }
        });

    var instance = 0;
        if (type === 'textinput') {
            instance = wasm._createInstance(Components.TextInput);
        } else if (type === 'button') {
            instance = wasm._createInstance(Components.Button);
        } else if (type === 'view') {
            instance = wasm._createInstance(Components.View);
        } else {
            instance = wasm._createInstance(Components.UNKNOWN);
        }
        if (props.style) {
            const style = props.style;
            const backgroundColor = style.backgroundColor ? hexToRgb(style.backgroundColor): {r: 0, g: 0, b: 0};
            const borderColor = style.borderColor ? hexToRgb(style.borderColor): {r: 0, g: 0, b: 0};
            console.log(props);
        
            wasm._updateProps(instance, style.width, style.height, style.top, style.bottom, style.right, style.left, style.zIndex, 
                backgroundColor.r, backgroundColor.g, backgroundColor.b, style.borderWidth, 
                borderColor.r, borderColor.g, borderColor.b);
        }
        return instance;
    },
    getPublicInstance: (instance: Instance | TextInstance) => {
        return new PublicInstance();
    },
    shouldDeprioritizeSubtree: (type: Type, props: Props) => false,
    scheduleDeferredCallback: (
        callback: (deadline: ReactReconciler.Deadline) => void,
        options?: { timeout: number }
    ) => {},
    cancelDeferredCallback: (callbackID: any) => {},
    setTimeout: (handler: (...args: any[]) => void, timeout: number) => {
        return new NoTimeout();
    },
    clearTimeout: (handle: TimeoutHandle | NoTimeout) => {},
    noTimeout: new NoTimeout(),
    createTextInstance: (
        text: string,
        rootContainerInstance: Container,
        hostContext: HostContext,
        internalInstanceHandle: OpaqueHandle
    ) => {
        return wasm._createInstance(Components.Text);
    },
    commitMount: (
        instance: Instance,
        type: Type,
        newProps: Props,
        internalInstanceHandle: OpaqueHandle
    ) => {},
    appendInitialChild: (parent: Instance, child: Instance | TextInstance) => {
        wasm._appendChild(parent, child);
    },
    appendChild(parent: Instance, child: Instance | TextInstance) {
        wasm._appendChild(parent, child);
    },
    finalizeInitialChildren: (
        parentInstance: Instance,
        type: Type,
        props: Props,
        rootContainerInstance: Container,
        hostContext: HostContext
    ) => {
        //rootContainerInstance.updateLayout();
        return true;
    },
    supportsMutation: true,
    isPrimaryRenderer: true,
    supportsPersistence: false,
    supportsHydration: false,
    appendChildToContainer: (container: Container, child: Instance | TextInstance) => {
        wasm._containerAppendChild(child);
    },
    prepareUpdate(
        instance: Instance,
        type: Type,
        oldProps: Props,
        newProps: Props,
        rootContainerInstance: Container,
        hostContext: HostContext
    ) {
        if (newProps.style) {
            const style = newProps.style;
            const backgroundColor = style.backgroundColor ? hexToRgb(style.backgroundColor): {r: 0, g: 0, b: 0};
            const borderColor = style.borderColor ? hexToRgb(style.borderColor) : {r: 0, g: 0, b: 0};
            wasm._updateProps(instance, style.width, style.height, style.top, style.bottom, style.right, style.left, style.zIndex, 
                backgroundColor.r, backgroundColor.g, backgroundColor.b, style.borderWidth, 
                borderColor.r, borderColor.g, borderColor.b);
        }
        return true;
    },
    commitUpdate(
        instance: Instance,
        updatePayload: UpdatePayload,
        type: Type,
        oldProps: Props,
        newProps: Props,
        internalInstanceHandle: OpaqueHandle
    ) {},
    commitTextUpdate(textInstance: TextInstance, oldText: string, newText: string) {},
    removeChild(parentInstance: Instance, child: Instance | TextInstance) {}
};

const ReactReconcilerInst = ReactReconciler(hostConfig);
class ReactenRenderer {
    static wasm: any;
    static render(
        reactElement: any,
        domElement: any,
        callback: () => void | null | undefined
    ) {
        // Create a root Container if it doesnt exist
        const container = 0;
        if (!domElement._rootContainer) {
            domElement._rootContainer = ReactReconcilerInst.createContainer(
            container,
            false,
            false
        );
    }
    canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;

    console.log(canvas);
    console.log(this.wasm);
    wasm = this.wasm;

    canvas.onclick = () => {
        this.wasm._onClick();
    }
    canvas.onscroll = () => {
        this.wasm._onScroll();
    }
    canvas.onwheel = () => {
        this.wasm._onWheel();
    }
    //document.onkeypress = container.onKeyPress;
    context = canvas.getContext("2d");
    document['canvasContext'] = context;
    domElement.appendChild(canvas);

    const step = () => {
      if (context === null) {
        return 0;
      }

      wasm._render();

      //window.requestAnimationFrame(step);
      window.setTimeout(step, 1000);
    };

    window.requestAnimationFrame(step);

    // update the root Container
    return ReactReconcilerInst.updateContainer(
      reactElement,
      domElement._rootContainer,
      null,
      callback
    );
  }
};

export default ReactenRenderer;
