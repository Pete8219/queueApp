import React from 'react'

export const CategoryDropdown = ({categories, category, handler}) => {
    
    
    /* const selected = category === undefined || category === '' ? <option defaultValue='Выберите категорию'>Выберите категорию</option> : null */
    if(!category.length) {
        selectedCategory = <option defaultValue='Выберите категорию'>Выберите категорию</option>
    }

    const selectedCategory = category.map(item => {
        return  (
            <li key={item._id} value={item._id} style={{backgroundColor:"#b7ece8", borderRadius:"10px", padding:"10px",marginBottom:"10px"}}>{item.title}</li>
        )
        
    })


    const list = categories.map(item => {
        return(
            <option key={item._id} value={item._id}>{item.title}</option>
        )
    })
    return  (
        
        <div className="input-field col s12">
            <select multiple={true} name="category" value={selectedCategory} onChange={handler}>
            
                {list}
            </select>
            <label>Категория услуг</label>
            <div>
                <b>Выбранные услуги</b>
                <ul>
                    {selectedCategory}
                </ul>
            </div>
          </div>
        
    )
}