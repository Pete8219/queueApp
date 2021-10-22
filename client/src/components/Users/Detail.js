/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { AuthContext } from "../../context/AuthContext"
import M from "materialize-css/dist/js/materialize.min.js"
import DatePicker from "react-datepicker"
import styles from "./users.module.css"


import { registerLocale, setDefaultLocale } from "react-datepicker"
import ru from "date-fns/locale/ru"
registerLocale("ru", ru)

export const Detail = ({ users, user, cancelHandler }) => {
  setDefaultLocale("ru")

  const { token } = useContext(AuthContext)
  const userData = user.data
  const roles = user.roles
  const vacationFrom = userData.vacationFrom !== null ? new Date(userData.vacationFrom.slice(0, 10)) : null
  const vacationTo = userData.vacationTo !== null ? new Date(userData.vacationTo.slice(0, 10)) : null

  const history = useHistory()
  const message = useMessage()
  const { request, error, clearError } = useHttp()

  const [form, setForm] = useState({
    userId: userData._id,
    name: userData.name,
    start: userData.start,
    end: userData.end,
    cabinet: userData.cabinet,
    userType: userData.userType,
    login: userData.login,
    password: "",
    vacationFrom: vacationFrom,
    vacationTo: vacationTo,
    substitute: userData.substitute,
    online: userData.online
  })
  

  const rolesList = roles.map((item, i) => {
    return (
      <option key={i} value={item}>
        {item}
      </option>
    )
  })

  const userList = users.map((item) => {
    return (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    )
  })

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const updateHandler = async (id) => {
    try {
      const data = await request(`/users/${id}`, "PATCH", { ...form }, {Authorization: `Bearer ${token}`})
      message(data.message)
      history.push("/users")
    } catch (e) {}
  }

  const dateFromHandler = (date) => {
    if (!date) {
      date = null
    }
    setForm({ ...form, vacationFrom: date })
  }

  const dateToHandler = (date) => {
    if (!date) {
      date = null
    }
    setForm({ ...form, vacationTo: date })
  }

   const onlineToggle = () => {
     const check = {...form}
     check.online = !check.online
     
     setForm({...check})

  } 

  useEffect(() => {
    M.AutoInit()
  }, [])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  useEffect(() => {
    message(error)
    clearError()
  }, [message, error, clearError])

  return (
    <div className={styles.MainContainer}>
    <div className="row">
      <h4>Редактирование пользователя</h4>
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input placeholder="ФИО сотрудника" name="name" id="name" type="text" onChange={changeHandler} value={form.name} />
            <label htmlFor="name">Сотрудник</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s4">
            <input placeholder="Кабинет" name="cabinet" id="cabinet" type="text" onChange={changeHandler} value={form.cabinet} />
            <label htmlFor="cabinet">Кабинет</label>
          </div>
          <div className="input-field col s4">
            <input placeholder="Начало приема, ч" name="start" id="start" type="text" onChange={changeHandler} value={form.start} />
            <label htmlFor="start">Начало приема</label>
          </div>
          <div className="input-field col s4">
            <input placeholder="Конец приема, ч" name="end" id="end" type="text" onChange={changeHandler} value={form.end} />
            <label htmlFor="end">Конец приема</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s4">
            <input placeholder="Логин пользователя" name="login" id="login" type="text" value={form.login} onChange={changeHandler} />
            <label htmlFor="login">Логин</label>
          </div>
          <div className="input-field col s4">
            <input placeholder="Пароль пользователя" name="password" id="password" type="password" onChange={changeHandler} value={form.password} />
            <label htmlFor="name">Пароль</label>
          </div>

          <div className="input-field col s4">
            <select defaultValue={form.userType} name="userType" onChange={changeHandler}>
              {rolesList}
            </select>
            <label>Права сотрудника</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s3" style={{ zIndex: "100" }}>
            <p>Начало отпуска</p>
            <DatePicker selected={form.vacationFrom} onChange={(date) => dateFromHandler(date)} dateFormat="dd/MM/yyyy" />
          </div>

          <div className="input-field col s3" style={{ zIndex: "100" }}>
            <p>Конец отпуска</p>
            <DatePicker selected={form.vacationTo} onChange={(date) => dateToHandler(date)} dateFormat="dd/MM/yyyy" />
          </div>

          <div className="input-field col s6">
            <p>Замещающий сотрудник</p>
            <select defaultValue={form.substitute} name="substitute" onChange={changeHandler}>
              <option value="">Выберите сотрудника</option>
              {userList}
            </select>
          </div>
        </div>
        <div className="row">
            <p>
              <label>
                <input type="checkbox" name="online"  className="browser-default"  checked={form.online} onChange={onlineToggle} />
                <span>Доступен для записи онлайн</span>
              </label>
            </p>

        </div>
        <div className="row" style={{ float: "right" }}>
          <a className="waves-effect waves-light btn" style={{ margin: "2rem" }} onClick={() => updateHandler(userData._id)}>
            Сохранить
          </a>
          <a className="waves-effect waves-light btn" onClick={cancelHandler}>
            Отмена
          </a>
        </div>
      </form>
    </div>
    </div>
  )
}
