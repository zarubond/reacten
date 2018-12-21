import React, { Component } from 'react';

export interface FlexBoxStyle {
    width?: number;
    height?: number;
    top?: number;
    bottom?: number;
    right?: number;
    left?: number;
    zIndex?: number;
    borderWidth?: number;
    borderColor?: string;
    backgroundColor?: string;
}

export interface Style extends FlexBoxStyle {
    opacity?: number;
}

export interface Props {
    style?: Style;
    onClick?: (ev: MouseEvent) => void;
    _handlers?: {onKeyPress: (ev: KeyboardEvent) => void}
}

interface State {

}

export default class View<P = Props, S = State> extends Component<P, S> {
    // @ts-ignore
    render() {
        return React.createElement('view', this.props);
    }
}