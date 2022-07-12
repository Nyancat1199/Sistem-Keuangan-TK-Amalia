const selectTahun = document.querySelector("#selectTahun");
const selectBulan = document.querySelector("#selectBulan");
const tableBody = document.querySelector("#tableBody");
const btnPreview = document.querySelector("#btnPreview");
const titleLaporan = document.querySelector(".title-1");

// global
const listBulan = [
  "Januari",
  "February",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "July",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// getTahun
const max = new Date().getFullYear();
const min = max - 2;
for (i = max; i >= min; i--) {
  const optionElement = document.createElement("option");
  optionElement.value = i;
  optionElement.innerText = i;
  selectTahun.appendChild(optionElement);
}

function childElement(no, tanngal, keterangan, pemasukan, pengeluaran) {
  const td = `<td>${no + 1}</td>
              <td>${new Date(tanngal).toLocaleDateString()}</td>
              <td>${keterangan}</td>
              <td>${pemasukan}</td>
              <td>${pengeluaran}</td>`;
  return td;
}

selectTahun.addEventListener("change", async function () {
  const tr = tableBody.querySelectorAll("tr");
  const baseUrl = window.location.origin;
  const bulan = selectBulan.value;
  const dataLaporan = await fetch(
    `${baseUrl}/admin/api/laporan?bulan=${bulan}&tahun=${this.value}`
  );
  const result = await dataLaporan.json();
  if (result.dataLaporan.length > 0) {
    const getBulan =
      listBulan[new Date(result.dataLaporan[0].tanggal).getMonth()];
    const getTahun = new Date(result.dataLaporan[0].tanggal).getFullYear();
    titleLaporan.innerHTML = `Laporan ${getBulan}-${getTahun}`;
  } else {
    const getBulan = bulan
      ? listBulan[+bulan - 1]
      : listBulan[new Date().getMonth()];
    const getTahun = this.value;
    titleLaporan.innerHTML = `Laporan ${getBulan}-${getTahun}`;
  }
  if (bulan) {
    btnPreview.href = `${baseUrl}/admin/laporan/${bulan}/${this.value}`;
    btnPreview.target = "_blank";
  } else {
    btnPreview.href = "javascript:void(0);";
  }
  if (tr) {
    tr.forEach((child, index) => {
      child.remove();
    });
  }
  if (result.dataLaporan.length > 0) {
    result.dataLaporan.forEach((laporan, index) => {
      const createElement = document.createElement("tr");
      const keterangan = laporan.pemasukanId
        ? laporan.pemasukanId.namaPemasukan
        : laporan.pengeluaran.namaPengeluaran;
      const pemasukan = laporan.pemasukanId ? laporan.totalBiaya : "";
      const pengeluaran = laporan.pengeluaran ? laporan.totalPengeluaran : "";
      const td = childElement(
        index,
        laporan.tanggal,
        keterangan,
        pemasukan,
        pengeluaran
      );
      createElement.innerHTML = td;
      tableBody.appendChild(createElement);
    });
  } else {
    const createElement = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = "5";
    td.innerText = "Tidak Ada Data";
    td.style.textAlign = "center";
    createElement.appendChild(td);
    tableBody.appendChild(createElement);
  }
});

selectBulan.addEventListener("change", async function () {
  const tr = tableBody.querySelectorAll("tr");
  const baseUrl = window.location.origin;
  const tahun = selectTahun.value;
  btnPreview.href = `${baseUrl}/admin/laporan/${this.value}/${tahun}`;
  const dataLaporan = await fetch(
    `${baseUrl}/admin/api/laporan?bulan=${this.value}&tahun=${tahun}`
  );
  const result = await dataLaporan.json();
  if (result.dataLaporan.length > 0) {
    const getBulan =
      listBulan[new Date(result.dataLaporan[0].tanggal).getMonth()];
    const getTahun = new Date(result.dataLaporan[0].tanggal).getFullYear();
    titleLaporan.innerHTML = `Laporan ${getBulan}-${getTahun}`;
  } else {
    const getBulan = listBulan[+this.value - 1];
    const getTahun = tahun ? tahun : new Date().getFullYear();
    titleLaporan.innerHTML = `Laporan ${getBulan}-${getTahun}`;
  }
  if (tr) {
    tr.forEach((child, index) => {
      child.remove();
    });
  }
  if (result.dataLaporan.length > 0) {
    result.dataLaporan.forEach((laporan, index) => {
      const createElement = document.createElement("tr");
      const keterangan = laporan.pemasukanId
        ? laporan.pemasukanId.namaPemasukan
        : laporan.pengeluaran.namaPengeluaran;
      const pemasukan = laporan.pemasukanId ? laporan.totalBiaya : "";
      const pengeluaran = laporan.pengeluaran ? laporan.totalPengeluaran : "";
      const td = childElement(
        index,
        laporan.tanggal,
        keterangan,
        pemasukan,
        pengeluaran
      );
      createElement.innerHTML = td;
      tableBody.appendChild(createElement);
    });
  } else {
    const createElement = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = "5";
    td.innerText = "Tidak Ada Data";
    td.style.textAlign = "center";
    createElement.appendChild(td);
    tableBody.appendChild(createElement);
  }

  if (tahun) {
    btnPreview.href = `${baseUrl}/admin/laporan/${bulan}/${this.value}`;
    btnPreview.target = "_blank";
  } else {
    btnPreview.href = "javascript:void(0);";
  }
});
