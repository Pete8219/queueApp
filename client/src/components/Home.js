/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { useHistory } from "react-router-dom"

export const Home = ({ service }) => {
  const history = useHistory()

  const calendarHandler = (id) => {
    localStorage.setItem('ServiceData',JSON.stringify({id}) )

    history.push('/calendar')
  }

  const serviceList = service.map((item, index) => {
    return (
      <div className="card blue darken-2" style={{ boxShadow: "10px 10px 36px -5px rgba(110,105,105,0.75)", display: "grid", justifyItems: "center", alignItems: "center" }}>
        <li key={index}  onClick={() => calendarHandler(item._id)}>
          {item.title}
        </li>
      </div>
    )
  })

  return (
    <div className="container" /* style={{ width: "85%" }} */>
      <h3 style={{ textAlign: "center" }}>Выберите услугу</h3>
      <div className="service-container">
        <ul className="service-list">{serviceList}</ul>
      </div>
    </div>
  )
}
