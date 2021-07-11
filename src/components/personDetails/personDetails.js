import React, { Component } from 'react';
import SwapiService from '../../services/swapiService';
import Loading from '../loading';
import WarningError from '../error';
import './personDetails.css'

class PersonDetails extends Component {
    swapi = new SwapiService()
    state = {
        person: null
    }
    componentDidMount() {
        this.updatePerson()
    }
    updatePerson() {
        const {personId} = this.props

        this.swapi.getPeople(personId)
        .then((person) => {
            if (!person) {
                return <Loading/>
            }
            this.setState({
                person
            })
        })
        .catch(() => {
            return <WarningError/>
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson()
        }
    }
    
    render () {
        if (!this.state.person) {
            return <span className='not_selected'>Select person</span>
        }
        const {person: {id,name, gender, mass, height, age}} = this.state

        return (
            <>
                <div className="random-planet jumbotron rounded position">
                    <img className="planet-image" alt='Starship'
                        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
                    <div>
                    <h4 className='planet_color'>{name}</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <span className="term">Gender</span>
                                <span>{gender}</span>
                            </li>
                            <li className="list-group-item">
                                <span 
                                className="term">Age</span>
                                <span>{age}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Mass</span>
                                <span>{mass}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Height</span>
                                <span>{height}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}
export default PersonDetails;