import React, { useState } from 'react';
import '../styles/UserHistoryPage.css';

const UserHistoryPage = () => {
    const [bets, setBets] = useState([
        {
            id: 1,
            raceNumber: 101,
            raceDetails: { startTime: '10:00', endTime: '10:30', location: 'Львів' },
            horseNumber: 5,
            horseDetails: { name: 'Блискавка', age: 5, breed: 'Арабська', rider: 'Іван' },
            coefficient: 2.5,
            type: 'Each-way',
            amount: 100,
            status: 'Виграш',
            winAmount: 250,
            time: '2025-03-23 12:00'
        },
        {
            id: 2,
            raceNumber: 102,
            raceDetails: { startTime: '11:00', endTime: '11:30', location: 'Київ' },
            horseNumber: 3,
            horseDetails: { name: 'Вихор', age: 4, breed: 'Тракененська', rider: 'Олександр' },
            coefficient: 1.8,
            type: 'Win',
            amount: 150,
            status: 'Активна',
            winAmount: 0,
            time: '2025-03-23 12:30'
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
        <div className="user-bet-history">
            <h1>Історія ставок</h1>
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
                    <strong>Сума:</strong> {bet.amount} <br />
                    <strong>Стан:</strong> {bet.status} <br />
                    <strong>Сума виграшу:</strong> {bet.winAmount} <br />
                    <strong>Час ставки:</strong> {bet.time}
                </div>
            ))}
        </div>
    );
};

export default UserHistoryPage;
