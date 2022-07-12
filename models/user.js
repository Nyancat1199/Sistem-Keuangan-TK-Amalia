const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  detailUser: {
    namaLengkap: { type: String },
    noTelp: { type: String },
    alamat: { type: String },
  },
});

module.exports = mongoose.model("User", UserSchema);
