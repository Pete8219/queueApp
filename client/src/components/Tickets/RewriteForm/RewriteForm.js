import React, {useEffect, useState} from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Calendar } from '../../../UI/Calendar/Calendar'
import { DropDown } from '../../../UI/DropDown/DropDown'
import { RadioSelect } from '../../../UI/RadioSelect/RadioSelect'
import { Loader } from '../../Loader'
import styles from "../EditForm/editForm.module.css"
import { useMessage } from '../../../hooks/message.hook'

export const RewriteForm = () => {

    const ticket = JSON.parse(localStorage.getItem('ticketId'))
    const { date:ticketDate, note: ticketNote, _id, firstname, surname, lastname, email, phone, service } = ticket[0]



    const { loading, request } = useHttp()
    const [services, setServices] = useState([])
    const [date, setDate] = useState(new Date())
    const [serviceType, setServiceType] = useState(null)
    const [employeeId, setEmployeeId] = useState(null)
    const [employeeData, setEmployeeData] = useState([])
    const [serviceTitle, setServiceTitle] = useState('Выберите услугу')
    const [update, setUpdate] = useState(false)


    const filterDay = true
    const minDate = true

    const updateDate = (d) => {
        setDate(d)
    }

    const changeService = (e) => {
        const serviceName = (e.target.innerText)
        setEmployeeId(e.target.dataset.employee)
        setUpdate(true)
        setServiceTitle(serviceName)
    }

    const onSelect = (e) => {
        if(e) {
            setServiceType(e.target.value)
        }
    } 

    const rewriteButton = () => {

        
        const body = {
            firstname,
            surname, 
            lastname,
            email,
            phone,
            serviceTitle,
            serviceType,
            employee: employeeData._id,
            employeeName: employeeData.name,
            cabinet: employeeData.cabinet

        }

    }



    return (
        <div id="modalRewrite" className="modal modal-fixed-footer">
            <div className="modal-content">
                <h4>Создание новой записи</h4>
                
                <div className={styles.content}>
                    <h6>Перезаписать на услугу:</h6>
                    <DropDown props={{services, serviceTitle, changeService}}/>
                    
                </div>
                {(employeeData) 
                    ?   <> 
                        <div className={styles.content}>
                            <h6>Сотрудник, оказывающий услугу:</h6>
                            <p>{employeeData.name}</p>
                            
                        </div>
                        <div className={styles.content}>
                            <h6>Номер кабинета:</h6>
                            <p>{employeeData.cabinet}</p>
                        </div>
                        </>
                    :   null
                } 

                <div className={styles.content}>
                    <h6>Тип услуги:</h6>
                    <div>
                    <RadioSelect 
                        type ="radio"
                        group = "group"
                        value = "Консультация"
                        onChange = {onSelect}
                        />
                      <RadioSelect 
                        type ="radio"
                        group = "group"
                        value = "Подача документов"
                        onChange = {onSelect}
                        /> 
                    </div>       
                    
                </div>
                <div className={styles.content} style={{marginTop:"20px"}}>
                    <h6 style={{paddingTop:"30px"}}>Выбрать новую дату:</h6>
                    <Calendar props= {{ updateDate, date, filterDay, minDate}}/>
                    
                </div>
                <div className={styles.content}>
                    <h6>Доступное время для записи:</h6>
                   
                </div>
            </div>
            <div className="modal-footer">
            <button className={['modal-close  btn-flat btn red', styles.rewriteBtn].join(' ')} onClick = {rewriteButton}>Перезаписать</button>
            <button className={['modal-close  btn-flat btn green', styles.Button].join(' ')} /* onClick={closeButton} */>Закрыть</button>
            </div>

       </div>
)
}
