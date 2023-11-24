import {
  collection,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../../services/firebase/firebaseConfig";
import { useFirebaseAuth } from "../../firebaseAuth/hooks/useFirebaseAuth";

export const useFetchWalkerProfileData = () => {
  const { user } = useFirebaseAuth();

  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const callback = async () => {
      if (user?.uid) {
        const docRef = await getDocs(
          query(
            collection(db, "walker_users"),
            where("uid", "==", user?.uid ?? ""),
            limit(1)
          )
        );

        setUserData({
          ...docRef.docs.at(0)?.data(),
          id: docRef.docs.at(0)?.id,
        });
      }
    };

    callback();
  }, [user]);

  return { userData };
};
