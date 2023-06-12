import react, { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import noteContext from '../contextApi/noteContext';

export default function Login(props) {
    const [credentials,setCredentials]=useState({email:"",password:""});
    const history = useNavigate();
    const newAlert = useContext(noteContext);
    const {showAlert} = newAlert;
    const handleOnChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    const loginUser=async(e)=>{
        e.preventDefault();
        const logged = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json = await logged.json();
        console.log(json)
        if(json.success){
            //store token in the localStorage and redirect it if success.
            localStorage.setItem('token',json.token);
            history('/');
            showAlert("Logged in Successfully","success");
        }else{
            showAlert("Invalid Credentials","danger");
        }

    }
    return (
        <>
            <form onSubmit={loginUser}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleOnChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={handleOnChange} name="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </>
    );
}