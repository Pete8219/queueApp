
import React, { useEffect, useState } from 'react'
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




export const RecordForm = ({props}) => {
    const { request } = useHttp()

    const [employee, setEmployee] = useState([])
    const [employeeId, setEmployeeId] = useState(null)
    const [serviceType, setServiceType] = useState(null)

    useEffect(() => {
        M.updateTextFields()
       
    },[])
    
    const { serviceList: services, serviceTitle, date, updateDate, changeService, userId } = props

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


    return (
        <>
            <div className={styles.FormContent}>
                    <h4 className={styles.recordHeader}>Создаем запись</h4>

                    <ClientForm />
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
                        value = "Консультация"
                        onChange = {onSelect}
                        />
                      <RadioSelect 
                        type ="radio"
                        group = "group"
                        data = "submission"
                        value = "Подача документов"
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
                        {employeeId !== null && <TimeTable props ={{date, employeeId}}/>}
                        </div>
                    </div>
                    

        
                </div>
                        <FormFooter />
        </>
    )
}
