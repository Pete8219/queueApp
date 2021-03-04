/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"

export const CategoryDropdown = ({ categories, category, handler, deleteHandler }) => {
  
  const selectedCategory = category.map((item) => {
    return (
      <div>
        <li key={item._id} className="col s11 " value={item._id} style={{ fontSize: "0.8em", float: "left", backgroundColor: "#b7ece8", borderRadius: "10px", padding: "15px", marginBottom: "10px" }} >
          {item.title}
        </li>
       
       <a style={{color:"#000"}} onClick={() => deleteHandler(item)}> 
        <i className="material-icons col s1 selectedCats">close</i>
        </a>
      </div>
    )
  })


  const list = categories.map((item) => {
    return (
      <li key={item._id} value={item._id} onClick={() => handler(item)} style={{cursor:"pointer"}}>
        {item.title}
      </li>
    )
  })

  return (
    <div className="col s12" style={{paddingLeft:"0px !important", paddingRight:"0px !important"}}>

      <div className="col s6" style={{marginBottom:"40px"}}>
      <b>Категории услуг</b>
        <ul className ="unselectedCats">
          {list}
          </ul>
        
      </div>
      <div className="col s6">
        <b>Выбранные категории</b>
        <ul>{selectedCategory}</ul>
      </div>

    </div>
  )
}
