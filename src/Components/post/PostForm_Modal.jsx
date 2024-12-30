import React from "react";
import GlobalStyles from "../../styles/GlobalStyles.styles";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  bottom: 90px;
  margin-left: 34%;
  width: 280px;
  height: auto;
  padding: 10px 0;
  border-radius: 30px;
  background: ${(props) => props.theme.borderColor};
  box-shadow: ${(props) => props.theme.bordershadow};
  transition: all 0.3s;
  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 420px;
    width: 100%;
    border-radius: 30px 30px 0 0;
    background: ${(props) => props.theme.btnBgColor};
    box-shadow: ${(props) => props.theme.bordershadow};
  }
`;
const Contentswrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
const Title = styled.div`
  display: none;
  @media (max-width: 768px) {
    font-weight: 500;
    color: #737373;
    margin: 32px 0;
  }
`;
const Optionwrapper = styled.div`
  padding: 10px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  padding: 18px;
  width: 90%;
  text-align: center;
  transition: all 0.3s;
  border-radius: 20px;
  color: ${(props) => props.theme.fontcolor};
  &:hover {
    background: ${(props) => props.theme.mouseHoverBg};
    color: ${(props) => props.theme.mouseHoverFontcolor};
  }
  @media (max-width: 768px) {
    width: 90%;
    padding: 18px;
    text-align: center;
    font-weight: bold;
    border-radius: 16px;
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
    width: 300px;
    height: 70px;
    background: ${(props) => props.theme.fontcolor};
    color: ${(props) => props.theme.btnBgColor};
    font-size: 15px;
    font-weight: bold;
    border-radius: 16px;
    border: none;
    transition: all 0.3s;
    &:hover {
      background: #fff;
      color: #1c1c1c;
    }
  }
`;

const PostForm_Modal = ({ centerChild, Button, onClose, onSelect }) => {
  const handleSelect = (text) => {
    onSelect(text); // 선택된 텍스트를 상위 컴포넌트로 전달
    onClose(); // 모달 닫기
  };
  return (
    <Wrapper>
      <Contentswrapper>
        <TopRec></TopRec>
        <Title>새로운 스레드를 원하는 사람들에게 공개하세요</Title>
        <Optionwrapper>
          <Li onClick={() => handleSelect("모두에게 공개")}>모두에게 공개</Li>
          <Li onClick={() => handleSelect("내 팔로워만")}>내 팔로워만</Li>
          <Li onClick={() => handleSelect("내가 언급한 사람만")}>
            내가 언급한 사람만
          </Li>
          <Li onClick={() => handleSelect("나만 보기")}>나만 보기</Li>
        </Optionwrapper>
        <UpLoadButton>게시글 업로드</UpLoadButton>
      </Contentswrapper>
    </Wrapper>
  );
};

export default PostForm_Modal;
