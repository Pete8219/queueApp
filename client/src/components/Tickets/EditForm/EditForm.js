import React, { useState, useEffect } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { Calendar } from '../../../UI/Calendar/Calendar'
import { DropDown } from '../../../UI/DropDown/DropDown'
import { RadioSelect } from '../../../UI/RadioSelect/RadioSelect'
//import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../Loader'
import styles from "./editForm.module.css"

export const EditForm = () => {
    const ticket = JSON.parse(localStorage.getItem('ticketId'))

    const { loading, request } = useHttp()
    //const { userId, ready, token  } = useContext(AuthContext)
    const [services, setServices] = useState([])
    const [date, setDate] = useState(new Date())
    const [serviceType, setServiceType] = useState(null)
    const [employeeId, setEmployeeId] = useState(null)
    const [employeeData, setEmployeeData] = useState([])
    const [serviceTitle, setServiceTitle] = useState('Выберите услугу')

    
    
    useEffect(() => {
        const fetchServices = async() => {
            try {
                const data = await request('/services/', 'GET', null, {})
                setServices(data)

            } catch (error) {}

        }

        fetchServices()
    },[request])

      useEffect(() => {
          if(!employeeId) {
              return
          }
        const fetchEmployee = async() => {

            try {
                const data = await request (`/users/welcome/${employeeId}`, 'GET', null, {})
    
                setEmployeeData(data)
            } catch (error) {}

        }

        fetchEmployee()
    },[employeeId, request])
 

    const { firstname, surname, lastname , service} = ticket[0]
    const fullname =  `${firstname} ${surname} ${lastname}` 
    const day = ticket[0].date.slice(0,10).split('-').reverse().join('-') + ' г'
    const time =  ticket[0].date.slice(11,16)
    const filterDay = true
    const minDate = true

    let nameOfService=''

    if(services.length) {
         const data = services.filter(item => item._id === service)
         nameOfService = data[0].title
        
    }

    const updateDate = (d) => {
        setDate(d)
    }

    const changeService = (e) => {
        const serviceName = (e.target.innerText)
        setEmployeeId(e.target.dataset.employee)
        setServiceTitle(serviceName)
    }

    const onSelect = (e) => {
        if(e) {
            setServiceType(e.target.value)
        }
    } 

    if(loading) {
        <Loader />
    }


    return (
            <div id="modalWindow" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h4>Редактирование записи</h4>
                    <div className={styles.content}>
                        <h6>Заявитель:</h6>
                        <p>{fullname}</p>
                    </div>
                    <div className={styles.content}>
                        <h6>Дата записи:</h6>
                        <p>{day}.  Время: {time} </p>
                        
                    </div>
                    <div className={styles.content}>
                        <h6>На какую услугу записан:</h6>
                        <p>{nameOfService}</p>
                        
                    </div>
                    <hr></hr><br></br>
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
                    <div className={styles.content}>
                        <h6>Выбрать новую дату:</h6>
                        <Calendar props= {{ updateDate, date, filterDay, minDate}}/>
                        
                    </div>
                    <div className={styles.content}>
                        <h6>Доступное время для записи:</h6>
                       
                    </div>
                </div>
                <div className="modal-footer">
                <button className={['modal-close  btn-flat btn red', styles.rewriteBtn].join(' ')}>Перезаписать</button>
                <button className={['modal-close  btn-flat btn green', styles.Button].join(' ')}>Закрыть</button>
                </div>

           </div>
    )
}
