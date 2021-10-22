import React from 'react'
import { ButtonSave } from '../ButtonSave'
import { ButtonCancel} from '../ButtonCancel'
import styles from "./category.module.css"

export const Detail = ({category, title, cancel, update, changeTitle}) => {

    console.log(category)
    return (
        <div className={styles.MainContainer}>
            <h4>Редактирование категории</h4>

            <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="title" name="title" type="text" value={title} onChange={changeTitle}/>
                        </div>

                    </div>
                    <div className="row" style={{float:"right"}}>
                        <ButtonSave action={() => update(category._id)}/>
                        <ButtonCancel action={cancel}/>   
                    </div>
                </form>
        </div>

        


    )
}