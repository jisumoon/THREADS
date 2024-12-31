import styled from "styled-components";
import { BellOffIcon, StarIcon, UserIcon2, UserPlusIcon } from "../Common/Icon";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
`;

const OtherModalBox = styled.div`
  width: 392px;
  height: 335px;
  border-radius: 12px;
  background: ${(props) => props.theme.headerBg};
  padding: 60px 17px 49px;
  color: ${(props) => props.theme.fontcolor};
  position: relative;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.headerBg};
    padding: 40% 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${(props) => props.theme.fontcolor};
  font-size: 18px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.button`
  width: 80%;
  height: 44px;
  border: 2px solid ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  margin: 0px auto 6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 12px;
  gap: 6px;
  background: ${(props) => props.theme.borderColor};
  transition: background 0.3s;
  color: ${(props) => props.theme.fontcolor};
  &:hover {
    background: ${(props) => props.theme.borderWrapper};
  }
  &.mobile {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
      background: ${(props) => props.theme.borderstroke};
      &:hover {
        background: ${(props) => props.theme.followerfont};
        color: ${(props) => props.theme.btnBgColor};
      }
    }
  }
`;

const ImgBox = styled.label`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 22px;
  border-radius: 50px;
  overflow: hidden;
  background-color: ${(props) => props.theme.mouseHoverBg};
`;
const Img = styled.img`
  width: 100%;
`;

const P = styled.p`
  color: ${(props) => props.theme.followerfont};
  font-size: 14px;
`;

const OtherBtnModal = ({ open, close, profile, onProfileChange }) => {
  const [searchParams] = useSearchParams();
  const emailAdress = searchParams.get("email");
  const [follow, setFollow] = useState(profile.isFollowing);
  const [followNum, setFollowNum] = useState(Math.floor(Math.random() * 10));

  if (!open) return null;

  const followButton = async () => {
    try {
      if (!auth.currentUser) return;

      const currentUserRef = doc(db, "users", auth.currentUser.uid); // 현재 로그인한 사용자
      const profileUserRef = query(
        collection(db, "users"),
        where("email", "==", emailAdress) // 대상 사용자의 문서 가져오기
      );
      const profileUserSnapshot = await getDocs(profileUserRef);

      if (profileUserSnapshot.empty) {
        console.error("해당 유저를 찾을 수 없습니다.");
        return;
      }

      const targetUserDoc = profileUserSnapshot.docs[0]; // 팔로우 대상 문서
      const targetUserId = targetUserDoc.id; // 대상 유저의 UID
      const targetUserRef = doc(db, "users", targetUserId); // Firestore 문서 참조

      // 현재 팔로우 상태 확인
      const currentUserSnapshot = await getDoc(currentUserRef);
      const currentUserData = currentUserSnapshot.data();
      const isCurrentlyFollowing =
        currentUserData.following &&
        currentUserData.following.includes(targetUserId);

      // 새로운 팔로우 상태 설정
      const newFollowState = !isCurrentlyFollowing;

      if (newFollowState) {
        // 팔로우 추가
        await updateDoc(currentUserRef, {
          following: arrayUnion(targetUserId), // following 배열에 대상 UID 추가
        });
        await updateDoc(targetUserRef, {
          followers: arrayUnion(auth.currentUser.uid), // followers 배열에 내 UID 추가
        });
      } else {
        // 언팔로우 제거
        await updateDoc(currentUserRef, {
          following: arrayRemove(targetUserId), // following 배열에서 대상 UID 제거
        });
        await updateDoc(targetUserRef, {
          followers: arrayRemove(auth.currentUser.uid), // followers 배열에서 내 UID 제거
        });
      }

      // followers 배열의 길이를 기반으로 followerNum 업데이트
      const targetUserSnapshot = await getDoc(targetUserRef);
      if (targetUserSnapshot.exists()) {
        const targetUserData = targetUserSnapshot.data();
        const updatedFollowerNum = targetUserData.followers
          ? targetUserData.followers.length
          : 0;

        // profile 컬렉션 업데이트
        const profileQuery = query(
          collection(db, "profile"),
          where("userEmail", "==", emailAdress)
        );
        const querySnapshot = await getDocs(profileQuery);

        if (!querySnapshot.empty) {
          const profileDoc = querySnapshot.docs[0];
          const docRef = profileDoc.ref;

          await updateDoc(docRef, {
            followNum: updatedFollowerNum,
          });

          // 상태 변경
          const updatedProfile = {
            ...profile,
            followNum: updatedFollowerNum, // 업데이트된 팔로워 수
          };
          onProfileChange(updatedProfile);
        }
      }
    } catch (e) {
      console.error("팔로우 상태 변경 중 오류 발생:", e);
    }
  };

  return (
    <>
      <ModalOverlay onClick={close}>
        <OtherModalBox onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={close}>X</CloseButton>
          <Wrapper>
            <ImgBox htmlFor="profileImg">
              {profile.img == null || profile.img == "" ? (
                <UserIcon2 width="60" fill="#BABABA" />
              ) : (
                <Img src={profile.img} />
              )}
            </ImgBox>
            <Box>
              <StarIcon width="16px" />
              친한 친구 추가
            </Box>
            <Box>
              <BellOffIcon width="16px" /> 알림 설정 취소
            </Box>
            <Box onClick={followButton}>
              <UserPlusIcon width="16px" />
              팔로우
            </Box>
            <Box className="mobile" onClick={close}>
              모달 닫기
            </Box>
            <P>해당 모달의 기능은 준비 중인 기능입니다</P>
          </Wrapper>
        </OtherModalBox>
      </ModalOverlay>
    </>
  );
};
export default OtherBtnModal;
