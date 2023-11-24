import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../services/firebase/firebaseConfig";
import { useFetchWalkerProfileData } from "./useFetchWalkerProfileData";

export const useFetchPreviousWalks = () => {
  const [walksData, setWalksData] = useState<any[]>();
  const { userData } = useFetchWalkerProfileData();

  useEffect(() => {
    if (!userData?.id) {
      return;
    }
    const fbquery = query(
      collection(db, "walks"),
      where("acceptedBy", "==", userData?.id ?? "")
    );

    onSnapshot(fbquery, (querySnapshot) => {
      let tarr: any[] = [];
      querySnapshot.forEach((documentRef) => {
        tarr.push({ ...documentRef.data(), id: documentRef.id });
      });

      setWalksData([...tarr]);
    });
  }, [userData]);

  return { walksData };
};
