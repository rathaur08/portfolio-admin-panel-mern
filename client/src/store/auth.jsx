import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState("");
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
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

  // JWT AUTHENTICATION to get the currently loggedin user data
  const userAuthentaction = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          // "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("user Store Data", data.userData);
      setUser(data.userData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error during fatching user data:", error);
    }
  }


  // get Services data in backend
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/data/service", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("setServices Data", data.message);
      setServices(data.message);

    } catch (error) {
      console.error("Error during fatching user data:", error);
    }
  }

  useEffect(() => {
    getServices();
    userAuthentaction();
  }, [])

  return (
    <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedin, user, services, authorizationToken, isLoading }}>
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