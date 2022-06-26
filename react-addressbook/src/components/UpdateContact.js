import { useState, useEffect } from "react";
import Map from "./Map";

function UpdateContact({ setUpdateModal, contact }) {
  // Initialize Input State
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState("");
  const [location, setLocation] = useState("");
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  console.log(contact);
  
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

  
  // console.log(name);
  // console.log(phone);

  const cont = localStorage.getItem("contactId");
  console.log(cont);



 const getContacts = async () => {
    const res = await fetch(
      "http://localhost:3000/api/user/auth/getcontactsbyId/?id=" + cont,
      {
        headers: {
          token: token,
        },
      }
    );
    const data = await res.json();


    return data;
  };

  console.log(contacts);

  const getData = async () => {
    const contactsFromServer = await getContacts();
    setContacts(contactsFromServer);
  };

 // console.log(contacts);
  useEffect(() => {
    getData();
  }, [cont]);

  useEffect(() => {
    setName(contacts.name);
    setPhone(contacts.phone);
    setEmail(contacts.email);
    setRelationship(contacts.relationship);
     setLocation(contacts.location);
  }, [contacts]);


  
  const updateCont = async () => {
    const res = await fetch("http://localhost:3000/api/user/auth/updatecontact/?id="+cont, {
      method: "PUT",
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
  
    } ,alert("Contact Updated Successfully"));
   
    
}

  return (
    <div className="modal">
      <div className="addContact">
        <div className="loginBox" id="loginBox">
          <span
            class="close"
            role="button"
            onClick={() => {
              setUpdateModal(false);
            }}
          >
            &times;
          </span>
          <h6 className="title">Update Contacts</h6>
          <div className="inputBox">
            <label className="logColor">Name</label>
            <input type="text" value={name}onChange={(e) => setName(e.target.value)} />

            <br />
            <label className="logColor">Phone</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>

            <br />
            <label className="logColor">Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <label className="logColor">Relationship</label>
            <input type="text" value={relationship} onChange={(e) => setRelationship(e.target.value)}
            />

            <br />
            <label className="logColor">{location}</label>
      <Map
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        getName={getName}
        setLocation={setLocation}
      />

            <br />
            <button className="log" onClick={(e)=>updateCont()}>Update contact </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateContact;
