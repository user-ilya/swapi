import React,{ Component } from 'react';
import './App.css';
import Navbar from '../Navbar'
import RandomPlanet from '../randomPlanet'
import PeoplePage from '../peoplePage';
import TogglePlanet from '../togglePlanet'
import SwapiService from '../../services/swapiService';
import StarshipPage from '../starshipPage';
import PlanetPage from '../planetPage';
import {SwapiServiceProvider} from '../swapiServiceContext';

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            toggle: false,
            swapiService: new SwapiService()
        }
        this.onToggle = this.onToggle.bind(this)
    }

    onToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    onChangeService = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ? SwapiService :  SwapiService;
            console.log('switch to new service')
            return {
                swapiService: new Service()
            }
        })
    }


    render () {
        const content = this.state.toggle ? null : <RandomPlanet/>
        return (
            <div className='bg-dark '>
                <div className='container-lg'>
                    <SwapiServiceProvider value={this.state.swapiService}>
                        <Navbar onChangeService = {this.onChangeService}/>
                        {content}
                        <TogglePlanet Toggle= {this.onToggle}/>
                        <PeoplePage/>
                        <PlanetPage/>
                        <StarshipPage/>
                    </SwapiServiceProvider>
                </div>
            </div>
        )
    }
}