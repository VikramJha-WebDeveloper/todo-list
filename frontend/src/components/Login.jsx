import React, { useState } from "react";
import {toast} from "react-toastify";

const Login = ({colors}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);

  const validateEmail = (e) => {
    setEmail(e.target.value);
  }
  const collectData = async(e) => {
    e.preventDefault();
    try{
      const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      body: JSON.stringify({email, password, isRemembered}),
      headers: {"Content-Type": "application/json"},   
      credentials: "include"
    });
    const result = await response.json();
    if(result.errorMessage){
      console.log(result.errorMessage);
      toast.error(result.errorMessage);
    }else{
      console.log(result.successMessage);
      toast.success(result.successMessage);
      // window.location.reload()
    }
    }catch(err){
      console.log(err);
    }
  };
    return(
        <>
        <div className="modal fade" id="loginModal">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Login</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={collectData}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={validateEmail}/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" checked={isRemembered} onChange={(e)=>setIsRemembered(isRemembered?false:true)}/>
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
      </div>
      <div className="modal-footer d-flex align-items-center justify-content-center">
      Don't have an account? <a href="#">Register</a><br />
      </div>
    </div>
  </div>
</div>
        </>
    );
};

export default Login;