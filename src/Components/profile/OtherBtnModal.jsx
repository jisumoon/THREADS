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
      const profileQuery = query(
        collection(db, "profile"),
        where("userEmail", "==", emailAdress)
      );
      const querySnapshot = await getDocs(profileQuery);

      let newFollowState = follow === true ? false : true;
      setFollow(newFollowState);

      if (querySnapshot.empty) {
        // 유저 데이터가 없을 때
        const newDocRef = await addDoc(collection(db, "profile"), {
          username: emailAdress,
          userId: "",
          userEmail: emailAdress,
          bio: "",
          isLinkPublic: true,
          isProfilePublic: true,
          img: "",
          isFollowing: true,
          followNum: followNum,
        });
        await updateDoc(newDocRef, { postId: newDocRef.id });
      } else {
        //데이터가 있을 떄 업로드
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          isFollowing: newFollowState,
        });
      }
      //여기에 있는 profile state값 변경
      const updatedProfile = {
        ...profile,
        isFollowing: newFollowState,
      };
      onProfileChange(updatedProfile); // 상위 컴포넌트로 변경된 프로필 전달
    } catch (e) {}
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
