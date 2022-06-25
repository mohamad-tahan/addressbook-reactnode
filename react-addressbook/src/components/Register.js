import React, { useState } from "react";
async function signup(credentials) {
  
  return fetch("http://localhost:3000/api/user/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
     
    },
    
    body: JSON.stringify(credentials),
    
  }).then((response) => response.json() )
  .then(alert("Success"))
  .catch((err) => console.log(err))
}

function Register() {  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");


  const handleSubmit = async (e) => {
    if(password === password_confirmation){
    e.preventDefault();
    const response = await signup({
        name,
        email,
        password,
    });
}
else{
    alert("Passwords don't match")
}

  };

  return (
    <div className="background">
    <div className="signupBox" id="signupBox">
    
    <h2 className="title">Register</h2>
        <form name="signup" onSubmit={handleSubmit}>
        <div className="inputBox">
            
            <label className="logColor">Name</label>
             <input id="name" type="text"  required="required" onChange={(e) => setName(e.target.value)}/>
            <label className="logColor">Email</label>
             <input id="email" type="email"  required="required" onChange={(e) => setEmail(e.target.value)}/>
            <label className="logColor">Password</label> 
            <input id="password" type="password" required="required" onChange={(e) => setPassword(e.target.value)}/>
            <label className="logColor">Confirm Password</label> 
            <input id="password_confirmation" type="password"required="required" onChange={(e) => setPasswordConfirmation(e.target.value)}/>
        </div>
        <button className="log" id="s" value="Sign Up"  onClick={() => window.location.href = "/"}>Sign Up</button>
        <p role="button" onClick={() => window.location.href = "/"} className="back"  id="back">Back</p>
        </form>
 
    </div>
    </div>
  
  );
}

export default Register;
