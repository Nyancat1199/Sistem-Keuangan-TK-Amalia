const currency = document.querySelectorAll(".currency");
const btnPrint = document.querySelector("#print");

const rupiah = (number) => {
  if (+number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(+number);
  } else {
    return null;
  }
};

currency.forEach((money) => {
  money.innerText = rupiah(money.innerText);
});

btnPrint.addEventListener("click", () => {
  window.print();
});

window.addEventListener("beforeprint", () => {
  console.log("before print");
  btnPrint.style.display = "none";
});

window.addEventListener("afterprint", () => {
  console.log("after print");
  btnPrint.style.display = ""
});
