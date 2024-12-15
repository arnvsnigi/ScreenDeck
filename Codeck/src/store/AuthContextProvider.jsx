import React, { useState } from 'react';

export const AuthContext = React.createContext({
  name:"",
  isLoggedIn: false,
  LoginHandler: () => {},
  LogoutHandler: () => {},
  nameHandler: () => {}
});

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');

    const nameHandler = (value) => {
        setName(value);
    };
  const LoginHandler = () => {
    setIsLoggedIn(true);
  };

  const LogoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ 
      name,
      nameHandler,
      isLoggedIn, 
      LoginHandler, 
      LogoutHandler 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;