function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
}

let users = JSON.parse(localStorage.getItem("simbala_users")) || [
  { email: "admin@simbala.id", password: simpleHash("admin123"), role: "admin", name: "Instansi Pemerintahan" },
  { email: "user1@simbala.id", password: simpleHash("user123"), role: "user", name: "Pengguna 1" },
  { email: "user2@simbala.id", password: simpleHash("user456"), role: "user", name: "Pengguna 2" },
  { email: "user3@simbala.id", password: simpleHash("user789"), role: "user", name: "Pengguna 3" }
];