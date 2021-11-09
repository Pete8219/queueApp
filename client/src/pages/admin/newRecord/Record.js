import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from "../../../hooks/http.hook"

import { RecordForm } from './RecordForm'
import { CircleLoader } from "../../../components/CircleLoader"
import styles from "./record.module.css"


export const Record = () => {
    
    //const { user, token } = useContext(AuthContext)
    const {loading, request } = useHttp()

    const [serviceList, setServiceList] = useState([])
    const [serviceId, setServiceId] = useState(null)
    const [ticketsList, setTicketsList] = useState([])
    const [date, setDate] = useState(new Date())
    const [userId, setUserId] = useState(null)
    const [serviceTitle, setServiceTitle] = useState('Выберите услугу')
   
    useEffect(() => {
        const getServiceList = async() => {
            try {
                const data = await request("/services", "GET", null, {})
                setServiceList(data)

            } catch (error) {}
        }
        getServiceList()
    },[])

    const changeService = (e) => {
        setServiceTitle(e.target.innerText)
        setDate(new Date())
        setUserId(e.target.dataset.employee)
        setServiceId(e.target.dataset.serviceId)
 
    }

    const updateDate = (d) => {
        setDate(d)
    }

    if(loading) {
        <CircleLoader />
    }

    return (
        <div className={styles.MainContainer}>
            <div className={styles.recordContent}>
                {!loading && serviceList  && <RecordForm props ={{serviceList, serviceTitle, serviceId, userId,  ticketsList, changeService, date, updateDate}}/>}
            </div>
        </div>
    )
}
