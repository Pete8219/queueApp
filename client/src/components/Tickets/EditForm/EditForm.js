import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router"
import { useHttp } from "../../../hooks/http.hook"
import { AuthContext } from "../../../context/AuthContext"
import { Calendar } from "../../../UI/Calendar/Calendar"
import { DropDown } from "../../../UI/DropDown/DropDown"
import { RadioSelect } from "../../../UI/RadioSelect/RadioSelect"
import { Loader } from "../../Loader"
import styles from "./editForm.module.css"
import { useMessage } from "../../../hooks/message.hook"

export const EditForm = () => {
  const ticket = JSON.parse(localStorage.getItem("ticketId"))

  const { date: ticketDate, note: ticketNote, _id, firstname, surname, lastname, email, phone, service } = ticket[0]

  const { token } = useContext(AuthContext)
  const message = useMessage()

  const { loading, request } = useHttp()
  const [services, setServices] = useState([])
  const [date, setDate] = useState(new Date())
  const [serviceType, setServiceType] = useState(null)
  const [employeeId, setEmployeeId] = useState(null)
  const [employeeData, setEmployeeData] = useState([])
  const [serviceTitle, setServiceTitle] = useState("Выберите услугу")
  const [update, setUpdate] = useState(false)
  const [note, setNote] = useState(ticketNote)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await request("/services/", "GET", null, {})
        setServices(data)
      } catch (error) {}
    }

    fetchServices()
  }, [request])

  useEffect(() => {
    if (!employeeId || update === false) {
      return
    }
    const fetchEmployee = async () => {
      try {
        const data = await request(`/client/users/${employeeId}`, "GET", null, { Authorization: `Bearer ${token}` })
        console.log(data)
        setEmployeeData(data)
      } catch (error) {}
    }

    fetchEmployee()
  }, [employeeId, request, update])

  const fullname = `${firstname}  ${lastname} ${surname}`
  const day = new Date(ticketDate).toLocaleDateString()
  const time = new Date(ticketDate).toLocaleTimeString().slice(0, -3)

  let nameOfService = ""

  if (services.length) {
    const data = services.filter((item) => item._id === service)
    nameOfService = data[0].title
  }

  const updateDate = (d) => {
    setDate(d)
  }

  const changeService = (e) => {
    const serviceName = e.target.innerText
    setEmployeeId(e.target.dataset.employee)
    setUpdate(true)
    setServiceTitle(serviceName)
  }

  const onSelect = (e) => {
    if (e) {
      setServiceType(e.target.value)
    }
  }

  const closeButton = () => {
    setUpdate(false)
    setEmployeeData([])
    setServiceTitle("Выберите услугу")
  }

  const cancelButton = () => {}

  const saveButton = async () => {
    console.log("saved")
    try {
      const data = await request(`/tickets/notes/${_id}`, "PATCH", { note }, { Authorization: `Bearer ${token}` })
      message(data.message)
    } catch (error) {}
  }

  if (loading) {
    ;<Loader />
  }

  return (
    <>
      <div className={styles.content}>
        <h6>Заявитель:</h6>
        <p>{fullname}</p>
      </div>
      <div className={styles.content}>
        <h6>Дата записи:</h6>
        <p>
          {day}. Время: {time}{" "}
        </p>
      </div>
      <div className={styles.content}>
        <h6>На какую услугу записан:</h6>
        <p>{nameOfService}</p>
      </div>
      <div className={styles.content}>
        <h6>Примечание:</h6>
        <p>
          <i className="material-icons prefix">mode_edit</i>

          <textarea id="textarea1" value={note} className="materialize-textarea" onChange={(e) => setNote(e.target.value)}></textarea>
        </p>
      </div>

      <div className="modal-footer">
        <button className={["modal-close  btn-flat btn blue", styles.rewriteBtn].join(" ")} onClick={saveButton}>
          Сохранить
        </button>
        <button className={["modal-close  btn-flat btn green", styles.Button].join(" ")} onClick={cancelButton}>
          Закрыть
        </button>
      </div>
    </>
  )
}
