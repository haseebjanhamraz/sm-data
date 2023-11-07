const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String
  },
  email:{
    type: String
  },
  whatsappNumber:
  {
    type: String
  },
  phoneNumber:
  {
    type: String
  },
  district:
  {
    type: String
  },
  tehsil:
  {
    type: String
  },
  constituency:
  {
    type: String
  },
  candidate:
  {
    type: String
  }
});

module.exports = mongoose.model('Item', itemSchema);
