import React, { useEffect} from 'react'
import styles from "./clientForm.module.css"
import M from "materialize-css"
import { useForkRef } from '@material-ui/core'

export const ClientForm = ({props}) => {
    
    const { firstname, surname, lastname, email, phone } = props.form

    useEffect(() => {
        M.updateTextFields()
    },[])

    const onBlur = (e) => {
        
        if(e.target.type = "text") {
            if( e.target.value === '') {
                console.log("Введите данные")
            }
            
        }
    }
    return (
        <div>
            <h5>Данные заявителя</h5>
            <div className={styles.VisitorData}>
                
                    <div className="input-field col s4">
                        
                        <input placeholder="Введите фамилию" id="lastname" name="lastname" type="text" value={lastname} className="validate" onChange={props.changeForm} onBlur = { onBlur }/>
                        <label htmlFor="last_name">Фамилия</label>
                    </div>
                    <div className="input-field col s4">
                        <input placeholder="Введите имя" id="firstname" name="firstname"  type="text" value={firstname} className="validate" onChange={props.changeForm} onBlur = { onBlur }/>
                        <label htmlFor="firstname">Имя</label>
                    </div>
                    <div className="input-field col s4">
                        <input placeholder="Введите отчество" id="surname" type="text" name="surname" value={surname} className="validate" onChange={props.changeForm} onBlur = { onBlur }/>
                <label htmlFor="surname">Отчество</label>
                    </div>
                    <div className="input-field col s4">
                        <input placeholder="Введите Email" id="email" name="email" type="text" value={email} className="validate" onChange={props.changeForm} onBlur = { onBlur }/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s4">
                        <input placeholder="Номер телефона" id="phone" name="phone" type="text" value={phone} className="validate" onChange={props.changeForm} onBlur = { onBlur }/>
                        <label htmlFor="phone">Номер телефона</label>
                    </div>
                </div>
        </div>
    )
}
