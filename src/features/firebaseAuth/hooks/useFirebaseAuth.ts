import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { app } from "../../../services/firebase/firebaseConfig";

export const useFirebaseAuth = () => {
  const auth = getAuth(app);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }, [auth]);

  const signIn = (email: string, password: string, callBack?: () => void) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = (callBack?: () => void) => {
    return firebaseSignOut(auth)
      .then(() => {
        callBack?.();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const createAccount = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  return { signIn, signOut, createAccount, user };
};
