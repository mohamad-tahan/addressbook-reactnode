const { use } = require('.');
const User = require('../../model/User');
const Contact = require('../../model/Contact')


//User Functions
async function getUsers() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id).populate("contacts");
}

async function getContactById(id) {
  return await Contact.find({user:id});
}

async function addUser(body, hashPassword) {
  const {
    name,
    email,
    
  } = body;

  const user = new User({
    name,
    email,
    password: hashPassword,
    
  });

  return await user.save();
}

async function getByEmail(email) {
  return await User.findOne({email});
}

//Contact Functions

async function addContacts(body) {
  const {
    name,
    phone,
    email,
    relationship,
    location,
    user,  
  } = body;

  const contact = new Contact({
    
    name,
    phone,
    email,
    relationship,
    location,
    user,
   
  });

  return await contact.save();
}

module.exports = {
  getUsers,
  getById,
  addUser,
  getByEmail,
  addContacts,
  getContactById,
}