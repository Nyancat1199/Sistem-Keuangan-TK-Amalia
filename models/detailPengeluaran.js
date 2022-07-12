const mongoose = require("mongoose");

const schema = mongoose.Schema;

const DetailPengeluaranSchema = new schema(
  {
    pengeluaran: {
      type: mongoose.Types.ObjectId,
      ref: "Pengluaran",
    },
    tanggalPengeluaran: {
      type: Date,
      required: true,
    },
    totalPengeluaran: {
      type: Number,
      required: true,
    },
  },
  { collection: "detailPengeluaran" }
);

module.exports = mongoose.model("DetailPengeluaran", DetailPengeluaranSchema);
