import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
} from "firebase/firestore";

// 현재 사용자의 following 배열 가져오기
export const getCurrentFollowing = async (db, userId) => {
  const currentUserRef = doc(db, "users", userId);
  const currentUserDoc = await getDoc(currentUserRef);

  return currentUserDoc.exists() && currentUserDoc.data().following
    ? currentUserDoc.data().following
    : [];
};

export const getCurrentFollowers = async (db, userId) => {
  if (!userId) return console.log("userId가 없습니다.");

  const currentUserRef = doc(db, "users", userId);

  const currentUserDoc = await getDoc(currentUserRef);

  if (currentUserDoc.exists()) {
    const followers = currentUserDoc.data().followers || [];
    return followers;
  } else {
    console.log("해당 사용자 데이터가 없습니다.");
    return [];
  }
};

// 팔로우 상태 변경
export const toggleFollow = async (db, currentUserId, targetId) => {
  const currentUserRef = doc(db, "users", currentUserId);
  const targetUserRef = doc(db, "users", targetId);

  const currentUserDoc = await getDoc(currentUserRef);
  const targetUserDoc = await getDoc(targetUserRef);

  const currentFollowing = currentUserDoc.exists()
    ? currentUserDoc.data().following || []
    : [];
  const isCurrentlyFollowing = currentFollowing.includes(targetId);

  if (isCurrentlyFollowing) {
    // 언팔로우 처리
    await updateDoc(currentUserRef, {
      following: arrayRemove(targetId),
    });
    await updateDoc(targetUserRef, {
      followers: arrayRemove(currentUserId),
    });
    return false; // 팔로우 상태로 변경됨
  } else {
    // 팔로우 처리
    await updateDoc(currentUserRef, {
      following: arrayUnion(targetId),
    });
    await updateDoc(targetUserRef, {
      followers: arrayUnion(currentUserId),
    });
    return true; // 언팔로우 상태로 변경됨
  }
};
