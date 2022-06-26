import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";

import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import AddContact from "./AddContact";
import UpdateContact from "./UpdateContact";

const ViewContacts = ({onDelete}) => {
  const [contacts, setContacts] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("user_name");
  const[isModal, setIsModal] = useState(false);
  const[isUpdate, setUpdateModal] = useState(false);

  const [filteredData,setFilteredData] = useState(contacts);






  const getContacts = async () => {
    const res = await fetch(
      "http://localhost:3000/api/user/auth/getcontacts/?id=" + user_id,
      {
        headers: {
          token: token,
        },
      }
    );
    const data = await res.json();
    setFilteredData(data)
 
    // console.log(res);
    // console.log(data);

    return data;
  };



  const getData = async () => {
    const contactsFromServer = await getContacts();
    setContacts(contactsFromServer);
  };

 // console.log(contacts);
  useEffect(() => {
    getData();
  }, []);


//Delete Contacts
const deleteContact = async (id) => {
    console.log(id);

    const res = await fetch("http://localhost:3000/api/user/auth/removecontact/?id=" + id,{
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  token: token,
                },
        }
        ) 
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            if(res){
              console.log("Deleted")
              alert("Contact Deleted Successfully")
            }
            getData()
            
        })
}


  function showModal(){
    setIsModal(true)
  }

  function showUpdate(id){
    localStorage.setItem("contactId", id)
    setUpdateModal(true)
  }


  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = filteredData.filter((contacts) => {
      console.log(contacts.name.search(value))
    return contacts.name.search(value) != -1 || contacts.phone.search(value) != -1 || contacts.email.search(value) != -1 ||  contacts.relationship.search(value) != -1 
    });
    setContacts(result);
    }

  return (
    <div>
      <center>Hello {name}</center>  
        <br/>
        <label>Search <input type="text" onChange={(event) =>handleSearch(event)}/></label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={()=>{showModal()} }> Add a Contact</button>
        {isModal && <AddContact setIsModal = {setIsModal}/> }
        <br/><br/>
      <table>
        
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Relationship</th>
          <th>Location</th>
          <th className="no"></th>
        </tr>
      </table>

      {contacts.map((contact, index) => {
        return (
          <table>
            <tr>
              <td> {contacts[index].name}</td>
              <td> {contacts[index].phone}</td>
              <td> {contacts[index].email}</td>
              <td> {contacts[index].relationship}</td>
              <td> {contacts[index].location}</td>
             
              <td className="no">

             <button  onClick={()=>{showUpdate(contact._id)} }> <GrEdit /></button>
             {isUpdate && <UpdateContact setUpdateModal = {setUpdateModal}  contact = {contact}/> }

             <button value = {contacts[index]._id} onClick={(e)=>deleteContact(contact._id)}><MdDelete /></button>

              </td>
            </tr>
          </table>
        );
      })}

     

    </div>
  );
};

export default ViewContacts;
