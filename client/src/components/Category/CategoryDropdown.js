import React from 'react'

export const CategoryDropdown = ({categories, category, handler}) => {
    

    const list = categories.map(item => {
        return(
            <option key={item._id} value={item._id}>{item.title}</option>
        )
    })
    return  (
        
        <div className="input-field col s12">
            <select name="category" value={category} onChange={handler}>
              <option defaultValue="Выберите категорию">
                выберите категорию
              </option>
              {list}
            </select>
            <label>Категория услуг</label>
          </div>
        
    )
}