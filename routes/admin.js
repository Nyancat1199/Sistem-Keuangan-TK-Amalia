const express = require("express");
const { body } = require("express-validator");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/auth-middleware");

const router = express.Router();

// GET
router.get("/", isAuth, adminController.getIndex);

router.get("/guru", isAuth, adminController.getDataGuru);

router.get("/users", isAuth, adminController.getDataUsers);

router.get("/murid", isAuth, adminController.getDataMurid);

router.get("/account", isAuth, adminController.getDetailUser);

router.get("/pemasukan", isAuth, adminController.getDataPemasukan);

router.get("/pemasukan/:pemasukanId", adminController.getDataPemasukanById);

router.get("/input-pemasukan", isAuth, adminController.getDataDetailPemasukan);

router.get(
  "/detail-pemasukan/:pemasukanId",
  adminController.getDetailPemasukanById
);

router.get("/pengeluaran", isAuth, adminController.getDataPengeluaran);

router.get(
  "/pengeluaran/:pengeluaranId",
  adminController.getDataPengeluaranById
);

router.get(
  "/detail-pengeluaran",
  isAuth,
  adminController.getDataDetailPengeluaran
);

router.get(
  "/detail-pengeluaran/:detailPengeluaranId",
  adminController.getDetailPengeluaranByPengeluaranId
);

router.get("/laporan", isAuth, adminController.dataLaporan);

router.get("/laporan/:bulan/:tahun", isAuth, adminController.getLaporan);

router.get("/api/laporan", adminController.getAPILaporan);

// POST
router.post(
  "/users",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
    body("role").not().isEmpty(),
  ],
  adminController.createUser
);

router.post("/users/:userId", adminController.deleteUser);

router.post("/update-user", isAuth, adminController.updateUser);

router.post("/guru", isAuth, adminController.createGuru);

router.post("/guru/:guruId", isAuth, adminController.deleteGuru);

router.post("/pemasukan", isAuth, adminController.postDataPemasukan);

router.post(
  "/pemasukan/:pemasukanId",
  isAuth,
  adminController.updateDataPemasukan
);

router.post(
  "/deletePemasukan/:pemasukanId",
  isAuth,
  adminController.deletePemasukan
);

router.post("/detail-pemasukan", isAuth, adminController.postDetailPemasukan);

router.post(
  "/detail-pemasukan/:detailPemasukanId",
  isAuth,
  adminController.updateDetailPemasukan
);

router.post("/pengeluaran", isAuth, adminController.postDataPengeluaran);

router.post(
  "/pengeluaran/:pengeluaranId",
  isAuth,
  adminController.updateDataPengeluaran
);

router.post(
  "/detail-pengeluaran",
  isAuth,
  adminController.postDetailPengeluaran
);

router.post(
  "/detail-pengeluaran/:detailPengeluaranId",
  isAuth,
  adminController.updateDetailPengeluaran
);

router.post(
  "/delete-pengeluaran/:pengeluaranId",
  isAuth,
  adminController.deletePengeluaran
);

module.exports = router;
