import React, { useState } from "react";
import styled from "styled-components";
import { RightArrowIcon } from "../../Components/Common/Icon";
import { useMediaQuery } from "react-responsive";
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

const PrivacyTitle = styled.span`
  font-size: 14px;
  margin-left: 14px;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

const ContentAutoLayout = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    padding-right: 28px;
  }
`;

const IconLink = styled.a`
  height: 20px;
  text-align: end;
  /* padding-right: 10px; */
`;

const HeadTitle = styled.h1`
  margin-top: 10px;
  margin-left: 120px;
  margin-bottom: 14px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: 600;
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "")};
`;

const Title = styled.h2`
  margin: 14px 0;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "")};
  font-weight: 500;
`;

const Info = styled.div`
  color: ${(props) => props.theme.modalfont};
  font-size: 10px;
  font-weight: normal;
  background: ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  line-height: 12px;
  padding: ${({ isMobile }) => (isMobile ? "4px" : "10px")};
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

const OptionList = styled.ul`
  list-style-type: none;
  padding-top: 12px;
`;

const OptionItem = styled.li`
  cursor: pointer;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between; // 추가: 양쪽 끝으로 정렬
  font-size: 14px;
  position: relative; /* Positioning for the ::after element */
  color: ${(props) => props.theme.fontcolor};
  background-color: transparent; /* 초기 배경색 설정 */
  border-radius: 6px;

  // 호버 시 배경색 변경
  &:hover {
    color: #000;
    background-color: ${(props) =>
      props.theme.modalhoverbg}; /* 호버 시 백그라운드 색상 */
    transition: background-color 0.3s ease; /* 배경색 변화 애니메이션 */
  }
`;
// 체크박스 스타일 컴포넌트 추가
const Checkbox = styled.input`
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

const OnlineStatusModal = ({ onClose, selectedOption3, onSelectOption3 }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleOptionClick = (option) => {
    onSelectOption3(option);
    onClose();
  };
  return (
    <Overlay onClick={onClose} isMobile={isMobile}>
      <ModalContainer onClick={(e) => e.stopPropagation()} isMobile={isMobile}>
        <TitleLayout>
          <BackButton onClick={onClose}>
            <LeftArrowIcon size={32} />
          </BackButton>
          <HeadTitle>온라인 상태</HeadTitle>
        </TitleLayout>
        <Title isMobile={isMobile}>내 활동 상태를 볼 수 있는 사람</Title>
        <Info isMobile={isMobile}>
          이 옵션을 해제하면 다른 사람의 온라인 상태를 볼 수 없게 됩니다.{" "}
          <a
            href="https://www.instagram.com/accounts/blocked_accounts/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }} // 링크 스타일 조정
          >
            더 알아보기
          </a>
        </Info>
        <OptionList>
          {["모든 사람", "팔로워", "맞팔로우 중인 사람", "비공개"].map(
            (option) => (
              <OptionItem
                key={option}
                onClick={() => handleOptionClick(option)}
              >
                {option}
                <Checkbox
                  type="checkbox"
                  checked={selectedOption3 === option}
                  readOnly
                />
              </OptionItem>
            )
          )}
        </OptionList>
      </ModalContainer>
    </Overlay>
  );
};

export default OnlineStatusModal;
