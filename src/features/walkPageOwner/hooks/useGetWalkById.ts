import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../services/firebase/firebaseConfig";

export const useGetWalkById = (id?: string) => {
  const [walkData, setWalkData] = useState<any>();

  useEffect(() => {
    if (!id || id === "") {
      return;
    }

    onSnapshot(doc(db, "walks", id), (querySnapshot) => {
      setWalkData({ ...querySnapshot.data(), id: id });
    });
  }, [id]);

  return { walkData };
};
