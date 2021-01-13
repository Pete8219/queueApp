import React, { useEffect } from 'react'
import M from "materialize-css/dist/js/materialize.min.js"

export const ReceptionForm = () => {


    useEffect(() => {
        M.AutoInit()
      }, [])
    
      useEffect(() => {
        window.M.updateTextFields()
      }, [])


    return (
        <div className="row col s6" style={{display:"grid", gridTemplateColumns:"0.5fr", justifyContent:"center"}} >
            <h5 style={{margin:"0 auto"}}>Контактные данные заявителя</h5>
            <form className="col s12" style={{display:"grid", justifySelf:"center"}}>
                <div className="row">
                    <div className="input-field col s12">
                        <input  id="last_name" type="text" className="validate"/>
                        <label htmlFor="last_name">Фамилия</label>
                    </div>
                </div>
                <div className="row">    
                    <div className="input-field col s12">
                        <input  id="first_name" type="text" className="validate"/>
                        <label htmlFor="first_name">Имя</label>
                    </div>
                </div>
                <div className="row">    
                    <div className="input-field col s12">
                        <input  id="surname" type="text" className="validate"/>
                        <label htmlFor="surname">Отчество (при наличии)</label>
                    </div>
                </div>
                <div className="row">    
                    <div className="input-field col s12">
                        <input placeholder="890XXXXXXXX" id="phone" type="text" className="validate"/>
                        <label htmlFor="phone">Телефон</label>
                    </div>
                </div>
                <div className="row" style={{display:"grid"}}>
                    <button class="waves-effect waves-light btn-small" style={{margin:"0 auto"}}>Записать</button>
                </div>
            </form>
      </div>
    )
}