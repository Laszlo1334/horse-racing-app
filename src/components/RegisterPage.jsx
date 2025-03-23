import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="container">
      <h1>Реєстрація</h1>
      <input type="text" placeholder="Користувач" />
      <input type="password" placeholder="Пароль" />
      <button>Зареєструватись</button>
      <p>Маєте вже акаунт? <Link to="/">Увійти</Link></p>
    </div>
  );
};

export default RegisterPage;
