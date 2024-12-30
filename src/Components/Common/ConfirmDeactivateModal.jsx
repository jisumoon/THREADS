// src/components/ConfirmDeactivateModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // import useNavigate
import DeactivateSuccessModal from "./DeactivateSuccessModal"; // 새로운 모달 import

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.borderColor};
  border-radius: 8px;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const YesButton = styled.button`
  width: 120px;
  padding: 16px; /* 인풋 창과 같은 높이로 설정 */
  background: ${(props) => props.theme.modalfont};
  color: #181818;
  border: 1px solid #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s; /* 호버 애니메이션 부여 */
  font-size: 16px;
  &:hover {
    color: #181818;
    border: 1px solid #fff;
  }
  &:focus {
    color: #181818;
    border: 1px solid #fff;
  }
`;

const NoButton = styled.button`
  width: 120px;
  padding: 16px; /* 인풋 창과 같은 높이로 설정 */
  background: #181818;
  color: #dfdfdf;
  border: 1px solid #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s; /* 호버 애니메이션 부여 */
  font-size: 16px;
  &:hover {
    color: #fff;
    border: 1px solid #fff;
  }
  &:focus {
    color: #fff;
    border: 1px solid #fff;
  }
`;

const ConfirmDeactivateModal = ({ onClose }) => {
  const [showDeactivateSuccessModal, setShowDeactivateSuccessModal] =
    useState(false); // 성공 모달 상태

  const handleConfirm = () => {
    setShowDeactivateSuccessModal(true); // 성공 모달 표시
  };
  const handleConfirmDelete = () => {
    // 홈으로 리디렉션하는 로직 (예: useHistory를 사용하는 경우)
    window.location.href = "/"; // 404 페이지 대신 홈으로 리디렉션
  };

  return (
    <>
      <Overlay onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <Title>프로필을 비활성화 하시겠습니까?</Title>
          <ButtonLayout>
            <YesButton onClick={handleConfirm}>네</YesButton>
            <NoButton onClick={onClose}>아니오</NoButton>
          </ButtonLayout>
        </ModalContainer>
      </Overlay>

      {showDeactivateSuccessModal && ( // 성공 모달 조건부 렌더링
        <DeactivateSuccessModal
          onClose={() => setShowDeactivateSuccessModal(false)}
        />
      )}
    </>
  );
};

export default ConfirmDeactivateModal;
