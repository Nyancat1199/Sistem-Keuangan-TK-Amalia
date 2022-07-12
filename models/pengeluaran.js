const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PengeluaranSchema = new Schema({
  namaPengeluaran: {
    type: String,
    required: true,
  },
  biayaTetap: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Pengluaran", PengeluaranSchema);
