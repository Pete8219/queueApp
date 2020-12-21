import React, { useEffect } from 'react'
import M from "materialize-css/dist/js/materialize.min.js"


export const UserList = (users)=> {


 const items = users.users.map( user => {
    return (
        <option key={user._id} value={user._id}>{user.name}</option>
    )
}) 

useEffect( ()=> {
    M.AutoInit()
}, [])

useEffect( () =>{
    window.M.updateTextFields()
  }, [])




    return (
        <div className="input-field col s10">
            
        <select>
            {items}
        </select>
        <label>Сотрудник</label>

        </div>


    )

}