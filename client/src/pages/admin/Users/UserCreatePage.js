import React, { useState, useEffect} from 'react'
import { useHttp } from '../../../hooks/http.hook'
import {Create} from '../../../components/Users/Create'
import { useMessage} from '../../../hooks/message.hook'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'

import { newUser } from '../../../store/actions/users'


export const UserCreatePage = () => {
   const dispatch = useDispatch()  
   const { loading } =  useSelector(state => state.users)  

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



    const createHandler =  () => {
        dispatch(newUser({...form}))
        if(!loading) {
            message('Пользователь создан')
            setTimeout(() => {
                history.push("/users")
            },1500)
            
        }
    }



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