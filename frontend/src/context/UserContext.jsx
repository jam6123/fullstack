import { createContext, useContext, useState } from "react";

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
    throw new Error("useUserContext must be inside of UserContext.Provider wrapper");
  }

  return value;
}

