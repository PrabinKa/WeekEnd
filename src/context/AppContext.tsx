import React, {createContext, ReactNode, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {encryptData} from '../utils/encryption/Encryption';

interface ContextProviderProps {
  children: ReactNode;
}

interface AppContextType {
  token: string | null;
  tokenHandler: (token: string) => void;
}

export const AppContext = createContext<AppContextType>({
  token: null,
  tokenHandler: (prop: string) => {},
});

const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);

  //store and delete token when user login and logout
  const tokenHandler = async (token: string) => {
    try {
      if (token) {
        setToken(token);
        const encryptedToken = await encryptData(token, 'access_token');
        await AsyncStorage.setItem('access_token', encryptedToken);
      } else {
        await AsyncStorage.removeItem('access_token');
        setToken(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        token,
        tokenHandler,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
