import React from 'react'
import { useHistory } from 'react-router-dom'

export const NotFoundPage = () => {
    const history = useHistory()
    const clickHandler = () => {
        history.push('/')
    }
    return (

        <div className="container notFound" style={{height:"100vh"}}>
            <div className="row " style={{display:"grid", justifyContent:"center"}}>
                <span className="notFoundText">404</span>
                <span className="homeLink">Уппссс! Что-то пошло не так</span>
                <span className="homeLink">Попробуем сначала?</span>
                <button className="waves-effect btn-large homeBtn" onClick={clickHandler}>Согласен</button>
            </div>
        </div>
    )
}