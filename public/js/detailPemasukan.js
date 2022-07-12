const selectPemasukan = document.querySelector("#selectPemasukan");
const totalPemasukan = document.querySelector("#totalPemasukan");
const selectEditPemasukan = document.querySelector("#selectEditPemasukan");
const totalEditPemasukan = document.querySelector("#editTotalBiaya");
const optionEditPemasukan = selectEditPemasukan.querySelectorAll("option");
const formEditDetailPemasukan = document.querySelector(
  "#formEditDetailPemasukan"
);

async function getDetail(pemasukanId) {
  const baseLocation = window.location.origin;
  const detailPemasukan = await fetch(
    `${baseLocation}/admin/detail-pemasukan/${pemasukanId}`
  );
  const result = await detailPemasukan.json();
  const optionArr = Array.from(optionEditPemasukan);
  console.log(optionArr);
  const findOption = optionArr.findIndex(
    (option) => option.value === pemasukanId
  );
  console.log(optionEditPemasukan[findOption]);
  optionEditPemasukan[findOption].value =
    result.detailPemasukan.pemasukanId._id;
  optionEditPemasukan[findOption].innerHTML =
    result.detailPemasukan.pemasukanId.namaPemasukan;
  optionEditPemasukan[findOption].selected = true;
  if (result.detailPemasukan.pemasukanId.biayaTetap) {
    totalEditPemasukan.readOnly = true;
  } else {
    totalEditPemasukan.readOnly = false;
  }
  totalEditPemasukan.value = result.detailPemasukan.totalBiaya;
  formEditDetailPemasukan.action =
    "/admin/detail-pemasukan/" + result.detailPemasukan._id;
}

selectPemasukan.addEventListener("change", async function () {
  const baseLocation = window.location.origin;
  const getDetailPemasukan = await fetch(
    `${baseLocation}/admin/pemasukan/${this.value}`
  );
  const result = await getDetailPemasukan.json();
  if (result.pemasukan.biayaTetap === 0) {
    totalPemasukan.value = "";
    totalPemasukan.readOnly = false;
  } else {
    totalPemasukan.value = result.pemasukan.biayaTetap;
    totalPemasukan.readOnly = true;
  }
});

selectEditPemasukan.addEventListener("change", async function () {
  const baseLocation = window.location.origin;
  const getDetailPemasukan = await fetch(
    `${baseLocation}/admin/pemasukan/${this.value}`
  );
  const result = await getDetailPemasukan.json();
  if (result.pemasukan.biayaTetap === 0) {
    totalEditPemasukan.value = "";
    totalEditPemasukan.readOnly = false;
  } else {
    totalEditPemasukan.value = result.pemasukan.biayaTetap;
    totalEditPemasukan.readOnly = true;
  }
});
