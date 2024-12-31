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
import { getCurrentFollowing, toggleFollow } from "../../Utils/followersUtils";

const FollowersList = ({ searchTerm, contentType, onDataEmpty }) => {
  const [followers, setFollowers] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        // Firestore에서 profile 데이터 가져오기
        const followersQuery = query(collection(db, "profile"));
        const snapshot = await getDocs(followersQuery);
        let liveFollowers = snapshot.docs.map((doc) => ({
          id: doc.id,
          userId: doc.data().userId || "",
          ...doc.data(),
        }));

        // 현재 사용자의 following 가져오기
        const currentFollowing = await getCurrentFollowing(db, currentUser.uid);

        // 현재 사용자를 제외
        liveFollowers = liveFollowers.filter(
          (follower) => follower.userId !== currentUser.uid
        );

        // `isFollowing` 상태 추가 (firestore 저장 x)
        liveFollowers = liveFollowers.map((follower) => ({
          ...follower,
          isFollowing: currentFollowing.includes(follower.userId),
        }));

        // 검색어 필터링
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

        // 콘텐츠 타입 필터링
        if (contentType === "profile") {
          liveFollowers = liveFollowers.filter(
            (item) => item.isProfilePublic === true
          );
        }

        setFollowers(liveFollowers);
        onDataEmpty(liveFollowers.length === 0);
      } catch (error) {}
    };

    fetchFollowers();
  }, [currentUser, searchTerm, contentType]);

  const handleToggleFollow = async (targetId) => {
    if (!currentUser) return;

    try {
      const isFollowing = await toggleFollow(db, currentUser.uid, targetId);

      setFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower.userId === targetId ? { ...follower, isFollowing } : follower
        )
      );
    } catch (error) {
      console.error("팔로우 상태 변경 중 오류 발생:", error);
    }
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
          toggleFollow={() => handleToggleFollow(follower.userId)}
          onProfileClick={() => handleProfileClick(follower.userEmail)}
        />
      ))}
    </div>
  );
};

export default FollowersList;
