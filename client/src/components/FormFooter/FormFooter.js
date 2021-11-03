import React from 'react'
import styles from "./formFooter.module.css"

export const FormFooter = () => {
    return (
        <div>
            <div className={["footer", styles.Footer].join(' ')}>
                        <button className={["btn-flat red float-left", styles.btnSave, styles.btn].join(' ')}><i className="material-icons left">save</i>Записать</button>
                        <button className={["btn-flat green float-right", styles.btnClose, styles.btn].join(' ')}><i className="material-icons left">close</i>Отмена</button>
                        </div>
        </div>
    )
}
