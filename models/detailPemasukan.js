const mongoose = require("mongoose");

const schema = mongoose.Schema;

const DetailPemasukanSchema = new schema(
  {
    pemasukanId: {
      type: mongoose.Types.ObjectId,
      ref: "Pemasukan",
    },
    tanggalPemasukan: {
      type: Date,
      required: true,
    },
    totalBiaya: {
      type: Number,
      required: true,
    },
  },
  { collection: "detailPemasukan" }
);

module.exports = mongoose.model("DetailPemasukan", DetailPemasukanSchema);
