import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import FollowerItem from "./FollowerItem";

const FollowersList = ({ searchTerm, contentType, onDataEmpty }) => {
  const [followers, setFollowers] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  console.log("Followers:", followers);
  useEffect(() => {
    const fetchFollowers = async () => {
      if (!currentUser) {
        console.error("현재 사용자가 인증되지 않았습니다.");
        return;
      }

      try {
        // 1. `profile` 컬렉션에서 모든 사용자 데이터 가져오기
        const followersQuery = query(collection(db, "profile"));
        const snapshot = await getDocs(followersQuery);
        let liveFollowers = snapshot.docs.map((doc) => ({
          id: doc.id, // profile 문서 ID
          userId: doc.data().userId || "", // Firestore 문서에 `userId` 추가 필요
          ...doc.data(),
        }));

        // 2. 현재 사용자의 `following` 배열 가져오기
        const currentUserRef = doc(db, "users", currentUser.uid);
        const currentUserDoc = await getDoc(currentUserRef);

        const currentFollowing =
          currentUserDoc.exists() && currentUserDoc.data().following
            ? currentUserDoc.data().following
            : []; // 현재 유저의 following 배열

        // 3. `isFollowing` 상태 추가
        liveFollowers = liveFollowers.map((follower) => ({
          ...follower,
          isFollowing: currentFollowing.includes(follower.userId), // `userId`로 확인
        }));

        // 4. 검색어 필터링
        if (searchTerm && searchTerm.trim() !== "") {
          const searchLower = searchTerm.toLowerCase();
          liveFollowers = liveFollowers.filter((item) => {
            const usernameMatch =
              item.username &&
              item.username.toLowerCase().includes(searchLower);
            const emailMatch =
              item.userEmail &&
              item.userEmail.toLowerCase().includes(searchLower);
            const bioMatch =
              item.bio && item.bio.toLowerCase().includes(searchLower);
            return usernameMatch || emailMatch || bioMatch;
          });
        }

        // 5. 콘텐츠 타입 필터링
        if (contentType === "profile") {
          liveFollowers = liveFollowers.filter(
            (item) => item.isProfilePublic === true
          );
        }

        setFollowers(liveFollowers);
        onDataEmpty(liveFollowers.length === 0);
      } catch (error) {
        console.error("팔로워 목록을 가져오는 중 오류 발생:", error);
      }
    };

    fetchFollowers();
  }, [currentUser, searchTerm, contentType]);

  const handleToggleFollow = async (targetId) => {
    if (!currentUser) return;

    try {
      const currentUserRef = doc(db, "users", currentUser.uid);
      const targetUserRef = doc(db, "users", targetId);

      // 문서가 존재하지 않는 경우 기본 데이터 생성
      const targetUserSnapshot = await getDoc(targetUserRef);
      if (!targetUserSnapshot.exists()) {
        await setDoc(targetUserRef, {
          followers: [],
          following: [],
          createdAt: new Date(),
        });
      }

      const currentUserSnapshot = await getDoc(currentUserRef);
      const currentFollowing = currentUserSnapshot.exists()
        ? currentUserSnapshot.data().following || []
        : [];

      const isCurrentlyFollowing = currentFollowing.includes(targetId);

      if (isCurrentlyFollowing) {
        await updateDoc(currentUserRef, {
          following: arrayRemove(targetId),
        });
        await updateDoc(targetUserRef, {
          followers: arrayRemove(currentUser.uid),
        });
      } else {
        await updateDoc(currentUserRef, {
          following: arrayUnion(targetId),
        });
        await updateDoc(targetUserRef, {
          followers: arrayUnion(currentUser.uid),
        });
      }

      setFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower.userId === targetId
            ? { ...follower, isFollowing: !isCurrentlyFollowing }
            : follower
        )
      );
    } catch (error) {}
  };

  const handleProfileClick = (email) => {
    if (email) {
      navigate({
        pathname: "/profile",
        search: `${createSearchParams({ email })}`,
      });
    }
  };

  return (
    <div>
      {followers.map((follower) => (
        <FollowerItem
          key={follower.id}
          follower={follower}
          toggleFollow={() => handleToggleFollow(follower.userId)} // userId 전달
          onProfileClick={() => handleProfileClick(follower.userEmail)}
        />
      ))}
    </div>
  );
};

export default FollowersList;
