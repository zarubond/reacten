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
        this.state = {color: 'red', height: 20};
    }
  
    render() {    
        return (<View>
            <Text style={{ color: 'yellow', backgroundColor: 'red' }}>Text Text Text</Text>
            <Text style={{ color: 'yellow', backgroundColor: 'black', height: 150 }}>Text Text Text</Text>
            <View style={{height: 150, backgroundColor: 'blue'}}/>
            <TextInput style={{backgroundColor: 'orange', color: 'black', width: 200, borderColor: 'green', borderWidth: 1}}/>
            <Button title="Button" style={{height: 50, backgroundColor: 'brown'}}/>
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
