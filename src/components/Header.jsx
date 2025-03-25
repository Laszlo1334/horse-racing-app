import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ user }) => {
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
                                <Link to="/ubets">Ставки</Link>
                                <Link to="/uhistory">Історія</Link>
                            </>
                        )}
                    </>
                ) : null}
            </nav>
            <div className="user-info">
            {user ? (
                    <>
                        {user.role === "admin" ? (
                            <>
                                <span className="balance">{user.balance} ₴</span>
                                <span className="username">{user.username.toUpperCase()}</span>
                            </>
                        ) : (
                            <>
                                <span className="balance">{user.balance} ₴</span>
                                <span className="username">{user.username.toUpperCase()}</span>
                            </>
                        )}
                    </>
                ) : (
                        <Link to="/login" className="login-link">Увійти</Link>
                )}
            </div>
        </header>
    );
};

export default Header;
