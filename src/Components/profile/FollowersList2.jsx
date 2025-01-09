import {
  doc,
  getDocs,
  query,
  where,
  collection,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import FollowerItem from "../Search/FollowerItem";
import { toggleFollow } from "../../Utils/followersUtils";
import styled from "styled-components";

const Wraper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  h3 {
    font-size: 1.2rem;
    color: ${(props) => props.theme.followerfont};
  }
`;

const FollowersList = ({ onDataEmpty }) => {
  const [followers, setFollowers] = useState([]);
  const [userId, setUserId] = useState(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    //email로 userid 찾아오는 함수수
    const fetchUserIdByEmail = async (email) => {
      try {
        // const profileQuery = query(
        //   collection(db, "profile"),
        //   where("userEmail", "==", email)
        // );
        // const querySnapshot = await getDocs(profileQuery);

        // if (querySnapshot.empty) {
        //   return null;
        // }

        // const userProfile = querySnapshot.docs[0].data();
        // return userProfile.userId;

        const userEamilQuery = query(
          collection(db, "users"),
          where("email", "==", email)
        );
        const querysnapshot = await getDocs(userEamilQuery);
        if (querysnapshot.empty) {
          return null;
        }

        const userEmaildoc = querysnapshot.docs[0].data();
        return userEmaildoc.userId;
      } catch (error) {
        return null;
      }
    };

    const fetchFollowers = async (id) => {
      try {
        const userRef = doc(db, "users", id); // Firestore에서 users 문서 참조
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          setFollowers([]);
          if (onDataEmpty) onDataEmpty(true);
          return;
        }

        const userData = userDoc.data();
        const followersIds = userData.followers || [];

        if (!Array.isArray(followersIds) || followersIds.length === 0) {
          setFollowers([]);
          if (onDataEmpty) onDataEmpty(true);
          return;
        }

        // `profile` 컬렉션에서 followers의 프로필 데이터 가져오기
        const profileQuery = query(
          collection(db, "profile"),
          where("userId", "in", followersIds)
        );
        const querySnapshot = await getDocs(profileQuery);

        const followersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFollowers(followersData);
        if (onDataEmpty) onDataEmpty(followersData.length === 0);
      } catch (error) {}
    };

    const email = searchParams.get("email");
    if (email) {
      (async () => {
        const fetchedUserId = await fetchUserIdByEmail(email); //userId받음음
        if (fetchedUserId) {
          setUserId(fetchedUserId);
          await fetchFollowers(fetchedUserId);
        }
      })();
    } else {
    }
  }, [searchParams]);

  // 프로필 클릭 시 해당 이메일로 이동
  const handleProfileClick = (email) => {
    if (email) {
      navigate({
        pathname: "/profile",
        search: `?email=${email}`,
      });
    }
  };

  const handleToggleFollow = async (targetId) => {
    if (!currentUser) return;

    try {
      const isFollowing = await toggleFollow(db, currentUser.uid, targetId);

      setFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower.userId === targetId ? { ...follower, isFollowing } : follower
        )
      );
    } catch (error) {}
  };

  return (
    <div>
      {followers.length === 0 ? (
        <Wraper>
          <h3> 팔로워가 없습니다.</h3>
        </Wraper>
      ) : (
        followers.map((follower) => (
          <FollowerItem
            key={follower.id}
            follower={follower}
            toggleFollow={() => handleToggleFollow(follower.userId)}
            onProfileClick={() => handleProfileClick(follower.userEmail)}
          />
        ))
      )}
    </div>
  );
};

export default FollowersList;
