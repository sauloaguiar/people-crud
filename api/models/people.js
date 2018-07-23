const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("People", peopleSchema);
