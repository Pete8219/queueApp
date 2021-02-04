import React, { useEffect } from 'react'
import M from "materialize-css/dist/js/materialize.min.js"

export const FindUser = ({visitor, handler, pressHandler}) => {


    useEffect(() => {
        M.AutoInit()
      }, [])
    
      useEffect(() => {
        window.M.updateTextFields()
      }, [])


    return (
        
            <form className="col s12">
                <div className="row">
                    {/* <p>Введите фамилию для поиска </p> */}
                    <div className="input-field col s12">
                        <input 
                        placeholder="Поиск посетителя по фамилии" 
                        id="filterUser" 
                        name ="filterUser" 
                        type="text" 
                        onChange={e => handler(e.target.value)}
                        onKeyPress={pressHandler}
                        />
                        
                    </div>
                </div>
            </form>
                

    )
}