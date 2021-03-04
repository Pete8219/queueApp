/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react"
import { useHistory} from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import M from "materialize-css/dist/js/materialize.min.js"
import { CategoryDropdown } from "../Category/CategoryDropdown"
import { UsersDropdown } from "../Users/UsersDropdown"

export const Detail = ({ service, users, categories }) => {
  
 
  const message = useMessage()
  const { request } = useHttp()
  const history = useHistory()

  const [form, setForm] = useState({
    title: service.title,
    time: service.time,
    category: service.category,
    user: service.user
   
  })


  const [unSelectedCategories, setUnSelectedCategories] = useState(categories)
  const [unSelectedUsers, setUnSelectedUsers] = useState(users)


  useEffect(() => {
    const filteredCats = form.category.map(JSON.stringify) 
    const unselected = categories.map(JSON.stringify).filter(e => !filteredCats.includes(e)).map(JSON.parse)

    setUnSelectedCategories(unselected)
},[form.category, categories]) 

useEffect(() => {
  const filteredUsers = form.user.map(JSON.stringify) 
  const unselected = users.map(JSON.stringify).filter(e => !filteredUsers.includes(e)).map(JSON.parse)

  setUnSelectedUsers(unselected)
},[form.user, users]) 



  useEffect(() => {
    M.AutoInit()
  }, [])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const updateHandler = async () => {
    try {
      const data = await request(`/services/${service._id}`, "PATCH", { ...form })
      message(data.message)
      history.push("/services")
    } catch (e) {}
  }



  //Добавление в список Выбранных категорий

  const addHandler = (data) => {
    const result = [...form.category]
    result.push(data)
    setForm({...form, category: result})

  }

  //Добавление в список Выбранных сотрудников

  const addUserHandler = (data) => {
    const result = [...form.user]
    result.push(data)
    setForm({...form, user: result})

  }


  // Удаление категории из списка выбранных 
  const deleteHandler = (data) => {
       const result = form.category.filter(item => {
           return item._id !== data._id
    })
     
    setForm({...form, category: result})
  }

  //Удаление сотрудника из списка выбранных

  const deleteUserHandler = (data) => {
    const result = form.user.filter(item => {
        return item._id !== data._id
 })
  
 setForm({...form, user: result})
}  


    // Обработчик кнопки отмена 
    const cancelHandler = () => {
      history.push("/services")
    }

  return (
    <div className="row">
      <h3>Редактирование услуги</h3>

      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input type="text" id="title" name="title" value={form.title} className="materialize-textarea" onChange={changeHandler} />
            <label htmlFor="title">Название</label>
          </div>
          <CategoryDropdown categories={unSelectedCategories} category={form.category} handler={addHandler} deleteHandler={deleteHandler}  />
          <UsersDropdown users={unSelectedUsers} user={form.user} handler={addUserHandler} deleteHandler={deleteUserHandler} />
          <div className="input-field col s4">
            <input id="time" name="time" type="text" value={form.time} style={{ color: "#000" }} onChange={changeHandler} />
            <label htmlFor="title">Время оказания</label>
          </div>
          
        </div>
        <div className="row" style={{ float: "right" }}>
          <a className="waves-effect waves-light btn" style={{ margin: "2rem" }} onClick={updateHandler}>
            Сохранить
          </a>
          <a className="waves-effect waves-light btn" onClick={cancelHandler}>
            Отмена
          </a>
        </div>
      </form>
    </div>
  )
}
