import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// 유저 프로필 이미지를 가져오는 함수
export default async function fetchUserProfileImage(userId) {
  try {
    // profile 컬렉션에서 userId와 일치하는 문서를 찾는 쿼리 생성
    const q = query(collection(db, "profile"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]; // 첫 번째 문서를 가져옴
      const profileImg = userDoc.data().img; // img 필드를 가져옴

      return profileImg || null; // 이미지가 없으면 null 반환
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
