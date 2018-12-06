import React from 'react';
import View, {Style as StyleView, Props as ViewProps} from './view';

interface Props extends ViewProps {
    title: string;
    onPress?: (ev: MouseEvent) => void;
}

interface State {

}

export default class Button extends View<Props, State> {
    // @ts-ignore
    render() {
        return React.createElement('button', this.props);
    }
}