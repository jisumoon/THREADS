import { useState, useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import FollowerItem from "./FollowerItem";

const FollowersList = ({ searchTerm, onDataEmpty }) => {
  const [followers, setFollowers] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false); // 데이터가 없는지 확인하는 상태
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser; // 현재 로그인 사용자

  const fetchFollowers = async () => {
    if (!currentUser) {
      console.error("현재 사용자가 인증되지 않았습니다.");
      return;
    }

    try {
      // 현재 사용자 데이터 가져오기
      const currentUserRef = doc(db, "profile", currentUser.uid); // "profile"에서 currentUser.uid 사용
      const currentUserDoc = await getDoc(currentUserRef);

      if (!currentUserDoc.exists()) {
        console.error("현재 사용자의 데이터가 Firestore에 존재하지 않습니다.");
        return;
      }

      // 현재 사용자가 팔로우한 사용자 리스트 가져오기
      const { isFollowing = [] } = currentUserDoc.data();

      if (!Array.isArray(isFollowing) || isFollowing.length === 0) {
        console.log("팔로우한 사용자가 없습니다.");
        setFollowers([]);
        setIsEmpty(true);
        onDataEmpty && onDataEmpty(true);
        return;
      }

      // Firestore에서 팔로우한 사용자들 데이터 가져오기
      const followersQuery = query(
        collection(db, "profile"),
        where("userId", "in", isFollowing) // isFollowing 배열을 기반으로 필터링
      );

      const snapshot = await getDocs(followersQuery);

      if (snapshot.empty) {
        console.log("팔로우한 사용자 데이터가 없습니다.");
        setFollowers([]);
        setIsEmpty(true);
        onDataEmpty && onDataEmpty(true);
        return;
      }

      // 팔로워 데이터 매핑
      const liveFollowers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFollowers(liveFollowers);
      setIsEmpty(liveFollowers.length === 0);
      onDataEmpty && onDataEmpty(liveFollowers.length === 0);
    } catch (error) {
      console.error("팔로우한 사용자 가져오기 실패:", error.message);
    }
  };

  //팔로우 상태 전환

  const handleToggleFollow = async (followerId) => {
    if (!currentUser) return;

    try {
      const currentUserRef = doc(db, "profile", currentUser.uid);
      const currentUserDoc = await getDoc(currentUserRef);

      if (currentUserDoc.exists()) {
        const { isFollowing = [] } = currentUserDoc.data(); // 현재 사용자의 팔로우 리스트
        let updatedFollowing;

        if (isFollowing.includes(followerId)) {
          // 이미 팔로우한 경우 -> 팔로우 취소
          updatedFollowing = isFollowing.filter((id) => id !== followerId);
        } else {
          // 팔로우하지 않은 경우 -> 팔로우 추가
          updatedFollowing = [...isFollowing, followerId];
        }

        // Firestore 업데이트
        await updateDoc(currentUserRef, { isFollowing: updatedFollowing });

        // 상태 업데이트
        setFollowers((prevFollowers) =>
          prevFollowers.map((follower) =>
            follower.userId === followerId
              ? {
                  ...follower,
                  isFollowing: updatedFollowing.includes(followerId),
                }
              : follower
          )
        );
      }
    } catch (error) {
      console.error("팔로우 상태 업데이트 실패:", error);
    }
  };

  // 프로필 페이지 이동
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

  return (
    <div>
      {isEmpty ? (
        <p style={{ textAlign: "center", color: "#999", marginTop: "20px" }}>
          팔로워한 사용자가 없습니다.
        </p>
      ) : (
        followers.map((follower) => (
          <FollowerItem
            key={follower.id}
            follower={follower}
            toggleFollow={() =>
              handleToggleFollow(follower.id, follower.isFollowing)
            }
            onProfileClick={() => handleProfileClick(follower.userEmail)}
          />
        ))
      )}
    </div>
  );
};

export default FollowersList;
