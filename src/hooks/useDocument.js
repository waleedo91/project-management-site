import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for document
  useEffect(() => {
    const ref = firestore.collection(collection).doc(id);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("No such project");
        }
      },
      (err) => {
        console.log(err.message);
        setError("failed to get documents");
      }
    );

    return () => unsub();
  }, [collection, id]);

  return { document, error };
};
