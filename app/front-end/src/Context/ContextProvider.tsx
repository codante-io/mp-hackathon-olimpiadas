import { useState, useEffect, ReactNode } from 'react';

import MyContext from './context';

// import Header from '../Components/Header';

interface IContextProviderProps {
  children: ReactNode;
}

export default function ContextProvider({ children }: IContextProviderProps) {
  const [token, setToken] = useState('');
  const [games, setGames] = useState('');

  useEffect(() => {
    /**
     * This function will run when homepage opens
     *
     * Use it for getting data which will be used in the whole application
     */

    // const getToken = async () => {
    //   const { token: authorizationToken } = await getAuthorizationToken();
    //   setToken(authorizationToken);
    // };
    // getToken();
    const getAllOlympicGames = async () => {
      const response = await fetch('http://localhost:3001/');
      const orders = await response.json();
      console.log(orders);
      setGames(orders);
    };
    getAllOlympicGames();
  }, []);

  // the name of the searched city will also appear in the header
  const [actualCity, setActualCity] = useState('');

  // if hasSearch === true, the homepage default message, will disappear
  // and the weathers from the searched city, will appear
  const [hasSearch, setHasSearch] = useState(false);

  const [weathers, setWeathers] = useState([]);

  const value = {
    token,

    // city and state 'city - state'
    actualCity,
    setActualCity,

    weathers,
    setWeathers,

    hasSearch,
    setHasSearch,

    games,
  };

  return (
    <MyContext.Provider value={value}>
      {/* Same if exists someone searching for a white space, it will not make the subtitle header disappears*/}
      {/* <Header
        city={value.actualCity}
        setHasSearch={setHasSearch}
        setActualCity={setActualCity}
        setWeathers={setWeathers}
      /> */}
      {children}
    </MyContext.Provider>
  );
}
