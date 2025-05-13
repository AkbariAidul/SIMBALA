const floodForm = document.getElementById("flood-report-form");
const logoutBtn = document.getElementById("logout");

let floodReports = JSON.parse(localStorage.getItem("simbala_flood_reports")) || [];

floodForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.getElementById("flood-location").value.trim();
  const height = document.getElementById("flood-height").value.trim();
  const time = document.getElementById("flood-time").value;
  const description = document.getElementById("flood-description").value.trim();
  const user = localStorage.getItem("simbala_user");

  if (location && height && time && user) {
    floodReports.push({ user, location, height, time, description });
    localStorage.setItem("simbala_flood_reports", JSON.stringify(floodReports));
    floodForm.reset();
    alert("Laporan berhasil disimpan!");
    console.log("[SIMBALA] Laporan banjir ditambahkan:", { user, location, height, time, description });
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("simbala_user");
  localStorage.removeItem("simbala_role");
  console.log("[SIMBALA] Logout berhasil, mengalihkan ke login.html");
  window.location.href = "login.html";
});