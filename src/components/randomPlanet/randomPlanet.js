import React, { Component } from 'react';
import SwapiService from '../../services/swapiService'
import Loading from '../loading';
import WarningError from '../error';
import PropTypes from 'prop-types';
import './randomPlanet.css'

export default class RandomPlanet extends Component {
    swapi = new SwapiService() 
    constructor() {
        super()
        this.state = {
            planet:{}, 
            loading: true,
            error: false
        }   
    }
    componentDidMount() {
        const {count} = this.props
        console.log('DidMount')
        this.interval = setInterval(this.updatePlanet, count )
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    } 
    onPlanetLoaded = (planet) => {
        this.setState({
            planet, 
            loading: false,
            error: false
        })
    }

    updatePlanet= () => {
        const id = Math.round(Math.random()*25 + 3)
        this.swapi.getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError)
    }
    componentWillUnmount() {
        console.log('WillUnmount')
        clearInterval(this.interval)
    }
    render () {
        console.log('render')
        const {planet: {id,population, diameter, period, planetName}, loading, error} = this.state
        if (loading) {
            return <Loading/>
        } 
        if (error) {
            return <WarningError/>
        }

        return (
            <>
                <div className="random-planet jumbotron rounded">
                    <img className="planet-image" alt='Planet'
                        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
                    <div>
                    <h4 className='planet_color'>{planetName}</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <span className="term">Population</span>
                                <span>{population}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Rotation Period</span>
                                <span>{period}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Diameter</span>
                                <span>{diameter}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}
RandomPlanet.defaultProps = {
    count: 1000
}
/* RandomPlanet.propTypes = {
    count: (props, propsName, componentName) => {
        const value = props[propsName];
        if (typeof value === 'number' && !isNaN(value)) {
            return null
        }
        return new TypeError(`${componentName} ${propsName} must be number !`)
    }
} */
RandomPlanet.propTypes = {
    count: PropTypes.number
}