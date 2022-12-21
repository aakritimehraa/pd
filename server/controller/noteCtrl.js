const Notes = require('../models/noteModel')

const noteCtrl = {
getNotes: async (req , res) => {
    try{


        const notes = await Notes.find({user_id: req.user.id})
        res.json(notes)
    }
    catch(err) {
        return res.status(500).json({msg:err.message})
    }
},
createNotes:async  (req,res) => {
try{
    const {title , content , date , emotion} = req.body
    const newNote = new Notes({
        title,
        content,
        date,
        emotion,
        user_id:req.user.id,
        name:req.user.name

    })
        await newNote.save()
        res.json({msg:'created note'})
}
catch(err){
    return res.status(500).json({msg:err.message})
}
},
deleteNote: async (req, res) => {
    try{
         await Notes.findByIdAndDelete(req.params.id)
         res.json({msg:'deleted note'})
    }
    catch (err) {
        return res.status(500).json({msg:err.message})
    }
},
updateNote: async(req , res) => {
    try{
        const {title , content, date,emotion} = req.body
      await Notes.findOneAndUpdate({_id:req.params.id} , {
        title,
        content,
        date,
        emotion
      })
      res.json({msg:'updated'})
    }
    catch(err) {
        return res.status(500).json({msg:err.message})
    }
},
getNote: async(req,res) => {
    try{
    const note = await Notes.findById(req.params.id)
    res.json(note)
    }
    catch(err) {
        return res.status(500).json({msg:err.message})
    }
}

}


module.exports = noteCtrl