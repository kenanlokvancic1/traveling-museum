import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);


export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const login = (email, password) => {
    const users = [
      { email: "admin@admin.com", password: "admin123", role: "admin" },
      { email: "curator@curator.com", password: "curator123", role: "curator" },
      { email: "user@user.com", password: "user123", role: "user" },
    ];

    const loggedInUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } else {
      console.log("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <LoginContext.Provider value={{ user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
