import React, { Component } from 'react';
import SwapiService from '../../services/swapiService';
import Loading from '../loading';
import WarningError from '../error';
import './itemDetails.css'

const Record = ({item,field, label}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
export {Record}

class ItemDetails extends Component {
    swapi = new SwapiService()
    state = {
        item: null,
        image: null
    }
    componentDidMount() {
        this.updatePerson()
    }
    updatePerson() {
        const {itemId, getDate, getImageUrl} = this.props

        getDate(itemId)
        .then((item) => {
            if (!item) {
                return <Loading/>
            }
            this.setState({
                item,
                image: getImageUrl(item)
            })
        })
        .catch(() => {
            return <WarningError/>
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updatePerson()
        }
    }
    
    render () {
        if (!this.state.item) {
            return <span className='not_selected'>Select person</span>
        }
        const {item, image} = this.state

        return (
            <>
                <div className="random-planet jumbotron rounded position">
                    <img className="planet-image" alt='Starship'
                        src={image} />
                    <div>
                    <h4 className='planet_color'>{item.name}</h4>
                        <ul className="list-group list-group-flush">
                            {
                                React.Children.map(this.props.children, (child) => {
                                    return React.cloneElement(child, {item})
                                })
                            }
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}
export default ItemDetails;