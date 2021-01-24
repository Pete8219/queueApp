import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"

export const ServiceList = ({ services, handler, action }) => {
  console.log(services)
  const history = useHistory()

  useEffect(() => {
    return () => {
      if (history.action === "POP") {
        history.push("/")
        /* setActive("CategoryList") */
      }
    }
  })

  const list = services.map((item, index) => {
    return (
      <div key={item._id} className="card blue darken-2" onClick={() => handler(item._id)} style={{ borderRadius: "15px", boxShadow: "10px 10px 36px -5px rgba(110,105,105,0.75)", display: "grid", justifyItems: "center", alignItems: "center" }}>
        <li key={index}>{item.title}</li>
      </div>
    )
  })
  return (
    <div className="container">
      <h4 style={{ textAlign: "center" }}>Выберите услугу</h4>
      <div className="service-container">
        <ul className="service-list">{list}</ul>
      </div>
    </div>
  )
}
