import react, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../contextApi/noteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';


export default function Notes() {
    const resNotes = useContext(noteContext);
    const history = useNavigate();
    const { notes, fetchNotes, editNote, showAlert} = resNotes;
    const [enotes, setENotes]= useState({id:"",etitle:"",edescription:"",etag:""});
    const modal = useRef(null);
    const refClose= useRef(null);
    const updateNote = (aboutToEditNote) => {
        modal.current.click();
        setENotes({id:aboutToEditNote._id, etitle:aboutToEditNote.title,edescription:aboutToEditNote.description,etag:aboutToEditNote.tag});
    }
    const handleOnChange=(e)=>{
        setENotes({...enotes,[e.target.name]:e.target.value});
    };
    const handleOnClick=(e)=>{
        editNote(enotes.id,enotes.etitle,enotes.edescription,enotes.etag);
        refClose.current.click();
        showAlert("Updated Successfully","success");
    };
    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchNotes();    
        }else{
            history('/login');
        }
    }, [])
    return (
        <>
            <AddNotes />
            <button ref={modal} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tagindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body"> 
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={enotes.etitle} onChange={handleOnChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={enotes.edescription} onChange={handleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={enotes.etag} onChange={handleOnChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={enotes.etitle.length<5||enotes.edescription.length<5} type="button" className="btn btn-primary" onClick={handleOnClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container my-3 row'>
                <h2>Your Notes</h2>
                <div className='container mx-3'>
                    {notes.length===0&&'No Notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    );
};