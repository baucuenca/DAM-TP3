import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { auth } from "../constants/firebaseConfig";

export function useIsAuthenticated(): boolean {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return unsubscribe;
  }, []);

  return isAuthenticated;
}
