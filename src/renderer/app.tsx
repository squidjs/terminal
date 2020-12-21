import React, { Component } from 'react';
import './app.css';
import Terminal from './terminals/Terminal';

export default class App extends Component {

    componentDidMount() {

        new Terminal();
    }

    render() {

        return (
            <div id="terminal"></div>
        )
    }
}
