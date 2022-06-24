const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
      },
})

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  phone: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  relationship: {
    type: String,
    required: true,
    min: 3,
    max: 255,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    min: 3,
    max: 1024,
  },
  location: locationSchema,
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  
});

module.exports = mongoose.model('Contact', contactSchema);