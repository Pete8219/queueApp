import React, { useState, useEffect } from "react"
import { CircleLoader } from "../CircleLoader"
import { RecordForm } from "../../pages/admin/newRecord/RecordForm"
import { useHttp } from "../../hooks/http.hook"

import styles from "./overwrite.module.css"


export const OverwriteClient = () => {

    const { loading, request } = useHttp()

    const clientData = JSON.parse(localStorage.getItem('ticketId'))
    
    const [serviceList, setServiceList] = useState([])
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
 
    }

    const updateDate = (d) => {
        setDate(d)
    }

    if(loading) {
        <CircleLoader />
    }
     

    return (
        <div>
            <div className={styles.MainContainer}>
            <div className={styles.recordContent}>
                {!loading && serviceList  && <RecordForm props ={{serviceList, serviceTitle, userId,  ticketsList, changeService, date, updateDate}}/>}
            </div>
        </div>
        </div>
    )
}
