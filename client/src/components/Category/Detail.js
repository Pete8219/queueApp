import React from 'react'
import { ButtonSave } from '../ButtonSave'
import { ButtonCancel} from '../ButtonCancel'

export const Detail = ({category, title, cancel, update, changeTitle}) => {

    console.log(category)
    return (
        <div>
            <h4>Редактирование категории</h4>

            <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="title" name="title" type="text" value={title} onChange={changeTitle}/>
                        </div>

                    </div>
                    <div className="row">
                        <ButtonSave action={() => update(category._id)}/>
                        <ButtonCancel action={cancel}/>   
                    </div>
                </form>
        </div>

        


    )
}