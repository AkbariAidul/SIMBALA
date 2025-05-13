document.addEventListener("DOMContentLoaded", () => {
  console.log("[SIMBALA] Index.js dimuat");

  const role = localStorage.getItem("simbala_role");
  const reportForm = document.getElementById("reportForm");
  const loginPrompt = document.getElementById("login-prompt");

  if (role === "user") {
    reportForm.querySelectorAll("input, select, button").forEach(el => el.disabled = false);
    loginPrompt.classList.add("hidden");
  } else {
    reportForm.querySelectorAll("input, select, button").forEach(el => el.disabled = true);
    loginPrompt.classList.remove("hidden");
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("simbala_role");
      localStorage.removeItem("simbala_user");
      console.log("[SIMBALA] Logout berhasil, mengalihkan ke login.html");
      window.location.href = "login.html";
    });
  }

  // Tampilkan riwayat publik
  tampilkanLaporan();
});