import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminBetsPage.css';
import Header from './Header';

const AdminBetsPage = ({ user }) => {
  const [bets, setBets] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [newBet, setNewBet] = useState({
    raceId: '',
    horseId: '',
    betType: '',
    multiplier: ''
  });

  const [races, setRaces] = useState([]);
  const [horses, setHorses] = useState([]);

  const [editBet, setEditBet] = useState({
    placedBetId: '',
    newState: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8080/admin-history')
      .then(response => {
        setBets(response.data);
      })
      .catch(error => {
        console.error('Error fetching bets:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/add-bet-form')
      .then(response => {
        setRaces(response.data.races);
        setHorses(response.data.horses);
      })
      .catch(error => {
        console.error('Error fetching races and horses:', error);
      });
  }, []);

  const handleAddBet = () => {
    if (newBet.raceId && newBet.horseId && newBet.betType && newBet.multiplier) {
      const payload = {
        raceId: parseInt(newBet.raceId),
        horseId: parseInt(newBet.horseId),
        betType: newBet.betType,
        multiplier: parseFloat(newBet.multiplier)
      };

      axios.post('http://localhost:8080/add-bet', payload, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        return axios.get('http://localhost:8080/admin-history');
      })
      .then(response => {
        setBets(response.data);
        setNewBet({ raceId: '', horseId: '', betType: '', multiplier: '' });
        setShowAddForm(false);
      })
      .catch(error => {
        console.error("Error adding bet:", error);
        alert("Помилка додавання ставки.");
      });
    } else {
      alert("заповніть усі поля для додавання ставки.");
    }
  };

  const handleEditBet = () => {
    if (!editBet.placedBetId || !editBet.newState) {
      alert("оберіть ставку та новий стан.");
      return;
    }

    const payload = {
      placedBetId: parseInt(editBet.placedBetId),
      newState: editBet.newState
    };

    axios.post('http://localhost:8080/edit-bet', payload, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      return axios.get('http://localhost:8080/admin-history');
    })
    .then(response => {
      setBets(response.data);
      setEditBet({ placedBetId: '', newState: '' });
      setShowEditForm(false);
    })
    .catch(error => {
      console.error("Error editing bet:", error);
      alert("помилка редагування ставки.");
    });
  };

  const activeBets = bets.filter(bet => bet.state === "ACTIVE");

  return (
    <div className="admin-bets-container">
      <Header user={user} />
      <h1>Ставки Адмін</h1>
      <div className="bets-list">
        {bets.map(bet => (
          <div key={bet.placedBetId} className="bet-item">
            <strong>Номер ставки:</strong> {bet.betId}<br/>
            <strong>Номер зробленої ставки:</strong> {bet.placedBetId}<br/>
            <strong>ID користувача:</strong> {bet.userId}<br/>
            <strong>Сума ставки:</strong> {bet.sum}<br/>
            <strong>Стан ставки:</strong> {bet.state}<br/>
            <strong>Час ставки:</strong> {new Date(bet.createdAt).toLocaleString()}
          </div>
        ))}
      </div>

      <div className="buttons">
        <button onClick={() => { setShowAddForm(true); setShowEditForm(false); }}>
          Додати ставку
        </button>
        <button onClick={() => { setShowEditForm(true); setShowAddForm(false); }}>
          Редагувати ставку
        </button>
      </div>

      {showAddForm && (
        <div className="form">
          <h2>Додати ставку</h2>
          <div>
            <label>Номер забігу:</label>
            <select
              value={newBet.raceId}
              onChange={e => setNewBet({ ...newBet, raceId: e.target.value })}
            >
              <option value="">Оберіть забіг</option>
              {races.map(race => (
                <option key={race.id} value={race.id}>
                  {race.id} - {new Date(race.startTime).toLocaleString()} - {race.location}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Номер коня:</label>
            <select
              value={newBet.horseId}
              onChange={e => setNewBet({ ...newBet, horseId: e.target.value })}
            >
              <option value="">Оберіть коня</option>
              {horses.map(horse => (
                <option key={horse.id} value={horse.id}>
                  {horse.id} - {horse.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Тип ставки:</label>
            <select
              value={newBet.betType}
              onChange={e => setNewBet({ ...newBet, betType: e.target.value })}
            >
              <option value="">Оберіть тип ставки</option>
              <option value="straight-forecast">straight-forecast</option>
              <option value="win">win</option>
              <option value="each-way">each-way</option>
              <option value="each/way">each/way</option>
            </select>
          </div>
          <div>
            <label>коефіцієнт ставки:</label>
            <input
              type="number"
              step="0.01"
              placeholder="Введіть коефіцієнт ставки"
              value={newBet.multiplier}
              onChange={e => setNewBet({ ...newBet, multiplier: e.target.value })}
            />
          </div>
          <button onClick={handleAddBet}>додати ставку</button>
        </div>
      )}

      {showEditForm && (
        <div className="form">
          <h2>Редагувати ставку</h2>
          <h4>Виберіть ставку:</h4>
          <select
            value={editBet.placedBetId}
            onChange={e => setEditBet({ ...editBet, placedBetId: e.target.value })}
          >
            <option value="">Оберіть ставку</option>
            {activeBets.map(bet => (
              <option key={bet.placedBetId} value={bet.placedBetId}>
                {bet.placedBetId}
              </option>
            ))}
          </select>
          <h4>Виберіть новий стан:</h4>
          <select
            value={editBet.newState}
            onChange={e => setEditBet({ ...editBet, newState: e.target.value })}
          >
            <option value="">Оберіть</option>
            <option value="WIN">WIN</option>
            <option value="LOSE">LOSE</option>
          </select>
          <button onClick={handleEditBet}>Редагувати ставку</button>
        </div>
      )}
    </div>
  );
};

export default AdminBetsPage;
