import React from "react";
import styled from "styled-components";
import { lightTheme } from "../../styles/GlobalStyles.styles";
// import LogoImg from "../../images/insta.png";
// import RightArrow from "../../images/rightarrow.svg";

const BorderItem = styled.div`
  ${({ type }) =>
    type === "borderWrapper" &&
    `
    margin: 0 auto;
    padding:10px 10px 0 10px;
    width:${(props) => (props.isSmallScreen ? "100%" : "680px")};
    height: 898px;
    border-radius: 40px 40px 0px 0px;
    border: #C9C9C9;
    background:  #F5F5F5;
    border-filter: blur(4px);
    box-shadow: ${lightTheme.bordershadow}
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
    border: 1px solid #D0D0D0;
    border-radius: 12px;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 17px 11px;
    margin-top: 16px;
    /* 모바일에서는 flex로, 데스크탑에서는 none으로 설정 */
    @media (max-width: 768px) {
      display: flex;
    }
    @media (min-width: 769px) {
      display: none;
    }
    `}
  ${({ type }) =>
    type === "insitesWrapper" &&
    `
    width: ${(props) =>
      props.isSmallScreen
        ? "100%"
        : props.isTablet
        ? "100%"
        : "485.41px"}; // 수정!
    height: ${(props) => (props.isSmallScreen ? "100%" : "137px")};
    background: ${(props) => props.theme.borderColor};
    margin-top: ${(props) => (props.isSmallScreen ? "30px" : "20px")};
    margin-bottom: ${(props) => (props.isSmallScreen ? "20px" : "20px")};
    padding: ${(props) => (props.isSmallScreen ? "10px" : "20px")};
    border: none;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    `}
  ${({ type, isSmallScreen }) =>
    type === "followWrapper" &&
    `
    width:${(props) =>
      props.isSmallScreen
        ? "100%"
        : props.isTablet
        ? "100%"
        : "485.41px"}; // 수정!
    height: ${(props) => (props.isSmallScreen ? "100%" : "536px")};
     background: ${(props) => props.theme.borderColor};
    margin-top: 30px;
    padding: 24px;
    border: none;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    `}
  ${(
    { type, isSmallScreen } // 다은 추가! (설정 아이템 웨퍼)
  ) =>
    type === "settingsWrapper" &&
    `
    width: 558.67px; // 수정!
    height: 100%;
    padding: 20px 0;
    background: #fff;
    margin-top: 30px;
    border: 1px solid rgb(213, 213, 213);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    `}
  ${({ type }) =>
    type === "insitesWrapper_dark" &&
    `
    width: 640px;
    height: 137px;
    background: #181818;
    margin-top: 30px;
    padding: 24px;
    border: none;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 4px rgba(255, 255, 255, 0.1);
    `}
`;
const BorderTextItem = styled.div`
  position: ${({ type }) => (type === "borderinner" ? "absolute" : "relative")};
  top: ${({ type }) => (type === "borderinner" ? "30px" : "20px")};
  padding: 20px;
  display: flex;
  justify-content: start;
  text-align: center;
  color: ${({ type }) => (type === "borderinner" ? "#000" : "#888")};
`;
// const Border = ({ type, text }) => {
//   return (
//     <BorderItem type={type}>
//       {type === "borderinner" && (
//         <BorderTextItem type={type}>{text || "이너 아이템"}</BorderTextItem>
//       )}
//     </BorderItem>
//   );
// };
const Border = ({ type, text, children }) => {
  return (
    <BorderItem type={type}>
      {type === "borderinner" ? (
        <BorderTextItem type={type}>{text || "이너 아이템"}</BorderTextItem>
      ) : (
        children
      )}
    </BorderItem>
  );
};
export default Border;
