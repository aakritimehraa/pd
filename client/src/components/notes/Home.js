import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinFill } from 'react-icons/ri';


function Home() {
    const [notes, setNotes] = useState([])
    const [token , setToken] = useState('')


 
    const getNotes = async (token) => {
        const res = await axios.get('api/notes' , {
            headers: {Authorization: token}
        })
        setNotes(res.data)
        console.log(res.data)
    }

    useEffect(() => {
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getNotes(token)
        }
    },[])

    const deleteNote = async (id) => {
        try{
          if(token) {
            await axios.delete(`api/notes/${id}` , {
                headers: {Authorization: token}
            })
            getNotes(token)
            window.location.href = '/'

          }
        }
        catch(err) {
            console.log(err)
          window.location.href = '/'
        }
    }

    const emotions = {
        "happy" : "\u{1F603}",
        "angry" : "\u{1F621}",
        "sad"   : "\u{1F641}"
    }
    const keys = Object.keys(emotions);

    
  return (
    <div className='home'>
        
        {notes.map(note => (
                         <Link className='link' to={`read/${note._id}`}>

            <div className='note'>
             <div className='head'>  <h3><Moment format="YYYY/MM/DD">{note.createdAt}</Moment></h3><p title={note.emotion}>{emotions[note.emotion]} 
            
</p>
 </div>
               <p className='content'>{note.content}
</p>
               <div className='foot'>
               <Link className='link' to={`edit/${note._id}`}><FiEdit fontSize='16px'/></Link>

               <button className='close' onClick={() => deleteNote(note._id)}><Link className='link' to='/'><RiDeleteBinFill color='white' fontSize='20px' /></Link></button>
               </div>
            </div>
            </Link>
        ))}
    </div>
  )
}

export default Home