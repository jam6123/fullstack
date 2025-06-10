import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const initialValue = () => {
  const storedUser = localStorage.getItem("user");

  return {
    data: storedUser ? JSON.parse(storedUser) : null,
    csrfToken: null
  };
};

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(initialValue);

  useEffect(() => {
    if(user.data === null) {
      localStorage.removeItem("user");
      return;
    }
    
    localStorage.setItem("user", JSON.stringify(user.data));

  }, [user.data]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const value = useContext(UserContext);

  // this is possible edge case which we may forget to wrap the components with UserContext.Provider
  if (value === undefined) {
    throw new Error("useUserContext must be inside of UserContextProvider wrapper");
  }

  return value;
}

