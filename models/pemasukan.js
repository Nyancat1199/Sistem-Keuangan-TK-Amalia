const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PemasukanSchema = new Schema({
  namaPemasukan: {
    type: String,
    required: true,
  },
  biayaTetap: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Pemasukan", PemasukanSchema);
