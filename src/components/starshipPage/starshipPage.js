import React, { Component } from 'react';
import ItemDetails from '../personDetails';
import ItemList from '../ItemList';
import WarningError from '../error';
import Row from '../Row';
import { Record } from '../personDetails/itemDetails';
import { SwapiServiceConsumer } from '../swapiServiceContext';

export default class StarshipPage extends Component {
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
        const itemList = <SwapiServiceConsumer>
            {
                ({getAllStarships}) => {
                    return (
                        <ItemList 
                            onClickItem = {this.onSelectedItem} 
                            getDate = {getAllStarships}
                            renderItem = {(item) => `${item.name} (model: ${item.model})` }
                        /> 
                    ) 
                }
            }
        </SwapiServiceConsumer>
        const itemDetails = <SwapiServiceConsumer>
            {
                ({getStarshipImage, getStarship}) => {
                    return (
                        <ItemDetails 
                            getDate = {getStarship}
                            itemId = {this.state.selectedPersone}
                            getImageUrl = {getStarshipImage}>
                                <Record field='model' label = 'Model: '/>
                                <Record field='passengers' label = 'Passengers: '/>
                                <Record field='created' label = 'Created: '/>
                                <Record field='crew' label = 'Crew: '/>
                                <Record field='length' label = 'Length: '/>
                        </ItemDetails>
                    )
                }
            }
        </SwapiServiceConsumer>
        
        if (this.state.hasError) {
            return <WarningError/>
        }
        return (
            <>
                <Row list = {itemList} details = {itemDetails}/>
            </>
        )
    }
}