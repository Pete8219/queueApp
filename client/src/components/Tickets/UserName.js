import React from "react"

export const UserName = ({ name }) => {
  console.log(name)

  return <p>Добро пожаловать {name.name}</p>
}
