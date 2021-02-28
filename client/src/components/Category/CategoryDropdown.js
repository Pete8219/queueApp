import React from "react"

export const CategoryDropdown = ({ categories, category, handler }) => {
  /* const selected = category === undefined || category === '' ? <option defaultValue='Выберите категорию'>Выберите категорию</option> : null */

  let unselectedCategories = []

  if (category.length) {
    const selIds = category.map((elem) => elem._id)

    categories.map((item) => {
      if (!selIds.includes(item._id)) {
        unselectedCategories.push(item)
      }
    })
  } else {
    unselectedCategories = categories
  }

  const selectedCategory = category.map((item) => {
    return (
      <div>
        <li key={item._id} className="col s11" value={item._id} style={{ fontSize: "0.8em", float: "left", backgroundColor: "#b7ece8", borderRadius: "10px", padding: "15px", marginBottom: "10px" }}>
          {item.title}
        </li>
        <i className="material-icons col s1 selectedCats">close</i>
      </div>
    )
  })

  const list = unselectedCategories.map((item) => {
    return (
      <option key={item._id} value={item._id}>
        {item.title}
      </option>
    )
  })
  return (
    <div className="input-field col s12">
      <div className="input-field col s6">
        <select multiple={true} name="category" value={selectedCategory} onChange={handler}>
          {list}
        </select>
        <label>Категория услуг</label>
      </div>
      <div className=" col s6">
        <b>Выбранные категории</b>
        <ul>{selectedCategory}</ul>
      </div>
    </div>
  )
}
