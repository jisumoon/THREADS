// src/components/MentionModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { RightArrowIcon } from "../../Components/Common/Icon";
import { Line } from "../../Components/SettingsItem_de";
import { useMediaQuery } from "react-responsive";
import AddWordsModal from "./AddWordModal";
import { LeftArrowIcon } from "./Icon";

// 스타일 정의
const Overlay = styled.div`
  position: fixed; // 모달을 화면에 고정
  top: ${({ isMobile }) => (isMobile ? "0" : "45%")}; // 세로 중앙 정렬 기준
  left: ${({ isMobile }) => (isMobile ? "0" : "50%")}; // 가로 중앙 정렬 기준
  transform: ${({ isMobile }) =>
    isMobile ? "0" : "translate(-50%, -50%)"}; // 요소의 중심을 기준으로 이동
  width: 100vw; // 전체 화면 너비
  height: ${({ isMobile }) => (isMobile ? `calc(100vh - 70px)` : "100vh")};
  display: flex; // 플렉스 박스 사용
  justify-content: center; // 수평 중앙 정렬
  align-items: center; // 수직 중앙 정렬
  z-index: ${({ isMobile }) =>
    isMobile ? "1000" : "0"}; // 다른 요소보다 위에 표시 (필요 시 조정)
  background-color: rgba(0, 0, 0, 0.7); // 반투명 배경 (필요 시 조정)
`;

const ModalContainer = styled.div`
  width: ${({ isMobile }) => (isMobile ? "100%" : "420px")};
  height: ${({ isMobile }) => (isMobile ? "100%" : "640px")};
  background-color: ${(props) => props.theme.borderColor};
  border: 1px solid ${(props) => props.theme.borderstroke};
  border-radius: ${({ isMobile }) => (isMobile ? "none" : "8px")};
  padding: 24px;
`;

const HeadTitle = styled.h1`
  margin-top: 10px;
  margin-left: 120px;
  font-weight: 600;
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

const SmallTitle = styled.div`
  color: #ddd;
  font-size: 12px;
  font-weight: normal;
  margin-right: 12px;
  transition: all 0.3s;
  &:hover {
    color: #181818;
    font-weight: 500;
  }
`;

const OutherTitle = styled.div`
  display: flex;
  justify-content: space-between; // 양쪽 끝으로 정렬
  align-items: center; // 수직 중앙 정렬
  width: 100%; // 전체 너비 사용
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "")};
  font-weight: 500;
`;

const ContentAutoLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Info = styled.div`
  color: ${(props) => props.theme.modalfont};
  font-size: 12px;
  font-weight: normal;
  background: ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  line-height: 20px;
  padding: ${({ isMobile }) => (isMobile ? "8px" : "12px")};
`;

const MoveLink = styled.a``;

const OptionList = styled.ul`
  list-style-type: none;
  padding-top: ${({ isMobile }) => (isMobile ? "8px" : "12px")};
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

const HiddenWordModal = ({
  onClose,
  onSelectOption,
  selectedOption1,
  selectedOption2,
}) => {
  const [activeOption1, setActiveOption1] = useState(selectedOption1); // 첫 번째 옵션 상태
  const [activeOption2, setActiveOption2] = useState(selectedOption2); // 두 번째 옵션 상태
  const [showAddWordsModal, setShowAddWordsModal] = useState(false); // 새로운 모달 상태 추가
  const handleOptionClick = (option, listIndex) => {
    if (listIndex === 1) {
      setActiveOption1(option);
    } else {
      setActiveOption2(option);
    }
    onSelectOption(option); // 선택된 옵션을 부모 컴포넌트에 전달
  };

  const handleOverlayClick = () => {
    onClose(); // 모달 닫기
  };
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)", // 닫는 괄호 추가
  });
  return (
    <Overlay onClick={handleOverlayClick} isMobile={isMobile}>
      <ModalContainer onClick={(e) => e.stopPropagation()} isMobile={isMobile}>
        <TitleLayout>
          <BackButton
            onClick={(e) => {
              e.stopPropagation();

              onClose && onClose(); // 함수가 존재할 때만 호출
            }}
          >
            <LeftArrowIcon size={32} />
          </BackButton>
          <HeadTitle isMobile={isMobile}>숨겨진 단어</HeadTitle>
        </TitleLayout>
        <Info>Instagram에서 받은 댓글에도 이 설정이 적용됩니다.</Info>
        <Line />
        <Title isMobile={isMobile}>불쾌한 단어 및 문구</Title>
        <Info isMobile={isMobile}>
          게시물에서 불쾌한 단어, 문구 또는 이모티콘이 포함된 답글은 누구나 볼
          수 있는 가려진 섹션으로 이동됩니다.
          <MoveLink>더 알아보기</MoveLink>
        </Info>
        <OptionList isMobile={isMobile}>
          {["가려진 섹션 설정", "가려진 섹션 해제"].map((option) => (
            <OptionItem
              key={option}
              onClick={() => handleOptionClick(option, 1)}
            >
              {option}
              <Checkbox
                type="radio"
                checked={activeOption1 === option}
                readOnly
              />
            </OptionItem>
          ))}
        </OptionList>
        <Line />
        <Title isMobile={isMobile}>맞춤 단어 및 문구</Title>
        <Info isMobile={isMobile}>
          이 단어, 문구 또는 이모티콘이 포함된 게시물이나 답글이 피드에 표시되지
          않습니다. 검색에서는 해당 콘텐츠를 계속 볼 수 있지만, 가려진 상태로
          표시됩니다.
        </Info>
        <OptionList isMobile={isMobile}>
          {["맞춤 단어 설정", "맞춤 단어 해제"].map((option) => (
            <OptionItem
              key={option}
              onClick={() => handleOptionClick(option, 2)}
            >
              {option}
              <Checkbox
                type="radio"
                checked={activeOption2 === option}
                readOnly
              />
            </OptionItem>
          ))}
        </OptionList>
        <Line />
        <ContentAutoLayout>
          <OutherTitle isMobile={isMobile}>
            맞춤 단어 및 문구 관리
            <a
              onClick={() => setShowAddWordsModal(true)} // "설정하기" 클릭 시 새로운 모달 열기
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SmallTitle>설정하기</SmallTitle>
            </a>
          </OutherTitle>
        </ContentAutoLayout>
        {showAddWordsModal && (
          <AddWordsModal onClose={() => setShowAddWordsModal(false)} /> // 새로운 모달 닫기 함수
        )}
      </ModalContainer>
    </Overlay>
  );
};

export default HiddenWordModal;
