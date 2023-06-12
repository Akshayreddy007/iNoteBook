import react, {useContext} from 'react';
import noteContext from '../contextApi/noteContext';

export default function Alert(props) {
    const newAlert = useContext(noteContext);
    const capitalize=(word)=>{
        if(word==="danger"){
            word="error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.substring(1);
    }
    return (
        <div style={{height:"50px"}}>
            {newAlert.alert && <div className={`alert alert-${newAlert.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(newAlert.alert.type)}: {newAlert.alert.msg}</strong>
        </div>}
        </div>
    );
};