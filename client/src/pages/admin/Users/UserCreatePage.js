import React, { useState, useEffect, useContext} from 'react'
import { useHttp } from '../../../hooks/http.hook'
import {Create} from '../../../components/Users/Create'
import { useMessage} from '../../../hooks/message.hook'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'


export const UserCreatePage = () => {
    const { token } = useContext(AuthContext)

    const [form, setForm] = useState({
        name: '',
        login: '',
        password:'',
        cabinet: '',
        start: '',
        end:'',
        userType: 'user',
        online: false
        
    })
    const {loading, request, error, clearError} = useHttp()

   /*  if( loading ) {
        <Loader />
    } */
    const message = useMessage()
    const history = useHistory()


    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const onlineToggle = () => {
        const check = { ...form}
        check.online = !check.online
        setForm({...check})
    }


    

    const cancelHandler = () => {
        history.push("/users")
    }



    const createHandler =  async() => {
        try {
            const data = await request('/users/create', "POST", {...form}, {
                Authorization: `Bearer ${token}`
            })
            message(data.message)
            history.push("/users")

        } catch (e) {}
    }

    useEffect ( ()=> {
        message(error)
        clearError()
    },[message, error, clearError])


    return (
        <>
        {!loading && 
        <Create 
        changeHandler={changeHandler}
        createHandler={createHandler}
        cancelHandler={cancelHandler}
        formData={form}
        onlineToggle={onlineToggle}
        />}
        </>
    )
}