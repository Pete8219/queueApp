import React, { useEffect} from 'react'
import styles from "./clientForm.module.css"
import M from "materialize-css"

export const ClientForm = () => {

    useEffect(() => {
        M.updateTextFields()
    },[])
    return (
        <div>
            <h5>Данные заявителя</h5>
            <div className={styles.VisitorData}>
                
                    <div className="input-field col s4">
                        
                        <input placeholder="Введите фамилию" id="last_name" type="text" className="validate"/>
                        <label htmlFor="last_name">Фамилия</label>
                    </div>
                    <div className="input-field col s4">
                        <input placeholder="Введите имя" id="firstname" type="text" className="validate"/>
                        <label htmlFor="firstname">Имя</label>
                    </div>
                    <div className="input-field col s4">
                        <input placeholder="Введите отчество" id="surname" type="text" className="validate"/>
                        <label htmlFor="surname">Отчество</label>
                    </div>
                    <div className="input-field col s4">
                        <input placeholder="Введите Email" id="email" type="text" className="validate"/>
                        <label htmlFor="email">Электронная почта</label>
                    </div>
                    <div className="input-field col s4">
                        <input placeholder="Номер телефона" id="phone" type="text" className="validate"/>
                        <label htmlFor="phone">Номер телефона</label>
                    </div>
                </div>
        </div>
    )
}
