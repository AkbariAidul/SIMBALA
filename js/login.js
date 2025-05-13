function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
}

document.addEventListener("DOMContentLoaded", () => {
  const loginOptionBtn = document.getElementById("login-option");
  const registerOptionBtn = document.getElementById("register-option");
  const loginSubOptions = document.getElementById("login-sub-options");
  const registerSubOptions = document.getElementById("register-sub-options");
  const mainOptions = document.getElementById("main-options");
  const loginMasyarakatBtn = document.getElementById("login-masyarakat");
  const loginInstansiBtn = document.getElementById("login-instansi");
  const registerMasyarakatBtn = document.getElementById("register-masyarakat");
  const registerInstansiBtn = document.getElementById("register-instansi");
  const loginMasyarakatForm = document.getElementById("login-masyarakat-form");
  const loginInstansiForm = document.getElementById("login-instansi-form");
  const registerMasyarakatForm = document.getElementById("register-masyarakat-form");
  const registerInstansiForm = document.getElementById("register-instansi-form");
  const backLoginMasyarakat = document.getElementById("back-login-masyarakat");
  const backLoginInstansi = document.getElementById("back-login-instansi");
  const backRegisterMasyarakat = document.getElementById("back-register-masyarakat");
  const backRegisterInstansi = document.getElementById("back-register-instansi");
  const errorMasyarakatLogin = document.getElementById("error-masyarakat-login");
  const errorInstansiLogin = document.getElementById("error-instansi-login");
  const errorMasyarakatRegister = document.getElementById("error-masyarakat-register");
  const errorInstansiRegister = document.getElementById("error-instansi-register");

  loginOptionBtn.addEventListener("click", () => {
    mainOptions.classList.add("hidden");
    loginSubOptions.classList.remove("hidden");
    registerSubOptions.classList.add("hidden");
  });

  loginMasyarakatBtn.addEventListener("click", () => {
    loginSubOptions.classList.add("hidden");
    loginMasyarakatForm.classList.remove("hidden");
  });

  loginInstansiBtn.addEventListener("click", () => {
    loginSubOptions.classList.add("hidden");
    loginInstansiForm.classList.remove("hidden");
  });

  backLoginMasyarakat.addEventListener("click", () => {
    loginMasyarakatForm.classList.add("hidden");
    loginSubOptions.classList.remove("hidden");
  });

  backLoginInstansi.addEventListener("click", () => {
    loginInstansiForm.classList.add("hidden");
    loginSubOptions.classList.remove("hidden");
  });

  loginMasyarakatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email-masyarakat-login").value.trim();
    const password = simpleHash(document.getElementById("password-masyarakat-login").value.trim());

    if (!email || !password) {
      errorMasyarakatLogin.textContent = "Harap isi semua kolom.";
      return;
    }

    const user = users.find(u => u.email === email && u.password === password && u.role === "user");
    if (!user) {
      errorMasyarakatLogin.textContent = "Email atau password salah.";
      console.log("[SIMBALA] Login Masyarakat gagal: Kredensial salah");
      return;
    }

    localStorage.setItem("simbala_role", "user");
    localStorage.setItem("simbala_user", user.name || email);
    localStorage.setItem("simbala_email", email);
    console.log("[SIMBALA] Login Masyarakat berhasil, mengalihkan ke user.html");
    window.location.href = "user.html";
    errorMasyarakatLogin.textContent = "Login berhasil! Mengalihkan...";
  });

  loginInstansiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email-instansi-login").value.trim();
    const password = simpleHash(document.getElementById("password-instansi-login").value.trim());
    const govCode = document.getElementById("gov-code-login").value.trim();

    if (!email || !password || !govCode) {
      errorInstansiLogin.textContent = "Harap isi semua kolom.";
      return;
    }

    const user = users.find(u => u.email === email && u.password === password && u.role === "admin");
    if (!user || govCode !== "GOV123") {
      errorInstansiLogin.textContent = "Email, password, atau kode instansi salah.";
      console.log("[SIMBALA] Login Instansi gagal: Kredensial salah");
      return;
    }

    localStorage.setItem("simbala_role", "instansi");
    localStorage.setItem("simbala_user", email);
    localStorage.setItem("simbala_email", email);
    console.log("[SIMBALA] Login Instansi berhasil, mengalihkan ke admin.html");
    window.location.href = "admin.html";
    errorInstansiLogin.textContent = "Login berhasil! Mengalihkan...";
  });

  registerOptionBtn.addEventListener("click", () => {
    mainOptions.classList.add("hidden");
    registerSubOptions.classList.remove("hidden");
    loginSubOptions.classList.add("hidden");
  });

  registerMasyarakatBtn.addEventListener("click", () => {
    registerSubOptions.classList.add("hidden");
    registerMasyarakatForm.classList.remove("hidden");
  });

  registerInstansiBtn.addEventListener("click", () => {
    registerSubOptions.classList.add("hidden");
    registerInstansiForm.classList.remove("hidden");
  });

  backRegisterMasyarakat.addEventListener("click", () => {
    registerMasyarakatForm.classList.add("hidden");
    registerSubOptions.classList.remove("hidden");
  });

  backRegisterInstansi.addEventListener("click", () => {
    registerInstansiForm.classList.add("hidden");
    registerSubOptions.classList.remove("hidden");
  });

  registerMasyarakatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name-masyarakat").value.trim();
    const email = document.getElementById("email-masyarakat-register").value.trim();
    const password = simpleHash(document.getElementById("password-masyarakat-register").value.trim());

    if (!name || !email || !password) {
      errorMasyarakatRegister.textContent = "Harap isi semua kolom.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorMasyarakatRegister.textContent = "Email tidak valid.";
      return;
    }
    if (users.find(u => u.email === email)) {
      errorMasyarakatRegister.textContent = "Email sudah terdaftar.";
      return;
    }

    users.push({ email, password, role: "user", name });
    localStorage.setItem("simbala_users", JSON.stringify(users));
    localStorage.setItem("simbala_role", "user");
    localStorage.setItem("simbala_user", name);
    localStorage.setItem("simbala_email", email);
    console.log("[SIMBALA] Register Masyarakat berhasil, mengalihkan ke user.html");
    window.location.href = "user.html";
    errorMasyarakatRegister.textContent = "Registrasi berhasil! Mengalihkan...";
  });

  registerInstansiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name-instansi").value.trim();
    const email = document.getElementById("email-instansi-register").value.trim();
    const password = simpleHash(document.getElementById("password-instansi-register").value.trim());
    const govCode = document.getElementById("gov-code-register").value.trim();

    if (!name || !email || !password || !govCode) {
      errorInstansiRegister.textContent = "Harap isi semua kolom.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorInstansiRegister.textContent = "Email tidak valid.";
      return;
    }
    if (users.find(u => u.email === email)) {
      errorInstansiRegister.textContent = "Email sudah terdaftar.";
      return;
    }
    if (govCode !== "GOV123") {
      errorInstansiRegister.textContent = "Kode instansi salah.";
      return;
    }

    users.push({ email, password, role: "admin", name });
    localStorage.setItem("simbala_users", JSON.stringify(users));
    localStorage.setItem("simbala_role", "instansi");
    localStorage.setItem("simbala_user", name);
    localStorage.setItem("simbala_email", email);
    console.log("[SIMBALA] Register Instansi berhasil, mengalihkan ke admin.html");
    window.location.href = "admin.html";
    errorInstansiRegister.textContent = "Registrasi berhasil! Mengalihkan...";
  });
});