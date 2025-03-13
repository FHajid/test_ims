# Sistem Manajemen Pinjaman & Denda Keterlambatan

## 📌 Ringkasan
Ini adalah sistem manajemen **Pinjaman & Denda Keterlambatan** berbasis web yang dibangun dengan **React.js** dan **LocalStorage** untuk penyimpanan data. Aplikasi ini memungkinkan pengguna untuk:
- **Menambahkan dan mengelola kontak** (peminjam)
- **Membuat simulasi jadwal pinjaman** dengan berbagai suku bunga
- **Melacak pembayaran yang terlambat secara otomatis**
- **Menghitung denda keterlambatan secara dinamis**

---

## 🚀 Fitur
### ✅ **Simulasi Pinjaman (ComponentTwo)**
- Pengguna dapat memasukkan detail pinjaman (jumlah, durasi, uang muka, dll.).
- Sistem akan menghasilkan **jadwal angsuran bulanan**.
- Data disimpan di **LocalStorage** untuk referensi di masa depan.

### ✅ **Perhitungan Denda Keterlambatan (Component LateFee)**
- Mengecek **pembayaran yang terlambat** berdasarkan tanggal hari ini.
- Secara otomatis menghitung **denda keterlambatan (0,1% per hari)** untuk pembayaran yang telat.
- Memfilter dan hanya menampilkan **pembayaran yang tertunda**.
- **Data dihapus saat refresh** untuk mencegah perhitungan lama.

### ✅ **Penyimpanan Data**
- Jadwal pinjaman dan kontak disimpan di **LocalStorage**.
- Data angsuran diambil **secara dinamis** saat diperlukan.

---

## 🛠 Instalasi
### **1️⃣ Clone Repository**
```sh
git clone https://github.com/FHajid/test_ims.git
cd client
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Jalankan Aplikasi**
```sh
npm start
```

---

## 📜 Cara Penggunaan
### **Menambahkan Kontak**
1. Buka halaman **Manajemen Kontak**.
2. Masukkan **Nama** dan **OTK (Hanya Angka)**.
3. Klik **Tambah Kontak**.

### **Melakukan Simulasi Pinjaman**
1. Masuk ke halaman **Simulasi Pinjaman**.
2. Pilih **kontak**.
3. Masukkan detail pinjaman (**jumlah, durasi, tanggal mulai, uang muka**).
4. Klik **Hitung Pinjaman**.
5. Sistem akan menampilkan **tabel angsuran**.

### **Melihat Denda Keterlambatan**
1. Buka halaman **Perhitungan Denda Keterlambatan**.
2. Sistem secara otomatis akan **menampilkan pembayaran yang tertunda**.
3. Menampilkan **jumlah hari keterlambatan** dan **total denda (0,1% per hari)**.

---

## 📚 Teknologi yang Digunakan
- **Frontend:** React.js (Hooks, useState, useEffect)
- **Penyimpanan Data:** LocalStorage (berbasis browser)
- **Styling:** CSS

---

## 🛠️ Pengembangan di Masa Depan
- ✅ **Integrasi Database** (Menggunakan MongoDB/Firebase menggantikan LocalStorage)
- ✅ **Sistem Autentikasi** (Login pengguna & hak akses)
- ✅ **Ekspor Data** (Menyimpan laporan dalam format PDF atau Excel)
- ✅ **Notifikasi Email** untuk pembayaran yang terlambat

---

## 📩 Dukungan
Jika menemukan masalah atau memiliki permintaan fitur, silakan buka issue di **GitHub** atau hubungi saya melalui **farhan.hajid101@gmail.com**.

---

## 📝 Lisensi
Proyek ini dilisensikan di bawah **MIT License**. Anda bebas untuk mengubah dan mendistribusikannya!

