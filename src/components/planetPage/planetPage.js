import React, { Component } from 'react';
import ItemDetails from '../personDetails';
import ItemList from '../ItemList';
import WarningError from '../error';
import Row from '../Row';
import { Record } from '../personDetails/itemDetails';
import { SwapiServiceConsumer } from '../swapiServiceContext';

export default class PlanetPage extends Component {

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
                ({getAllPlanets}) => {
                    return (
                        <ItemList 
                        onClickItem = {this.onSelectedItem} 
                        getDate = {getAllPlanets}
                        renderItem = {(item) => `${item.name} (diametr: ${item.diameter})` }
                    /> 
                    )
                }
            }
        </SwapiServiceConsumer>
        const itemDetails = <SwapiServiceConsumer>
            {
                ({getPlanetImage, getPlanet}) => {
                    return (
                        <ItemDetails 
                    getDate = {getPlanet}
                    itemId = {this.state.selectedPersone}
                    getImageUrl = {getPlanetImage}>
                        <Record field='population' label = 'Population: '/>
                        <Record field='diameter' label = 'Diameter: '/>
                        <Record field='period' label = 'Period: '/>
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