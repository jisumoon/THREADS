// import React from "react";
// import styled from "styled-components";
// import { useMediaQuery } from "react-responsive";
// import LogoImg from "../../images/insta.png";
// import RightArrow from "../../images/rightarrow.svg";

// const BorderItem = styled.div`
//   ${({ type }) =>
//     type === "borderWrapper" &&
//     `
//     margin: 0 auto;
//     width: 680px;
//     height: 898px;
//     border-radius: 40px 40px 0px 0px;
//     border: #C9C9C9;
//     background:  #F5F5F5;
//     border-filter: blur(4px);
//     `}
//   ${({ type }) =>
//     type === "borderinner" &&
//     `
//     position: relative;
//     top: 15px;
//     margin: 0 23px;
//     width: 634px;
//     height: 230px;
//     border: 1px solid #000;
//     border-radius: 30px;
//     background: #fff;
//     `}
//   ${({ type }) =>
//     type === "loginborder" &&
//     `
//     width: 370px;
//     height: 74px;
//     cursor: pointer;
//     border: 1px solid #D0D0D0;
//     border-radius: 12px;
//     background: transparent;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 17px 11px;
//     margin-top: 16px;
//     `}
// `;

// const BorderTextItem = styled.div`
//   position: ${({ type }) => (type === "borderinner" ? "absolute" : "relative")};
//   top: ${({ type }) => (type === "borderinner" ? "30px" : "0px")};
//   padding: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   gap: 35px;

//   /* 텍스트 색상 수정 부분 */
//   color: ${({ type }) => (type === "loginborder" ? "#000" : "#888")};
// `;

// const ArrowImage = styled.img`
//   width: 16px; /* 화살표 이미지 크기 설정 */
//   height: 16px;
// `;

// // 이미지 스타일 컴포넌트 추가
// const LogoImage = styled.img`
//   width: 40px; /* 원하는 크기로 이미지 조정 */
//   height: 40px;
// `;

// const Border = ({ type, text }) => {
//   const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
//   return (
//     <BorderItem type={type} isSmallScreen={isSmallScreen}>
//       <BorderTextItem type={type}>
//         <LogoImage src={LogoImg} alt="Instagram Logo" />
//         {text}
//         <ArrowImage src={RightArrow} alt="Right Arrow" />
//       </BorderTextItem>
//     </BorderItem>
//   );
// };

// export default Border;

// src/Components/Common/Border.tsx
// @ts-nocheck

import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import LogoImg from "../../images/insta.png";
// import RightArrow from "../../images/arrowiconnew.svg";
import RightArrow from "../../images/doublearrowright.svg";
// import { RightNewArrowIcon } from "../Common/Icon";
import InstaImg from "../Login/RecycleStyles/instagram.png";

const BorderItem = styled.div`
  ${({ type }) =>
    type === "borderWrapper" &&
    `
    margin: 0 auto;
    width: 680px;
    height: 898px;
    border-radius: 40px 40px 0px 0px;
    border: #C9C9C9;
    background:  #F5F5F5;
    filter: blur(4px);
    `}
  ${({ type }) =>
    type === "borderinner" &&
    `
    position: relative;
    top: 15px;
    margin: 0 23px;
    width: 634px;
    height: 230px;
    border: 1px solid #000;
    border-radius: 30px;
    background: #fff;
    `}
  ${({ type }) =>
    type === "loginborder" &&
    `
    width: 370px;
    height: 74px;
    cursor: pointer;
    border: 1px solid #D0D0D0;
    border-radius: 12px;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 17px 11px;
    margin-top: 0px;
    margin-bottom: 50px;
    font-weight: 700;
    `}
  
  /* 예시: isSmallScreen에 따른 추가 스타일링 */
  ${({ $isSmallScreen, type }) =>
    type === "loginborder" &&
    $isSmallScreen &&
    `
      width: 100%;
      padding: 15px 10px;
    `}
`;

const BorderTextItem = styled.div`
  position: ${({ type }) => (type === "borderinner" ? "absolute" : "relative")};
  top: ${({ type }) => (type === "borderinner" ? "30px" : "0px")};
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 25px;

  /* 텍스트 색상 수정 부분 */
  color: ${({ type, theme }) =>
    type === "loginborder" ? theme.fontcolor : "#888"};
`;

const ArrowImage = styled.img`
  width: 26px;
  height: 26px;
  transition: transform 0.3s ease; /* 애니메이션 설정 */
  overflow: hidden;
  &:hover {
    transform: translateX(8px); /* 호버 시 오른쪽으로 이동 */
  }
`;

// 이미지 스타일 컴포넌트 추가
const LogoImage = styled.img`
  width: 30px; /* 원하는 크기로 이미지 조정 */
  height: 30px;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
`;

const BorderDk = ({ type, text }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <BorderItem type={type} $isSmallScreen={isSmallScreen}>
      <BorderTextItem type={type}>
        {/* <LogoImage src={LogoImg} alt="Instagram Logo" /> */}
        <Img
          // src={InstaImg}
          src={LogoImg}
          alt="Instagram Icon"
          className="xz74otr x1vqgdyp x100vrsf"
        />
        {text}

        <ArrowImage src={RightArrow} alt="Right Arrow" />
      </BorderTextItem>
    </BorderItem>
  );
};

export default BorderDk;
