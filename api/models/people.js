const mongoose = require("mongoose");
const peopleSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  birthdate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("People", peopleSchema);
