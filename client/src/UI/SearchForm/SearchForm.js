import React from 'react'
import styles from "./search.module.css"
import { Input } from "../Input/Input"

export const SearchForm = ({ children, ...props}) => {

    return (
        <div>
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                        { children }
                    </div>
                </div>
            </form>
        </div>
    )
}
