import React from 'react'
import { ButtonSave } from '../ButtonSave'
import { ButtonCancel } from '../ButtonCancel'

export const Create =({save, cancel, changeTitle}) => {
    return (
        <div>
            <h4>Создание категории</h4>
            
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="title" name="title" type="text" onChange={changeTitle}/>
                        </div>

                    </div>
                    <div className="row">
                        <ButtonSave action={save}/>
                        <ButtonCancel action={cancel}/>   
                    </div>
                </form>
           
                          

        </div>
        

    )
}