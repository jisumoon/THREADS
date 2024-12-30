import React from "react";
import styled from "styled-components";

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
  z-index: 999; /* 화면 위에 나오도록 */
`;

const ModalContainer = styled.div`
  width: 450px;

  border-radius: 12px;
  background: #fff;
  padding: 64px 11px 0 11px;
  color: #000;
  position: relative;
`;
// height: ${(props) => props.height || "471px"};
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #000;
  font-size: 18px;
  cursor: pointer;
`;

const Modal = ({ isOpen, onClose, children, height }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer style={{ height }} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
