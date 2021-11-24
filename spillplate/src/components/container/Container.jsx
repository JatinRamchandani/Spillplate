import React from 'react';
import Board from '../board/Board'

import './style.css'


class Container extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <div className="container">
                <div className = "board-container">
                    <h1 className="head">Spillplate</h1>
                    <Board/>
                </div>
            </div>
        )
    }
}

export default Container