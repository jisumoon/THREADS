import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import BottomNav from "../Components/MobileNav";

// 레이아웃 스타일
const LayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  /* justify-content: center; */
  /* background-color: rgba(156, 200, 255, 0.2); */
  /* padding: 20px 20px; */
  /* position: relative; */
  @media screen and (max-width: 768px) {
    padding: 0px;
  }
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <Nav />
      <Sidebar />
      {/* <BottomNav /> */}
      <Outlet />
    </LayoutWrapper>
  );
};

export default Layout;
