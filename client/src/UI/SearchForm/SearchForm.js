import React from 'react'

export const SearchForm = ({ children, ...props}) => {
    

    return (
        <div>
            <form className="col s12" >
                <div className="row">
                    <div className="input-field col s12">
                        { children }
                    </div>
                </div>
            </form>
        </div>
    )
}
