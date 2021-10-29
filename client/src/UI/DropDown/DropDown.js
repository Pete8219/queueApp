
import React, { useEffect } from 'react'
import styles from "./dropdown.module.css"
import M from "materialize-css"


export const DropDown = ({props}) => {
        
    useEffect(() => {
        M.AutoInit()
    },[])

    const items = props.services.map(item => {
        return (
            <li key ={item._id} className={styles.ListItem} data-employee = {item.user[0]} data-service-id={item._id} onClick = {(e) => props.changeService(e)}>{item.title}</li>
            )
    })

    return (
        <div>
            <button className= {["dropdown-trigger btn grey lighten-5", styles.DropDown].join(" ")} data-target="dropdownList">{props.serviceTitle}</button>

            <ul id = "dropdownList" className={["dropdown-content", styles.DropdownUl].join(" ")}>
                {items}
            </ul>
        </div>
    )
}
