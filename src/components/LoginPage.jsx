import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="container">
      <h1>Вхід</h1>
      <button onClick={() => loginWithRedirect()}>Увійти</button>
    </div>
  );
};

export default LoginPage;
