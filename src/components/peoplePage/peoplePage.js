import React, { Component } from 'react';
import ItemDetails from '../personDetails';
import ItemList from '../ItemList';
import WarningError from '../error';
import './peoplePage.css'
import Row from '../Row';
import { Record } from '../personDetails/itemDetails';
import { SwapiServiceConsumer } from '../swapiServiceContext';

export default class PeoplePage extends Component {

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
        const itemList = 
            <SwapiServiceConsumer>
                {
                    ({getAllPeople}) => {
                        return (
                            <ItemList 
                                onClickItem = {this.onSelectedItem} 
                                getDate = {getAllPeople}
                                renderItem = {(item) => `${item.name} (age: ${item.age})` }
                            /> 
                        )
                    }
                }
            </SwapiServiceConsumer>
        const itemDetails = 
            <SwapiServiceConsumer>
                {
                    ({getPeople, getPersonImage}) => {
                        return (
                            <ItemDetails 
                            getDate = {getPeople}
                            itemId = {this.state.selectedPersone}
                            getImageUrl = {getPersonImage}>
                                <Record field='gender' label = 'Gender: '/>
                                <Record field='mass' label = 'Mass: '/>
                                <Record field='height' label = 'Height: '/>
                                <Record field='age' label = 'Age: '/>
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