import React from 'react';
import Cart from './../../assets/cart.jpg';
import Merch from './../../assets/merch.jpeg';
import './styles.scss';


const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div 
                className="item"
                style={{
                    backgroundImage: `url(${Cart})`
                }}
                >
                    <a>Shop Food</a>                       
                </div>
                <div 
                className="item"
                style={{
                    backgroundImage: `url(${Merch})`
                }}>
                    <a>Shop Merch</a>
                </div>
            </div>
        </div>
    )
}

export default Directory;