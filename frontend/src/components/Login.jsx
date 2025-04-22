import React, { useState } from "react";
import {toast} from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);

  const validateEmail = (e) => {
    setEmail(e.target.value);
  }
  const collectData = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({email, password, isRemembered}),
      headers: {"Content-Type": "application/json"},      
    });
    const result = await response.json();
    if(result.errorMessage){
      console.log(result.errorMessage);
      toast.error(result.errorMessage);
    }else{
      console.log(result.successMessage);
      toast.success(result.successMessage);
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
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email" placeholder="Enter your email" value={email} onChange={validateEmail}/>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="rememberMe" checked={isRemembered} onChange={(e)=>setIsRemembered(isRemembered?false:true)}/>
              <label class="form-check-label" for="rememberMe">Remember me</label>
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
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