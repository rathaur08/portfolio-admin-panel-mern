import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"))

  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken)
  }

  // Login Data
  let isLoggedin = !!token;
  // console.log("isLoggedin", isLoggedin);


  // LogoutUser function
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token")
  };

  return (
    <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider")
  }

  return authContextValue;
}