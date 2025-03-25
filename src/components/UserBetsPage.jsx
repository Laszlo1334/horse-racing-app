import React, { useState } from 'react';
import '../styles/UserBetsPage.css';
import Header from './Header';

const UserBetsPage = ({ user }) => {
    const [selectedBet, setSelectedBet] = useState('');
    const [amount, setAmount] = useState('');
    const [bets, setBets] = useState([
            {
                id: 1,
                raceNumber: 101,
                raceDetails: { startTime: '10:00', endTime: '10:30', location: 'Львів' },
                horseNumber: 5,
                horseDetails: { name: 'Блискавка', age: 5, breed: 'Арабська', rider: 'Іван' },
                coefficient: 2.5,
                type: 'Each-way'
            },
            {
                id: 2,
                raceNumber: 102,
                raceDetails: { startTime: '11:00', endTime: '11:30', location: 'Київ' },
                horseNumber: 3,
                horseDetails: { name: 'Вихор', age: 4, breed: 'Тракененська', rider: 'Олександр' },
                coefficient: 1.8,
                type: 'Win'
            },
            {
                id: 3,
                raceNumber: 103,
                raceDetails: { startTime: '21:00', endTime: '18:30', location: 'Львів' },
                horseNumber: 7,
                horseDetails: { name: 'Шум', age: 8, breed: 'Породиста', rider: 'Міша' },
                coefficient: 1.24,
                type: 'Straight forecast'
            }
        ]);

    const [expandedRace, setExpandedRace] = useState(null);
    const [expandedHorse, setExpandedHorse] = useState(null);
    
    const toggleRaceDetails = (id) => {
        setExpandedRace(expandedRace === id ? null : id);
    };
    
    const toggleHorseDetails = (id) => {
        setExpandedHorse(expandedHorse === id ? null : id);
    };

    return (
        <div className="user-bets-container">
            <Header user={user} />
            <h1>Сторінка ставок</h1>
            <div className="bets-list">
            {bets.map(bet => (
                <div key={bet.id} className="bet-item">
                    <strong>Номер ставки:</strong> {bet.id} <br />
                    <strong>Номер забігу:</strong> <span onClick={() => toggleRaceDetails(bet.id)}>{bet.raceNumber}</span>
                    {expandedRace === bet.id && (
                        <div className="race-details">
                            <p><strong>Початок:</strong> {bet.raceDetails.startTime}</p>
                            <p><strong>Кінець:</strong> {bet.raceDetails.endTime}</p>
                            <p><strong>Локація:</strong> {bet.raceDetails.location}</p>
                        </div>
                    )}
                    <div></div>
                    <strong>Номер коня:</strong> <span onClick={() => toggleHorseDetails(bet.id)}>{bet.horseNumber}</span>
                    {expandedHorse === bet.id && (
                        <div className="horse-details">
                            <p><strong>Ім'я коня:</strong> {bet.horseDetails.name}</p>
                            <p><strong>Вік коня:</strong> {bet.horseDetails.age}</p>
                            <p><strong>Порода:</strong> {bet.horseDetails.breed}</p>
                            <p><strong>Ім'я всадника:</strong> {bet.horseDetails.rider}</p>
                        </div>
                    )}
                    <div></div>
                    <strong>Коефіцієнт:</strong> {bet.coefficient} <br />
                    <strong>Тип ставки:</strong> {bet.type} <br />
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
