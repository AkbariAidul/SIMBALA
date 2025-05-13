document.addEventListener("DOMContentLoaded", () => {
         console.log("[SIMBALA] auth.js dimuat");
         const role = localStorage.getItem("simbala_role");
         const logoutBtn = document.getElementById("logout-btn");
         if (role) {
           if (logoutBtn) logoutBtn.classList.remove("hidden");
         } else {
           if (logoutBtn) logoutBtn.classList.add("hidden");
         }
       });