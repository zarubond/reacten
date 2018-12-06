import React from 'react';
import View, { Props as ViewProps } from './view';

interface Props extends ViewProps {
    onChange?: (text: string) => void;
    color?: string;
}

export default class TextInput extends View<Props, {}> {
    // @ts-ignore
    render() {
        return React.createElement('textinput', this.props);
    }
}