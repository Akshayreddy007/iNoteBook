import react,{useContext, useState} from 'react';
import noteContext from '../contextApi/noteContext';

export default function AddNotes(){
    const resNotes = useContext(noteContext);
    const {addNote,editNote,deleteNote, showAlert} = resNotes;
    const [notes,setNotes] = useState({title:"",description:"",tag:""});
    const handleOnChange=(e)=>{
        setNotes({...notes,[e.target.name]:e.target.value});
    };
    const handleOnClick=(e)=>{
        e.preventDefault();
        addNote(notes.title,notes.description,notes.tag);
        setNotes({title:"",description:"",tag:""});
        showAlert("Note Added Successfully","success")
    };
    return(
        <>
            <div className='container my-3'>
                <h2>Add Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={notes.title} onChange={handleOnChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={notes.description} onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={notes.tag} onChange={handleOnChange}/>
                    </div>
                    <button disabled={notes.title.length<5||notes.description.length<5} type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
                </form>
            </div>
        </>
    );
};