
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: '',
        token: null,
        name: '',
        email: '',
        phone: '',
        isLoggedIn: false,
        role: null,
    });


    const logout = () => {
        setUser({ isLoggedIn: false, role: null, token: null });
        //to-do
        //localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
