import {
  collection,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../services/firebase/firebaseConfig";
import { useFirebaseAuth } from "../../firebaseAuth/hooks/useFirebaseAuth";

export const useFetchOwnerUser = () => {
  const { user } = useFirebaseAuth();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const callBack = async () => {
      if (user?.uid) {
        const data = await getDocs(
          query(
            collection(db, "owner_users"),
            where("uid", "==", user.uid),
            limit(1)
          )
        );
        setUserData(data.docs.at(0)?.data());
      }
    };

    callBack();
  }, [user?.uid]);

  return { userData };
};
