const fs = require("fs");
const User = require("../models/user");
const Guru = require("../models/guru");
const Pemasukan = require("../models/pemasukan");
const DetailPemasukan = require("../models/detailPemasukan");
const Pengeluaran = require("../models/pengeluaran");
const DetailPengeluaran = require("../models/detailPengeluaran");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// GET
exports.getIndex = (req, res, next) => {
  res.render("index", { user: req.user });
};

exports.getDataGuru = async (req, res, next) => {
  let message = req.flash("message");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  try {
    const guru = await Guru.find({});
    res.render("data-guru", {
      user: req.user,
      guruData: guru,
      message: message,
      number: 1,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getDataUsers = async (req, res, next) => {
  let message = req.flash("message");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  try {
    const user = await User.find({});
    res.render("data-users", {
      userData: user,
      message,
      number: 1,
      user: req.user,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getDataMurid = (req, res, next) => {
  res.render("data-murid", { user: req.user });
};

exports.getDetailUser = (req, res, next) => {
  res.render("detail-user", { user: req.user });
};

exports.getDataPemasukan = async (req, res, next) => {
  try {
    const pemasukan = await Pemasukan.find({});
    res.render("data-pemasukan", { user: req.user, dataPemasukan: pemasukan });
  } catch (e) {
    console.log(e);
  }
};

exports.getDataDetailPemasukan = async (req, res, next) => {
  try {
    const detailPemasukan = await DetailPemasukan.find({}).populate(
      "pemasukanId"
    );
    const mapDetail = detailPemasukan.map((detail) => {
      return {
        ...detail._doc,
        pemasukanId: {
          ...detail._doc.pemasukanId._doc,
          _id: detail._doc.pemasukanId._doc._id.toString(),
        },
        tanggalPemasukan: detail.tanggalPemasukan.toLocaleDateString(),
      };
    });

    const pemasukan = await Pemasukan.find({});
    res.render("input-pemasukan", {
      user: req.user,
      dataDetailPemasukan: mapDetail,
      dataPemasukan: pemasukan,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getDetailPemasukanById = async (req, res, next) => {
  const { pemasukanId } = req.params;
  try {
    const detailPemasukan = await DetailPemasukan.findOne({
      pemasukanId: pemasukanId,
    }).populate("pemasukanId");
    res.status(200).json({
      detailPemasukan: detailPemasukan,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getDataPemasukanById = async (req, res, next) => {
  const { pemasukanId } = req.params;
  try {
    const pemasukan = await Pemasukan.findById(pemasukanId);
    res.status(200).json({ pemasukan: pemasukan });
  } catch (e) {
    console.log(e);
  }
};

exports.getDataPengeluaran = async (req, res, next) => {
  try {
    const pengeluaran = await Pengeluaran.find({});
    res.render("data-pengeluaran", {
      user: req.user,
      dataPengeluaran: pengeluaran,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getDataDetailPengeluaran = async (req, res, next) => {
  try {
    const pengeluaran = await Pengeluaran.find({});
    const detailPengeluaran = await DetailPengeluaran.find({}).populate(
      "pengeluaran"
    );
    console.log(detailPengeluaran);
    res.render("detail-pengeluaran", {
      user: req.user,
      dataPengeluaran: pengeluaran,
      detailPengeluaran: detailPengeluaran,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getDataPengeluaranById = async (req, res, next) => {
  const { pengeluaranId } = req.params;
  try {
    const pengeluaran = await Pengeluaran.findById(pengeluaranId);
    res.status(200).json({ pengeluaran: pengeluaran });
  } catch (e) {
    console.log(e);
  }
};

exports.getDetailPengeluaranByPengeluaranId = async (req, res, next) => {
  const { detailPengeluaranId } = req.params;
  try {
    const detailPengeluaran = await DetailPengeluaran.findById(
      detailPengeluaranId
    ).populate("pengeluaran");
    res.status(200).json({ detailPengeluaran: detailPengeluaran });
  } catch (e) {
    console.log(e);
  }
};

exports.getLaporan = async (req, res, next) => {
  const { bulan, tahun } = req.params;
  const getBulan = bulan || new Date().getMonth();
  const getTahun = tahun || new Date().getFullYear();
  console.log(getBulan, getTahun);
  try {
    const detailPemasukan = await DetailPemasukan.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$tanggalPemasukan" }, getBulan] },
          { $eq: [{ $year: "$tanggalPemasukan" }, getTahun] },
        ],
      },
    }).populate(
      "pemasukanId"
    );
    const detailPengeluaran = await DetailPengeluaran.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$tanggalPengeluaran" }, getBulan] },
          { $eq: [{ $year: "$tanggalPengeluaran" }, getTahun] },
        ],
      },
    }).populate(
      "pengeluaran"
    );
    const mapDetailPemasukan = detailPemasukan.map((data) => {
      const newData = {
        ...data._doc,
        tanggal: data.tanggalPemasukan,
      };
      return newData;
    });
    const mapDetailPengeluaran = detailPengeluaran.map((data) => {
      return {
        ...data._doc,
        tanggal: data.tanggalPengeluaran,
      };
    });
    const dataLaporan = [...mapDetailPemasukan, ...mapDetailPengeluaran].sort(
      (a, b) => new Date(a.tanggal) - new Date(b.tanggal)
    );
    const reduceTotalPemasukan = mapDetailPemasukan.reduce(
      (prev, current) => prev + current.totalBiaya,
      0
    );
    const reduceTotalPengeluaran = mapDetailPengeluaran.reduce(
      (prev, current) => prev + current.totalPengeluaran,
      0
    );

    res.render("laporan", {
      dataLaporan,
      totalPemasukan: reduceTotalPemasukan,
      totalPengeluaran: reduceTotalPengeluaran,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.dataLaporan = async (req, res, next) => {
  res.render("data-laporan", { user: req.user });
};

exports.getAPILaporan = async (req, res, next) => {
  const { bulan, tahun } = req.query;
  console.log(typeof bulan, typeof tahun);
  const queryBulan = bulan || new Date().getMonth() + 1;
  const queryTahun = tahun || new Date().getFullYear();
  console.log(queryBulan, queryTahun);
  try {
    const detailPemasukan = await DetailPemasukan.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$tanggalPemasukan" }, queryBulan] },
          { $eq: [{ $year: "$tanggalPemasukan" }, queryTahun] },
        ],
      },
    }).populate("pemasukanId");
    const detailPengeluaran = await DetailPengeluaran.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$tanggalPengeluaran" }, queryBulan] },
          { $eq: [{ $year: "$tanggalPengeluaran" }, queryTahun] },
        ],
      },
    }).populate("pengeluaran");
    const newDetailPemasukan = detailPemasukan.map((pemasukan) => {
      return {
        ...pemasukan._doc,
        tanggal: pemasukan.tanggalPemasukan,
      };
    });
    const newDetailPengeluaran = detailPengeluaran.map((pengeluaran) => {
      return {
        ...pengeluaran._doc,
        tanggal: pengeluaran.tanggalPengeluaran,
      };
    });
    const dataLaporan = [...newDetailPemasukan, ...newDetailPengeluaran].sort(
      (a, b) => new Date(a.tanggal) - new Date(b.tanggal)
    );
    const reduceTotalPemasukan = newDetailPemasukan.reduce(
      (prev, current) => prev + current.totalBiaya,
      0
    );
    const reduceTotalPengeluaran = newDetailPengeluaran.reduce(
      (prev, current) => prev + current.totalPengeluaran,
      0
    );
    res.status(200).json({
      dataLaporan: dataLaporan,
      totalPemasukan: reduceTotalPemasukan,
      totalPengeluaran: reduceTotalPengeluaran,
    });
  } catch (e) {
    console.log(e);
  }
};

// POST
exports.createUser = async (req, res, next) => {
  const { email, password, role } = req.body;
  const errors = validationResult(req);
  const user = await User.find({});
  if (!errors.isEmpty()) {
    return res.status(422).render("data-users", {
      userData: user,
      message: errors.array()[0].msg,
      number: 1,
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashPassword,
      role,
      detailUser: {
        namaLengkap: "",
        noTelp: "",
        alamat: "",
      },
    });
    await user.save();
    req.flash("message", "Data Berhasil dibuat");
    res.status(201).redirect("/admin/users");
  } catch (e) {
    console.log(e);
  }
};

exports.updateUser = async (req, res, next) => {
  const { name, email, alamat, notelp } = req.body;
  let image;

  try {
    const user = await User.findById(req.user._id);
    if (req.file) {
      if (user.image) {
        fs.unlink(user.image, (err) => {
          if (err) {
            throw err;
          }
        });
      }
      image = req.file.path;
    } else {
      image = user.image;
    }
    user.detailUser.namaLengkap = name;
    user.detailUser.noTelp = notelp;
    user.detailUser.alamat = alamat;
    user.email = email;
    user.image = image;
    await user.save();
    res.redirect("/admin/account");
  } catch (e) {
    console.log(e);
  }
};

exports.createGuru = async (req, res, next) => {
  const { name, nik, nuptk, alamat, pendidikan } = req.body;
  try {
    const guru = new Guru({
      namaGuru: name,
      nik: nik,
      nuptk: nuptk,
      alamat: alamat,
      pendidikan: pendidikan,
    });
    await guru.save();
    req.flash("message", "Data Guru Berhasil dibuat");
    res.status(201).redirect("/admin/guru");
  } catch (e) {
    console.log(e);
  }
};

exports.postDataPemasukan = async (req, res, next) => {
  const { namePemasukan, biayaTetap, checkCost } = req.body;
  let inputCost = 0;
  if (checkCost) {
    inputCost = +biayaTetap;
  }
  try {
    const pemasukan = new Pemasukan({
      namaPemasukan: namePemasukan,
      biayaTetap: inputCost,
    });
    await pemasukan.save();
    req.flash("message", "Data Pemasukan Berhasil ditambahkan");
    res.status(201).redirect("/admin/pemasukan");
  } catch (e) {
    console.log(e);
  }
};

exports.updateDataPemasukan = async (req, res, next) => {
  const { pemasukanId } = req.params;
  const { editNamePemasukan, editBiayaTetap } = req.body;
  let biayaTetap = 0;
  if (editBiayaTetap) {
    biayaTetap = +editBiayaTetap;
  }
  try {
    const pemasukan = await Pemasukan.findById(pemasukanId);
    pemasukan.namaPemasukan = editNamePemasukan;
    pemasukan.biayaTetap = biayaTetap;
    await pemasukan.save();
    res.redirect("/admin/pemasukan");
  } catch (e) {
    console.log(e);
  }
};

exports.postDetailPemasukan = async (req, res, next) => {
  const { pemasukanId, total } = req.body;

  try {
    const detailPemasukan = new DetailPemasukan({
      pemasukanId: pemasukanId,
      tanggalPemasukan: new Date(),
      totalBiaya: +total,
    });
    await detailPemasukan.save();
    res.redirect("/admin/input-pemasukan");
  } catch (e) {
    console.log(e);
  }
};

exports.updateDetailPemasukan = async (req, res, next) => {
  const { detailPemasukanId } = req.params;
  const { editPemasukanId, editTotalBiaya } = req.body;
  try {
    const detailPemasukan = await DetailPemasukan.findById(detailPemasukanId);
    detailPemasukan.pemasukanId = editPemasukanId;
    detailPemasukan.totalBiaya = editTotalBiaya;
    await detailPemasukan.save();
    res.redirect("/admin/input-pemasukan");
  } catch (e) {
    console.log(e);
  }
};

exports.postDataPengeluaran = async (req, res, next) => {
  const { namePengeluaran, biayaTetapPengeluaran, checkCostPengeluaran } =
    req.body;

  let biayaPengeluaran = 0;
  if (checkCostPengeluaran) biayaPengeluaran = +biayaTetapPengeluaran;
  console.log(biayaPengeluaran, checkCostPengeluaran);
  try {
    const pengeluaran = new Pengeluaran({
      namaPengeluaran: namePengeluaran,
      biayaTetap: biayaPengeluaran,
    });
    await pengeluaran.save();
    res.redirect("/admin/pengeluaran");
  } catch (e) {
    console.log(e);
  }
};

exports.updateDataPengeluaran = async (req, res, next) => {
  const { pengeluaranId } = req.params;
  const { namePengeluaran, biayaTetapPengeluaran, checkCostPengeluaran } =
    req.body;

  let biayaPengeluaran = 0;
  if (checkCostPengeluaran) biayaPengeluaran = +biayaTetapPengeluaran;
  try {
    const pengeluaran = await Pengeluaran.findById(pengeluaranId);
    pengeluaran.namaPengeluaran = namePengeluaran;
    pengeluaran.biayaTetap = biayaPengeluaran;
    await pengeluaran.save();
    res.redirect("/admin/pengeluaran");
  } catch (e) {
    console.log(e);
  }
};

exports.postDetailPengeluaran = async (req, res, next) => {
  const { pengeluaranId, totalPengeluaran } = req.body;
  try {
    const detailPengeluaran = new DetailPengeluaran({
      pengeluaran: pengeluaranId,
      tanggalPengeluaran: new Date(),
      totalPengeluaran: totalPengeluaran,
    });
    await detailPengeluaran.save();
    res.redirect("/admin/detail-pengeluaran");
  } catch (e) {
    console.log(e);
  }
};

exports.updateDetailPengeluaran = async (req, res, next) => {
  const { detailPengeluaranId } = req.params;
  const { pengeluaranId, totalPengeluaran } = req.body;
  console.log(pengeluaranId);
  try {
    const detailPengeluaran = await DetailPengeluaran.findById(
      detailPengeluaranId
    );
    detailPengeluaran.pengeluaran = pengeluaranId;
    detailPengeluaran.totalPengeluaran = totalPengeluaran;
    await detailPengeluaran.save();
    res.redirect("/admin/detail-pengeluaran");
  } catch (e) {
    console.log(e);
  }
};

// DELETE
exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (user.image) {
      fs.unlink(user.image, (err) => {
        if (err) {
          throw err;
        }
      });
    }
    await User.deleteOne({ _id: userId });
    req.flash("message", "Data Berhasil Dihapus");
    res.redirect("/admin/users");
  } catch (e) {
    console.log(e);
  }
};

exports.deleteGuru = async (req, res, next) => {
  const { guruId } = req.params;

  try {
    await Guru.deleteOne({ _id: guruId });
    req.flash("message", "Data Guru Berhasil di Hapus");
    res.redirect("/admin/guru");
  } catch (e) {
    console.log(e);
  }
};

exports.deletePemasukan = async (req, res, next) => {
  const { pemasukanId } = req.params;
  try {
    await Pemasukan.deleteOne({ _id: pemasukanId });
    res.redirect("/admin/pemasukan");
  } catch (e) {
    console.log(e);
  }
};

exports.deletePengeluaran = async (req, res, next) => {
  const { pengeluaranId } = req.params;
  try {
    await Pengeluaran.deleteOne({ _id: pengeluaranId });
    res.redirect("/admin/pengeluaran");
  } catch (e) {
    console.log(e);
  }
};
