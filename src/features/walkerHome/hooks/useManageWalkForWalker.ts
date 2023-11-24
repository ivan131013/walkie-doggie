import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import { useFetchWalkerUser } from "../../firebase/hooks/useFetchWalkerUser";
import { useFetchWalkDataById } from "./useFetchWalkDataById";
import { useFetchWalkerProfileData } from "./useFetchWalkerProfileData";

export const useManageWalkForWalker = (walkId?: string) => {
  const { walkData } = useFetchWalkDataById(walkId);
  const { userData } = useFetchWalkerProfileData();

  const acceptRequest = () => {
    return updateDoc(doc(db, "walks", walkId ?? ""), {
      status: "found",
      acceptedBy: userData?.id,
    });
  };

  const updateWalkLocationWithMyLocation = (location: {
    lat: number;
    lng: number;
  }) => {
    updateDoc(doc(db, "walks", walkId ?? ""), {
      location: location,
    });
  };

  const notifyArrival = () => {
    return updateDoc(doc(db, "walks", walkId ?? ""), {
      status: "awaiting_pickup",
    });
  };

  const notifyReturn = () => {
    return updateDoc(doc(db, "walks", walkId ?? ""), {
      status: "returning",
    });
  };

  return {
    walkData,
    acceptRequest,
    updateWalkLocationWithMyLocation,
    notifyArrival,
    notifyReturn,
  };
};
