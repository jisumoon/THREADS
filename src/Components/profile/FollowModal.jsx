import { useState, useEffect } from "react";
import styled from "styled-components";
import FollowersList from "./FollowersList2";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

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
  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    height: 40%;
    bottom: calc(0px + 70px);
    right: 0;
    top: auto;
    border-radius: 30px 30px 0 0;
  }
`;

const FollowModalBox = styled.div`
  width: 450px;
  height: 530px;
  border-radius: 12px;
  background: ${(props) => props.theme.borderColor};
  padding: 64px 11px 0 11px;
  color: ${(props) => props.theme.fontcolor};
  position: relative;
  @media (max-width: 768px) {
    background: ${(props) => props.theme.borderColor};
    box-shadow: ${(props) => props.theme.bordershadow};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${(props) => props.theme.fontcolor};
  font-size: 18px;
  cursor: pointer;
`;

const ContentsBorder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  height: 100%;
  padding: 0 10px;
  overflow-y: auto;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    padding: 0 20px;
    width: 100%;
    max-height: 100%;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
    width: 100%;
    max-height: 100%;
  }
`;

const FollowModal = ({ open, close }) => {
  const [followers, setFollowers] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const followers = userData.followers || [];
          setFollowers(followers);
        } else {
          console.warn("현재 사용자의 Firestore 문서를 찾을 수 없습니다.");
          setFollowers([]);
        }
      } catch (error) {}
    };

    fetchFollowers();
  }, [currentUser]);

  if (!open) return null;

  return (
    <>
      <ModalOverlay onClick={close}>
        <FollowModalBox onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={close}>X</CloseButton>
          <ContentsBorder>
            {/* FollowersList에 현재 사용자의 followers 데이터 전달 */}
            <FollowersList followers={followers} />
          </ContentsBorder>
        </FollowModalBox>
      </ModalOverlay>
    </>
  );
};

export default FollowModal;
