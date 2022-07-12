const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MuridSchema = new Schema({
  namaMurid: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  umur: {
    type: Number,
    required: true,
  },
  beratBadan: {
    type: String,
    required: true,
  },
  kelas: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  namaAyah: {
    type: String,
    required: true,
  },
  namaIbu: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Murid", MuridSchema);
