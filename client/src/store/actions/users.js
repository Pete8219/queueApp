import api from '../../http'
import { createUser, endLoading, filterUsers, startLoading } from '../userReducer'


export const deleteUser = (id) => {
    return(dispatch) => {
        api.delete(`/users/${id}`)
        .then((response) => {
            dispatch(filterUsers(id))
        })
        .catch((error) => {
            console.log(error.response)
        })
    }
}

export const newUser = (data) => {
    return (dispatch) => {
        dispatch(startLoading())
        api.post('/users/create', {...data})
        .then((response) => {
            //console.log(response)
            dispatch(createUser(response.data))
        })

        .catch(error => {
            console.log(error.response)
            dispatch(endLoading())
        })
    }
}