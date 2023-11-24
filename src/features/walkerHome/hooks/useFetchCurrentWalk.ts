import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../services/firebase/firebaseConfig";
import { useFetchWalkerProfileData } from "./useFetchWalkerProfileData";

export const useFetchCurrentWalk = () => {
  const [walkData, setWalkData] = useState<any>();
  const { userData } = useFetchWalkerProfileData();

  useEffect(() => {
    if (!userData?.id) {
      return;
    }
    const fbquery = query(
      collection(db, "walks"),
      where("acceptedBy", "==", userData?.id ?? ""),
      where("status", "!=", "finished")
    );

    onSnapshot(fbquery, (querySnapshot) => {
      setWalkData({
        ...querySnapshot.docs.at(0)?.data(),
        id: querySnapshot.docs.at(0)?.id,
      });
    });
  }, [userData]);

  return { walkData };
};
