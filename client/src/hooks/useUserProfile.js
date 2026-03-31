import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";

const useUserProfile = (user) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    const fetchUser = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data());
      }
    };

    fetchUser();
  }, [user]);

  return profile;
};

export default useUserProfile;
