import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const setUser = (user) => {
        setCurrentUser(user);
    };

    return (
        <AuthContext.Provider value={{ currentUser, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
