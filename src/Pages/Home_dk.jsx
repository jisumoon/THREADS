import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "../Components/Nav";
import Intro from "../Components/LoadingLogo/Intro";
import PostForm from "../Components/post/PostForm";
import TimeLine from "../Components/post/TimeLine";
import EtcModal from "../Components/post/EtcModal";

// 렌더링할 컴포넌트들 추가
import Activity from "./Activity";
import Profile from "./Profile";
import Search from "./Search";
import Insites from "./Insites";
import Settings from "./Settings";
// import { relative } from "path";

const Wrapper = styled.div`
  /* width: 100%; */
  /* height: calc(100vh - 120px); */
  height: 100vh;
  margin-top: 120px;
  /* overflow: hidden; */
  @media (max-width: 768px) {
    height: 100vh;
    width: 100%;
  }
`;

const BoederWrapper = styled.div`
  /* position: fixed; */
  bottom: 0;
  /* left: 50%; */
  /* transform: translate(-50%); */
  /* margin: 0; */
  width: 680px;
  height: 100%;
  /* height: 85%; */
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};
  /* overflow: hidden; */
  @media (max-width: 768px) {
    /* position: absolute; */
    width: 100%;
    bottom: 0;
    border-radius: 0;
    width: 100%;
    height: calc(100% - 70px);
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
    background-color: red;
  }
`;

const PostlistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  transition: transform 0.3s ease-out;

  &.bounce {
    animation: bounce-back 1s ease-in-out;
  }

  @keyframes bounce-back {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(40px); /* 살짝 위로 올렸다가 */
    }
    100% {
      transform: translateY(0px); /* 원래 자리로 돌아오기 */
    }
  }

  @media (max-width: 768px) {
    /* position: absolute; */
    position: fixed;
    left: 0px;

    top: -50px;
    width: 100%;
    height: 100%;
    margin-top: 120px;
    border-radius: 0;
  }
`;

const DIV = styled.div`
  display: flex;
`;

const BUTTONS = styled.div`
  position: fixed;
  left: 0px;
`;
const handleScroll = () => {
  const element = wrapperRef.current;
  // 스크롤이 가장 위에 도달했는지 확인
  if (element.scrollTop === 0) {
    // 텐션감을 위한 애니메이션 트리거
    setIsBouncing(true);

    // 0.5초 후에 애니메이션 클래스 제거
    setTimeout(() => {
      setIsBouncing(false);
    }, 500);
  }
};

const HomeDK = () => {
  // 각 페이지 컴포넌트를 표시할지 여부를 관리
  const [pages, setPages] = useState({
    showActivity: false,
    showProfile: false,
  });

  // 버튼 클릭 시 페이지 추가
  const handlePin = (page) => {
    setPages((prevState) => ({
      ...prevState,
      [page]: true,
    }));
  };

  return (
    <DIV>
      <BUTTONS>
        {" "}
        <h1>Home Component</h1>
        {/* 버튼을 클릭하여 컴포넌트를 추가 */}
        <button onClick={() => handlePin("showActivity")}>Pin Activity</button>
        <button onClick={() => handlePin("showProfile")}>Pin Profile</button>
      </BUTTONS>

      <Wrapper>
        <BoederWrapper>
          <PostlistWrapper>
            <TimeLine />
          </PostlistWrapper>
        </BoederWrapper>
      </Wrapper>

      {/* 핀으로 추가된 컴포넌트들 */}
      {pages.showActivity && (
        <div className="pinned-activity" style={{ width: "600px" }}>
          <Activity />
        </div>
      )}
      {pages.showProfile && (
        <div className="pinned-profile" style={{ width: "600px" }}>
          <Profile />
        </div>
      )}
    </DIV>
  );
};

export default HomeDK;
