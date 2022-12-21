import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import vector from '../../images/Vector.png'


function CreateNote() {
const [note , setNote] = useState({
     content: '' ,
     emotion: '' , 
     date: ''
})


const onChangeInput = (e) => {
    const {name , value} = e.target
    setNote({...note , [name]:value})
    }
    
const navigate = useNavigate()
const createNote = async(e) => {
    e.preventDefault()
        try{
            const token = localStorage.getItem('tokenStore')
            if(token) {
                const { content , emotion } = note
               const newNote = {
                 content , emotion 
               }
               await axios.post('/api/notes' , newNote , {
                headers: {Authorization: token}
               })
               console.log(note)
               return navigate('/')
            }
        }
        catch(err){
                 console.log(err)
        }
}

  return (
    <>
    <div className='create-note'>

        <form onSubmit={createNote}>
            <div className='create-note-form'>
            <div className='note-head'>
            <p className='date'>{moment().format("YYYY/MM/DD")}</p>
            <p>create note</p>
            </div>
        <label>How was your day today?</label>

        <textarea type='text' name='content' value={note.content} required id='content'  onChange={onChangeInput} ></textarea>
        <div className='select'>
        <select required name='emotion' value={note.emotion} onChange={onChangeInput}>
            <option hidden>select emotion</option>
            <option name='emotion' value='happy'>happy {`\u{1F603}`} </option>
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

export default CreateNote