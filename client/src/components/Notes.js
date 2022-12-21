import { BrowserRouter , Routes , Route } from 'react-router-dom'
import React from 'react'
import CreateNote from './notes/CreateNote'
import EditNote from './notes/EditNote'
import Header from './notes/Header'
import Home from './notes/Home'
import ReadNote from './notes/ReadNote'

function Notes({isLogin  , setIsLogin}) {
  return (


    <div className='notes-page'>
        <Header isLogin={isLogin} setIsLogin={setIsLogin}  />
    <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<CreateNote />} />
            <Route path='/edit/:id' element={<EditNote />} />
            <Route path='/read/:id' element={<ReadNote />} />

    </Routes>

     </div>
  )
}

export default Notes