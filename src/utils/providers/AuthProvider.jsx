import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { app } from "../config/firebase.config";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { axiosBase } = useAxiosBaseUrl();
  const [user, setUser] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  const registerUser = (email, password) => {
    setIsLoading(true);
    const createUser = createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return createUser;
  };

  const updateUser = (user, name, image) => {
    setIsLoading(true);
    const updateUser = updateProfile(user, {
      displayName: name,
      photoURL: image,
    });
    return updateUser;
  };

  const logIn = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setIsLoading(true);
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axiosBase
          .post("/token-generator", {
            email: currentUser.email,
          })
          .then((res) => {
            localStorage.setItem("adrenalineX", res.data.token);
            setTimeout(() => {
              setIsLoading(false);
            }, 3000);
          });
      } else {
        localStorage.removeItem("adrenalineX");
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosBase]);

  const authData = {
    user,
    isloading,
    registerUser,
    updateUser,
    logIn,
    logOut,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
