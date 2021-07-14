import React from 'react';
import './Row.css';

const Row = ({list, details}) => {
    return (
        <div className='details-block'>
            {list}
            {details}
        </div>
    )
}
export default Row