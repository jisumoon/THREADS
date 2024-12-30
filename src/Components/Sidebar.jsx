import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { ThemeContext } from "../Contexts/ThemeContext";
import { auth } from "../firebase";
import { useAuth } from "../Contexts/AuthContext";
import ReportModal from "./Login/ReportModal";
import { AddPageContext } from "../Contexts/AddPageContext";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import {
  ArrowIcon,
  EtcIcon,
  FixIcon,
  ThemeLightIcon,
  ThemeDarkIcon,
} from "./Common/Icon";
import { motion } from "framer-motion";

const Aside = styled.aside`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    display: none; // 768px 이상의 화면에서는 숨기기
  }
`;

const SetBtn = styled.button`
  width: 60px;
  height: 60px;
  box-shadow: ${(props) => props.theme.bordershadow};
  border: 2px solid ${(props) => props.theme.borderstroke};
  /* border-color: ${(props) => props.theme.borderstroke};
  border-style: none;
  border-width: 1px; */
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => props.theme.bodyBg};
  color: ${(props) => props.theme.fontcolor};
  font-size: 0.6rem;
`;

const PinBtn = styled.button`
  width: 60px;
  height: 60px;
  box-shadow: ${(props) => props.theme.bordershadow};
  border: 2px solid ${(props) => props.theme.borderstroke};
  /* border-color: ${(props) => props.theme.borderstroke};
  border-style: none; */
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => props.theme.bodyBg};
  color: ${(props) => props.theme.fontcolor};
  font-size: 0.6rem;
`;

// 왼쪽에서 오른쪽으로 슬라이드 인
const slideInFromLeft = keyframes`
  from {
    transform: translateX(-15%);
    opacity: 0.7;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// 오른쪽에서 왼쪽으로 슬라이드 인
const slideInFromRight = keyframes`
  from {
    transform: translateX(-5%);
    opacity: 0.7;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// shouldForwardProp으로 isThemeModal 필터링
// shouldForwardProp으로 isThemeModal과 isBackClick을 필터링하여 DOM 전달 방지
const ModalContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    prop !== "isThemeModal" && prop !== "isBackClick",
})`
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 10px;
  width: 258px;
  /* height: ${(props) => (props.isThemeModal ? "220px" : "")}; */
  /* height: 100%; */
  /* height: 298px; */
  background-color: ${(props) => props.theme.borderColor};
  color: ${({ theme }) => theme.fontcolor};
  box-shadow: ${(props) => props.theme.bordershadow};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* text-align: left; */
  z-index: 100;
  animation: ${(props) =>
      props.isThemeModal && !props.isBackClick
        ? slideInFromRight
        : slideInFromLeft}
    0.2s ease forwards;
`;

const Ul = styled.ul`
  width: 100%;
  /* height: calc(57 * Li); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Li = styled.li`
  width: 218px;
  height: 57px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 16px;
  transition: background 0.4s;
  &:hover {
    background-color: ${({ theme }) => theme.mouseHoverBg};
    color: ${({ theme }) => theme.mouseHoverFontcolor};
    font-weight: 700;
  }
`;

// const Icon = styled.i`
//   display: inline-block;
//   width: 6px;
//   height: 11px;
//   border: 1px solid skyblue;
// `;

const ArrowIconWrapper = styled.div`
  transform: rotate(-180deg);
  margin-bottom: 5px;
`;

// // ThemeToggleButton에서 isDarkMode 필터링
// const ThemeToggleButton = styled.button.withConfig({
//   shouldForwardProp: (prop) => prop !== "isDarkMode", // isDarkMode를 DOM에 전달하지 않음
// })`
//   width: 100px;
//   height: 40px;
//   border-radius: 20px;
//   background-color: ${(props) => (props.isDarkMode ? "#333" : "#fff")};
//   color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
//   border: 1px solid #ccc;
//   cursor: pointer;
// `;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.fontcolor};
  text-align: left;
  cursor: pointer;
  padding-top: 10px;
  margin-bottom: 30px;
`;
const ThemeToggleBtnWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  background-color: ${(props) => props.theme.themeIconBackground};
  justify-content: space-between;
  border-radius: 12px;
  align-items: center;
  cursor: pointer;
  svg {
    z-index: 2;
  }
`;

const ThemeToggleBtnBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 40px;
  border-radius: 12px;
  /* background: skyblue; */
  cursor: pointer;
  position: relative;
`;

const ToggleBackground = styled(motion.div)`
  width: 100%;
  height: 100%;

  /* border: 2px solid ${(props) => props.theme.themeIconBorder};

  background-color: ${(props) => props.theme.mouseHoverBg};
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.bordershadow}; */

  border: 2px solid ${(props) => props.theme.themeIconBackground};

  background-color: ${(props) => props.theme.mouseHoverBg};
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.bordershadow};
  position: absolute;
  z-index: 1;
`;

const Sidebar = () => {
  const { toggleTheme } = useContext(ThemeContext);
  // theme motion
  const [clicked, setClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBackClick, setIsBackClick] = useState(false); // 뒤로 가기 애니메이션 상태
  const modalRef = useRef(null);
  const { currentUser } = useAuth(); // 현재 로그인된 사용자 정보 가져오기
  const [isPinModalOpen, setIsPinModalOpen] = useState(false); // Pin 버튼 클릭 시 모달 상태 관리

  const { addPage } = useContext(AddPageContext); // addPage 함수 가져오기

  // modal showing
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);

  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기
  const isHomePage = location.pathname === "/";
  const openModal = () => {
    setIsOpen(true);
    setIsThemeModalOpen(false);
    setIsBackClick(false); // 모달이 열릴 때는 기본 상태로 초기화
  };

  // PinBtn 클릭 시 모달 열기
  const openPinModal = () => {
    setIsPinModalOpen(true);
  };
  // 모달 닫기

  // 페이지 로드 시 로컬 스토리지에서 테마 상태를 불러와 clicked 상태와 동기화
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("isDarkMode"); // 로컬 스토리지에서 테마 값 가져오기
    if (savedDarkMode !== null) {
      setClicked(JSON.parse(savedDarkMode)); // 로컬 스토리지 값을 클릭 상태로 동기화
    }
  }, []);

  // 테마 변경과 클릭 상태를 처리
  const handleThemeToggle = async () => {
    await toggleTheme(); // 테마 변경
    setClicked((prev) => !prev); // 클릭 상태 변경
    localStorage.setItem("isDarkMode", JSON.stringify(!clicked)); // 로컬 스토리지에 테마 상태 저장
  };

  // 모달 닫기
  const closeModal = () => {
    setIsOpen(false);
    setIsThemeModalOpen(false);
  };

  const closePinModal = () => {
    setIsPinModalOpen(false);
  };

  const handleBackClick = () => {
    setIsBackClick(true); // 뒤로 가기 슬라이드 인 적용
    setTimeout(() => {
      setIsThemeModalOpen(false); // 테마 모달 닫고 기본 모달로 복귀
    }, 0); // 즉시 테마 모달 닫기
  };

  const handleThemeModalOpen = () => {
    setIsBackClick(false); // 테마 모달로 가는 슬라이드 인 설정
    setIsThemeModalOpen(true); // 테마 모달 열기
  };

  const onLogOut = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");

    if (ok) {
      await auth.signOut();
      // navigate("/login");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
        closePinModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  // 로그인 상태에 따라 ModalLists를 다르게 설정
  const ModalLists = currentUser
    ? ["디자인", "인사이트", "설정", "문제신고", "로그아웃"]
    : ["디자인", , "문제신고", "로그인"];

  const PinModalLists = ["Profile", "Activity", "Settings"];

  return (
    <>
      <Aside>
        <BtnWrapper>
          {/* {isHomePage && ( // 홈 페이지에서만 PinBtn 렌더링
            <PinBtn onClick={openPinModal}>
              <FixIcon fill={"#bababa"} />
            </PinBtn>
          )} */}
          <SetBtn onClick={openModal}>
            <EtcIcon fill={"#bababa"} />
          </SetBtn>
        </BtnWrapper>
        {isOpen && !isThemeModalOpen && (
          <ModalContainer ref={modalRef} isThemeModal={false}>
            {/* <Ul>
            {ModalLists.map((ModalList, index) => (
              <Li
                key={index}
                onClick={() => {
                  if (index === 0) {
                    handleThemeModalOpen(); // 첫 번째 메뉴 클릭 시 테마 모달로 전환
                  } else if (index === 4) {
                    onLogOut();
                    closeModal();
                  } else {
                    closeModal();
                  }
                }}
              >
                {ModalList}
                {index === 0 && <Icon />}
              </Li>
            ))}
          </Ul> */}
            <Ul>
              {ModalLists.map((ModalList, index) => (
                <Li
                  key={index}
                  onClick={() => {
                    if (index === 0) {
                      handleThemeModalOpen(); // 첫 번째 메뉴 클릭 시 테마 모달로 전환
                    } else if (ModalList === "로그아웃" && currentUser) {
                      onLogOut();
                      closeModal();
                    } else if (ModalList === "로그인" && !currentUser) {
                      // 로그인 페이지로 이동 로직 추가
                      navigate("/login");
                      closeModal();
                    } else if (ModalList === "인사이트") {
                      navigate("/insites");
                      closeModal();
                    } else if (ModalList === "문제신고") {
                      toggleShowing();
                    } else if (ModalList === "설정") {
                      navigate("/settings");
                      closeModal();
                    } else {
                      closeModal();
                    }
                  }}
                >
                  {ModalList}
                  {index === 0 && (
                    <ArrowIconWrapper>
                      <ArrowIcon width={"8px"} fill={"#bababa"} />
                    </ArrowIconWrapper>
                  )}{" "}
                  {/* 로그인된 경우 첫 번째 항목에 아이콘 표시 */}
                </Li>
              ))}
            </Ul>
          </ModalContainer>
        )}

        {isPinModalOpen && (
          <ModalContainer ref={modalRef}>
            <Ul>
              {PinModalLists.map((modalList, index) => (
                <Li
                  key={index}
                  onClick={() => {
                    if (modalList === "Profile") {
                      addPage(modalList); // 선택된 페이지를 전역 상태로 설정
                      closePinModal();
                    } else if (modalList === "Activity") {
                      addPage(modalList); // 선택된 페이지를 전역 상태로 설정
                      closePinModal();
                    } else if (modalList === "Settings") {
                      addPage(modalList); // 선택된 페이지를 전역 상태로 설정
                      closePinModal();
                    } else {
                      closePinModal();
                    }
                  }}
                >
                  {modalList}
                </Li>
              ))}
            </Ul>
          </ModalContainer>
        )}
        {/* 테마 변경 모달 */}
        {isThemeModalOpen && (
          <ModalContainer
            ref={modalRef}
            isThemeModal={true}
            isBackClick={isBackClick} // 뒤로 가기 애니메이션 구분
          >
            <BackButton onClick={handleBackClick}>
              <ArrowIcon width={"8px"} fill={"#bababa"} />
              {"디자인"}
              <div></div>
            </BackButton>
            {/* <p>모드 변경</p> */}
            <ThemeToggleBtnWrapper
              isDarkMode={isDarkMode}
              onClick={handleThemeToggle}
            >
              <ThemeToggleBtnBox>
                {!clicked ? (
                  <ToggleBackground layoutId="ToggleBackground" style={{}} />
                ) : null}
                <ThemeLightIcon />
              </ThemeToggleBtnBox>
              <ThemeToggleBtnBox>
                {clicked ? (
                  <ToggleBackground layoutId="ToggleBackground" style={{}} />
                ) : null}
                <ThemeDarkIcon />
              </ThemeToggleBtnBox>
              {/* <ThemeToggleButton isDarkMode={isDarkMode} onClick={toggleTheme}>
              {isDarkMode ? "모드 변경" : "모드 변경"}
            </ThemeToggleButton> */}
            </ThemeToggleBtnWrapper>
          </ModalContainer>
        )}
      </Aside>
      <ReportModal
        width="100%"
        height="100vh"
        background="rgba(255, 255, 255, 0.9)"
        borderRadius="20px"
        isVisible={showing}
        setShowing={setShowing}
      />
    </>
  );
};

export default Sidebar;
