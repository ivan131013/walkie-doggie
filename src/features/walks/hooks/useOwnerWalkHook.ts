import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../services/firebase/firebaseConfig";
import { useFetchOwnerUser } from "../../firebase/hooks/useFetchOwnerUser";

export const useOwnerWalkHooks = () => {
  const { userData } = useFetchOwnerUser();

  const [ownerWalks, setOwnerWalks] = useState<any[]>();

  useEffect(() => {
    if (userData?.id) {
      const fbquery = query(
        collection(db, "walks"),
        where("ownerId", "==", userData.id)
      );

      onSnapshot(fbquery, (querySnapshot) => {
        let tarr: any[] = [];
        querySnapshot.forEach((documentRef) => {
          tarr.push({ ...documentRef.data(), id: documentRef.id });
        });

        setOwnerWalks([...tarr]);
      });
    }
  }, [userData?.id]);

  const bookAWalk = (
    location: { lng: number; lat: number },
    duration: number
  ) => {
    addDoc(collection(db, "walks"), {
      ownerId: userData.id,
      location: location,
      status: "new",
      acceptedBy: "",
      createdAt: new Date(),
      //pickupTime: undefined,
      //returnTime: undefined,
      duration: duration,
    });
  };

  return {
    bookAWalk,
    ownerWalks,
    ownerPendingWalks:
      ownerWalks?.filter((e) => e.status.toLowerCase() !== "ended") ?? [],
  };
};
