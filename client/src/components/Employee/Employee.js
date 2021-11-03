import React from 'react'
import styles from "./employee.module.css"

export const Employee = ({props}) => {
    
    const { employee } = props    


    
    if(!employee.name || !employee.cabinet) {
        return (
            <div>
                <h5>Данные о сотруднике оказывающем услугу</h5>
                
            </div>
        )
    }


    return (
        <div>
             <h5>Данные о сотруднике оказывающем услугу</h5> 
               <div className={styles.content}>
                        <h6>Сотрудник :</h6>
                        <p>{ employee.name }</p>
                    </div>
                    <div className={styles.content}>
                        <h6>Номер кабинета:</h6>
                        <p>{ employee.cabinet}</p>
                    </div> 
        </div>
    )
}

