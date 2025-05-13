document.addEventListener("DOMContentLoaded", () => {
  console.log("[SIMBALA] navbar.js dimuat");

  const role = localStorage.getItem("simbala_role");
  const navLinks = document.getElementById("nav-links");
  const logoutBtn = document.getElementById("logout-btn");

  const links = [
    { href: "index.html", text: "Beranda" },
    { href: "about.html", text: "Tentang Kami" },
    { href: "privacy.html", text: "Kebijakan Privasi" },
  ];

  if (!role) {
    links.push({ href: "login.html", text: "Login" });
  } else if (role === "user") {
    links.push({ href: "index.html", text: "Laporan Saya" });
  } else if (role === "instansi") {
    links.push({ href: "admin.html", text: "Panel Instansi" });
  }

  navLinks.innerHTML = links.map(link => `<a href="${link.href}" class="hover:underline">${link.text}</a>`).join("");

  // Logika autentikasi dari auth.js
  if (role && logoutBtn) {
    logoutBtn.classList.remove("hidden");
  } else if (logoutBtn) {
    logoutBtn.classList.add("hidden");
  }
});