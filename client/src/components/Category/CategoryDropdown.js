import React from 'react'

export const CategoryDropdown = ({categories, category, handler}) => {
   
    
    const selected = category === undefined || category === '' ? <option defaultValue='Выберите категорию'>Выберите категорию</option> : null


    console.log(selected)

    const list = categories.map(item => {
        return(
            <option key={item._id} value={item._id}>{item.title}</option>
        )
    })
    return  (
        
        <div className="input-field col s12">
            <select name="category" value={category} onChange={handler}>
                {selected}
                {list}
            </select>
            <label>Категория услуг</label>
          </div>
        
    )
}