import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import type {  User } from "firebase/auth";

export const useAuth = () => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const auth = getAuth();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();

  }, []);

  return { currentUser };
};
