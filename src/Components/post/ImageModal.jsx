import React, { useRef } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  background: transparent; /* 배경을 투명으로 설정 */
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  background: #000;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  span {
    cursor: pointer;
    text-align: center;
    font-size: 16px;
  }
`;

const FullImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  min-height: 600px;
  min-width: 600px;
  object-fit: contain;
  border-radius: 30px;
`;

const FullVideo = styled.video`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 30px;
`;

const ImageModal = ({ mediaType, onClose, mediaUrl }) => {
  const videoRef = useRef(null); // 비디오 엘리먼트 참조

  // 모달 닫기 함수: 비디오 정지 및 모달 닫기
  const handleModalClose = () => {
    if (mediaType === "video" && videoRef.current) {
      videoRef.current.pause(); // 비디오 정지
    }
    onClose(); // 모달 닫기 함수 호출
  };

  // ModalOverlay를 클릭했을 때 모달을 닫는 함수
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose(); // 모달 닫기 함수 호출
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* X 버튼 클릭 시 모달을 닫도록 설정 */}
        <CloseButton onClick={handleModalClose}>
          <span>X</span>
        </CloseButton>
        {/* 미디어 타입에 따라 이미지 또는 비디오 렌더링 */}
        {mediaType === "image" ? (
          <FullImage src={mediaUrl} alt="Full Screen Image" />
        ) : (
          <FullVideo ref={videoRef} controls autoPlay muted src={mediaUrl} />
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageModal;
