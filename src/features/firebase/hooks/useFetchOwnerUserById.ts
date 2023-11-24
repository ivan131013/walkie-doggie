import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../services/firebase/firebaseConfig";
import { useFirebaseAuth } from "../../firebaseAuth/hooks/useFirebaseAuth";

export const useFetchOwnerUserById = (id?: string) => {
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const callBack = async () => {
      if (id) {
        const ref = await getDoc(doc(db, "owner_users", id));

        setUserData({ ...ref.data(), id: ref.id });
      }
    };

    callBack();
  }, [id]);

  return { userData };
};
