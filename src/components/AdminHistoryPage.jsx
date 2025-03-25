import React, { useState } from 'react';
import '../styles/AdminHistoryPage.css';
import Header from './Header';

const AdminHistoryPage = ({ user }) => {
    const [bets, setBets] = useState([
        {
            id: 1,
            userId: 12,
            amount: 100,
            status: 'Виграш',
            winAmount: 250,
            time: '2025-03-23 12:00'
        },
        {
            id: 2,
            userId: 34,
            amount: 150,
            status: 'Активна',
            winAmount: 0,
            time: '2025-03-23 12:30'
        }
    ]);

    return (
        <div className="admin-bet-history">
            <Header user={user} />
            <h1>Історія ставок (Адміністратор)</h1>
            {bets.map(bet => (
                <div key={bet.id} className="bet-item">
                    <strong>Номер ставки:</strong> {bet.id} <br />
                    <strong>ID користувача:</strong> {bet.userId} <br />
                    <strong>Сума ставки:</strong> {bet.amount} <br />
                    <strong>Стан ставки:</strong> {bet.status} <br />
                    <strong>Сума виграшу:</strong> {bet.winAmount} <br />
                    <strong>Час ставки:</strong> {bet.time}
                </div>
            ))}
        </div>
    );
};

export default AdminHistoryPage;
