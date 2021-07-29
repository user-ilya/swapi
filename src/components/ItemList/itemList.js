import React, { Component } from 'react';
import './itemList.css';

import Loading from '../loading';
export default class ItemList extends Component {
    
    state = {
        itemList: null
    }
    componentDidUpdate(prevProps) {
        if (this.props.getDate !== prevProps.getDate) {
            console.log('update listItem')
            this.update()
        }
    }
    componentDidMount() {
        this.update()
        
    }
    update () {
        const {getDate} = this.props
        getDate()
        .then((itemList) => {
            this.setState({
                itemList
            })
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const id = item.id
            const label = this.props.renderItem(item)
            return(  
                <li 
                    className="list-group-item list-group-item-action"
                    key={id}
                    onClick={() => this.props.onClickItem(id)}>
                        {label }
                </li>
                )    
        })
    }

    render() {
        
        const {itemList} = this.state

        if (!itemList) {
            return <Loading/>
        }
        const listItem = this.renderItems(itemList)
       /*  const peopleItem = peopleList.map((item) => {
            return (
                <li 
                className="list-group-item list-group-item-action"
                key={item.id}>{item.name}</li>
            )    
        }) */
       
        return (
            <>
                <ul className="list-group list-group_width">
                   {listItem}
                </ul>
            </>
        )
    }
}
ItemList.defaultProps = {
    onClickItem: () => {}
}
