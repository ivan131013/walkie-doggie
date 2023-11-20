import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

export const useUploadFirebaseImage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const upload = async (file: File) => {
    setIsLoading(true);
    const storage = getStorage();
    const storageRef = ref(storage, file.name);

    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);

    setIsLoading(false);

    return url;
  };

  return {
    upload,
    isLoading,
  };
};
