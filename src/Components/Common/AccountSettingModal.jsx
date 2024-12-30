import React, { useState } from "react";
import styled from "styled-components";
import { LeftArrowIcon } from "./Icon";

const Overlay = styled.div`
  position: fixed; // 모달을 화면에 고정
  top: ${({ isMobile }) => (isMobile ? "0" : "45%")}; // 세로 중앙 정렬 기준
  left: ${({ isMobile }) => (isMobile ? "0" : "50%")}; // 가로 중앙 정렬 기준
  transform: ${({ isMobile }) =>
    isMobile ? "0" : "translate(-50%, -50%)"}; // 요소의 중심을 기준으로 이동
  width: 100vw; // 전체 화면 너비
  height: ${({ isMobile }) => (isMobile ? `calc(100vh - 70px)` : "100vh")};
  display: flex; // 플렉스 박스 사용
  justify-content: center; // 수평 중앙 정렬
  align-items: center; // 수직 중앙 정렬
  z-index: ${({ isMobile }) =>
    isMobile ? "1000" : "0"}; // 다른 요소보다 위에 표시 (필요 시 조정)
  background-color: rgba(0, 0, 0, 0.7); // 반투명 배경 (필요 시 조정)
`;

export const ModalContainer = styled.div`
  width: 420px;
  height: 320px;
  background-color: ${(props) => props.theme.borderColor};
  border: 1px solid ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  padding: 24px;
`;

const PrivacyTitle = styled.span`
  font-size: 14px;
  margin-left: 14px;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

const ContentAutoLayout = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    padding-right: 28px;
  }
`;

const IconLink = styled.a`
  height: 20px;
  text-align: end;
  /* padding-right: 10px; */
`;

const HeadTitle = styled.h1`
  margin-bottom: 14px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: 600;
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "")};
`;

const TitleLayout = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 14px 0;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "")};
  font-weight: 500;
  margin-left: 80px;
  font-weight: 600;
`;

const SubTitle = styled.h3`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.modalfont};
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "14px")};
  font-weight: 500;
`;

const Info = styled.div`
  color: ${(props) => props.theme.modalfont};
  font-size: 12px;
  font-weight: 350;
  background: ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  line-height: 18px;
  padding: ${({ isMobile }) => (isMobile ? "4px" : "10px")};
`;

const SettingMove = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  gap: 50px; /* 간격 조절 */
  border-bottom: 2px solid transparent; /* 기본 border-bottom 설정 */
  transition: border-color 0.3s ease-in-out; /* 자연스러운 transition 추가 */
  position: relative; /* 부모 요소의 위치 설정 */
`;

const SectionButton = styled.div`
  font-size: 14px;
  width: 110px;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
  font-weight: 600;
  margin-bottom: 8px;
  cursor: pointer;
  position: relative; /* 자식 요소의 절대 위치 설정을 위한 relative */
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const ActiveBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: ${(props) => props.left}px;
  width: 120px;
  border-radius: 2px;
  height: 2px;
  background-color: ${(props) => props.theme.activeBorder};
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
`;
const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  box-sizing: border-box;
  border: none;
  cursor: pointer;

  color: gray; // 초기 색상 설정
  transition: color 0.3s ease; // 색상 전환 효과

  &:hover,
  &:active {
    color: #181818; // 호버 또는 클릭 시 색상 변경
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccountSettingModal = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState("활성");
  const [borderPosition, setBorderPosition] = useState({ left: 0, width: 0 });

  // 섹션 클릭 시 액티브 보더 업데이트
  const handleSectionClick = (section, left, width) => {
    setActiveSection(section);
    setBorderPosition({ left, width });
  };

  const renderContent = () => {
    switch (activeSection) {
      case "활성":
        return (
          <Layout>
            <Info>
              회원님이 Threads 프로필에 연결한 앱 또는 웹사이트입니다. 이들은
              회원님이 공유하도록 선택한 비공개 정보에 액세스할 수 있습니다.
            </Info>
            <SubTitle>승인된 활성 앱 또는 웹사이트가 없습니다.</SubTitle>
          </Layout>
        );
      case "만료됨":
        return (
          <Layout>
            <Info>
              회원님이 연결했지만 최근 90일 동안 사용하지 않은 앱과
              웹사이트입니다. 이 앱과 웹사이트는 회원님의 비공개 정보에 더 이상
              액세스할 수 없지만, 회원님이 해당 앱과 웹사이트를 사용했을 때
              공유했던 정보는 계속 보유할 가능성이 있습니다. '비공개' 정보란,
              회원님이 Threads 프로필로 로그인할 때 해당 앱에 공유하도록 선택한
              것을 의미합니다.
            </Info>
            <SubTitle>만료된 앱 또는 웹사이트가 없습니다.</SubTitle>
          </Layout>
        );
      case "삭제됨":
        return (
          <Layout>
            <Info>
              회원님의 Threads 프로필에 더 이상 연결되어 있지 않은 앱과
              웹사이트입니다. 이 앱과 웹사이트는 회원님의 비공개 정보에 더 이상
              액세스할 수 없지만, 회원님이 해당 앱과 웹사이트를 사용했을 때
              공유했던 정보는 계속 보유할 가능성이 있습니다. '비공개' 정보란,
              회원님이 Threads 프로필로 로그인할 때 해당 앱에 공유하도록 선택한
              것을 의미합니다. 앱에서 회원님의 정보를 삭제하려면 해당 앱에 직접
              문의하시기 바랍니다.
            </Info>
            <SubTitle>삭제된 앱 또는 웹사이트가 없습니다.</SubTitle>
          </Layout>
        );
      default:
        return null;
    }
  };

  return (
    <Overlay>
      <ModalContainer>
        <TitleLayout>
          <BackButton onClick={onClose}>
            <LeftArrowIcon size={32} />
          </BackButton>
          <Title>웹 사이트 권한 설정</Title>
        </TitleLayout>
        <div>
          <SettingMove>
            <SectionButton onClick={() => handleSectionClick("활성", 0, 120)}>
              활성
            </SectionButton>
            <SectionButton
              onClick={() => handleSectionClick("만료됨", 130, 120)}
            >
              만료됨
            </SectionButton>
            <SectionButton
              onClick={() => handleSectionClick("삭제됨", 260, 120)}
            >
              삭제됨
            </SectionButton>

            <ActiveBorder
              left={borderPosition.left}
              width={borderPosition.width}
            />
          </SettingMove>
        </div>
        {renderContent()}
      </ModalContainer>
    </Overlay>
  );
};

export default AccountSettingModal;
