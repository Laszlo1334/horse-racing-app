import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminHistoryPage.css';
import Header from './Header';

const AdminHistoryPage = ({ user }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/admin-history')
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching admin history:', error);
      });
  }, []);

  return (
    <div className="admin-bet-history">
      <Header user={user} />
      <h1>Історія ставок (Адміністратор)</h1>
      {history.map((item, index) => {
        const sum = parseFloat(item.sum);
        const multiplier = parseFloat(item.multiplier);
        let computedWinAmount = 0;
        if (item.state === "WIN" || item.state === "ACTIVE") {
          computedWinAmount = sum * multiplier;
        }

        return (
          <div key={`history-${item.placedBetId || index}`} className="bet-item">
            <strong>Номер Зробленої ставки:</strong> {item.placedBetId} <br />
            <strong>Номер ставки:</strong> {item.betId} <br />
            <strong>ID користувача:</strong> {item.userId} <br />
            <strong>Сума ставки:</strong> {item.sum} <br />
            <strong>Стан ставки:</strong> {item.state} <br />
            <strong>Коефіцієнт:</strong> {item.multiplier} <br />
            <strong>Сума виграшу:</strong> {computedWinAmount} <br />
            <strong>Час ставки:</strong> {new Date(item.createdAt).toLocaleString()} <br />
          </div>
        );
      })}
    </div>
  );
};

export default AdminHistoryPage;
