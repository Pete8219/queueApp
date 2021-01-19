import  { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'


export const Lists = ()=> {
    const [users, setUsers] = useState('')

    const {loading, request} = useHttp()

    useEffect(()=> {
        const fetchUsers = async() => {
            try{
                const fetched = await request('/users', 'GET', null, {})
                setUsers(fetched)
    
            } catch (e) {}
        }
    
        fetchUsers()

    },[request])


    
           const userList = users.map((user) => {
               return (
                   <options key={user._id} value={user._id}>{user.name}</options>
               )
           }) 
        
    

    return (
        <div>
            <select defaultValue={userList[0]}>
                {userList}
            </select>
        </div>
    )
    
}

export default Lists