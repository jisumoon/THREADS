import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles.styles";
import { useMediaQuery } from "react-responsive";
import BorderItem from "../Components/Common/Border_de";
import { ShareIconNew } from "../Components/Common/Icon";
import Toggle from "./Common/Toggle";
import MentionModal from "./Common/MentionModal";
import HiddenWordModal from "./Common/HiddenWordModal";
import OnlineStatusModal from "./Common/OnlineStatusModal";
import AccountSettingModal from "./Common/AccountSettingModal";
import DeactivateModal from "./Common/DeactivateModal";

import {
  LockIcon,
  EyeCloseIcon,
  Thread100Icon,
  CloseIcon,
  NotHeartIcon,
  RightArrowIcon,
  CloseLockIcon,
  DeleteProfileIcon,
  EalthIcon,
  InfoDownIcon,
  PersonalInfoIcon,
  FamilyIcon,
  SecurityIcon,
  AccountStatusIcon,
  OnlineStatusIcon,
} from "../Components/Common/Icon";

// import { Line } from "../Components/Login/Insiteitem_de";

const SettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const SettingsInner = styled.div`
  width: 558.67px; // 수정!
  height: 100%;
  padding: 20px 0;
  background: ${(props) => props.theme.borderColor};
  margin-top: 30px;
  /* border: 1px solid rgb(213, 213, 213); */
  border: none;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 70px);
    margin: 0;
    border-radius: 0;
  }
`;
const AlertInner = styled.div`
  width: 558.67px; // 수정!
  height: 100%;
  padding: 20px 0;
  background: ${(props) => props.theme.borderColor};
  /* border: 1px solid rgb(213, 213, 213); */
  border: none;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 70px);
    margin: 0;
    border-radius: 0;
  }
`;

const SettingMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 169.77px;
  height: 48px;
  -webkit-tap-highlight-color: transparent;
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const SettingTitle = styled.div.attrs({ className: "common-style" })`
  font-size: 14px;
  width: 120px;
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
const SettingMove = styled.div`
  display: flex;
  margin: 20px auto;
  gap: 50px; /* 간격 조절 */
  border-bottom: 2px solid transparent; /* 기본 border-bottom 설정 */
  transition: border-color 0.3s ease-in-out; /* 자연스러운 transition 추가 */
  position: relative; /* 부모 요소의 위치 설정 */
`;

// 기타 개인정보 설정 묶음
const OtherSettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  gap: 20px;
`;
const OutherPrivacy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  gap: 30px;
`;
// 기타 개인정보 설정 텍스트
const OtherPivInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 8px 0px;
  padding: 0 24px;
`;
const OtherTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const OtherInfo = styled.span`
  font-size: 11px;
  font-weight: 400;
  width: 100%;
  color: #999;
  margin-top: 12px;

  line-height: calc(1.4em);
`;
// 개인정보보호
const PrivacySettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  margin: 8px auto;
  padding: 0 20px;
  gap: 20px;
`;
const PrivacyProfile = styled.div`
  width: 100%;
  height: 21px;
  text-align: start;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 24px;
`;
const PrivacyTitle = styled.span`
  font-size: 14px;
  margin-left: 14px;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

const PersonalInfoTitle = styled.span`
  font-size: 14px;
  margin-left: 4px;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

// 계정 설정
const AccountSettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  margin: 8px auto;
  /* padding: 0 24px; */
  gap: 20px;
  @media (max-width: 768px) {
    padding: 0;
  }
`;
const AccountContents = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  gap: 20px;
  @media (max-width: 768px) {
    width: 360px;
  }
`;
const AccountTitle = styled.span`
  font-size: 14px;
  margin-left: 14px;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

const HelpTitle = styled.span`
  font-size: 14px;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

// 아이콘 정렬

export const ContentAutoLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    padding-right: 28px;
  }
`;
const Icon = styled.div`
  height: 20px;
  text-align: end;
  /* padding: 0 10px; */
  svg {
    path {
      fill: ${(props) => props.theme.logoColor};
      /* stroke: ${(props) => props.theme.logoColor}; */
    }
  }
`;
// 테두리만 보더 주어야 하는 svg
const IconStroke = styled.div`
  height: 20px;
  text-align: end;
  /* padding: 0 10px; */
  svg {
    path {
      stroke: ${(props) => props.theme.logoColor};
    }
  }
`;
const Icon3 = styled.div`
  height: 20px;
  text-align: end;
  /* padding: 0 10px; */
  svg {
    path {
      stroke: ${(props) => props.theme.logoColor};
    }
  }
`;
const IconRadius = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px solid ${(props) => props.theme.logoColor};
  border-radius: 100%;
  svg {
    justify-content: center;
    path {
      /* fill: ${(props) => props.theme.logoColor}; */
      stroke: ${(props) => props.theme.logoColor};
    }
  }
`;

// 줄
export const Line = styled.hr`
  width: 98%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 16px 0;
  border: none;
  height: 1px;
  background-color: #bababa;
`;

const ActiveBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: 2px;
  background-color: ${(props) => props.theme.activeBorder};
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
`;

// 추가 레이아웃 설정
const PrivacyAutoLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const SelectedText = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.modalfont};
`;

export const SelectLayout = styled.div`
  display: flex;
  gap: 14px;
`;

const SelectDirection = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) =>
    isMobile ? "column" : "row"}; /* 'none'에서 'row'로 변경 */
  gap: ${({ isMobile }) => (isMobile ? "6px" : "6px")};
`;

// 아이콘 눌렀을 때 링크로 이동
export const IconLink = styled.a`
  height: 20px;
  text-align: end;
  /* padding-right: 10px; */
`;

const SettingsItem_de = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [activeTab, setActiveTab] = useState("privacy");
  const [borderPosition, setBorderPosition] = useState({ left: 0, width: 0 });

  // 각 탭 클릭 시 호출되는 함수
  const handleTabClick = (tab, index) => {
    setActiveTab(tab);
    const titleElement = document.getElementById(`setting-title-${index}`);
    if (titleElement) {
      const { offsetLeft, offsetWidth } = titleElement;
      setBorderPosition({ left: offsetLeft, width: offsetWidth }); // border 위치 및 너비 업데이트
    }
  };
  // 언급 모달 (MentionModal)
  // 언급 모달 상태
  const [isMentionModalOpen, setMentionModalOpen] = useState(false);
  const openMentionModal = () => {
    setMentionModalOpen(true);
    setHiddenWordModalOpen(false);
  };
  const [selectedOption, setSelectedOption] = useState("모든 사람"); // selectedOption 상태 추가

  // 숨겨진 단어 모달 상태
  const [isHiddenWordModalOpen, setHiddenWordModalOpen] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState("가려진 섹션 설정");
  const [selectedOption2, setSelectedOption2] = useState("맞춤 단어 설정");
  const [isOption1Selected, setIsOption1Selected] = useState(false);
  const [isOption2Selected, setIsOption2Selected] = useState(false);

  const openHiddenWordModal = () => {
    setHiddenWordModalOpen(true);
    // 모달 열 때 선택 상태 초기화
    setIsOption1Selected(false);
    setIsOption2Selected(false);
  };

  const closeHiddenWordModal = () => {
    if (isOption1Selected && isOption2Selected) {
      setHiddenWordModalOpen(false);
    }
  };

  const handleSelectOption = (option) => {
    // 선택된 옵션에 따라 상태 업데이트
    if (option === "가려진 섹션 설정" || option === "가려진 섹션 해제") {
      setSelectedOption1(option);
      setIsOption1Selected(true); // 첫 번째 옵션 선택됨
    } else {
      setSelectedOption2(option);
      setIsOption2Selected(true); // 두 번째 옵션 선택됨
    }

    // 두 옵션이 모두 선택된 경우 모달 닫기
    closeHiddenWordModal(); // 선택 후 항상 닫기 함수 호출
  };

  const closeModals = () => {
    setMentionModalOpen(false);
    setHiddenWordModalOpen(false); // 숨겨진 단어 모달도 닫기
  };

  // 온라인 상태 모달
  const [isOnlineStatusModalOpen, setOnlineStatusModalOpen] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState("모든 사람");

  const openOnlineStatusModal = () => {
    setOnlineStatusModalOpen(true);
  };

  const closeOnlineStatusModal = () => {
    setOnlineStatusModalOpen(false);
  };

  const handleSelectOption3 = (option) => {
    setSelectedOption3(option);
  };

  // 웹사이트 권한 모달
  const [isAccountSettingModalOpen, setAccountSettingModalOpen] =
    useState(false);

  const openAccountSettingModal = () => {
    setAccountSettingModalOpen(true);
  };

  const closeAccountSettingModal = () => {
    setAccountSettingModalOpen(false);
  };

  // 프로필 비활성화 모달
  const [isDeactivateModalOpen, setDeactivateModalOpen] = useState(false);

  const openDeactivateModal = () => {
    setDeactivateModalOpen(true);
  };

  const closeDeactivateModal = () => {
    setDeactivateModalOpen(false);
  };

  // 모달 끝
  useEffect(() => {
    // 초기 상태에 대한 border 위치 설정
    const titleElement = document.getElementById("setting-title-0");
    if (titleElement) {
      const { offsetLeft, offsetWidth } = titleElement;
      setBorderPosition({ left: offsetLeft, width: offsetWidth });
    }
  }, []);
  const [isDarkMode, setIsDarkMode] = useState(false); // 기본값은 라이트 모드
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)", // 닫는 괄호 추가
  });
  return (
    <SettingWrapper>
      <Wrapper>
        <SettingsInner>
          <SettingMenu>
            <SettingMove>
              <SettingTitle
                id="setting-title-0"
                onClick={() => handleTabClick("privacy", 0)}
              >
                개인정보보호
              </SettingTitle>
              <SettingTitle
                id="setting-title-1"
                onClick={() => handleTabClick("account", 1)}
              >
                계정
              </SettingTitle>
              <SettingTitle
                id="setting-title-2"
                onClick={() => handleTabClick("help", 2)}
                gi
              >
                도움말
              </SettingTitle>
              <ActiveBorder
                left={borderPosition.left}
                width={borderPosition.width}
              />
            </SettingMove>
          </SettingMenu>

          {/* 현재 활성화된 탭에 따라 다른 내용을 렌더링 */}
          {activeTab === "privacy" && (
            <PrivacySettings isSmallScreen={isSmallScreen}>
              <PrivacyProfile>
                <Icon>
                  <LockIcon width={"18px"} />
                </Icon>
                <PrivacyAutoLayout>
                  <PrivacyTitle>비공개 프로필</PrivacyTitle>
                  {/* 토글 추가 */}
                  <Toggle />
                </PrivacyAutoLayout>
              </PrivacyProfile>
              <PrivacyProfile>
                <Icon>
                  <Thread100Icon width={"20px"} fill={"black"} />
                </Icon>
                <PrivacyAutoLayout>
                  <PrivacyTitle>언급</PrivacyTitle>
                  <SelectLayout>
                    <SelectedText>{selectedOption}</SelectedText>
                    <IconStroke onClick={openMentionModal}>
                      <RightArrowIcon fill={"gray"} width={"12px"} />
                    </IconStroke>
                  </SelectLayout>
                </PrivacyAutoLayout>
              </PrivacyProfile>
              <PrivacyProfile>
                <Icon>
                  <OnlineStatusIcon width={"20px"} fill={"black"} />
                </Icon>
                <PrivacyAutoLayout>
                  <PrivacyTitle>온라인 상태</PrivacyTitle>
                  <SelectLayout>
                    <SelectedText>{selectedOption3}</SelectedText>
                    <IconStroke onClick={openOnlineStatusModal}>
                      <RightArrowIcon fill={"gray"} width={"12px"} />
                    </IconStroke>
                  </SelectLayout>
                </PrivacyAutoLayout>
              </PrivacyProfile>
              <PrivacyProfile>
                <Icon>
                  <EyeCloseIcon width={"24px"} />
                </Icon>
                <PrivacyAutoLayout>
                  <PrivacyTitle>숨겨진 단어</PrivacyTitle>
                  <SelectLayout>
                    <SelectDirection isMobile={isMobile}>
                      <SelectedText>{selectedOption1}</SelectedText>
                      <SelectedText>{selectedOption2}</SelectedText>
                    </SelectDirection>
                    <IconStroke onClick={openHiddenWordModal}>
                      <RightArrowIcon fill={"gray"} width={"12px"} />
                    </IconStroke>
                  </SelectLayout>
                </PrivacyAutoLayout>
              </PrivacyProfile>
              <Line />
              {/* 기타 개인정보 설정  */}
              <OtherSettings>
                <OtherPivInfo>
                  <OtherTitle>기타 개인정보 설정</OtherTitle>
                  <OtherInfo>
                    제한과 같은 일부 설정은 Threads 및 Instagram 모두에 적용되며
                    Instagram에서 관리할 수 있습니다.
                  </OtherInfo>
                </OtherPivInfo>
                <PrivacyProfile>
                  <Icon>
                    <IconRadius>
                      <CloseIcon width={"10px"} fill={"black"} />
                    </IconRadius>
                  </Icon>
                  <ContentAutoLayout>
                    <PrivacyTitle>차단된 프로필</PrivacyTitle>
                    <IconLink
                      href="https://www.instagram.com/accounts/blocked_accounts/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"18px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <IconStroke>
                    <NotHeartIcon width={"20px"} fill={"black"} />
                  </IconStroke>
                  <ContentAutoLayout>
                    <PrivacyTitle>좋아요 수 및 공유 수 숨기기</PrivacyTitle>
                    <IconLink
                      href="https://www.instagram.com/accounts/like_count/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"18px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
              </OtherSettings>
            </PrivacySettings>
          )}

          {activeTab === "account" && (
            <OutherPrivacy isSmallScreen={isSmallScreen}>
              {/* 계정 탭의 내용 */}
              <AccountSettings>
                <AccountContents>
                  <PrivacyProfile>
                    <IconStroke>
                      <CloseLockIcon width={"20px"} fill={"black"} />
                    </IconStroke>
                    <ContentAutoLayout>
                      <AccountTitle>웹 사이트 권한</AccountTitle>
                      <IconStroke
                        onClick={() => setAccountSettingModalOpen(true)}
                      >
                        <RightArrowIcon fill={"gray"} width={"12px"} />
                      </IconStroke>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <Icon>
                      <DeleteProfileIcon width={"22px"} fill={"black"} />
                    </Icon>
                    <ContentAutoLayout>
                      <AccountTitle>프로필 비활성화 또는 삭제</AccountTitle>
                      <IconStroke onClick={() => setDeactivateModalOpen(true)}>
                        <RightArrowIcon fill={"gray"} width={"12px"} />
                      </IconStroke>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <IconRadius>
                      <EalthIcon width={"22px"} />
                    </IconRadius>
                    <ContentAutoLayout>
                      <AccountTitle>페비더스 공유</AccountTitle>
                      <IconStroke>
                        <RightArrowIcon fill={"gray"} width={"12px"} />
                      </IconStroke>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                </AccountContents>
                <Line />
                <OtherSettings>
                  <OtherPivInfo>
                    <OtherTitle>기타 계정 설정</OtherTitle>
                    <OtherInfo>
                      사용자 이름과 비밀번호 같은 일부 설정은 Threads 및
                      Instagram 모두에 적용되며 Instagram에서 관리할 수
                      있습니다.
                    </OtherInfo>
                  </OtherPivInfo>
                  <PrivacyProfile>
                    <Icon>
                      <IconLink>
                        <PersonalInfoIcon
                          width={"30px"}
                          height={"30px"}
                          fill={"black"}
                        />
                      </IconLink>
                    </Icon>
                    <ContentAutoLayout>
                      <PersonalInfoTitle>개인정보</PersonalInfoTitle>
                      <IconLink
                        href="https://accountscenter.instagram.com/personal_info/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <Icon>
                      <FamilyIcon style={{ width: "20px", height: "20px" }} />
                    </Icon>
                    <ContentAutoLayout>
                      <PrivacyTitle>관리 감독</PrivacyTitle>
                      <IconLink
                        href="https://familycenter.instagram.com/accounts/17841452333493991/?entrypoint=supervision_web&fc_session_id=b427b3a2-c47f-4a18-9bc0-27d6d0a83683&account_type=INSTAGRAM&is_home_e"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <Icon>
                      <SecurityIcon style={{ width: "20px", height: "20px" }} />
                    </Icon>
                    <ContentAutoLayout>
                      <PrivacyTitle>보안</PrivacyTitle>
                      <IconLink
                        href="https://accountscenter.instagram.com/password_and_security/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <Icon>
                      <AccountStatusIcon width={"22px"} fill={"black"} />
                    </Icon>
                    <ContentAutoLayout>
                      <PrivacyTitle>계정 상태</PrivacyTitle>
                      <IconLink
                        href="https://accountscenter.instagram.com/password_and_security/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <Icon>
                      <InfoDownIcon width={"20px"} fill={"black"} />
                    </Icon>
                    <ContentAutoLayout>
                      <PrivacyTitle>내 정보 다운로드</PrivacyTitle>
                      <IconLink
                        href="https://accountscenter.instagram.com/info_and_permissions/dyi/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <IconStroke>
                      <NotHeartIcon width={"20px"} fill={"black"} />
                    </IconStroke>
                    <ContentAutoLayout>
                      <PrivacyTitle>내 정보 전송</PrivacyTitle>
                      <IconLink
                        href="https://accountscenter.instagram.com/info_and_permissions/tyi/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                </OtherSettings>
              </AccountSettings>
            </OutherPrivacy>
          )}

          {activeTab === "help" && (
            <OutherPrivacy>
              {/* 도움말 탭의 내용 */}
              <AccountSettings>
                <AccountContents>
                  <PrivacyProfile>
                    <ContentAutoLayout>
                      <HelpTitle>개인정보 보호 및 보안 도움말</HelpTitle>
                      <IconStroke>
                        <RightArrowIcon fill={"gray"} width={"12px"} />
                      </IconStroke>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <ContentAutoLayout>
                      <HelpTitle>지원 요청</HelpTitle>
                      <IconStroke>
                        <RightArrowIcon fill={"gray"} width={"12px"} />
                      </IconStroke>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                </AccountContents>
                <Line />
                <OtherSettings>
                  <PrivacyProfile>
                    <ContentAutoLayout>
                      <HelpTitle>고객센터</HelpTitle>
                      <IconLink
                        href="https://help.instagram.com/179980294969821/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <ContentAutoLayout>
                      <HelpTitle>Meta 개인정보처리방침</HelpTitle>
                      <IconLink
                        href="https://www.facebook.com/privacy/policy/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <ContentAutoLayout>
                      <HelpTitle>Meta 이용약관</HelpTitle>
                      <IconLink
                        href="https://help.instagram.com/581066165581870"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <ContentAutoLayout>
                      <HelpTitle>Threads 추가 개인정보처리방침</HelpTitle>
                      <IconLink
                        href="https://help.instagram.com/515230437301944"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <ContentAutoLayout>
                      <HelpTitle>Threads 이용 약관</HelpTitle>
                      <IconLink
                        href="https://help.instagram.com/769983657850450"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <ContentAutoLayout>
                      <HelpTitle>쿠키 정책</HelpTitle>
                      <IconLink
                        href="https://privacycenter.instagram.com/policies/cookies/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                  <PrivacyProfile>
                    <ContentAutoLayout>
                      <HelpTitle>페디버스 가이드</HelpTitle>
                      <IconLink
                        href="https://www.facebook.com/privacy/guide/fediverse/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShareIconNew
                          width={"18px"}
                          stroke="#999"
                          strokeWidth="2"
                        />
                      </IconLink>
                    </ContentAutoLayout>
                  </PrivacyProfile>
                </OtherSettings>
              </AccountSettings>
            </OutherPrivacy>
          )}
        </SettingsInner>
        {/* 모달은 PrivacyProfile 바깥에 위치 */}
        {isMentionModalOpen && (
          <MentionModal
            onClose={closeModals}
            onSelectOption={(option) => {
              setSelectedOption(option); // 선택된 옵션 값을 상태에 설정
              closeModals(); // 모달 닫기
            }}
          />
        )}
        {isHiddenWordModalOpen && (
          <HiddenWordModal
            onClose={closeHiddenWordModal} // 올바른 함수 전달
            onSelectOption={handleSelectOption}
            selectedOption1={selectedOption1}
            selectedOption2={selectedOption2}
          />
        )}
        {isOnlineStatusModalOpen && (
          <OnlineStatusModal
            onClose={closeOnlineStatusModal}
            selectedOption3={selectedOption3}
            onSelectOption3={handleSelectOption3}
          />
        )}
        {isAccountSettingModalOpen && (
          <AccountSettingModal
            onClose={() => setAccountSettingModalOpen(false)}
          />
        )}
        {isDeactivateModalOpen && (
          <DeactivateModal onClose={() => setDeactivateModalOpen(false)} />
        )}
      </Wrapper>
      <Wrapper>
        <AlertInner>
          해당 페이지는 기능없이 UI만 작업 되어 있는 페이지입니다.
        </AlertInner>
      </Wrapper>
    </SettingWrapper>
  );
};

export default SettingsItem_de;
