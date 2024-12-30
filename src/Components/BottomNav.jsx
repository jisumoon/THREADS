import React from "react";
import styled from "styled-components";

// BottomNav 스타일 정의
const BottomNavWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none; // 768px 이상의 화면에서는 숨기기
  }
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ddd; // 마우스를 올렸을 때 색상 변화
  }
`;

const BottomNav = () => {
  return (
    <BottomNavWrapper>
      <NavItem>
        <span role="img" aria-label="home">
          🏠
        </span>
        <span>Home</span>
      </NavItem>
      <NavItem>
        <span role="img" aria-label="search">
          🔍
        </span>
        <span>Search</span>
      </NavItem>
      <NavItem>
        <span role="img" aria-label="profile">
          👤
        </span>
        <span>Profile</span>
      </NavItem>
    </BottomNavWrapper>
  );
};

export default BottomNav;
