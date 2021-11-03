import React, { useContext, useEffect, useState } from "react"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { AuthContext } from "../../context/AuthContext"
import styles from "./pages.module.css"

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()

  const [form, setForm] = useState({
    login: "",
    password: "",
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

/*   const registerHandler = async () => {
    try {
      const data = await request("/auth/register", "POST", { ...form })
      message(data.message)
    } catch (e) {}
  } */

  const loginHandler = async () => {
    try {
      const data = await request("/auth/login", "POST", { ...form })
      
      auth.login(data.token, data.userId, data.userType, data.exp)
    } catch (e) {}
  }

  const pressHandler =  (event) => {
    if (event.key === 'Enter') {
      loginHandler()
    }
  }

  return (
    <div className={styles.MainContainer}>
      <div className="row valign-wrapper">
      <div className="col s6 offset-s3">
        <h1 className="center-align">Электронная очередь</h1>
        <div className="card blue-grey darken-4" style={{width:"60%", margin:"0 auto"}}>
          <div className="card-content">
            <span className="card-title ">Авторизация</span>
            <div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input placeholder="Введите имя пользователя" id="login" name="login" type="text" className="validate login" onChange={changeHandler} style={{ color: "#fff !important" }} />
                  <label htmlFor="login">Логин </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">https</i>
                  <input placeholder="Введите пароль" id="password" type="password" name="password" className="validate password" onChange={changeHandler} onKeyPress={pressHandler} style={{ color: "#fff !important" }} />
                  <label htmlFor="password">Пароль</label>
                </div>
              </div>
            </div>
          </div>
          <div className="card-action center-align">
            <button className="btn-large waves-effect waves-light blue lighten-1 login" onClick={loginHandler} disabled={loading}>
              Войти
            </button>
          {/*   <button className="btn-large waves-effect waves-light blue lighten-1 register" onClick={registerHandler} disabled={loading}>
              Регистрация
            </button> */}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
