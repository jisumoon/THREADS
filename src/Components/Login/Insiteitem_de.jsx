import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import BorderItem from "../Common/Border_de";
import { IconWrapper, InformationIcon, FollowerIcon } from "../Common/Icon";

const BorderWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.isSmallScreen ? "column" : props.isTablet ? "column" : "row"};
  align-items: flex-start;
  justify-content: center;
  width: ${(props) =>
    props.isSmallScreen ? "100vw" : props.isTablet ? "800px" : "1200px"};
  height: auto;
  padding: ${(props) =>
    props.isSmallScreen ? "0" : props.isTablet ? "0 30px" : "0px"};
  gap: ${(props) =>
    props.isSmallScreen ? "0" : props.isTablet ? "20px" : "40px"};
  box-sizing: border-box;
  overflow-x: hidden;
  height: 100vh;
`;

const InsitesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 100vh; */
  padding: ${(props) =>
    props.isSmallScreen ? "0px" : props.isTablet ? "0 20px" : "0px"};
  max-width: ${(props) =>
    props.isSmallScreen ? "100%" : props.isTablet ? "650px" : "auto"};
  min-height: ${(props) => (props.isSmallScreen ? "auto" : "300px")};
  gap: ${(props) => (props.isSmallScreen ? "0" : "10px")};
  margin: ${(props) =>
    props.isSmallScreen
      ? "0"
      : props.isTablet
      ? "20px 0"
      : "0"}; /* 박스 간 간격 제거 */
  background: ${(props) => props.theme.borderColor};
  border-radius: ${(props) => (props.isSmallScreen ? "0" : "20px")};
  box-sizing: border-box;
  transition: all 0.3s ease; /* 애니메이션 효과 추가 */
  padding: 20px;
  padding-bottom: ${(props) =>
    props.isSmallScreen ? "300px" : props.isTablet ? "500px" : "400px"};
`;

const InsitesTitle = styled.div`
  margin-top: ${(props) =>
    props.isSmallScreen ? "0" : props.isTablet ? "20px" : "10px"};
  font-size: ${(props) =>
    props.isSmallScreen ? "16px" : props.isTablet ? "16px" : "18px"};
  font-weight: 500;
  padding-top: ${(props) =>
    props.isSmallScreen ? "20px" : props.isTablet ? "10px" : "10px"};
`;
const FollowerTitle = styled.div`
  margin-top: ${(props) =>
    props.isSmallScreen ? "20px" : props.isTablet ? "20px" : "10px"};
  font-size: ${(props) =>
    props.isSmallScreen ? "16px" : props.isTablet ? "16px" : "18px"};
  font-weight: 500;
  padding-top: ${(props) =>
    props.isSmallScreen ? "4px" : props.isTablet ? "10px" : "10px"};
`;

const BorderItemTitle = styled.div`
  flex-grow: 1; /* 자식 요소가 유연하게 공간 채움 */
  width: 100%;
  /* max-width: ${(props) =>
    props.isSmallScreen ? "calc(100% - 40px)" : "480px"}; */
  height: auto; /* 고정된 높이 제거 */
  max-height: ${(props) => (props.isSmallScreen ? "100%" : "25px")};
  font-size: ${(props) =>
    props.isSmallScreen ? "14px" : props.isTablet ? "14px" : "18px"};
  padding: 0 20px;
  font-weight: bold;
  margin: 0 0 20px;
  color: ${(props) => props.theme.fontColor};
`;

const Info = styled.div`
  width: 100%; /* 부모 요소의 너비를 따름 */
  display: flex;
  flex-wrap: ${(props) =>
    props.isSmallScreen ? "none" : props.isTablet ? "none" : "wrap"};
  align-items: center;
  width: ${(props) =>
    props.isSmallScreen ? "100%" : props.isTablet ? "auto" : "auto"};
  display: flex;
  padding: ${(props) =>
    props.isSmallScreen ? "0" : props.isTablet ? "auto" : "0 20px"};
`;

const BorderItemInfo = styled.div`
  height: auto; /* 고정된 높이 대신 */
  width: ${(props) =>
    props.isSmallScreen
      ? "calc(100% - 10%)"
      : props.isTablet
      ? "calc(100% - 10%)"
      : "calc(100% - 10%)"};
  padding-left: 10px;
  max-height: 42px;
  color: #999;
  font-size: ${(props) =>
    props.isSmallScreen ? "12px" : props.isTablet ? "12px" : "14px"};
  font-weight: 300;
`;

const FollowerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) =>
    props.isSmallScreen ? "100%" : props.isTablet ? "100%" : "auto"};
  height: ${(props) => (props.isSmallScreen ? "100%" : "100%")};
  padding: ${(props) => (props.isSmallScreen ? "20px 0" : "0 ")};
  box-sizing: border-box; // 크기
  margin-bottom: ${(props) =>
    props.isSmallScreen ? "40px" : props.isTablet ? "0" : "0"};
`;

const TotalInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FollowerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-self: start;
  padding: 10px 30px;
  margin-bottom: ${(props) =>
    props.isSmallScreen ? "40px" : props.isTablet ? "0" : "0"};
`;

const InsiteInner2 = styled.div`
  background: #f5f5f5;
  padding: 12px 12px;
  border-radius: 8px;
  margin-top: 20px;
`;

const FollowerInfo = styled.div`
  width: ${(props) =>
    props.isSmallScreen ? "200px" : props.isTablet ? "100%" : "436px"};
  height: ${(props) =>
    props.isSmallScreen ? "200px" : props.isTablet ? "100%" : "317px"};
  margin: ${(props) =>
    props.isSmallScreen ? "0" : props.isTablet ? "0" : "16px 0"};
`;

const TotalNum = styled.div`
  font-size: ${(props) =>
    props.isSmallScreen ? "16px" : props.isTablet ? "20px" : "30px"};
  margin-bottom: ${(props) =>
    props.isSmallScreen ? "16px" : props.isTablet ? "16px" : "0"};
  font-weight: bold;
  margin-left: 8px;
`;

const TotalFollow = styled.div`
  color: #bababa;
  font-size: ${(props) =>
    props.isSmallScreen ? "0.8rem" : props.isTablet ? "1rem" : "1rem"};
  margin-top: ${(props) =>
    props.isSmallScreen ? "0" : props.isTablet ? "0" : "12px"};
  margin-bottom: ${(props) =>
    props.isSmallScreen ? "12px" : props.isTablet ? "12px" : "0"};
`;

export const Line = styled.hr`
  display: ${(props) => (props.isSmallScreen ? "flex" : "none")};
  width: 96%;
  margin: 20px 0;
  border: none;
  height: 1px;
  background-color: #bababa;
`;

// 데이터
const items = [
  {
    title: "조회수",
    info: "팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를 조회했는지에 관한 정보를 더 확인할 수 있습니다.",
  },
  {
    title: "반응",
    info: "팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를 조회했는지에 관한 정보를 더 확인할 수 있습니다.",
  },
  {
    title: "팔로워",
    info: "팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를 조회했는지에 관한 정보를 더 확인할 수 있습니다.",
  },
];

// 컴포넌트
const Insiteitem_de = ({ isSmallScreen, isTablet }) => {
  return (
    <BorderWrapper isSmallScreen={isSmallScreen} isTablet={isTablet}>
      <InsitesWrapper isSmallScreen={isSmallScreen} isTablet={isTablet}>
        {items.map((item) => (
          <BorderItem
            key={item.title}
            type="insitesWrapper"
            isSmallScreen={isSmallScreen}
            isTablet={isTablet}
          >
            <InsiteInner2>
              <BorderItemTitle
                isSmallScreen={isSmallScreen}
                isTablet={isTablet}
              >
                {item.title}
              </BorderItemTitle>
              <Info isSmallScreen={isSmallScreen} isTablet={isTablet}>
                <IconWrapper
                  background={"#e9e9e9"}
                  borderRadius={"100%"}
                  wrapperSize={"32px"}
                  wrapperPadding={"8px"}
                >
                  <InformationIcon width={"30px"} fill={"black"} zindex={"1"} />
                </IconWrapper>
                <BorderItemInfo
                  isSmallScreen={isSmallScreen}
                  isTablet={isTablet}
                >
                  {item.info}
                </BorderItemInfo>
              </Info>
            </InsiteInner2>
          </BorderItem>
        ))}
      </InsitesWrapper>
    </BorderWrapper>
  );
};

export default Insiteitem_de;
