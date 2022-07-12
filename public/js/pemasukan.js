const btnCheckEdit = document.querySelector("#checkEditCost");

window.addEventListener("change", () => {
  const checkCost = document.querySelector("#check-cost").checked;
  const parentDiv = document.querySelector("#formPemasukanBody");
  const formGroupParentDiv = parentDiv.querySelectorAll(".form-group");
  if (checkCost) {
    const childDiv = document.createElement("div");
    // const childLabel = document.createElement("label");
    if (!formGroupParentDiv[1]) {
      const childInput = document.createElement("input");
      childInput.type = "number";
      childInput.classList.add("form-control");
      childInput.name = "biayaTetap";
      childInput.id = "biayaTetap";
      childInput.placeholder = "Masukan Biaya Tetap";
      // childLabel.innerText = "Biaya Tetap";
      // childDiv.appendChild(childLabel);
      childDiv.classList.add("form-group");
      childDiv.appendChild(childInput);
      parentDiv.appendChild(childDiv);
    }
  } else {
    if (formGroupParentDiv[1]) {
      formGroupParentDiv[1].remove();
    }
  }
});

function getDataPemasukan(idPemasukan, namaPemasukan, biayaPemasukan) {
  const formEditPemasukan = document.querySelector("#formEditPemasukan");
  const formEditPemasukanBody = document.querySelector(
    "#formEditPemasukanBody"
  );
  const formGroupInput = formEditPemasukanBody.querySelectorAll(".form-group");
  const inputNamaPemasukan = document.querySelector("#editNamePemasukan");
  const inputBiayaTetap = document.querySelector("#editBiayaTetap");
  const checkedBiayaTetap = document.querySelector("#checkEditCost");
  let divElement;
  inputNamaPemasukan.value = namaPemasukan;
  if (biayaPemasukan !== "0") {
    checkedBiayaTetap.checked = true;
  } else {
    checkedBiayaTetap.checked = false;
  }
  if (checkedBiayaTetap.checked) {
    if (!formGroupInput[1]) {
      divElement = document.createElement("div");
      divElement.classList.add("form-group");
      const childDiv = document.createElement("input");
      childDiv.classList.add("form-control");
      childDiv.type = "number";
      childDiv.id = "editBiayaTetap";
      childDiv.name = "editBiayaTetap";
      childDiv.value = biayaPemasukan;
      divElement.appendChild(childDiv);
      formEditPemasukanBody.appendChild(divElement);
    } else {
      formGroupInput[1].children[0].value = biayaPemasukan;
    }
  } else {
    if (formGroupInput[1]) {
      formGroupInput[1].remove();
    }
  }

  formEditPemasukan.action = "/admin/pemasukan/" + idPemasukan;
}

btnCheckEdit.addEventListener("click", function () {
  const formEditPemasukanBody = document.querySelector(
    "#formEditPemasukanBody"
  );
  const formEditPemasukan = document.querySelector("#formEditPemasukan");
  const formGroupInput = formPemasukanBody.querySelectorAll(".form-group");
  if (this.checked) {
    if (!formGroupInput[1]) {
      const divElement = document.createElement("div");
      divElement.classList.add("form-group");
      const childDiv = document.createElement("input");
      childDiv.classList.add("form-control");
      childDiv.type = "number";
      childDiv.id = "editBiayaTetap";
      childDiv.name = "editBiayaTetap";
      divElement.appendChild(childDiv);
      formEditPemasukanBody.appendChild(divElement);
    }
  } else {
    if (formEditPemasukanBody.children[2]) {
      formEditPemasukanBody.children[2].remove();
    }
  }
});
