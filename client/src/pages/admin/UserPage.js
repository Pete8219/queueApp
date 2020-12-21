import React from "react";
import {useState, useEffect, useCallback} from 'react'
/* import {AuthContext} from '../../context/AuthContext' */
import {useHttp} from '../../hooks/http.hook'
import {UsersList} from '../../components/Users'
import {useMessage} from '../../hooks/message.hook'

export const UserPage = () => {
    const [users, setUsers] = useState([])
    const {loading, request} = useHttp()
   /*  const {token} = useContext(AuthContext) */
    const message = useMessage()
    const fetchUsers = useCallback( async ()=> {
        try {
            const fetched = await request('/users', "GET", null, {} )   
            console.log(fetched)
            
            setUsers(fetched) 
        } catch (e) {}
    }, [request]) 

    useEffect ( ()=> {
        fetchUsers()
    }, [fetchUsers])

    const deleteHandler = async (id)=> {
        const data = await request(`/users/${id}`, 'DELETE', null, {})
        message(data.message)
        setUsers(users.filter(({_id}) => id !== _id ))

    }


    return (
        <>
        {!loading && 
        <UsersList
        users={users}
        onDelete={deleteHandler} />}

   </>
    )

}