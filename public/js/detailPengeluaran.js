const selectPengeluaran = document.querySelector("#selectPengeluaran");
const totalPengeluaran = document.querySelector("#totalPengeluaran");
const btnEditDetailPengeluaran = document.querySelector(
  "#btnEditDetailPengeluaran"
);
const btnTambahDetailPengeluaran = document.querySelector(
  "#btnTambahDetailPengeluaran"
);
const formDetailPengeluaran = document.querySelector("#formDetailPengeluaran");

selectPengeluaran.addEventListener("change", async function () {
  const baseUrl = window.location.origin;
  const pengeluaran = await fetch(`${baseUrl}/admin/pengeluaran/${this.value}`);

  const result = await pengeluaran.json();
  if (result.pengeluaran.biayaTetap) {
    totalPengeluaran.value = result.pengeluaran.biayaTetap;
    totalPengeluaran.readOnly = true;
  } else {
    totalPengeluaran.value = "";
    totalPengeluaran.readOnly = false;
  }
});

async function getDataDetailPengeluaranByPengeluaranId(pengeluaranId) {
  const getOption = selectPengeluaran.querySelectorAll("option");
  const baseUrl = window.location.origin;
  const detailPengeluaran = await fetch(
    `${baseUrl}/admin/detail-pengeluaran/${pengeluaranId}`
  );
  const result = await detailPengeluaran.json();
  console.log(result);
  const optionArray = [...getOption];
  const findOption = optionArray.findIndex(
    (option) => option.value === result.detailPengeluaran.pengeluaran._id
  );
  getOption[findOption].selected = true;
  if (result.detailPengeluaran.pengeluaran.biayaTetap) {
    totalPengeluaran.readOnly = true;
  } else {
    totalPengeluaran.readOnly = false;
  }
  totalPengeluaran.value = result.detailPengeluaran.totalPengeluaran;
  formDetailPengeluaran.action =
    "/admin/detail-pengeluaran/" + result.detailPengeluaran._id;
}

btnTambahDetailPengeluaran.addEventListener("click", () => {
  selectPengeluaran[0].selected = true;
  totalPengeluaran.value = "";
  totalPengeluaran.readOnly = false;
  formDetailPengeluaran.action = "/admin/detail-pengeluaran";
});
