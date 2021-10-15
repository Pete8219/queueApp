import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from "./routes"
import { useAuth } from "./hooks/auth.hook"
import { AuthContext } from "./context/AuthContext"
import { Navbar } from "../src/components/navbar"
import { Loader } from "../src/components/Loader"
import "materialize-css"
import "react-datepicker/dist/react-datepicker.css"




function App() {
 
  const { login, logout, token, userId, userType, ready } = useAuth()

  const isAuthenticated = !!token


/*    useEffect(() => {
      const verify = async () => {
            if( !token ) {
              return
            }    
                try {
                  const result = await request(`/auth/verifyToken/${token}`, 'POST', null, {})
                  
                  const { exp } = result

                  if( exp*1000 < Date.now()) { 
                    logout()
                  }

                } catch (e) {
                       
                }
        }

      verify()
  }, [])  */
  
  
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
        {/* {isAuthenticated && !loading && <StaffProfile/>} */}
        
        {/* <div className="container">{routes}</div> */}
        <div>{routes}</div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
