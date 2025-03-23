import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="container">
      <h1>Вхід</h1>
      <input type="text" placeholder="Користувач" />
      <input type="password" placeholder="Пароль" />
      <button>Увійти</button>
      <p>Не маєте акаунту? <Link to="/register">Зареєструватись</Link></p>
    </div>
  );
};

export default LoginPage;
