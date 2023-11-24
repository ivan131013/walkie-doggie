import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../services/firebase/firebaseConfig";

export const useFetchAvailableWalks = () => {
  const [walksData, setWalksData] = useState<any[]>();

  useEffect(() => {
    const fbquery = query(
      collection(db, "walks"),
      where("status", "==", "new")
    );

    onSnapshot(fbquery, (querySnapshot) => {
      let tarr: any[] = [];
      querySnapshot.forEach((documentRef) => {
        tarr.push({ ...documentRef.data(), id: documentRef.id });
      });

      setWalksData([...tarr]);
    });
  }, []);

  return { walksData };
};
