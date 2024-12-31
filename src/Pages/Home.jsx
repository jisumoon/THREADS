import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import TimeLine from "../Components/post/TimeLine";
import EtcModal from "../Components/post/EtcModal";
import { AddPageContext } from "../Contexts/AddPageContext"; // AddPageContext 가져오기
import { auth } from "../firebase";

// 모든 페이지들
import Activity from "./Activity";
import Profile from "./Profile";

const DIV = styled.div`
  display: flex;
  gap: 60px;
`;

const AddPages = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  @media (max-width: 1390px) {
  }
`;
const Wrapper = styled.div`
  /* width: 100%; */
  /* height: calc(100vh - 120px); */
  height: 100vh;
  /* margin-top: 120px; */
  /* overflow: hidden; */
  /* z-index: -1; */
  @media (max-width: 768px) {
    height: 100vh;
    width: 100%;
  }
`;

const BoederWrapper = styled.div`
  bottom: 0;
  width: 680px;

  height: 100%;
  padding: 10px;
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};
  /* overflow: hidden; */
  @media (max-width: 768px) {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 0;
    left: 0px;
    border-radius: 0;
    height: calc(100% - 70px);
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const PostlistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  border-radius: 30px 30px 0 0;
  overflow-y: scroll;
  padding-bottom: 110px;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  transition: transform 0.3s ease-out;

  &.bounce {
    animation: bounce-back 0.5s ease-in-out;
  }

  @keyframes bounce-back {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    margin-top: 6px;
    border-radius: 0;
  }
`;

const Home = () => {
  const wrapperRef = useRef(null); // DOM 요소 접근을 위한 useRef
  const [isBouncing, setIsBouncing] = useState(false); // 바운스 상태 관리
  const { addPages } = useContext(AddPageContext); // AddPageContext에서 addPages 가져오기
  const handleScroll = () => {
    const element = wrapperRef.current;

    // 스크롤이 맨 위에 도달했는지 확인
    if (element.scrollTop === 0) {
      setIsBouncing(true);

      // 0.5초 후에 애니메이션 클래스 제거
      setTimeout(() => {
        setIsBouncing(false);
      }, 500);
    }
  };

  useEffect(() => {
    const element = wrapperRef.current;
    if (element) {
      // 스크롤 이벤트 리스너 추가
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <DIV>
      <Wrapper>
        <BoederWrapper>
          <PostlistWrapper
            ref={wrapperRef}
            className={isBouncing ? "bounce" : ""}
          >
            <TimeLine />
          </PostlistWrapper>
        </BoederWrapper>
      </Wrapper>

      {addPages.map((page, index) => (
        <div key={index}>
          {page === "Profile" && <Profile />}
          {page === "Activity" && <Activity />}
        </div>
      ))}
    </DIV>
  );
};

export default Home;
