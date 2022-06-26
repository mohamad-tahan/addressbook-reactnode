import { useState } from "react";
import Map from "./Map";

function AddContact({setIsModal}){
  // Initialize Input State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState("");
  const [location, setLocation] = useState("");
  const [selectedPosition, setSelectedPosition] = useState([
    33.893791, 35.501778,
  ]);
  ;
  const getName = async (e) => {
    try {
      const res = await fetch(
        "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
          selectedPosition[0] +
          "&longitude=" +
          selectedPosition[1] +
          "&localityLanguage=en"
      );
      const data = await res.json();
      console.log(data);
      setLocation("" + data.locality + ", " + data.countryName);
    } catch (err) {
      console.log(err);
    }
  };
 


  console.log(name);
  console.log(phone);
  console.log(email);
  console.log(relationship);
  console.log(location);

  //Add Data to Backend on Submit
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  console.log(token);
  console.log(user_id);
  const Add = async () => {
    const res = await fetch("http://localhost:3000/api/user/auth/addcontact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        name:name,
        phone:phone,
        email:email,
        relationship:relationship,
         location:location,
        user:user_id,
      }),
      
    },alert("Contact Added"));
}


return(
    <div className="modal">
    <div className="addContact">
    
         <div className="loginBox" id="loginBox">
         <span class="close" role="button"  onClick={() =>{setIsModal(false)}} >&times;</span>
        <h6 className="title">Add Contacts</h6>
         <div className="inputBox">
        <label className="logColor">Name</label>
        <input type="text"  value={name} onInput={e => setName(e.target.value)}/>
        
        <br/>
        <label className="logColor">Phone</label>
        <input type="text"  value={phone} onInput={e => setPhone(e.target.value)}/>
       
        <br/>
        <label className="logColor">Email</label>
        <input type="text"  value={email} onInput={e => setEmail(e.target.value)}/>
       
        <br/>
        <label className="logColor">Relationship</label>
        <input type="text"  value={relationship} onInput={e => setRelationship(e.target.value)}/>
       
        <br/>
       
        
      
      <label className="logColor">{location}</label>
      <Map
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        getName={getName}
        setLocation={setLocation}
      />
       

        <br/>
        <button className="log" onClick={()=>{Add()}}>Add contact</button>

        </div>
        </div>
    </div>
    </div>
)
}
export default AddContact;


