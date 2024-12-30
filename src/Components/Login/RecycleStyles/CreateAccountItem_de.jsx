import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

export const CreateAccountWrapper = styled.div`
  position: relative;
  width: ${(props) => (props.isSmallScreen ? "100%" : "634px")};
  height: ${(props) => (props.isSmallScreen ? "100%" : "861px")};
  margin: 0 auto;
  margin-top: ${(props) => (props.isSmallScreen ? "0" : "78px")};
  border: ${(props) => (props.isSmallScreen ? "2px solid #f2f2f2" : "none")};
  border-radius: ${(props) => (props.isSmallScreen ? "0" : "30px")};
  background: #fff;

  /* 블러 효과를 ::before 가상 요소에 적용 */
  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 30px; /* 블러 영역의 모서리 반경 조정 */
    border: 2px solid #f2f2f2;
    background: #f2f2f2;
    filter: blur(8px); /* 블러 강도 조정 */
    z-index: -1; /* 블러 효과가 내부 내용에 영향을 주지 않도록 아래쪽으로 */
  }
`;

export const WelcomeMessage = styled.div`
  color: #474747;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  margin-top: ${(props) => (props.isSmallScreen ? "23px" : "29px")};
  margin-bottom: ${(props) => (props.isSmallScreen ? "20px" : "74px")};
`;

export const CautionInfo = styled.span`
  color: #737373;
  max-width: 370px;
  margin-bottom: 24px;
`;
