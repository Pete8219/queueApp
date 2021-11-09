
import React, { useEffect, useState, useContext } from 'react'
import { DropDown } from "../../../UI/DropDown/DropDown"
import { Calendar } from "../../../UI/Calendar/Calendar"
import { Employee } from '../../../components/Employee/Employee'
import  M  from "materialize-css"
import styles from "./record.module.css"
import { ClientForm } from '../../../components/ClientForm/ClientForm'
import { FormFooter } from '../../../components/FormFooter/FormFooter'
import { formatDate } from '../../../utils/formatDate'
import { useHttp } from '../../../hooks/http.hook'
import { TimeTable } from '../../../components/TimeTable/TimeTable'
import { RadioSelect } from '../../../UI/RadioSelect/RadioSelect'
import { useHistory } from "react-router-dom"
import { AuthContext } from '../../../context/AuthContext'
import { useAuth } from '../../../hooks/auth.hook'




export const RecordForm = ({props}) => {
    const { request } = useHttp()
    const history = useHistory()
    const { token } = useAuth(AuthContext)

    const { serviceList: services, serviceTitle, serviceId, date, updateDate, changeService, userId } = props

    const [employee, setEmployee] = useState([])
    const [employeeId, setEmployeeId] = useState(null)
    const [serviceType, setServiceType] = useState(null)
    const [selectedDate, setSelectedDate] = useState(date)

    const [form, setForm] = useState( {
        firstname: '',
        surname: '',
        lastname: '',
        email: '',
        phone: ''
    })

    useEffect(() => {
        M.updateTextFields()
       
    },[])
    
    

    const filterDay = true
    const minDate = true

    useEffect(() => {
        if(!userId) {
            return
        }
        const getEmployee = async() => {
            try {
                const data = await request(`/client/users/${userId}/${formatDate(date)}`, "GET", null, {})
                setEmployee(data)
                setEmployeeId(data._id)
                
                  
            } catch (error) {
                
            }
        }
        getEmployee()
    }, [date])

    const onSelect = (e) => {
        if(e) {
           setServiceType(e.target.dataset.stype)
        }
    } 

    const changeForm = (e) => {
        setForm({...form, [e.target.name] : e.target.value} )
    }

    const onClose = () => {
        history.push("/")
    }

    const onWrite = async () => {
        console.log("Saving data to dataBase")
        const date = JSON.parse(localStorage.getItem('date'))

        const { firstname, surname, lastname, email, phone } = form
        const body = {
            firstname,
            lastname,
            surname,
            phone,
            email,
            user: employeeId,
            serviceType,
            serviceId,
            date,
            }

            try {
                   const data = await request("/tickets/create", "POST", {...body}, { Authorization: `Bearer ${token}`})
                   console.log(data) 
            } catch (error) {
                
            } 

        
    }


    return (
        <>
            <div className={styles.FormContent}>
                    <h4 className={styles.recordHeader}>Создаем запись</h4>

                    <ClientForm props = {{form, changeForm}} />
                    <h5>Данные об услуге</h5>
                    <div className={styles.content}>
                        <h6>Выберите услугу</h6>
                        <DropDown props={{services, serviceTitle, changeService}}/>
                    </div>
                    <div className={styles.content}>
                    <h6>Тип услуги:</h6>
                    <div>
                    <RadioSelect 
                        type ="radio"
                        group = "group"
                        data = "consultation"
                        value = "Консультация (длительность приема 15 минут)"
                        onChange = {onSelect}
                        />
                      <RadioSelect 
                        type ="radio"
                        group = "group"
                        data = "submission"
                        value = "Подача документов (длительность приема 1 час)"
                        onChange = {onSelect}
                        /> 
                    </div>       
                    
                </div>
                    {employee && <Employee props={{ employee }} />}
                    <h5>Дата и время приема</h5>
                    <div className={styles.content}>
                        <h6 style={{paddingTop:"30px"}}>Выберите дату:</h6>
                        <Calendar props= {{ updateDate, date, filterDay, minDate}}/>
                    </div>
                    

                    <div className={styles.content}>
                        <h6>Доступное время для записи</h6>
                        <div className={styles.TimeBoxContainer}>
                        {employeeId !== null && <TimeTable props ={{date, employeeId, serviceType}}/>}
                        </div>
                    </div>
                    

        
                </div>
                        <FormFooter props={{onClose, onWrite}}/>
        </>
    )
}
