import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import { useUploadFirebaseImage } from "../../firebase/hooks/useUploadImage";
import { useFirebaseAuth } from "../../firebaseAuth/hooks/useFirebaseAuth";

export const useWalkerSignUp = () => {
  const { createAccount: fbCreateAccount } = useFirebaseAuth();

  const { upload } = useUploadFirebaseImage();

  const createAccount = async (accountData: any) => {
    const data = await fbCreateAccount(accountData.email, accountData.password);

    const userId = data.user.uid;

    const photoUrl = await upload(accountData.photo);

    console.log(data);

    await addDoc(collection(db, "walker_users"), {
      ...accountData,
      uid: data.user.uid,
      photo: photoUrl,
    });
  };

  return { createAccount };
};
