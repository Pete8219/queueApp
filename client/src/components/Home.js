/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from "../hooks//http.hook"
import { TimeTable } from "../components/TimeTable"

export const Home = ({ service }) => {
  const history = useHistory()
  const { request } = useHttp()
  const [param, setParam] = useState("")

  const calendarHandler = (id) => {
    history.push(`/calendar/${id}`)
  }
  /* 
  useEffect(() => {
    window.addEventListener("popstate", handlePop)
  }, [])

  const handlePop = () => {
    forceUpdate()
  } */

  return (
    <div className="container" style={{ width: "85%" }}>
      <h3 style={{ textAlign: "center" }}>Выберите услугу</h3>
      <div className="service-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridGap: "1rem", justifyContent: "center" }}>
        {service.map((item) => {
          return (
            <div className="card blue darken-2" style={{ boxShadow: "10px 10px 36px -5px rgba(110,105,105,0.75)", display: "grid", justifyItems: "center", alignItems: "center" }}>
              <a style={{ color: "#fff", textAlign: "canter" }} onClick={() => calendarHandler(item._id)}>
                {item.title}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
