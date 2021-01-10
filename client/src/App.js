import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from "./routes"
import { useAuth } from "./hooks/auth.hook"
import { AuthContext } from "./context/AuthContext"
import { Navbar } from "../src/components/navbar"
import { Loader } from "../src/components/Loader"
import "materialize-css"

function App() {
  const { login, logout, token, userId, userType, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        userType,
        login,
        logout,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
