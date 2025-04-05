import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserHistoryPage.css';
import Header from './Header';

const UserHistoryPage = ({ user }) => {
  const [history, setHistory] = useState([]);
  const [expandedRace, setExpandedRace] = useState(null);
  const [expandedHorse, setExpandedHorse] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/user-history', {
      params: { email: user.email },
    })
      .then(response => {
        const data = response.data;
        const formattedData = data.map(item => ({
          placedBetId: item.placedBetId,
          userId: item.userId,
          betId: item.betId,
          raceId: item.raceId,
          raceDetails: {
            startTime: new Date(item.raceStartTime).toLocaleTimeString(),
            endTime: new Date(item.raceEndTime).toLocaleTimeString(),
            location: item.raceLocation,
          },
          horseDetails: {
            horseId: item.horseId,
            name: item.horseName,
            age: item.horseAge,
            breed: item.horseBreed,
            rider: item.horseRider,
          },
          multyplier: item.multyplier,
          betType: item.betType,
          sum: item.sum,
          state: item.state,
          placedAt: new Date(item.placedAt).toLocaleString()
        }));
        setHistory(formattedData);
      })
      .catch(error => {
        console.error('Error fetching user history:', error);
      });
  }, [user]);

  const toggleRaceDetails = (id) => {
    setExpandedRace(expandedRace === id ? null : id);
  };

  const toggleHorseDetails = (id) => {
    setExpandedHorse(expandedHorse === id ? null : id);
  };

  return (
    <div className="user-bet-history">
      <Header user={user} />
      <h1>Історія ставок</h1>
      {history.map((item, index) => {
        const sum = parseFloat(item.sum);
        const multiplier = parseFloat(item.multyplier);
        const computedResult = item.state === "LOSE" ? 0 : sum * multiplier;
        const resultLabel = item.state === "ACTIVE" ? "Очікуваний результат" : "Результат";

        return (
          <div key={`history-${item.placedBetId || index}`} className="bet-item">
            <strong>Номер ставки:</strong> {item.betId} <br />
            <strong>Placed Bet ID:</strong> {item.placedBetId} <br />
            <strong>Номер забігу:</strong> <span onClick={() => toggleRaceDetails(item.placedBetId)}>{item.raceId}</span>
            {expandedRace === item.placedBetId && (
              <div className="race-details">
                <p><strong>Початок:</strong> {item.raceDetails.startTime}</p>
                <p><strong>Кінець:</strong> {item.raceDetails.endTime}</p>
                <p><strong>Локація:</strong> {item.raceDetails.location}</p>
              </div>
            )}
            <div></div>
            <strong>Номер коня:</strong> <span onClick={() => toggleHorseDetails(item.placedBetId)}>{item.horseDetails.horseId}</span>
            {expandedHorse === item.placedBetId && (
              <div className="horse-details">
                <p><strong>Ім'я коня:</strong> {item.horseDetails.name}</p>
                <p><strong>Вік коня:</strong> {item.horseDetails.age}</p>
                <p><strong>Порода:</strong> {item.horseDetails.breed}</p>
                <p><strong>Ім'я всадника:</strong> {item.horseDetails.rider}</p>
              </div>
            )}
            <div></div>
            <strong>Коефіцієнт:</strong> {item.multyplier} <br />
            <strong>Тип ставки:</strong> {item.betType} <br />
            <strong>Сума ставки:</strong> {item.sum} <br />
            <strong>{resultLabel}:</strong> {computedResult} <br />
            <strong>Стан:</strong> {item.state} <br />
            <strong>Час ставки:</strong> {item.placedAt} <br />
          </div>
        );
      })}
    </div>
  );
};

export default UserHistoryPage;
