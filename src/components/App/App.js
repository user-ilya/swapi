import React,{ Component } from 'react';
import './App.css';
import Navbar from '../Navbar'
import RandomPlanet from '../randomPlanet'
import PeoplePage from '../peoplePage';
import TogglePlanet from '../togglePlanet'
import ItemList from '../ItemList';
import PersonDetails from '../personDetails'
import SwapiService from '../../services/swapiService';

export default class App extends Component {
    swapi = new SwapiService()
    constructor() {
        super()
        this.state = {
            toggle: false,
        }
        this.onToggle = this.onToggle.bind(this)
    }

    onToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render () {
        const content = this.state.toggle ? null : <RandomPlanet/>
        return (
            <div className='bg-dark'>
                <div className='container-lg'>
                    <Navbar/>
                    {content}
                    <TogglePlanet Toggle= {this.onToggle}/>
                    <PeoplePage/>
                    <div className='details-block'>
                        <ItemList onClickItem = {this.onSelectedItem} 
                        getDate = {this.swapi.getAllPlanets}
                        renderItem = {(item) => `${item.name} (diametr: ${item.diameter})` } />
                        <PersonDetails personId = {this.state.selectedPersone}/>
                    </div>
                    <div className='details-block'>
                        <ItemList onClickItem = {this.onSelectedItem} 
                        getDate = {this.swapi.getAllStarships}
                        renderItem = {(item) => `${item.name} (model: ${item.model})`} />
                        <PersonDetails personId = {this.state.selectedPersone}/>
                    </div>
                </div>
            </div>
        )
    }
}