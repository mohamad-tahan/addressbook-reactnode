const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 255,
  },
  phone: {
    type: String,

    min: 3,
    max: 255,
  },
  email: {
    type: String,
    min: 3,
    max: 1024,
  },

  relationship: {
    type: String,
    min: 3,
    max: 255,
    
  },

  location: {
    type: String,
    
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Contact", contactSchema);
