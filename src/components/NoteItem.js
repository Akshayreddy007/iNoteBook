import react,{useContext} from 'react';
import noteContext from '../contextApi/noteContext';

export default function NoteItem(props) {
    const newNotes = useContext(noteContext);
    const {deleteNote, showAlert} = newNotes;
    const{note, updateNote}=props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <div className='d-flex justify-content-between'>
                        <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id)&&showAlert("Deleted Successfully","success")}}></i>
                        <i className="fa-solid fa-file-pen" onClick={()=>{updateNote(note)}}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};