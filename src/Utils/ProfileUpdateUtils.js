import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const ProfileUpdate = async (targetEmail, newdata) => {
  try {
    const profileQuery = query(
      collection(db, "profile"),
      where("userEmail", "==", targetEmail)
    );
    const profiledocs = await getDocs(profileQuery);

    if (profiledocs.empty) {
      console.log("해당 사용자의 정보가 없습니다");
    } else {
      const profiledocRef = profiledocs.docs[0].ref;
      await updateDoc(profiledocRef, newdata);
    }
  } catch (err) {
    console.error("해당 사용자의 profile을 찾을 수 없습니다", err);
  }
};
