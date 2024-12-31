import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NotificationItem from "../Components/Activity/NotificationItem";
import NotificationList from "../Components/Activity/Notificationlist";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  background: ${(props) => props.theme.borderColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 680px;
  /* position: fixed; */
  bottom: 0;
  /* left: 50%; */
  /* transform: translate(-50%); */
  /* margin: 0; */
  height: calc(100vh - 120px);
  /* height: 85%; */
  border-radius: 40px 40px 0px 0px;
  /* overflow: hidden; */
  @media (max-width: 768px) {
    width: 100%;
    /* bottom: 0; */
    border-radius: 0;
    /* height: 100vh; */
    /* height: calc(100% - 70px); */
    height: calc(100% - 70px);

    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const MenuTitle = styled.p`
  font-weight: 800;
  font-size: 20px;

  color: ${(props) => props.theme.fontcolor};
  padding-top: 40px;
  padding-bottom: 20px;
  text-align: center;
  transition: all 0.3s;
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

const ButtonGroup = styled(motion.div)`
  padding-left: 20px;
  display: flex;
  width: 100%;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  @media (max-width: 480px) {
  }
`;

const SelectButton = styled(motion.button)`
  display: flex;
  flex: 0 0 auto;
  width: 110px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 20px;
  background: ${(props) =>
    props.selected ? props.theme.buttonText : props.theme.buttonbackground};
  color: ${(props) =>
    props.selected ? props.theme.borderColor : props.theme.buttonText};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;

  @media (max-width: 768px) {
    margin-top: 40px;
    display: block;
    width: 100px;
    padding: 10px 0;
  }

  @media (max-width: 480px) {
    margin-top: 40px;
    display: block;
    width: 90px;
    padding: 10px 0;
  }
`;

const ButtonGroupPC = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 40px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 480px) {
  }
`;

const SelectButtonPC = styled.button`
  background: transparent;
  flex: 0 0 auto;
  width: 106px;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  color: ${(props) =>
    props.selected ? props.theme.selectedbtn : props.theme.notSelectbtn};
  border-bottom: ${(props) =>
    props.selected ? `1px solid ${props.theme.selectedbtn}` : "none"};
  cursor: pointer;
  transition: all 0.3s;
`;

const Btnborder = styled.div`
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ContentsBorder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  height: 100%;

  overflow-y: auto;
  padding: 0 40px;
  padding-bottom: 20px;
  margin-top: 20px;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    padding: 0 20px;
    width: 100%;
    max-height: 100%;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
    width: 100%;
    max-height: 100%;
  }
`;

const NoResults = styled.p`
  font-size: 16px;
  text-align: center;
  color: #999;
  margin-top: 20px;
`;

const Activity = () => {
  const [savedData, setSavedData] = useState([]); // 모든 데이터를 저장
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 저장
  const [contentType, setContentType] = useState("all"); // 선택된 필터 상태
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // NotificationList에서 데이터를 받아옴
  const handleDataUpdate = (listData) => {
    if (listData.length > 0) {
      setSavedData(listData); // 전체 데이터를 저장
      setFilteredData(listData); // 필터링 없이 모든 데이터를 먼저 보여줌
    }
  };

  // 알림 읽음 표시
  const markAsRead = (id) => {
    setSavedData((prevData) => {
      const updatedData = prevData.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      );

      const updatedFilteredData = updatedData.filter(
        (item) => contentType === "all" || item.type === contentType
      );

      setFilteredData(updatedFilteredData);

      return updatedData;
    });
  };

  // 알림 삭제 함수
  const handleDelete = (id) => {
    setSavedData((prevData) =>
      prevData.filter((notification) => notification.id !== id)
    );
    setFilteredData((prevData) =>
      prevData.filter((notification) => notification.id !== id)
    );
  };

  // 필터링
  const filterList = (type) => {
    if (type === "all") {
      setFilteredData(savedData); // 전체 데이터 보여줌
    } else {
      const filtered = savedData.filter((item) => item.type === type); // 타입에 따른 필터링

      setFilteredData(filtered);
    }
  };

  // 필터 버튼
  const handleButtonClick = (type) => {
    setContentType(type);
  };

  useEffect(() => {
    filterList(contentType); // savadata에서 filter된 데이터(내가 선택한 데이터)
  }, [contentType]);

  // 미디어 사이즈 변화
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const buttons = [
    { label: "모두", type: "all" },
    { label: "좋아요", type: "like" },
    { label: "답글", type: "comment" },
    { label: "친한친구", type: "friend" },
  ];

  const { currentUser } = useAuth(); // 현재 사용자 상태를 가져옴
  const navigate = useNavigate();

  // 로그인 확인 및 리다이렉트
  useEffect(() => {
    if (!currentUser) {
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
        navigate("/login"); // 로그인 페이지로 이동
      } else {
        navigate("/"); // 메인 페이지로 이동
      }
    }
  }, [currentUser, navigate]);

  return (
    <Wrapper>
      <BoederWrapper>
        <MenuTitle>활동</MenuTitle>
        {isMobile ? (
          <ButtonGroup
            className="mobile-buttons"
            whileTap="click"
            drag="x"
            dragMomentum={false}
            dragConstraints={{ left: -26, right: 0 }}
          >
            {buttons.map((button) => (
              <SelectButton
                key={button.type}
                selected={contentType === button.type}
                onClick={() => handleButtonClick(button.type)}
              >
                {button.label}
              </SelectButton>
            ))}
          </ButtonGroup>
        ) : (
          <Btnborder>
            <ButtonGroupPC className="desktop-buttons">
              {buttons.map((button) => (
                <SelectButtonPC
                  key={button.type}
                  selected={contentType === button.type}
                  onClick={() => handleButtonClick(button.type)}
                >
                  {button.label}
                </SelectButtonPC>
              ))}
            </ButtonGroupPC>
          </Btnborder>
        )}
        <ContentsBorder>
          {filteredData.length > 0 ? (
            filteredData.map((notification) => (
              <NotificationItem
                key={notification.id}
                {...notification}
                onClick={() => markAsRead(notification.id)}
                onDelete={() => handleDelete(notification.id)}
              />
            ))
          ) : (
            <NoResults>알림 내역이 없습니다.</NoResults>
          )}

          {savedData.length === 0 && (
            <NotificationList onUpdate={handleDataUpdate} />
          )}
        </ContentsBorder>
      </BoederWrapper>
    </Wrapper>
  );
};

export default Activity;
