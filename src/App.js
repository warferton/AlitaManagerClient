import React, {useEffect, useState, lazy, Suspense} from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom'
import Sidebar from 'react-sidebar';
import axios from 'axios';

import {AuthenticatedRoute} from './components/routes/AuthenticatedRoute'

import AccessRestricted from './components/layouts/Errors/AccessRestricted'
import ResourceNotFound from './components/layouts/Errors/ResourceNotFound'

import Footer from './components/Footer'


//lazy load layout components
const AdminLayout = lazy(() => import('./components/layouts/AdminLayout'))
const EmployeeLayout = lazy(() => import('./components/layouts/EmployeeLayout'))
const Login = lazy(() => import('./components/layouts/Login'))
const HomePage = lazy(() => import('./components/layouts/HomePage'))


// axios.defaults.headers(['X-CSRF-Token'])

//only send jwt to the api
const apiUrl = "https://fast-sierra-37663.herokuapp.com/api"//"http://localhost:3000/api/"

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"

axios.interceptors.request.use(config =>{
  const {origin} = new URL(config.url)
  const allowedOrigins = ['https://fast-sierra-37663.herokuapp.com']
  if(!allowedOrigins.includes(origin)){
    config.headers.Authorization = null
    return config
  }
  else{
    config.headers.Authorization = localStorage.getItem('token')
    return config
  }
  
  },
  error => {
    return Promise.reject(error)
})

function App() {

  const [userRole, setUserRole] = useState(localStorage.getItem('role'))

  const [isLoggedIn, setIsLoggedIn] = useState(userRole !== null)

  const [loginError, setLoginError] = useState(false)

    
    //post login credentials func and get jwt token
    const login = async (credentials) => {
      const {username, password} = credentials
      await axios.post(apiUrl.replace('api/', 'login'),{
        username : username,
        password : password
      }).then((response) => {
        if(response.status !== 200){
         setIsLoggedIn(false)
          console.log(response)
        }else{
            setLoginError(false)
            localStorage.setItem('token', response.headers.authorization) // change to be stored in cookies later !!! <=======
            localStorage.setItem('role', response.headers.role.toLowerCase())
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            setUserRole(localStorage.getItem('role'))
            setIsLoggedIn(true)
          }
        }).catch((e) => {
            console.log('vvvvvvEROORORvvvvvv')
            console.log(e)
            setLoginError(true)
          })
    }
    

    const logout = () => {
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            setUserRole(null)
            setIsLoggedIn(false)
    }

    useEffect(() => {
    }, [])

    //sidebar func

    const logOptionString = isLoggedIn ?  "Log Out" : "Log In"

    const [sidebarOpen, setSidebarOpen] = useState(false)

     const handleSidebarClick = (open) => {
      setSidebarOpen(open)
    }

    const sidebarContent = 
                          < div className="sidebar-content">
                            {isLoggedIn ?
                                  (
                                  <Link to = '/home'>
                                      <button 
                                      className="btn btn-sidebar"
                                      onClick = {() => {
                                          logout()
                                          console.log("===loggingout===")
                                          }}>
                                          {logOptionString}
                                      </button>
                                  </Link>) 
                                  : 
                                  (<Link to = '/login'>
                                      <button 
                                      className="btn btn-sidebar">
                                          {logOptionString}
                                      </button>
                                  </Link>) }


                              <Link to='/home'>
                                <button className="btn btn-sidebar">Welcome page</button>
                              </Link>

                              {isLoggedIn ? 
                              <Link to={`/user/${userRole}/manage`} >
                                <button className="btn btn-sidebar">{ `${userRole.toUpperCase()} Page`}</button>
                              </Link> 
                              :
                               <></>}
                            </div>


  return (
<>
  <Router>
    <Sidebar
        className="nav-sidebar"
        sidebar = { sidebarContent }
        open={sidebarOpen}
        onSetOpen={handleSidebarClick}
        styles={{ sidebar: 
          { backgroundImage: 'linear-gradient(to top, rgba(53, 0, 70, 0.555), #2f0c6386)'} 
      }}
                        >
        <button className="btn"
        onClick={() => handleSidebarClick(!sidebarOpen)}
        style={{position: 'absolute'}}>
          <i className="fa fa-navicon" id='nav-burger'></i>
        </button>


        <div className="App">

            {/* Redirects to admin page if logged in */}
            {isLoggedIn ?
            (<Redirect to = {`/user/${userRole}/manage`}></Redirect>)
            :
            (<Redirect to = "/home"/>)
          }

            <Suspense fallback={<div>Loading...</div>}> 
              <Switch>


                <Route exact path="/home" component={() => 
                  <HomePage apiUrl = {apiUrl} />
                }/>

                <Route exact path={"/login"} component={() => <Login apiUrl = {apiUrl} handleLogin={login} error={loginError}/> }/>

                <AuthenticatedRoute exact={true} path={"/user/admin/manage"} 
                isAuthenticated = {isLoggedIn} component={() => <AdminLayout apiUrl = {apiUrl} 
                isLoggedIn = {isLoggedIn} handleLogout = {logout}/>}/> 

                <AuthenticatedRoute exact={true} path={"/user/employee/manage"}
                isAuthenticated = {isLoggedIn} component={() => <EmployeeLayout apiUrl = {apiUrl} 
                isLoggedIn = {isLoggedIn} handleLogout={logout}/>}/>


              </Switch>
              <Footer/>
            </Suspense>
        </div>

        {/* OnError Redirects */}
        <>
            <Route exact path = "/error&notfound" component = {() => <ResourceNotFound/>} />
            <Route exact path={"/error&restricted"} component={()=> <AccessRestricted/> } />
        </>

    </Sidebar>
  </Router>
</>
  );
}

export default App;
