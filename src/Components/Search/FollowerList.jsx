import { useState, useEffect, useCallback } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { collection, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import FollowerItem from "./FollowerItem";
const FollowersList = ({ searchTerm, contentType, onDataEmpty }) => {
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailAdress = searchParams.get("email");
  const auth = getAuth();
  const currentUser = auth.currentUser; // 로그인 정보

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!currentUser) return; // currentUser가 없으면 실행하지 않음

      let followersQuery = query(collection(db, "profile"));

      try {
        const snapshot = await getDocs(followersQuery);
        let liveFollowers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 로그인 회원 정보와 동일한 이메일 필터링
        if (currentUser.email) {
          liveFollowers = liveFollowers.filter(
            (follower) => follower.userEmail !== currentUser.email
          );
        }

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

        // 콘텐츠 타입 필터링 (프로필에 맞는 필터링 추가)
        if (contentType === "profile") {
          liveFollowers = liveFollowers.filter(
            (item) => item.isProfilePublic === true
          );
        }

        setFollowers(liveFollowers);
        // 상태 변경 후 onDataEmpty 호출
        onDataEmpty(liveFollowers.length === 0); // 데이터가 없는 경우 처리
      } catch (error) {}
    };

    fetchFollowers();
  }, [searchTerm, contentType, emailAdress, currentUser]);

  //프로필 페이지 이동
  const handleProfileClick = (email) => {
    if (email) {
      navigate({
        pathname: "/profile",
        search: `${createSearchParams({
          email: email,
        })}`,
      });
    }
  };

  //팔로우 상태 전환
  const handleToggleFollow = async (id, currentStatus) => {
    try {
      const followerRef = doc(db, "profile", id);
      const updatedStatus = !currentStatus;

      // 클릭 전환
      await updateDoc(followerRef, { isFollowing: updatedStatus });
      setFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower.id === id
            ? { ...follower, isFollowing: updatedStatus }
            : follower
        )
      );
    } catch (error) {}
  };
  return (
    <div>
      {followers.map((follower) => (
        <FollowerItem
          key={follower.id}
          follower={follower}
          toggleFollow={() =>
            handleToggleFollow(follower.id, follower.isFollowing)
          }
          onProfileClick={() => handleProfileClick(follower.userEmail)}
        />
      ))}
    </div>
  );
};

export default FollowersList;
