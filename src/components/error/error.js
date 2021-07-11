import React from 'react';
import './error.css';

const WarningError = () => {
    return (
        <div className='error jumbotron rounded'>
            <span className='boom'>BOOM!!! </span>
            <span>
                Something has gone terribly wrong
            </span>
            <span>
                But we already sent droids to fix it!
            </span>
        </div>
    )
}
export default WarningError