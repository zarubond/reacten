import React, { Component } from 'react';
//import View, {Style as StyleView, Props as ViewProps} from './view';

interface StyleText {
    color?: string;
    fontSize?: number;
    fontStyle?: 'normal' | 'italic';
    fontFamily?: string;
    backgroundColor?: string;
    height?: number;
}

interface Props {
    style?: StyleText
}

interface State {

}

export default class Text extends Component<Props, State> {
    render() {
        return React.createElement('text', this.props);
    }
}