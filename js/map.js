console.log("✅ map.js dimulai");

const rawanBanjirGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "nama": "Zona A", "tingkat": "Tinggi" },
      "geometry": { "type": "Polygon", "coordinates": [[[-2.95, 114.73], [-2.94, 114.74], [-2.95, 114.75], [-2.95, 114.73]]] }
    },
    {
      "type": "Feature",
      "properties": { "nama": "Zona B", "tingkat": "Sedang" },
      "geometry": { "type": "Polygon", "coordinates": [[[-2.96, 114.74], [-2.95, 114.75], [-2.96, 114.76], [-2.96, 114.74]]] }
    }
  ]
};

const map = L.map('map').setView([-2.9474, 114.7368], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

function getZonaColor(tingkat) {
  switch (tingkat) {
    case 'Tinggi': return '#d90429';
    case 'Sedang': return '#f77f00';
    case 'Ringan': return '#fcbf49';
    default: return '#ccc';
  }
}

function styleZona(feature) {
  return {
    fillColor: getZonaColor(feature.properties.tingkat),
    weight: 2,
    opacity: 1,
    color: '#666',
    fillOpacity: 0.6
  };
}

function onEachZona(feature, layer) {
  if (feature.properties && feature.properties.nama) {
    layer.bindPopup(`<b>${feature.properties.nama}</b><br>Tingkat: ${feature.properties.tingkat}`);
  }
}

if (rawanBanjirGeoJSON) {
  L.geoJSON(rawanBanjirGeoJSON, {
    style: styleZona,
    onEachFeature: onEachZona
  }).addTo(map);
}

const poskoEvakuasi = [
  { nama: "Balai Desa A", lat: -2.944, lng: 114.722, kontak: "0812-3456-7890" },
  { nama: "Gedung Serbaguna B", lat: -2.950, lng: 114.740, kontak: "0812-9999-8888" }
];

poskoEvakuasi.forEach(posko => {
  L.marker([posko.lat, posko.lng], {
    icon: L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
      iconSize: [25, 25]
    })
  }).addTo(map).bindPopup(`<b>${posko.nama}</b><br>Kontak: <a href='tel:${posko.kontak}'>${posko.kontak}</a>`);
});

const jalurEvakuasi = L.polyline([
  [-2.944, 114.722],
  [-2.947, 114.730],
  [-2.950, 114.740]
], {
  color: 'blue',
  weight: 3,
  dashArray: '5, 5',
  opacity: 0.8
}).addTo(map).bindPopup("Jalur Evakuasi");

map.on('click', function (e) {
  const latlng = e.latlng;
  const lokasiInput = document.getElementById('lokasi');
  if (lokasiInput) {
    lokasiInput.value = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
  }
});

window.isiLokasi = function () {
  const lokasiInput = document.getElementById('lokasi');
  if (!navigator.geolocation) {
    alert("Browser Anda tidak mendukung GPS.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      const lat = pos.coords.latitude.toFixed(5);
      const lng = pos.coords.longitude.toFixed(5);
      if (lokasiInput) lokasiInput.value = `${lat}, ${lng}`;
    },
    function (err) {
      alert("Gagal mendapatkan lokasi. Pastikan GPS diaktifkan.");
      console.error("Geolocation error:", err);
    }
  );
};

function simpanLaporan(nama, lokasi, tingkat, email) {
  if (!nama || !lokasi || !tingkat || !email) {
    console.error("Data laporan tidak lengkap:", { nama, lokasi, tingkat, email });
    return false;
  }
  const laporan = JSON.parse(localStorage.getItem("laporanBanjir")) || [];
  laporan.push({ nama, lokasi: lokasi.split(',').map(Number), tingkat, email, status: "Menunggu" });
  localStorage.setItem("laporanBanjir", JSON.stringify(laporan));
  return true;
}

window.tampilkanLaporan = function(email) {
  const laporan = JSON.parse(localStorage.getItem("laporanBanjir")) || [];
  const panel = document.getElementById("daftar-laporan");
  if (!panel) return;

  panel.innerHTML = '';

  const userLaporan = laporan.filter(data => data.email === email);
  userLaporan.forEach(data => {
    if (data.lokasi && data.lokasi.length === 2) {
      const marker = L.marker(data.lokasi).addTo(map);
      marker.bindPopup(`<b>Laporan Banjir</b><br>Oleh: ${data.nama}<br>Tingkat: ${data.tingkat}<br>Status: ${data.status}`);
      const el = document.createElement('div');
      el.className = "text-sm border-b py-1";
      el.innerHTML = `<strong>${data.nama}</strong> (${data.tingkat}) - Status: ${data.status}<br><span class='text-gray-600 text-xs'>[${data.lokasi[0].toFixed(4)}, ${data.lokasi[1].toFixed(4)}]</span>`;
      panel.appendChild(el);
    }
  });
};

document.getElementById('reportForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const nama = document.getElementById('nama')?.value;
  const lokasiStr = document.getElementById('lokasi')?.value;
  const tingkat = document.getElementById('tingkat')?.value;
  const email = localStorage.getItem("simbala_email");

  if (!nama || !lokasiStr || !tingkat || !email) {
    alert("Harap isi semua kolom.");
    return;
  }

  const lokasi = lokasiStr.split(',').map(s => {
    const num = parseFloat(s.trim());
    return isNaN(num) ? 0 : num;
  });

  if (lokasi.length !== 2 || lokasi.some(n => isNaN(n)) || lokasi[0] < -10 || lokasi[0] > 5 || lokasi[1] < 110 || lokasi[1] > 120) {
    alert("Koordinat tidak valid atau di luar wilayah Barito Kuala.");
    return;
  }

  if (simpanLaporan(nama, lokasiStr, tingkat, email)) {
    L.marker(lokasi).addTo(map)
      .bindPopup(`<b>Laporan Banjir</b><br>Oleh: ${nama}<br>Tingkat: ${tingkat}<br>Status: Menunggu`)
      .openPopup();
    this.reset();
    tampilkanLaporan(email);
    alert("Laporan berhasil disimpan!");
  }
});