import React, { useState, useEffect } from 'react';
import './css/loan.css';

function ComponentTwo() {
  const [kontak, setKontak] = useState([]);
  const [kontakTerpilih, setKontakTerpilih] = useState('');
  const [clientName, setClientName] = useState('');
  const [jumlahPinjaman, setJumlahPinjaman] = useState('');
  const [jangkaWaktu, setJangkaWaktu] = useState('');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [uangMuka, setUangMuka] = useState('');
  const [angsuran, setAngsuran] = useState([]);
  const today = new Date();

  // ✅ Debug Log: Check if ComponentTwo is rendering
  console.log("✅ ComponentTwo Loaded");

  // Load contacts from local storage
  useEffect(() => {
    try {
      const dataTersimpan = JSON.parse(localStorage.getItem('contacts')) || [];
      setKontak(dataTersimpan);
      console.log("📌 Loaded Contacts:", dataTersimpan);
    } catch (error) {
      console.error("❌ Error loading contacts from localStorage:", error);
    }
  }, []);

  const hitungAngsuran = () => {
    if (!kontakTerpilih || !jumlahPinjaman || !jangkaWaktu || !tanggalMulai || !uangMuka) {
      alert("Silakan isi semua kolom terlebih dahulu!");
      return;
    }

    const pokokUtang = parseFloat(jumlahPinjaman) - parseFloat(uangMuka);
    let bunga = jangkaWaktu < 12 ? 0.12 : jangkaWaktu <= 24 ? 0.14 : 0.165;
    const angsuranBulanan = (pokokUtang + (pokokUtang * bunga)) / jangkaWaktu;
    const jadwalAngsuran = [];

    let tanggalJatuhTempo = new Date(tanggalMulai);
    let currentYear = new Date().getFullYear();

    for (let i = 1; i <= jangkaWaktu; i++) {
      tanggalJatuhTempo.setMonth(tanggalJatuhTempo.getMonth() + 1);
      tanggalJatuhTempo.setFullYear(currentYear);

      let daysLate = Math.floor((today - tanggalJatuhTempo) / (1000 * 60 * 60 * 24));
      daysLate = daysLate > 0 ? daysLate : 0;

      jadwalAngsuran.push({
        kontrakNo: kontakTerpilih,
        clientName,
        angsuranKe: i,
        angsuranPerBulan: angsuranBulanan.toFixed(2),
        tanggalJatuhTempo: tanggalJatuhTempo.toISOString().split('T')[0],
        hariTerlambat: daysLate,
      });
    }

    try {
      const existingInstallments = JSON.parse(localStorage.getItem('installments')) || [];
      const updatedInstallments = [...existingInstallments, ...jadwalAngsuran];
      localStorage.setItem('installments', JSON.stringify(updatedInstallments));
      setAngsuran(jadwalAngsuran);

      // ✅ Debug Log: Check if installments are saved
      console.log("📌 Saved Installments:", updatedInstallments);
    } catch (error) {
      console.error("❌ Error saving installments:", error);
    }
  };

  return (
    <div className="loan-page">
      <h2>💰 Simulasi Kredit</h2>

      {/* ✅ Debug Log: If `kontak` is empty, show warning */}
      {kontak.length === 0 && <p style={{ color: "red" }}>❗ Tidak ada kontak tersedia!</p>}

      <div className="form-container">
        <label>Pilih Kontak:</label>
        <select
          onChange={(e) => {
            setKontakTerpilih(e.target.value);
            const selectedClient = kontak.find(c => c.id === e.target.value);
            setClientName(selectedClient ? selectedClient.name : '');
          }}
          value={kontakTerpilih}
        >
          <option value="">-- Pilih Kontak --</option>
          {kontak.map((data, index) => (
            <option key={index} value={data.id}>
              {data.name} (OTK: {data.otk})
            </option>
          ))}
        </select>

        <input type="number" placeholder="Jumlah Pinjaman (Rp)" value={jumlahPinjaman} onChange={(e) => setJumlahPinjaman(e.target.value)} />
        <input type="number" placeholder="Jangka Waktu (Bulan)" value={jangkaWaktu} onChange={(e) => setJangkaWaktu(e.target.value)} />
        <input type="date" value={tanggalMulai} onChange={(e) => setTanggalMulai(e.target.value)} />
        <input type="number" placeholder="Uang Muka (Rp)" value={uangMuka} onChange={(e) => setUangMuka(e.target.value)} />

        <button onClick={hitungAngsuran}>📊 Hitung Angsuran</button>
      </div>

      {angsuran.length > 0 && (
        <div className="table-container">
          <h3>Jadwal Angsuran Kredit</h3>
          <table>
            <thead>
              <tr>
                <th>No. Kontrak</th>
                <th>Nama Klien</th>
                <th>Angsuran Ke</th>
                <th>Angsuran Per Bulan (Rp)</th>
                <th>Tanggal Jatuh Tempo</th>
                <th>Hari Keterlambatan</th>
              </tr>
            </thead>
            <tbody>
              {angsuran.map((item, index) => (
                <tr key={index}>
                  <td>{item.kontrakNo}</td>
                  <td>{item.clientName}</td>
                  <td>{item.angsuranKe}</td>
                  <td>{item.angsuranPerBulan}</td>
                  <td>{item.tanggalJatuhTempo}</td>
                  <td style={{ color: item.hariTerlambat > 0 ? "red" : "green" }}>
                    {item.hariTerlambat}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ComponentTwo;
