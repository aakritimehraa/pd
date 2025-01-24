import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Notes from './components/Notes';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  
  const [isLogin , setIsLogin] = useState(false)
  const [user , setUser] = useState({
    name: '',
    email: '',
    password:''
})
const a = ''
useEffect(() => {
  const checkLogin = async () => {
    const token = localStorage.getItem('tokenStore')
    if(token){
      const verified = await axios.get('/user/verify' , {
        headers: {Authorization :token}
      })
      console.log(verified)
      setIsLogin(verified.data)
      if(verified.data === false) return localStorage.clear()
    }
    else{
      setIsLogin(false)
    }
  }
  checkLogin()
} , [])



useEffect(() => {
 alert("HI , this is a demo project , if you want you can register or use these credentials, Email - aaa2@gmail.com , Password - aaaaaaaaa")
} , [])
  return (
    <div className="App">

   
    { !isLogin ?
    <Login isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser} /> :
    <Notes isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser}/>
   }
    </div>
  );
}

export default App;
