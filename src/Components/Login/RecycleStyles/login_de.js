import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

export const Wrapper = styled.div`
  width: 100%;
  // dan 하이 수정했습니다.
  height: ${(props) => (props.$isSmallScreen ? "100%" : "calc(100vh - 15%)")};
  margin: 0 auto;
  color: ${(props) => props.theme.fontcolor};
  /* background: ${(props) => props.bgColor || "#fff"}; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

export const BgImg = styled.img`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 533px;
  object-fit: cover;
  pointer-events: none;
  display: ${(props) => (props.$isSmallScreen ? "none" : "block")};
`;

export const LoginInner = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: ${(props) => (props.$isSmallScreen ? "15%" : "0")};
  width: ${(props) => (props.$isSmallScreen ? "370px" : "292px")};
  height: ${(props) => (props.$isSmallScreen ? "407px" : "100%")};
  display: flex;
  align-items: center;
  flex-direction: column;
  /* justify-content: center; */
`;

export const LogoWrapper = styled.div`
  margin-bottom: 18px;
  margin-top: ${(props) =>
    props.$isSmallScreen ? "137px" : "48px"}; // 수정 10월07일
`;

export const LoginP = styled.p`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 16px;
  span {
    padding-top: 3px;
    margin-bottom: ${(props) => (props.$isSmallScreen ? "16px" : "0")};
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) =>
    props.isSmallScreen ? "24px" : props.gap || props.theme.gap};
`;

export const InputWrapper = styled.div`
  position: relative;
  width: ${(props) => (props.isSmallScreen ? "292px" : "100%")};
  // dan 기본값 10px 이었는데 0으로 설정 -> 전달받는 사람이 값 설정하도록
  margin-bottom: ${(props) => props.mb || "10px"};
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
  background: ${(props) => props.bgColor || "#fff"};
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
`;

// dan 가입하기 버튼 스타일 타입 추가했습니다.
export const StyledBtn = styled.button`
  &[type="join"] {
    width: ${(props) => (props.isSmallScreen ? "292px" : "100%")};
    height: 54px;
    padding: 20px;
    font-size: 14px;
    font-weight: 400;
    background: #0396f6;
    border: none;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    margin-bottom: 27px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      background: #474747; /* 호버 시 배경 색상 */
      color: #fff; /* 호버 시 글자 색상 */
    }
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
  margin-bottom: 13px;
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
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
    margin-left: 10px;
    text-decoration: none;
  }
`;
export const Hr = styled.div`
  width: 122px;
  height: 2px;
  border: 1px solid #e5e5e5;
  display: ${(props) => (props.$isSmallScreen ? "flex" : "none")};
  justify-content: center;
  align-content: center;
`;

export const Or = styled.span`
  width: 55px;
  font-size: 14px;
  color: #7e7e7e;
  display: ${(props) => (props.$isSmallScreen ? "block" : "flex")};
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Linebreak = styled.div`
  display: ${(props) => (props.$isSmallScreen ? "block" : "flex")};
  justify-content: center;
  align-items: center;
  margin-top: 41.5px;
  margin-bottom: 46px;
`;
