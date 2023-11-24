import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
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
      ownerLocation: location,
      status: "new",
      acceptedBy: "",
      createdAt: new Date(),
      //pickupTime: undefined,
      //returnTime: undefined,
      duration: duration,
    });
  };

  const confirmPickupForAWalk = (id: string) => {
    return updateDoc(doc(db, "walks", id ?? ""), {
      status: "ongoing",
    });
  };

  const finishWalk = (id: string) => {
    return updateDoc(doc(db, "walks", id ?? ""), {
      status: "finished",
    });
  };

  return {
    bookAWalk,
    confirmPickupForAWalk,
    ownerWalks,
    finishWalk,
    ownerPendingWalks:
      ownerWalks?.filter((e) => e.status.toLowerCase() !== "ended") ?? [],
  };
};
