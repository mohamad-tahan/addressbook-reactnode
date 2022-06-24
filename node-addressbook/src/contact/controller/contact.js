
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addContacts , getContactById, getUsersbyContacts} = require('../../user/service');
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const User = require("../../../model/User");
const Contact = require("../../../model/Contact");

console.log("hi from contactttttttt");

async function addCont(req, res) {
  try {
    const newContact = await addContacts(req.body);
    console.log("newContact =>", newContact);
    const updateUser = await User.updateOne(
      {
        _id: newContact.user,
      },
      {
        $push: {
          contacts: newContact._id,
        },
      }
    );
    console.log("updateUser =>", updateUser);
    return res.status(200).send(newContact); // 200
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}




async function getCont(req, res) {
    try {
      console.log(req.query);

      if (req.query.id) { // ?id=k1231 -> query paramet
        const id = req.query.id;
        const result = await getContactById(id);
        console.log('result of specific contact =>', result);
        return res.send(result);
      }
  
    } catch (error) {
      console.log(error);
    }
  }


  async function removeContact(req, res) {
    try {
      const contact = await Contact.findOne({ _id: req.query.id });
      // if !product return -> 404
  
      const deleteResult = await contact.remove();
      // deleteResult -> 400
  
      await Contact.updateOne({ _id: contact.user }, 
        { $pull: { contacts: contact._id } });
  
      return res.send("Contact Removed");
    } catch (error) {
      console.log(error);
    }
  }

  async function updateContact(req, res) {
    try {
      const contact = await Contact.findByIdAndUpdate({ _id: req.query.id }, 
        { 
            $set :  {
              name: req.body.name,
              phone:req.body.phone,
              email: req.body.email,
              relationship:req.body.relationship,
              location:req.body.location,
            }
          }

        );
      return res.send("Contact Updated");
     
    } catch (error) {
      console.log(error);
    }
  }

module.exports = {
    addCont,
    getCont,
    removeContact,
    updateContact,
    
  };