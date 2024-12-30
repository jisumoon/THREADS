// src/components/DeactivateSuccessModal.jsx
import React from "react";
import styled from "styled-components";

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

const Button = styled.button`
  padding: 8px 16px;
  background: #181818;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #333;
  }
`;

const DeactivateSuccessModal = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>프로필을 비활성화 하였습니다.</Title>
        <Button onClick={onClose}>확인</Button> {/* 모달 닫기 */}
      </ModalContainer>
    </Overlay>
  );
};

export default DeactivateSuccessModal;
