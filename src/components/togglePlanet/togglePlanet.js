import React, { Component } from 'react';

export default class TogglePlanet  extends Component{
    constructor(props) {
        super(props)
        this.state = {
            toggle: false
        }
        this.onToggleClick = this.onToggleClick.bind(this)
    }
    onToggleClick() {
        this.props.Toggle(this.state.toggle)
    }
    render () {
        return (
            <button
                className='btn btn-secondary'
                onClick={this.onToggleClick}>Toggle Random Planet
            </button>
        )
    }
    
}
