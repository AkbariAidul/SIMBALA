document.addEventListener("DOMContentLoaded", () => {
  console.log("[SIMBALA] user.js dimuat");

  const role = localStorage.getItem("simbala_role");
  const email = localStorage.getItem("simbala_email");
  if (!role || role !== "user" || !email) {
    window.location.href = "login.html";
    return;
  }

  const namaInput = document.getElementById("nama");
  if (namaInput) namaInput.value = localStorage.getItem("simbala_user") || "Pengguna";

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

  tampilkanLaporan(email);
});