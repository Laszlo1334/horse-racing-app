import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserBetsPage.css';
import Header from './Header';

const UserBetsPage = ({ user }) => {
  const [selectedBet, setSelectedBet] = useState('');
  const [amount, setAmount] = useState('');
  const [bets, setBets] = useState([]);
  const [expandedRace, setExpandedRace] = useState(null);
  const [expandedHorse, setExpandedHorse] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/list-bets')
      .then(response => {
        const data = response.data;
        const formattedData = data.map(bet => ({
          betId: bet.betId,
          raceNumber: bet.raceId,
          raceDetails: {
            startTime: new Date(bet.raceStartTime).toLocaleTimeString(),
            endTime: new Date(bet.raceEndTime).toLocaleTimeString(),
            location: bet.raceLocation
          },
          horseNumber: bet.horseId,
          horseDetails: {
            name: bet.horseName,
            age: bet.horseAge,
            breed: bet.horseBreed,
            rider: bet.horseRider,
          },
          coefficient: bet.multyplier,
          type: bet.betType
        }));
        setBets(formattedData);
      })
      .catch(error => {
        console.error('Error fetching bets:', error);
      });
  }, []);

  const toggleRaceDetails = (id) => {
    setExpandedRace(expandedRace === id ? null : id);
  };

  const toggleHorseDetails = (id) => {
    setExpandedHorse(expandedHorse === id ? null : id);
  };

  const handleBetSubmit = () => {
    const betData = {
      betId: parseInt(selectedBet, 10),
      email: user.email,
      sum: parseFloat(amount)
    };

    axios.post('http://localhost:8080/make-bet', betData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setMessage('Ставка успішно оформлена!');
        console.log('Ставка оформлена:', response.data);
      })
      .catch(error => {
        
        if (error.response && error.response.data && error.response.data.error) {
          setMessage(`Помилка оформлення ставки: ${error.response.data.error}`);
        } else {
          setMessage('Помилка оформлення ставки.');
        }
        console.error('Помилка оформлення ставки:', error);
      });
  };

  return (
    <div className="user-bets-container">
      <Header user={user} />
      <h1>Сторінка ставок</h1>
      {message && <div className="message">{message}</div>}
      <div className="bets-list">
        {bets.map((bet, index) => (
          <div key={`bet-${bet.betId || index}`} className="bet-item">
            <strong>Номер ставки:</strong> {bet.betId} <br />
            <strong>Номер забігу:</strong> <span onClick={() => toggleRaceDetails(bet.betId)}>{bet.raceNumber}</span>
            {expandedRace === bet.betId && (
              <div className="race-details">
                <p><strong>Початок:</strong> {bet.raceDetails.startTime}</p>
                <p><strong>Кінець:</strong> {bet.raceDetails.endTime}</p>
                <p><strong>Локація:</strong> {bet.raceDetails.location}</p>
              </div>
            )}
            <div></div>
            <strong>Номер коня:</strong> <span onClick={() => toggleHorseDetails(bet.betId)}>{bet.horseNumber}</span>
            {expandedHorse === bet.betId && (
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
          {bets.map((bet, index) => (
            <option key={`option-${bet.betId || index}`} value={bet.betId}>{bet.betId}</option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Сума" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
        />
        <button onClick={handleBetSubmit}>Зробити ставку</button>
      </div>
    </div>
  );
};

export default UserBetsPage;
