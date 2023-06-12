import { useState } from "react";
import noteContext from "./noteContext";

const NoteState =(props)=>{
    const host = "http://localhost:5000/";
    const initialNotes = [];
    const [notes,setNotes] = useState(initialNotes);
    const [alert,setAlert]=useState(null);
    const showAlert=(message,type)=>{
        setAlert({msg:message,type:type});
        setTimeout(()=>{
            setAlert(null);
        },1500)
    }
    const fetchNotes=async()=>{
        const allNotes = await fetch(`${host}api/notes/fetchAllNotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'token': localStorage.getItem('token')
            }
        })
        const json = await allNotes.json();
        setNotes(json);
    }
    const addNote = async(title,description,tag)=>{
        const newNotes = await fetch(`${host}api/notes/addNewNote`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        })
        const note = await newNotes.json();
        setNotes(notes.concat(note));
    };
    const editNote = async (id,title,description,tag)=>{
        const editNotes = await fetch(`${host}api/notes/updateNote/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        })
        const eNote = await editNotes.json();

        let newEditedNotes = JSON.parse(JSON.stringify(notes));
        for(var index=0;index<newEditedNotes.length;index++){
            const element=newEditedNotes[index];
            if(element._id===id){
                newEditedNotes[index].title=title;
                newEditedNotes[index].description=description;
                newEditedNotes[index].tag=tag;
                break;
            }
        }
        setNotes(newEditedNotes);
    };
    const deleteNote = async(id)=>{
        const delNotes = await fetch(`${host}api/notes/deleteNote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'token': localStorage.getItem('token')
            }
        });
        const json = await delNotes.json();
        const newNotes = notes.filter((note)=>{
            if(note._id!==id){
                return note;
            }
        });
        setNotes(newNotes);
    };
    return(
        <noteContext.Provider value={{notes,setNotes, addNote, editNote, deleteNote, fetchNotes, alert, showAlert}}>
            {props.children}
        </noteContext.Provider>
    );
}
export default NoteState;