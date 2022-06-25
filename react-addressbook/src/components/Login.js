import React, { useState } from "react";
import jwt_decode from "jwt-decode"


async function loginUser(credentials) {
  
  return fetch("http://localhost:3000/api/user/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
     
    },
    
    body: JSON.stringify(credentials),
  }).then((response) => response.json() )
  
  .catch(err => alert("You Are Not Authorized. Sign Up")); 
}

function Login() {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
    });

    if ("token" in response) {
      var user = jwt_decode(response.token);
      console.log(user);
      localStorage.setItem("user_id", user._id);
      console.log("token in response")
      try {
        alert("You are now Logged in.");
        
        
        localStorage.setItem("token", response["token"]);
        window.location.href = "/addContact";
      } catch {
        alert("Failed");
        console.log(response);
      }
    } else {
      console.log("You are not Authorized!");
    }
  };

  return (
    <div className="background">
    <div className="loginBox" id="loginBox">
      <h2 className="title">LOG IN</h2>
      <form name="login" onSubmit={handleSubmit}>
        <div className="inputBox">
          <label className="logColor">Email</label>
          <input
            id="email"
            type="email"
            
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="logColor">Password</label>
          <input
            id="password"
            type="password"
            
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="log" value="Login" id="login" type="submit">
          Login
        </button>
        <p className="p">Don' have an account?</p>
        <h6 role="button" onClick={() =>window.location.href = "/register"} className="back" >Sign up</h6>
     </form>
    </div>
    </div>
  );
}

export default Login;
