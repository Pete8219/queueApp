import React, { useEffect } from 'react'
import M from "materialize-css/dist/js/materialize.min.js"

export const FindUser = ({visitor, handler}) => {


    useEffect(() => {
        M.AutoInit()
      }, [])
    
      useEffect(() => {
        window.M.updateTextFields()
      }, [])


    return (
        
            <form class="col s12">
                <div class="row">
                    {/* <p>Введите фамилию для поиска </p> */}
                    <div class="input-field col s12">
                        <input placeholder="Поиск посетителя по фамилии" id="filterUser" name ="filterUser" type="text" class="validate"  onChange={handler}/>
                        
                    </div>
                </div>
            </form>
                

    )
}