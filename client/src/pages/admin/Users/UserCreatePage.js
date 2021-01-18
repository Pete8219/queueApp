import React, { useState, useEffect} from 'react'
import { useHttp } from '../../../hooks/http.hook'
import {Create} from '../../../components/Users/Create'
import { useMessage} from '../../../hooks/message.hook'
import { useHistory } from 'react-router-dom'


export const UserCreatePage = () => {


    const [form, setForm] = useState({
        name: '',
        login: '',
        password:'',
        cabinet: '',
        start: '',
        end:'',
        userType: 'user',
        
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


    

    const cancelHandler = () => {
        history.push("/users")
    }



    const createHandler =  async() => {
        try {
            const data = await request('/users/create', "POST", {...form}, {})
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
        />}
        </>
    )
}