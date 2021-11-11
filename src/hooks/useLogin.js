import { useState, useEffect } from "react";
import { firebaseAuth, firestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      // login
      const res = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );

      // change user online status
      await firestore.collection("users").doc(res.user.uid).update({
        online: true,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setLoading(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, loading, error };
};
