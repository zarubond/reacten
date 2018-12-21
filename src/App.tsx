import React, { Component } from "react";
import "./App.css";
import Text from './components/text';
import View from './components/view';
import TextInput from './components/textinput';
import Button from './components/button';

interface State {
    color: string;
    height: number;
}

class App extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {color: '#ff0000', height: 20};
    }
  
    render() {    
        return (<View>
            <Text style={{ color: '#ffff00', backgroundColor: '#ff000' }}>Text Text Text</Text>
            <Text style={{ color: '#ffff00', backgroundColor: '#000000', height: 150 }}>Text Text Text</Text>
            <View style={{height: 150, backgroundColor: '#0000ff'}}/>
            <TextInput style={{backgroundColor: '#ffa500', color: '#000000', width: 200, borderColor: '#00ff00', borderWidth: 1}}/>
            <Button title="Button" style={{height: 50, backgroundColor: '#654321'}}/>
        </View>
        );
    }

    componentDidMount( ) {
        const step = () => {
            this.setState({height: this.state.height + 1});
            //window.setTimeout(step, 1000);
        };
        //window.setTimeout(step, 10);
    }
}

export default App;
