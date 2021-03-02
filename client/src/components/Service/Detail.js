/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
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
    user: service.user._id,
    category: service.category
   
  })


  const [unSelectedCategories, setUnSelectedCategories] = useState(categories)
  //const [selectedCats, setSelectedCats] = useState(service.category)


  useEffect(() => {
    const filteredCats = form.category.map(JSON.stringify) 
    const unselected = categories.map(JSON.stringify).filter(e => !filteredCats.includes(e)).map(JSON.parse)

    setUnSelectedCategories(unselected)
},[form.category]) 



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

  /* Обработка выбранных категорий из списка */
/* 
  let selCats = []
  const selectHandler = (event) => {
    let options = event.target.options
    let selectedOptions = []

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value)
        const selCat = categories.filter((item) => item._id === options[i].value)
        
        selCats.push(selCat)
      }
    }

    setForm({ ...form, category: selCats })
  } */

  //Добавление в список Выбранных категорий

  const addHandler = (data) => {
    const result = [...form.category]
    result.push(data)
    setForm({...form, category: result})

  }

  // Удаление категории из списка выбранных 
  const deleteHandler = (data) => {
       const result = form.category.filter(item => {
           return item._id !== data._id
    })
     
    setForm({...form, category: result})
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
          <div className="input-field col s4">
            <input id="time" name="time" type="text" value={form.time} style={{ color: "#000" }} onChange={changeHandler} />
            <label htmlFor="title">Время оказания</label>
          </div>
          <UsersDropdown users={users} user={form.user} handler={changeHandler} />
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
