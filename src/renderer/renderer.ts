import ReactReconciler, { Update } from "react-reconciler";
import { Instance, TextInstance, TextInputInstance, ButtonInstance } from "./instance";
import Container from "./container";

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

type Props = { [key: string]: any };

type Type = string; // number;

type Deadline = number;

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

        if (type === 'textinput') {
            return new TextInputInstance(type, props);
        } else if (type === 'button') {
            return new ButtonInstance(type, props);
        }
        return new Instance(type, props);
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
        return new TextInstance(text);
    },
    commitMount: (
        instance: Instance,
        type: Type,
        newProps: Props,
        internalInstanceHandle: OpaqueHandle
    ) => {},
    appendInitialChild: (parent: Instance, child: Instance | TextInstance) => {
        parent.appendChild(child);
    },
    appendChild(parent: Instance, child: Instance | TextInstance) {
        parent.appendChild(child);
    },
    finalizeInitialChildren: (
        parentInstance: Instance,
        type: Type,
        props: Props,
        rootContainerInstance: Container,
        hostContext: HostContext
    ) => {
        rootContainerInstance.updateLayout();
        return true;
    },
    supportsMutation: true,
    isPrimaryRenderer: true,
    supportsPersistence: false,
    supportsHydration: false,
    appendChildToContainer: (
        container: Container,
        child: Instance | TextInstance
    ) => {
        container.appendChild(child);
    },
    prepareUpdate(
        instance: Instance,
        type: Type,
        oldProps: Props,
        newProps: Props,
        rootContainerInstance: Container,
        hostContext: HostContext
    ) {
        if (instance.updateProps(newProps)) {
      
        }

        rootContainerInstance.updateLayout();
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
    commitTextUpdate(textInstance: any, oldText: string, newText: string) {},
    removeChild(parentInstance: any, child: any) {}
};

const ReactReconcilerInst = ReactReconciler(hostConfig);
export default {
  render: (
    reactElement: any,
    domElement: any,
    callback: () => void | null | undefined
  ) => {
    // Create a root Container if it doesnt exist
    const container = new Container();
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

    canvas.onclick = container.onClick;
    canvas.onscroll = container.onScroll;
    canvas.onwheel = container.onWheel;
    document.onkeypress = container.onKeyPress;
    context = canvas.getContext("2d");
    domElement.appendChild(canvas);
    const step = () => {
      if (context === null) {
        return 0;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      container.render(context);

      window.requestAnimationFrame(step);
      //window.setTimeout(step, 1000);
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
