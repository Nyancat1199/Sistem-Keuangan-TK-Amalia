const detailUserEmail = document.getElementById("email-detail");
const detailUserRole = document.getElementById("role-detail");
const btnCreateUser = document.getElementById("btn-createUser");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputRole = document.getElementById("role");
const inputAllCreateUser = document.getElementsByClassName("input-create-user");
const btnCloseUser = document.querySelector(".btn-closeUser");

// global Variabel
let validEmail = false;
let validPassword = false;
let validRole = false;

// main

// getData
const getDataById = (userId, data) => {
  let role = "Admin";
  if (data === "2") {
    role = "Kepala Sekolah";
  }
  detailUserEmail.value = userId;
  detailUserRole.value = role;
};

// AddEventListener Click
btnCloseUser.addEventListener("click", function () {
  const pElementEmail = inputAllCreateUser[0].children[2];
  const pElementPassword = inputAllCreateUser[1].children[2];
  const pElementRole = inputAllCreateUser[2].children[2];
  inputEmail.value = "";
  inputPassword.value = "";
  if (pElementEmail) {
    pElementEmail.remove();
  }
  if (pElementPassword) {
    pElementPassword.remove();
  }
  if (pElementRole) {
    pElementRole.remove();
  }
  inputEmail.style.borderColor = "#ced4da";
  inputPassword.style.borderColor = "#ced4da";
  inputRole.style.borderColor = "#ced4da";
});

// AddEventListener onChange
window.addEventListener("change", function () {
  console.log(validEmail, validPassword, validRole);
  if (validEmail && validPassword && validRole) {
    btnCreateUser.disabled = false;
    btnCreateUser.style.cursor = "pointer";
    console.log("validate");
  } else {
    btnCreateUser.disabled = true;
    btnCreateUser.style.cursor = "not-allowed";
    console.log("not Validate");
  }
});

inputEmail.addEventListener("change", function () {
  const validationEmail = inputEmail.value.trim().length > 5;
  const pElement = inputAllCreateUser[0].children[2];
  if (!validationEmail) {
    if (!pElement) {
      const errorMessage = document.createElement("p");
      errorMessage.innerText = "Masukan Input Email Minimal 5 Karakter";
      errorMessage.style.color = "red";
      inputAllCreateUser[0].appendChild(errorMessage);
    }
    inputEmail.style.borderColor = "red";
    inputEmail.style.outlineColor = "red";
    validEmail = validationEmail;
    return;
  }
  if (pElement) {
    pElement.remove();
  }
  inputEmail.style.borderColor = "#ced4da";
  validEmail = validationEmail;
});

inputPassword.addEventListener("change", function () {
  const validatePassword = inputPassword.value.trim().length >= 8;
  const pElement = inputAllCreateUser[1].children[2];
  if (!validatePassword) {
    if (!pElement) {
      const errorMessage = document.createElement("p");
      errorMessage.innerText = "Masukan Password Minimal 8 Karakter";
      errorMessage.style.color = "red";
      inputAllCreateUser[1].appendChild(errorMessage);
    }
    inputPassword.style.borderColor = "red";
    inputPassword.style.outlineColor = "red";
    validPassword = validatePassword;
    return;
  }
  if (pElement) {
    pElement.remove();
  }
  inputPassword.style.borderColor = "#ced4da";
  validPassword = validatePassword;
});

inputRole.addEventListener("change", function () {
  const validateRole = inputRole.value.trim().length > 0;
  const pElement = inputAllCreateUser[2].children[2];
  if (!validateRole) {
    if (!pElement) {
      const errorMessage = document.createElement("p");
      errorMessage.innerText = "Silahkan Piih Role";
      errorMessage.style.color = "red";
      inputAllCreateUser[2].appendChild(errorMessage);
    }
    inputRole.style.borderColor = "red";
    inputRole.style.outlineColor = "red";
    validRole = validateRole;
    return;
  }
  if (pElement) {
    pElement.remove();
  }
  inputRole.style.borderColor = "#ced4da";
  validRole = validateRole;
});
