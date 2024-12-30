import React from "react";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles.styles";
import MobileSidebar from "./MobileSidebar";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  UserIcon1,
  Like,
  Home,
  GoBack,
} from "./Common/Icon";
import Logo from "./LoadingLogo/Logo";
import {
  useNavigate,
  Link,
  useLocation,
  createSearchParams,
} from "react-router-dom";

// BottomNav 스타일 정의
const Wrapper = styled.div`
  /* position: fixed; */
  /* z-index: 100; */
  background-color: #000;

  /* top: 100px; */
  @media (min-width: 768px) {
    display: none; // 768px 이상의 화면에서는 숨기기
  }
`;

const BottomNavWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  background: ${(props) => props.theme.borderColor};
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 10000;
  box-shadow: ${(props) => props.theme.bor};
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
    color: #ffffff; // 마우스를 올렸을 때 색상 변화
  }
`;
const BackNavwrapper = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: ${(props) => props.theme.borderColor};
    z-index: 1000;
    @media (min-width: 768px) {
      display: none; // 768px 이상의 화면에서는 숨기기
    }
  }
`;

const LogoWrapper = styled.div`
  padding-left: 20px;
`;
const Backdesc = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  height: 100%;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none; // 768px 이상의 화면에서는 숨기기
  }
`;
const BackIcon = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  transform: translateX(5px);
  transform: translateY(2px);
  align-items: center;
  margin-left: 10px;
  svg {
    path {
      stroke: ${(props) => props.theme.logoColor};
    }
  }
`;
const Backtxt = styled.div`
  font-size: 15px;
`;

const MobileNav = () => {
  const navigate = useNavigate();

  const location = useLocation(); // 현재 URL 정보를 가져옴
  const renderContent = () => {
    if (location.pathname.includes("activity")) {
      return "활동";
    } else if (location.pathname.includes("postform")) {
      return "포스트";
    } else if (location.pathname.includes("Search")) {
      return "검색";
    } else if (location.pathname.includes("profile")) {
      return "프로필";
    } else if (location.pathname.includes("settings")) {
      return "설정";
    } else if (location.pathname.includes("insites")) {
      return "인사이트";
    } else if (location.pathname.includes("PostComment")) {
      return "게시글";
    } else if (location.pathname.includes("Comment")) {
      return "댓글 달기";
    } else {
      return "홈";
    }
  };

  return (
    <Wrapper>
      <BackNavwrapper>
        {/* <Backdesc onClick={() => navigate(-1)}>
          <BackIcon>
            <GoBack />
          </BackIcon>
          <Backtxt>뒤로</Backtxt>
        </Backdesc> */}
        <LogoWrapper>
          <Link to={"/"}>
            <Logo width={28} />
          </Link>
        </LogoWrapper>
        <div>{renderContent()}</div>
        <MobileSidebar />
      </BackNavwrapper>
      <BottomNavWrapper>
        <NavItem onClick={() => navigate("/")}>
          <Home style={{ color: "#000" }} />
        </NavItem>
        <NavItem onClick={() => navigate("/Search")}>
          <MagnifyingGlassIcon />
        </NavItem>
        <NavItem onClick={() => navigate("/postform")}>
          <PlusIcon width={30} />
        </NavItem>
        <NavItem onClick={() => navigate("/activity")}>
          <Like />
        </NavItem>
        <NavItem
          onClick={() => {
            navigate({
              pathname: "/profile",
              // search: `${createSearchParams({
              //   email: userAdress,
              // })}`,
            });
          }}
        >
          <UserIcon1 />
        </NavItem>
      </BottomNavWrapper>
    </Wrapper>
  );
};

export default MobileNav;
