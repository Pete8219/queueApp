import React from 'react'
import { useHistory } from "react-router-dom"

export const Staff = () => {
    const history = useHistory()
    const getLocalStorageData = JSON.parse(localStorage.getItem("Items"))

    let user = []

    if (getLocalStorageData === null) {
         history.push("/")
        
    } else {
        user = getLocalStorageData.user
    }

   
    const list = user.map((item, index) => {
        return (
          <div key={item._id} className="card blue darken-2"  onClick={() => ClickUserHandler(item._id)}  style={{ borderRadius: "5px",  display: "grid", justifyItems: "center", alignItems: "center" }}>
            <li key={index}>{item.name}</li>
          </div>
        )
      }) 


    const goBackHandler = () => {
        history.go("-1")
      }

    const ClickUserHandler = (id) => {

        const selectedUser = user.filter(item => {
            return item._id !== id
         })

    getLocalStorageData.user = selectedUser
    localStorage.setItem("Items", JSON.stringify(getLocalStorageData))
    history.push("/time")


    }  

    return (
        <div className="container" style={{display:"grid"}}>
             <h4 style={{ textAlign: "center" }}>Выберите сотрудника</h4>
            <button className="waves-effect waves-light btn"   onClick = {goBackHandler}> 
                        <i className="material-icons left">arrow_back</i>Вернуться к выбору даты
                    </button>
            <div className="service-container">
            <ul className="service-list">{list}</ul>
            </div>
         </div>

        )

    
}