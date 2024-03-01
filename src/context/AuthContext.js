import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setIsLoggedIn(true);
            setUserId(storedUserId);
        }
    }, []);

    const login = (userId) => {
        localStorage.setItem('userId', userId);
        setIsLoggedIn(true);
        setUserId(userId);
    };

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
        setUserId(null);
    };

    return(
        <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}