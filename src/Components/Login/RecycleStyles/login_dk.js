import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  /* height: calc(100vh - 15%); */
  height: 100vh; // 뷰포트 전체를 차지
  overflow: hidden; // 키보드 때문에 스크롤 안 생기도록 설정
  margin: 0 auto;
  z-index: -1;
  color: ${(props) => props.theme.fontcolor};
`;

export const BgImg = styled.img`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 533px;
  object-fit: cover;
  pointer-events: none;
  display: ${({ $isSmallScreen }) => ($isSmallScreen ? "none" : "block")};
`;

export const LoginInner = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 13%;
  width: 370px;
  height: 407px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LogoWrapper = styled.div`
  margin-bottom: 18px;
  display: flex;
  justify-content: ${({ $isSmallScreen }) =>
    $isSmallScreen ? "center" : "flex-start"};
`;

export const LoginP = styled.p`
  display: flex;
  align-items: center;
  gap: 1px;
  margin-bottom: 26px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${(props) =>
    props.isSmallScreen ? "12px" : props.isTablet ? "20px" : "20px"};
`;

export const StyledInput = styled.input`
  padding: 20px;
  width: 100%;
  height: 54px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 400;
  color: #7e7e7e;
  box-shadow: 0 0 0 0 ${(props) => props.theme.loginInputSelectColor};
  transition: all 0.2s ease-in-out;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    opacity: 0;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 1px 2px ${(props) => props.theme.loginInputSelectColor};
  }
  &[type="submit"] {
    cursor: pointer;
    background-color: #000;
    color: #fff;
    border: 1px solid ${(props) => props.theme.mouseHoverFontcolor};
    margin-bottom: 27px;
  }
  &.insta-btn {
    width: 100%;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #67b5fa;
    outline: none;
    border: none;
    padding: 0px;
    color: #fff;
    border-radius: 12px;
  }
`;

export const StyledLabel = styled.label`
  position: absolute;
  left: 20px;
  top: 21px;
  font-size: 14px;
  color: #7e7e7e;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
  opacity: 1;
`;

export const SingnUpText = styled.p`
  display: flex;
  justify-content: center;
  font-size: 14px;
  margin-bottom: ${(props) =>
    props.isSmallScreen ? "6px" : props.isTablet ? "13px" : "13px"};
`;

export const ForgotPasswordText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
  text-align: center;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
    margin-left: 10px;
    text-decoration: none;
  }
`;

// 추가된 컴포넌트들
export const Hr = styled.div`
  width: 122px;

  height: 2px;
  border: 1px solid #e5e5e5;
  /* display: ${({ $isSmallScreen }) => ($isSmallScreen ? "flex" : "none")}; */
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const Or = styled.span`
  width: 55px;
  font-size: 14px;
  color: #7e7e7e;
  /* display: ${({ $isSmallScreen }) => ($isSmallScreen ? "flex" : "none")}; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Linebreak = styled.div`
  /* display: ${({ $isSmallScreen }) => ($isSmallScreen ? "flex" : "none")}; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) =>
    props.isSmallScreen ? "20px" : props.isTablet ? "41.5x" : "41.5px"};
  margin-bottom: ${(props) =>
    props.isSmallScreen ? "20px" : props.isTablet ? "46px" : "46px"};
`;

export const StyledSpan = styled.span`
  font-size: ${(props) => (props.$isSmallScreen ? "14px" : "16px")};
  font-weight: bold;
  color: ${(props) => props.theme.fontcolor};
  display: ${(props) => (props.$isSmallScreen ? "block" : "inline")};
  text-align: center;
  padding-top: 0px;
`;

// Login_Insta 부분, 기존에 있는 계정들 나열
export const LoginInstaUl = styled.ul`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 0px 10px;
`;

export const LoginInstaLi = styled.li`
  display: flex;
  align-items: center;
  width: 334px;
  height: 86px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: 0px;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  position: relative; /* 자식 요소가 이 기준으로 위치하도록 설정 */
  padding-bottom: 20px; /* 하단 여백 추가 */
  padding-top: ${(props) =>
    props.isSmallScreen ? "150px" : props.isTablet ? "230px" : "230px"};
`;

export const FooterWrapper = styled.div`
  width: 370px; /* 푸터 너비 설정 */
  margin: 0 auto; /* 수평 가운데 정렬 */
  padding-bottom: 20px; /* 하단 여백 추가 */
  padding-top: ${(props) =>
    props.isSmallScreen ? "12px" : props.isTablet ? "12px" : "0"};
`;

export const FooterMenuUl = styled.ul`
  display: flex;
  justify-content: space-between; /* 메뉴 아이템 간격 */
  width: 100%; /* 부모 너비에 맞춤 */
`;

// 다은 © 2024만 안눌리도록 따로 스타일 줌
export const FooterMenubasic = styled.li`
  cursor: pointer;
  font-size: 12px;
  color: ${(props) => props.theme.nomalIconColor};
`;
// 호버시 색상 변화 추가
export const FooterMenuLi = styled.li`
  cursor: pointer;
  font-size: 12px;
  color: ${(props) => props.theme.nomalIconColor};
  transition: all 0.3s;
  &:hover {
    color: #181818;
    font-weight: 500;
  }
`;
