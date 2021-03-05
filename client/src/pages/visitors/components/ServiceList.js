import React from "react"
import { useHistory } from "react-router-dom" 

export const ServiceList = ({ services, handler }) => {
  console.log(services)
  
   const history = useHistory()

  const list = services.map((item, index) => {
    return (
      <div key={item._id} className="card blue darken-2" onClick={() => handler(item._id)} style={{ borderRadius: "5px",  display: "grid", justifyItems: "center", alignItems: "center" }}>
        <li key={index}>{item.title}</li>
      </div>
    )
  })


  const goBackHandler = () => {
    history.go('-1')
}
  return (
    <div className="container" style={{display:"grid"}}>
      <h4 style={{ textAlign: "center" }}>Выберите вопрос</h4>
      <button className="waves-effect waves-light btn" onClick = {goBackHandler}>
                    <i className="material-icons left">arrow_back</i>Вернуться к выбору категории
                </button>
      <div className="service-container">
        <ul className="service-list">{list}</ul>
      </div>
    </div>
  )
}
