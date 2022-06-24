const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
  },
  coordinates: {
    type: [Number],
  },
});

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
    unique:false,
  },

  location: locationSchema,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Contact", contactSchema);
