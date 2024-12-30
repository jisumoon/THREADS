import React from "react";
import GlobalStyles from "../../styles/GlobalStyles.styles";
import styled from "styled-components";

const ContentsAll = styled.div`
  @media (max-width: 768px) {
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: auto;
  padding: 10px 0;
  border-radius: 30px;
  background: ${(props) => props.theme.borderColor};
  box-shadow: ${(props) => props.theme.bordershadow};
  transition: all 0.3s;
  z-index: 9999;
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
const Contentswrapper = styled.div`
  @media (max-width: 768px) {
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
`;
const TopRec = styled.div`
  @media (max-width: 768px) {
    width: 40px;
    height: 5px;
    background: #404040;
    border-radius: 16px;
  }
`;

const Optionwrapper = styled.div`
  padding: 10px;
  width: auto;
  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }
`;
const Li = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  width: 100%;
  text-align: center;
  transition: all 0.3s;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.mouseHoverBg};
    color: ${(props) => props.theme.mouseHoverFontcolor};
  }
  &:nth-child(1) {
    color: #ff3040;
  }
  &:nth-child(2) {
  }
  &:nth-child(3) {
    color: #0396f6;
  }
  @media (max-width: 768px) {
    width: 80%;
    height: 40px;
    padding: 18px;
    text-align: center;
    font-weight: bold;
    border-radius: 16px;
    color: ${(props) => props.theme.fontcolor};
    transition: all 0.3s;
  }
`;
const UpLoadButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    width: 80%;
    height: 70px;
    background: ${(props) => props.theme.fontcolor};
    color: ${(props) => props.theme.borderColor};
    font-size: 15px;
    font-weight: bold;
    border-radius: 16px;
    border: none;
    transition: all 0.3s;
    &:hover {
      background: ${(props) => props.theme.mouseHoverBg};
      color: ${(props) => props.theme.mouseHoverFontcolor};
    }
  }
`;

const PostSetModal = ({
  onClose,
  onEdit,
  onDelete,
  isAuthor,
  setIsEtcModalOpen,
}) => {
  const handleModalClick = (e) => {
    e.stopPropagation(); // 클릭이 배경으로 전파되지 않도록 방지
  };

  return (
    <ContentsAll>
      <Wrapper onClick={onClose}>
        <Contentswrapper onClick={handleModalClick}>
          <TopRec></TopRec>
          <Optionwrapper>
            {isAuthor && <Li onClick={onDelete}>삭제</Li>}
            <Li
              onClick={() => alert("신고하기 기능은 구현되지 않았습니다.ㅎㅎ")}
            >
              신고하기
            </Li>
            {isAuthor && <Li onClick={onEdit}>수정</Li>}
          </Optionwrapper>
          <UpLoadButton onClick={onClose}>닫기</UpLoadButton>
        </Contentswrapper>
      </Wrapper>
    </ContentsAll>
  );
};
export default PostSetModal;
