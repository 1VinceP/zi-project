import './styles/reset.css';
import React, { Component } from 'react';
// import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import Canvas from './components/Canvas'
import './styles/App.css';

class App extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return(
            <div className='App-body' >
                <Canvas />
                {/* <h1>Hello world</h1> */}
            </div>
        )
    }
}

export default App;