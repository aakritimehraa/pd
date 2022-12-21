import axios from 'axios'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import vector from '../../images/Vector.png'

function EditNote() {
const [note , setNote] = useState({
    content: '' ,
     emotion: '' , 
     id:''
})

let editid = useParams();
console.log(editid)


const onChangeInput = (e) => {
    const {name , value} = e.target
    setNote({...note , [name]:value})
    }
    
const navigate = useNavigate()

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
                id: res.data._id
            })
        }
    }
    getNote()
} , [editid.id])



const editNote = async e => {
    e.preventDefault()
    try {
        const token = localStorage.getItem('tokenStore')
        if(token){
            const { content,emotion , id} = note;
            const newNote = {
             content, emotion
            }

            await axios.put(`/api/notes/${id}`, newNote, {
                headers: {Authorization: token}
            })
            
            return navigate('/')
        }
    } catch (err) {
        console.log(err)
        window.location.href = "/";
    }
}

  return (
    <>
    <div className='edit-note create-note'>
        <form onSubmit={editNote}>
        <div className='create-note-form'>
            <div className='note-head'>
            <p className='date'>{moment().format("YYYY/MM/DD")}</p>
            <p>edit note</p>
       </div>
        <label>How was your day today?</label>

        <textarea type='text' name='content' value={note.content} required id='content'  onChange={onChangeInput} ></textarea>
        <div className='select'>
        <select name='emotion' value={note.emotion} onChange={onChangeInput}>
            <option name='emotion ' value='happy'>happy {`\u{1F603}`} </option>
            <option name='emotion' value='angry'>angry {`\u{1F621}`}</option>
            <option name='emotion' value='sad'>sad {`\u{1F641}`}</option>
        </select>
        </div>
        <button type='submit'>submit</button>
        </div>
        </form>
</div>
        <div className='footer'>
            <img src={vector} />
         </div>

    </>
  )
}

export default EditNote