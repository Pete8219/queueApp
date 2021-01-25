import React from 'react'
import { useHistory } from 'react-router-dom'


export const TimeList = () => {

    const history = useHistory()

    const goBackHandler = () => {
        history.go('-1')
    } 


    return (

        <div className="container" style={{display:"grid"}}>
            <h4 style={{textAlign:"center"}}>Выберите время приема</h4>
            <button className="waves-effect waves-light btn" onClick = {goBackHandler}>
                    <i className="material-icons left">arrow_back</i>Выбрать другую дату
                </button>
        </div>
    )

}