import React, { useState } from 'react';
import '../styles/UserBetsPage.css';

const UserBetsPage = () => {
    const [selectedBet, setSelectedBet] = useState('');
    const [amount, setAmount] = useState('');
    const [bets, setBets] = useState([
        { id: 1, raceNumber: 101, horseNumber: 1, coefficient: 2.5, type: 'Win' },
        { id: 2, raceNumber: 102, horseNumber: 3, coefficient: 1.8, type: 'Each-Way' },
        { id: 3, raceNumber: 103, horseNumber: 5, coefficient: 3.2, type: 'Straight forecast' },
    ]);

    return (
        <div className="user-bets-container">
            <h1>Сторінка ставок</h1>
            <div className="bets-list">
                {bets.map(bet => (
                    <div key={bet.id} className="bet-item">
                        <strong>Номер ставки:</strong> {bet.id}<br/>
                        <strong>Номер забігу:</strong> {bet.raceNumber}<br/>
                        <strong>Номер коня:</strong> {bet.horseNumber}<br/>
                        <strong>Коефіцієнт:</strong> {bet.coefficient}<br/>
                        <strong>Тип ставки:</strong> {bet.type}
                    </div>
                ))}
            </div>

            <div className="bet-form">
                <h2>Зробити ставку</h2>
                <select value={selectedBet} onChange={e => setSelectedBet(e.target.value)}>
                    <option value="">Виберіть номер ставки</option>
                    {bets.map(bet => (
                        <option key={bet.id} value={bet.id}>{bet.id}</option>
                    ))}
                </select>
                <input 
                    type="number" 
                    placeholder="Сума" 
                    value={amount} 
                    onChange={e => setAmount(e.target.value)} 
                />
                <button>Зробити ставку</button>
            </div>
        </div>
    );
};

export default UserBetsPage;
