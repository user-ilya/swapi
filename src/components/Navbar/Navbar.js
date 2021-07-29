import React from 'react';
import './Navbar.css';

const Navbar = ({onChangeService}) => {
    return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-lg">
                <a className="navbar-brand" href="#/">Star DB</a>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto ">
                        <li className="nav-item">
                            <a className="btn btn-link nav-link text_nav" href="#/">People</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text_nav" href="#/">Planets</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text_nav" href="#/">Starships</a>
                        </li>
                    </ul>
                </div>
                <button 
                    className='btn btn-primary btn-sm'
                    onClick = {onChangeService}
                    >Change Service</button>
            </div>
        </nav>
    </div>
    )
    
};
export default Navbar