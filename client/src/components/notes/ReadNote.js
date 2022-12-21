import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import vector from '../../images/Vector.png'

function ReadNote() {
    const [note , setNote] = useState({
        content: '' ,
         emotion: '' , 
    })
    
    
    const emotions = {
        "happy" : "\u{1F603}",
        "angry" : "\u{1F621}",
        "sad"   : "\u{1F641}"
    }

    let editid = useParams();
    console.log(editid)
    

    
    useEffect(() =>{
        const getNote = async () =>{
            const token = localStorage.getItem('tokenStore')
            if(editid.id){
                const res = await axios.get(`/api/notes/${editid.id}`, {
                    headers: {Authorization: token}
                })
                setNote({
                    emotion:res.data.emotion,
                    content: res.data.content,
                    id: res.data._id,
                    date:res.data.createdAt
                })
            }
        }
        getNote()
    } , [editid.id])
    
  return (
    <>
    <div className='show-note create-note'>
        <div className='note-head'><Moment format="YYYY/MM/DD">{note.createdAt}</Moment> <p>{emotions[note.emotion]}</p></div>
    <div className='note-content'><p>{note.content}</p></div>
    </div>
    <div className='footer'>
            <img src={vector} />
         </div>
    </>
  )
}

export default ReadNote