import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const useAuthentication = (initialToken = null) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialToken ? true : false);

  useEffect(() => {
    if (initialToken) {
      try {
        const decodedToken = jwtDecode(initialToken);
        if (decodedToken.exp * 1000 < Date.now()) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error decoding token: ", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [initialToken]);

  return isLoggedIn;
};

export default useAuthentication;
