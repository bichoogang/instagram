import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './action/user'
import Userprofile from './components/screens/Userprofile'
import Following from './components/screens/Following'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const Routing =()=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const token = useSelector((state) => state.user.token)
    useEffect(()=>{
      dispatch(loadUser())
      if(token){
        // history.push('/')
      }else{
        history.push('/login')
      }
    },[dispatch,token, history])
    return(
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path='/login'>
          <Login/>
        </Route>
        <Route exact path="/signup">
          <Signup/>
        </Route>
        <Route exact path='/profile'>
          <Profile/>
        </Route>
        <Route exact path='/createpost'>
          <CreatePost/>
        </Route>
        <Route  path='/profile/:userid'>
          <Userprofile/>
        </Route>
        <Route  exact path='/following'>
          <Following/>
        </Route>
      </Switch>
    )
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routing/>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
