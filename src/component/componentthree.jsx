import React, { useState, useEffect } from 'react';
import './css/latefee.css';

function LateFee() {
  const [lateFees, setLateFees] = useState([]);
  const penaltyRate = 0.001; // 0.1% per day
  const today = new Date();

  // Load overdue installments from localStorage
  useEffect(() => {
    const savedInstallments = JSON.parse(localStorage.getItem('installments')) || [];

    const overdueInstallments = savedInstallments
      .filter(inst => inst.hariTerlambat > 0) // Only show overdue payments
      .map(inst => {
        const penalty = inst.hariTerlambat * (parseFloat(inst.angsuranPerBulan) * penaltyRate);

        return {
          kontrakNo: inst.kontrakNo,
          clientName: inst.clientName,
          installmentNo: inst.angsuranKe,
          lateDays: inst.hariTerlambat,
          totalPenalty: penalty.toFixed(2),
          dueDate: inst.tanggalJatuhTempo,
        };
      });

    setLateFees(overdueInstallments);
  }, []);

  return (
    <div className="late-fee-page">
      <h2>🔴 Perhitungan Denda Keterlambatan</h2>

      {lateFees.length > 0 ? (
        <div className="table-container">
          <h3>📄 Rincian Denda</h3>
          <table>
            <thead>
              <tr>
                <th>KONTRAK NO</th>
                <th>NAMA KLIEN</th>
                <th>ANGSURAN KE</th>
                <th>TANGGAL JATUH TEMPO</th>
                <th>HARI KETERLAMBATAN</th>
                <th>TOTAL DENDA (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {lateFees.map((item, index) => (
                <tr key={index}>
                  <td>{item.kontrakNo}</td>
                  <td>{item.clientName}</td>
                  <td>{item.installmentNo}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.lateDays}</td>
                  <td>{item.totalPenalty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>✅ Tidak ada keterlambatan pembayaran.</p>
      )}
    </div>
  );
}

export default LateFee;
