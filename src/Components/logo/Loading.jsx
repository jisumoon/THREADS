import React from "react";
import styled, { keyframes } from "styled-components";

// SVG 아이콘이 그려지는 애니메이션
const draw = keyframes`
  0% {
    stroke-dashoffset: 0.8;
  }
`;

// 스타일 컴포넌트 정의
const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%);
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bodyBg};
  opacity: 0.9;
  z-index: 100000;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
`;

const SvgIcon = styled.svg`
  width: 50px;
  height: 56px;
  path {
    stroke-dasharray: 300; // 전체 경로 길이
    stroke-dashoffset: 300; // 경로가 가려진 상태에서 시작
    stroke: ${(props) => props.theme.logoColor};
    animation: ${draw} 1.6s infinite forwards; // 3초 동안 경로를 그리는 애니메이션
  }
`;

const GrayLogo = styled.img`
  position: absolute;
  width: 50px;
  height: 56px;
  opacity: 0.2;
  stroke-width: 4px;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <SvgIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 46"
        fill="none"
      >
        <path
          d="M38 15C37.1667 10.6667 32.5 2 20.5 2C5.5 2 2 14 2 23.5C2 33 7 42.5 17.5 43.5C28 44.5 33.5 40.5 35.5 34.5C37.5 28.5 33 23.5 27 21.5C21 19.5 12.5 21.5 13.5 28C14.5 34.5 26 34.5 28 27C30 19.5 27.5 15.5 26 14.5C24.5 13.5 18.5 10.5 13.5 16"
          stroke="black"
          strokeWidth="4"
        />
      </SvgIcon>
      <GrayLogo src="/logoSvg.png" />
    </LoadingContainer>
  );
};

export default Loading;
