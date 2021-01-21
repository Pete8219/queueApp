import React from 'react'

export const UsersDropdown = ({users, user, handler}) => {

    const usersList = users.map(user => {
        return (
            <option key={user._id} value = {user._id}>{user.name}</option>
        )
    })
    return (
        <div className="input-field col s8">
        <select name="user" value={user} onChange={handler}>
          <option defaultValue="Выберите сорудника">
            выберите сотрудника
          </option>
          {usersList}
        </select>
        <label>Сотрудник</label>
      </div>

    )
}