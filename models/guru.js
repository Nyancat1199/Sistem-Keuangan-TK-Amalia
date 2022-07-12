const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GuruSchema = new Schema({
  namaGuru: {
    type: String,
    required: true,
  },
  nik: {
    type: String,
    required: true,
  },
  nuptk: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  pendidikan: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Guru", GuruSchema);
