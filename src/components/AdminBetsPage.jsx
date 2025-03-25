import React, { useState } from 'react';
import '../styles/AdminBetsPage.css';
import Header from './Header';

const AdminBetsPage = ({ user }) => {
    const [bets, setBets] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [newBet, setNewBet] = useState({
        raceNumber: '',
        horseNumber: '',
        coefficient: '',
        type: ''
    });

    const [editBet, setEditBet] = useState({
        betId: '',
        field: '',
        newValue: ''
    });

    const handleAddBet = () => {
        if (newBet.raceNumber && newBet.horseNumber && newBet.coefficient && newBet.type) {
            setBets([...bets, { id: bets.length + 1, ...newBet }]);
            setNewBet({ raceNumber: '', horseNumber: '', coefficient: '', type: '' });
            setShowAddForm(false);
        }
    };

    const handleEditBet = () => {
        const updatedBets = bets.map(bet => {
            if (bet.id === parseInt(editBet.betId)) {
                return { ...bet, [editBet.field]: editBet.newValue };
            }
            return bet;
        });
        setBets(updatedBets);
        setEditBet({ betId: '', field: '', newValue: '' });
        setShowEditForm(false);
    };

    return (
        <div className="admin-bets-container">
            <Header user={user} />
            <h1>Ставки Адмін</h1>
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

            <div className="buttons">
                <button onClick={() => { setShowAddForm(true); setShowEditForm(false); }}>Додати ставку</button>
                <button onClick={() => { setShowEditForm(true); setShowAddForm(false); }}>Редагувати ставку</button>
            </div>

            {showAddForm && (
                <div className="form">
                    <h2>Додати ставку</h2>
                    <input type="number" placeholder="Номер забігу" value={newBet.raceNumber} onChange={e => setNewBet({...newBet, raceNumber: e.target.value})} />
                    <input type="number" placeholder="Номер коня" value={newBet.horseNumber} onChange={e => setNewBet({...newBet, horseNumber: e.target.value})} />
                    <input type="text" placeholder="Коефіцієнт" value={newBet.coefficient} onChange={e => setNewBet({...newBet, coefficient: e.target.value})} />
                    <input type="text" placeholder="Тип ставки" value={newBet.type} onChange={e => setNewBet({...newBet, type: e.target.value})} />
                    <button onClick={handleAddBet}>Додати ставку</button>
                </div>
            )}

            {showEditForm && (
                <div className="form">
                    <h2>Редагувати ставку</h2>
                    <h4>Виберіть номер ставки</h4>
                    <select value={editBet.betId} onChange={e => setEditBet({...editBet, betId: e.target.value})}>
                        {/* {bets.map(bet => (
                            <option key={bet.id} value={bet.id}>{bet.id}</option>
                        ))} */}
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                    <h4>Виберіть поле для редагування</h4>
                    <select value={editBet.field} onChange={e => setEditBet({...editBet, field: e.target.value})}>
                        <option value="raceNumber">Номер забігу</option>
                        <option value="horseNumber">Номер коня</option>
                        <option value="coefficient">Коефіцієнт</option>
                        <option value="type">Тип ставки</option>
                    </select>
                    <h4>Впишіть нове значення</h4>
                    <input type="text" placeholder="Нове значення" value={editBet.newValue} onChange={e => setEditBet({...editBet, newValue: e.target.value})} />
                    <button onClick={handleEditBet}>Редагувати ставку</button>
                </div>
            )}
        </div>
    );
};

export default AdminBetsPage;
