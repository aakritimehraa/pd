import React from 'react'
import { Link } from 'react-router-dom'
import {
    useLocation
  } from "react-router-dom";
  
function Header({isLogin , setIsLogin }) {



    const logoutSubmit = () => {
        localStorage.clear()
        setIsLogin(false)
    }
   let location = useLocation()
    return (
    <header>


        <div className='logo'>
            <h1><Link className='link' to='/'>YODA</Link></h1>
            
        </div>
        {/* <div className='search'>
            <input type='search' placeholder='search' className='search-input' />
        </div> */}
        <ul>
            {location.pathname === '/' ? 
            <li className='addnote'><button><Link className='link' to='/create'>Add Note</Link></button></li>
            : <li className='addnote'><button style={{cursor:'pointer'}}><Link className='link' to='/'>Home</Link></button></li>}
            <li onClick={logoutSubmit}><Link className='link' to='/'>Logout</Link></li>
        </ul>
    </header>
  )
}

export default Header