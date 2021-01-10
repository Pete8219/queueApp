import React, { useContext } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const Navbar = () => {
  const { userType } = useContext(AuthContext)

  const isAdmin = ["superAdmin", "admin"]
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push("/")
  }
  if (isAdmin.includes(userType))
    return (
      <nav>
        <div className="nav-wrapper blue darken-2">
          <a href="/">
            <span className="brand-logo">Электронная очередь</span>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/users">Пользователи</NavLink>
            </li>
            <li>
              <NavLink to="/services">Услуги</NavLink>
            </li>
            <li>
              <NavLink to="/tickets">Тикеты</NavLink>
            </li>
            <li>
              <a href="/" onClick={logoutHandler}>
                Выйти
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  return (
    <nav>
      <div className="nav-wrapper blue darken-2">
        <a href="/">
          <span className="brand-logo">Электронная очередь</span>
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/tickets">Тикеты</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
