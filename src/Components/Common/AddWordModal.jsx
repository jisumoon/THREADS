import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { LeftArrowIcon } from "./Icon";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: ${({ isMobile }) => (isMobile ? "100%" : "420px")};
  max-height: 80vh;
  background-color: ${(props) => props.theme.borderColor};
  border: 1px solid ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const TitleLayout = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  margin-left: 80px;
  font-weight: 600;
`;

const Info = styled.p`
  font-size: 12px;
  margin-bottom: 8px;
  color: ${(props) => props.theme.modalfont};
  padding: 0 6px;
`;

const InputContainer = styled.div`
  display: flex; /* 인풋과 버튼을 가로로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  border: 1px solid ${(props) => props.theme.borderstroke}; /* 인풋과 버튼을 감싸는 경계선 */
  border-radius: 8px; /* 경계선 둥글게 만들기 */
  overflow: hidden; /* 경계선 안에 내용이 흐트러지지 않게 하기 */
  background: ${(props) => props.theme.borderstroke};
  margin-bottom: 12px;
`;

const Input = styled.input`
  padding: 16px;
  border: none; /* 경계선 제거 */
  background: ${(props) => props.theme.borderstroke};
  flex: 1; /* 공간을 모두 차지 */
  outline: none; /* 포커스 시 외곽선 제거 */
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

const AddButton = styled.button`
  padding: 16px; /* 인풋 창과 같은 높이로 설정 */
  background: ${(props) => props.theme.borderstroke};
  color: ${(props) => props.theme.modalfont};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s; /* 호버 애니메이션 부여 */
  font-size: 16px;
  &:hover {
    color: #181818;
  }
  &:focus {
    color: #181818;
  }
`;

const AddedWordsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 10px;
`;

const AddedWordItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between; // 추가: 양쪽 끝으로 정렬
  font-size: 14px;
  position: relative; /* Positioning for the ::after element */
  color: ${(props) => props.theme.fontcolor};
  background-color: transparent; /* 초기 배경색 설정 */
  font-size: 14px;
  border-radius: 8px;
  padding: 8px 12px; /* 좌우에 간격 추가 */
  // 호버 시 배경색 변경
  &:hover {
    color: #181818;
    background-color: ${(props) =>
      props.theme.modalhoverbg}; /* 호버 시 백그라운드 색상 */
    transition: background-color 0.3s ease; /* 배경색 변화 애니메이션 */
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.deleteColor};
  cursor: pointer;
`;

const AddWordsModal = ({ onClose }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [inputValue, setInputValue] = useState("");
  const [addedWords, setAddedWords] = useState([]);
  const [isComposing, setIsComposing] = useState(false); // 조합 중 여부 상태

  useEffect(() => {
    // 로컬 스토리지에서 추가된 단어 불러오기
    const storedAddedWords =
      JSON.parse(localStorage.getItem("addedWords")) || [];
    setAddedWords(storedAddedWords);
  }, []);

  useEffect(() => {
    // 단어가 추가될 때마다 로컬 스토리지에 저장
    localStorage.setItem("addedWords", JSON.stringify(addedWords));
  }, [addedWords]);

  const handleAddWord = () => {
    if (inputValue.trim() !== "") {
      setAddedWords((prevWords) => [...prevWords, inputValue]);
      setInputValue(""); // 입력 필드를 초기화
    }
  };
  const handleDeleteWord = (index) => {
    setAddedWords((prevWords) => prevWords.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposing) {
      // 조합 중이 아닐 때만 단어 추가
      e.preventDefault(); // 기본 동작 방지
      handleAddWord(); // Enter 키를 누르면 단어 추가
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true); // 조합 시작
  };

  const handleCompositionEnd = () => {
    setIsComposing(false); // 조합 끝
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()} isMobile={isMobile}>
        <TitleLayout>
          <BackButton onClick={onClose}>
            <LeftArrowIcon size={32} />
          </BackButton>
          <Title>단어 또는 문구 추가</Title>
        </TitleLayout>
        <InputContainer>
          <Input
            type="text"
            placeholder="추가할 내용을 입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "추가할 내용을 입력하세요")}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart} // 조합 시작 이벤트
            onCompositionEnd={handleCompositionEnd} // 조합 끝 이벤트
          />
          <AddButton onClick={handleAddWord}>추가</AddButton>
        </InputContainer>
        <Info>
          여러 단어, 문구 및 이모티콘을 추가할 수 있습니다. 언제든지 리스트를
          업데이트할 수 있습니다.
        </Info>
        <AddedWordsList>
          {addedWords.map((word, index) => (
            <AddedWordItem key={index}>
              {word}
              <DeleteButton onClick={() => handleDeleteWord(index)}>
                삭제
              </DeleteButton>
            </AddedWordItem>
          ))}
        </AddedWordsList>
      </ModalContainer>
    </Overlay>
  );
};

export default AddWordsModal;
