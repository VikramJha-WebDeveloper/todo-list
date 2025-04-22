import React, { useState } from "react";
import {toast} from "react-toastify";

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRemembered, setIsRemembered] = useState(false);

    const [fullNameError, setFullNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // validations
    const validateFullName = (e) => {
      setFullName(e.target.value)
    }
    const validateEmail = (e) => {
      setEmail(e.target.value);
    }
    const validatePassword = (e) => {
      setPassword(e.target.value);
    }
    const validateConfirmPassword = (e) => {
      setConfirmPassword(e.target.value);
    } 
    
    const collectData = async(e) => {
      e.preventDefault();
      try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
          method: "POST",
          body: JSON.stringify({fullName, email, password, confirmPassword, isRemembered}),
          headers: {"Content-Type": "application/json"}
        });
        const result = await response.json();

        if(result.fullNameError){
          setFullNameError(result.fullNameError);
          console.log(result.fullNameError)
        }else if(result.emailError){
          setEmailError(result.emailError);
          console.log(result.emailError)
        }else if(result.passwordError){
          setPasswordError(result.passwordError);
          console.log(result.passwordError)
        }else if(result.confirmPasswordError){
          setConfirmPasswordError(result.confirmPasswordError);
          console.log(result.confirmPasswordError)
        }else if(result.isRememberedError){
          console.log(result.isRememberedError);
          toast.error(result.isRememberedError);
        }else if(result.errorMessage){
          console.log(result.errorMessage);
          toast.error(result.errorMessage);
        }else{
          console.log(result.successMessage);
          toast.success(result.successMessage);
        }
      }catch(err){
        console.log(err);
      };
    };

    return(
        <>
          <div className="modal fade" id="registerModal">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
      <h4>Register</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={collectData}>
            <div class="mb-3">
              <label for="fullName" class="form-label">Full Name</label>
              <input type="text" class={`form-control ${fullNameError?"is-invalid":""}`} id="fullName" placeholder="Enter your full name" value={fullName} onChange={validateFullName} />
              <span className="invalid-feedback">{fullNameError}</span>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" class={`form-control ${emailError? "is-invalid":""}`} id="email" placeholder="name@example.com" value={email} onChange={validateEmail}/>
              <span className="invalid-feedback">{emailError}</span>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class={`form-control ${passwordError? "is-invalid":""}`} id="password" placeholder="Create a password" value={password} onChange={validatePassword}/>
              <span className="invalid-feedback">{passwordError}</span>
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input type="password" class={`form-control ${confirmPasswordError? "is-invalid":""}`} id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={validateConfirmPassword}/>
              <span className="invalid-feedback">{confirmPasswordError}</span>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="termsCheck" checked={isRemembered} onChange={(e)=>setIsRemembered(isRemembered?false:true)}/>
              <label class="form-check-label" for="termsCheck">I agree to the terms and conditions</label>
            </div>
            <button type="submit" class="btn btn-primary w-100">Register</button>
          </form>
      </div>
      <div className="modal-footer">
      Already have an account? <a href="#">Login</a>
      </div>
    </div>
  </div>
</div>
        </>
    );
};

export default Register;