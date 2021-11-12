import { useReducer, useEffect, useState } from "react";
import { firestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  loading: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        loading: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { loading: false, document: null, success: true, error: null };
    case "UPDATE_DOCUMENT":
      return {
        loading: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = firestore.collection(collection);

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "LOADING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "LOADING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  // update document
  const updateDocument = async (id, updates) => {
    dispatch({ type: "LOADING" });

    try {
      const updatedDoc = await ref.doc(id).update(updates);
      dispatchIfNotCancelled({
        type: "UPDATE_DOCUMENT",
        payload: updatedDoc,
      });
      return updatedDoc;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
