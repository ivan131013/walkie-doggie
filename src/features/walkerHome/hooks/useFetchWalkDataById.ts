import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../services/firebase/firebaseConfig";

export const useFetchWalkDataById = (id?: string) => {
  const [walkData, setWalkData] = useState<any>();

  useEffect(() => {
    const callback = async () => {
      if (id) {
        const docRef = doc(db, "walks", id);

        onSnapshot(docRef, (docSnapshot) => {
          setWalkData({ ...docSnapshot?.data(), id: docSnapshot?.id });
        });
      }
    };

    callback();
  }, [id]);

  return { walkData };
};
