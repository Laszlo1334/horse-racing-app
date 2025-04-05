import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import '../styles/Header.css';

const Header = ({ user }) => {
    const { logout } = useAuth0();
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        if (user && user.email) {
            axios.get(`http://localhost:8080/user-wallet?email=${encodeURIComponent(user.email)}`)
                .then(response => {
                    setWallet(response.data.wallet);
                })
                .catch(error => {
                    console.error('Error fetching wallet:', error);
                });
        }
    }, [user]);

    return (
        <header className="header">
            <nav className="nav-links">
                {user ? (
                    <>
                        {user.role === "admin" ? (
                            <>
                                <Link to="/abets">Ставки</Link>
                                <Link to="/ahistory">Історія</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/">Ставки</Link>
                                <Link to="/uhistory">Історія</Link>
                            </>
                        )}
                    </>
                ) : null}
            </nav>
            <div className="user-info">
                {user ? (
                    <>
                        <span className="balance">{wallet !== null ? wallet : "..." } ₴</span>
                        <span className="username">{user.username}</span>
                        <Link className="login-link"
                          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                        >
                          Вихід
                        </Link>
                    </>
                ) : (
                    <Link to="/login" className="login-link">Увійти</Link>
                )}
            </div>
        </header>
    );
};

export default Header;
