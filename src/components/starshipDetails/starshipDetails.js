import React from 'react';
import './starshipDetails.css'

const StarshipDetails = () => {
    return (
        <>
            <div className="random-planet jumbotron rounded starship-position">
                <img className="planet-image" alt='Starship'
                    src="https://starwars-visualguide.com/assets/img/starships/28.jpg" />
                <div>
                <h4 className='planet_color'>Starship Name</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Population</span>
                            <span>123124</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Rotation Period</span>
                            <span>43</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Diameter</span>
                            <span>100</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default StarshipDetails;