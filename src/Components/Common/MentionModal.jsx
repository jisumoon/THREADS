// src/components/MentionModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { LeftArrowIcon } from "./Icon";

// 스타일 정의
export const Overlay = styled.div`
  position: fixed; // 모달을 화면에 고정
  top: 45%; // 세로 중앙 정렬 기준
  left: 50%; // 가로 중앙 정렬 기준
  transform: translate(-50%, -50%); // 요소의 중심을 기준으로 이동
  width: 100vw; // 전체 화면 너비
  height: 100vh; // 전체 화면 높이
  display: flex; // 플렉스 박스 사용
  justify-content: center; // 수평 중앙 정렬
  align-items: center; // 수직 중앙 정렬
  z-index: 1000; // 다른 요소보다 위에 표시 (필요 시 조정)
  background-color: rgba(0, 0, 0, 0.7); // 반투명 배경 (필요 시 조정)
`;

export const ModalContainer = styled.div`
  width: 420px;
  height: 320px;
  background-color: ${(props) => props.theme.borderColor};
  border: 1px solid ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  padding: 24px;
`;

const TitleLayout = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  box-sizing: border-box;
  border: none;
  cursor: pointer;

  color: gray; // 초기 색상 설정
  transition: color 0.3s ease; // 색상 전환 효과

  &:hover,
  &:active {
    color: #181818; // 호버 또는 클릭 시 색상 변경
  }
`;

export const Title = styled.h2`
  margin-left: 90px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 14px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "")};
`;

export const Info = styled.div`
  color: ${(props) => props.theme.modalfont};
  font-size: 12px;
  font-weight: normal;
  background: ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  line-height: 20px;
  padding: 12px;
`;

export const OptionList = styled.ul`
  list-style-type: none;
  padding-top: 12px;
`;

export const OptionItem = styled.li`
  cursor: pointer;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between; // 추가: 양쪽 끝으로 정렬
  font-size: 14px;
  position: relative; /* Positioning for the ::after element */
  color: ${(props) => props.theme.fontcolor};
  background-color: transparent; /* 초기 배경색 설정 */
  border-radius: 8px;

  // 호버 시 배경색 변경
  &:hover {
    color: #181818;
    background-color: ${(props) =>
      props.theme.modalhoverbg}; /* 호버 시 백그라운드 색상 */
    transition: background-color 0.3s ease; /* 배경색 변화 애니메이션 */
  }
`;

// 체크박스 스타일 컴포넌트 추가
export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  appearance: none;
  border-radius: 50%;
  border: 2px solid #ccc;
  outline: none;
  cursor: pointer;
  position: relative;
  margin-right: 10px;

  // 체크된 상태의 스타일
  &:checked {
    background-color: #181818;
    border: 2px solid #181818;
  }

  // 체크 표시 추가
  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;

const MentionModal = ({ onClose, onSelectOption }) => {
  const [activeOption, setActiveOption] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    setIsOptionSelected(true);
    onSelectOption(option); // 부모 컴포넌트에 선택된 옵션 전달
    onClose(); // 모달 닫기
  };

  // 모달 외부 클릭 시 닫히는 함수
  const handleOverlayClick = () => {
    if (isOptionSelected) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <TitleLayout>
          <BackButton onClick={onClose}>
            <LeftArrowIcon size={32} />
          </BackButton>
          <Title>@언급 허용 대상</Title>
        </TitleLayout>

        <Info>
          회원님을 @언급하여 스레드, 답글 또는 소개글에 회원님의 프로필을 연결할
          수 있도록 허용할 사람을 선택하세요. 회원님이 선택한 옵션에 해당하지
          않는 사람이 회원님을 @언급하려고 시도하면 회원님이 @언급을 허용하지
          않는다는 메시지가 표시됩니다.
        </Info>
        <OptionList>
          {/* 옵션 배열을 순회하며 리스트 항목 생성 */}
          {["모든 사람", "내가 팔로우하는 프로필", "아무도 언급할 수 없음"].map(
            (option) => (
              <OptionItem
                key={option}
                onClick={() => handleOptionClick(option)}
              >
                {/* 체크박스 추가 */}
                {option}
                <Checkbox
                  type="radio" // 라디오 버튼으로 설정
                  checked={activeOption === option} // 현재 선택된 옵션과 비교하여 체크 상태 설정
                  readOnly // 사용자가 직접 체크할 수 없도록 설정
                />
              </OptionItem>
            )
          )}
        </OptionList>
      </ModalContainer>
    </Overlay>
  );
};

export default MentionModal;
