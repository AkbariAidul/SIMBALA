document.addEventListener("DOMContentLoaded", () => {
  console.log("[SIMBALA] admin.js dimuat");

  const role = localStorage.getItem("simbala_role");
  if (!role || role !== "instansi") {
    window.location.href = "login.html";
    return;
  }

  const laporanBody = document.getElementById("laporan-body");
  let laporan = JSON.parse(localStorage.getItem("laporanBanjir")) || [];

  function displayLaporan() {
    laporanBody.innerHTML = "";
    laporan.forEach((report, index) => {
      const status = report.status || "Menunggu";
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="py-2 px-4 border">${report.nama}</td>
        <td class="py-2 px-4 border">[${report.lokasi[0].toFixed(4)}, ${report.lokasi[1].toFixed(4)}]</td>
        <td class="py-2 px-4 border">${report.tingkat}</td>
        <td class="py-2 px-4 border">
          <select onchange="updateStatus(${index}, this.value)">
            <option value="Menunggu" ${status === "Menunggu" ? "selected" : ""}>Menunggu</option>
            <option value="Diproses" ${status === "Diproses" ? "selected" : ""}>Diproses</option>
            <option value="Selesai" ${status === "Selesai" ? "selected" : ""}>Selesai</option>
          </select>
        </td>
        <td class="py-2 px-4 border">
          <button class="btn-delete text-white py-1 px-2 rounded-lg" onclick="deleteLaporan(${index})">Hapus</button>
        </td>
      `;
      laporanBody.appendChild(row);
    });
  }

  window.updateStatus = function(index, status) {
    laporan[index].status = status;
    localStorage.setItem("laporanBanjir", JSON.stringify(laporan));
    displayLaporan();
    console.log("[SIMBALA] Status laporan diperbarui, index:", index, "status:", status);
  };

  window.deleteLaporan = function(index) {
    laporan.splice(index, 1);
    localStorage.setItem("laporanBanjir", JSON.stringify(laporan));
    displayLaporan();
    console.log("[SIMBALA] Laporan dihapus, index:", index);
  };

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("simbala_role");
      localStorage.removeItem("simbala_user");
      localStorage.removeItem("simbala_email");
      console.log("[SIMBALA] Logout berhasil, mengalihkan ke login.html");
      window.location.href = "login.html";
    });
  }

  displayLaporan();
});