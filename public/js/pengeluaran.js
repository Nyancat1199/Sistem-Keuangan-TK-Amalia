const checkCostPengeluaran = document.querySelector("#checkCostPengeluaran");
const formPengeluaranBody = document.querySelector("#formPengeluaranBody");
const formPengeluaran = document.querySelector("#formPengeluaran");
const inputNamePengeluaran = document.querySelector("#namePengeluaran");
const btnTambahPengeluaran = document.querySelector("#btnTambahPengeluaran");
const titleModalPengeluaran = document.querySelector('#titleModalPengeluaran');

btnTambahPengeluaran.addEventListener("click", () => {
  const inputPengeluaran = formPengeluaranBody.querySelectorAll(".form-group");
  if (inputPengeluaran[1]) {
    inputPengeluaran[1].remove();
  }
  inputNamePengeluaran.value = ""
  checkCostPengeluaran.checked = false;
  titleModalPengeluaran.innerHTML = "Tambah Pengeluaran"
  formPengeluaran.action = '/admin/pengeluaran'
});

checkCostPengeluaran.addEventListener("click", function () {
  const inputPengeluaran = formPengeluaranBody.querySelectorAll(".form-group");
  if (this.checked) {
    if (!inputPengeluaran[1]) {
      const divElement = document.createElement("div");
      const inputElement = document.createElement("input");
      divElement.classList.add("form-group");
      inputElement.classList.add("form-control");
      inputElement.name = "biayaTetapPengeluaran";
      inputElement.type = "number";
      inputElement.placeholder = "Masukan Biaya Pengeluaran";
      divElement.appendChild(inputElement);
      formPengeluaranBody.appendChild(divElement);
      console.log("true");
    }
  } else {
    if (inputPengeluaran[1]) {
      inputPengeluaran[1].remove();
    }
    console.log("false");
  }
});

function getDataPengeluaran(id, name, biaya) {
  inputNamePengeluaran.value = name;
  const inputPengeluaran = formPengeluaranBody.querySelectorAll(".form-group");
  if (+biaya) {
    const divElement = document.createElement("div");
    const inputElement = document.createElement("input");
    divElement.classList.add("form-group");
    inputElement.classList.add("form-control");
    inputElement.name = "biayaTetapPengeluaran";
    inputElement.type = "number";
    inputElement.value = biaya;
    inputElement.placeholder = "Masukan Biaya Pengeluaran";
    divElement.appendChild(inputElement);
    formPengeluaranBody.appendChild(divElement);
    checkCostPengeluaran.checked = true
  } else {
    if (inputPengeluaran[1]) {
      inputPengeluaran[1].remove();
    }
    checkCostPengeluaran.checked = false
  }
  titleModalPengeluaran.innerHTML = "Update Pengeluaran"
  formPengeluaran.action = '/admin/pengeluaran/' + id;
}
