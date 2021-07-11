import React, { Component } from 'react';
import PersonDetails from '../personDetails';
import ItemList from '../ItemList';
import WarningError from '../error';
import './peoplePage.css'
import SwapiService from '../../services/swapiService';

export default class PeoplePage extends Component {

    swapi = new SwapiService()
    state = {
        selectedPersone: null,
        hasError: false
    }
    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }
    onSelectedItem = (id)=> {
        this.setState({
            selectedPersone: id
        })
    }
    render () {
        if (this.state.hasError) {
            return <WarningError/>
        }
        return (
            <div className='details-block'>
                <ItemList onClickItem = {this.onSelectedItem} 
                getDate = {this.swapi.getAllPeople}
                renderItem = {(item) => `${item.name} (age: ${item.age})` }/>
                <PersonDetails personId = {this.state.selectedPersone}/>
            </div>
        )
    }
}