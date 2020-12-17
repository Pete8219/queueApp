import React from "react";
import {useState, useEffect, useCallback,  useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {useHttp} from '../../hooks/http.hook'
import {UsersList} from '../../components/Users'

export const UserPage = () => {

    

    const [users, setUsers] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)




    
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




    return (
        <>
        {!loading && <UsersList users={users} />}

   </>
    )

}