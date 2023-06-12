import react, { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import noteContext from '../contextApi/noteContext';


export default function SignUp(props){
    const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    const history = useNavigate();
    const newAlert = useContext(noteContext);
    const handleOnChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    const signUpUser=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        })
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token',json.token);
            history('/');
            newAlert.showAlert("Account Created Successfully","success");
        }else{
            newAlert.showAlert("Please fill valid details","danger");
        }
    }
    return(
        <>
             <form onSubmit={signUpUser}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleOnChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={handleOnChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={handleOnChange} name="password" required minLength={8}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={handleOnChange} aria-describedby="emailHelp" required minLength={8}/>
                </div>
                <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
        </>
    );
}