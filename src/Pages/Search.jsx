import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import Searchbar from "../Components/Search/Searchbar";
import FollowersList from "../Components/Search/FollowerList";
import TimeLine2 from "../Components/Search/TimLine2";

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
  padding-left: 40px;
  display: flex;
  width: 100%;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    top: 0;
    padding-left: 100px;
  }

  @media (max-width: 480px) {
    top: 0;
    padding-left: 140px;
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
    display: block;
    width: 100px;
    padding: 10px 0;
  }

  @media (max-width: 480px) {
    display: block;
    width: 90px;
    padding: 10px 0;
  }
`;

const ButtonGroupPC = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
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

const SearchBox = styled.div`
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  @media (max-width: 768px) {
    margin-top: 60px;
  }

  @media (max-width: 480px) {
    margin-top: 60px;
  }
`;

const ContentsBorder = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;

  margin-top: 20px;
  overflow-y: auto;
  padding: 0 40px;
  padding-bottom: 20px;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    padding: 0 20px;
    width: 100%;
    height: 1000px;
  }

  @media (max-width: 480px) {
    margin-top: 30px;
    padding: 0 10px;
    width: 100%;
    height: 1000px;
  }
`;
const NoResults = styled.p`
  font-size: 16px;
  text-align: center;
  color: #999;
  margin-top: 40px;
`;

const Search = () => {
  const [showSearchBar, setShowSearchBar] = useState(true); // 검색창 표시 여부
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [contentType, setContentType] = useState("popular"); // 선택된 콘텐츠 타입 저장
  const [followersEmpty, setFollowersEmpty] = useState(false); // 팔로워가 비어 있는지 여부
  const [displaysEmpty, setDisplaysEmpty] = useState(false); // 게시글이 비어 있는지 여부
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 검색어 변경 시 처리
  const handleSearch = (term) => {
    setSearchTerm(term); // 검색어를 상태로 저장
    setContentType("popular"); // 기본 필터로 설정
    setShowSearchBar(false);

    if (!term) {
      setFollowersEmpty(false);
      setDisplaysEmpty(false);

      return;
    }
  };

  // 버튼 클릭 시 필터링 처리
  const handleButtonClick = (type) => {
    setContentType(type);
  };

  // 미디어 사이즈 변화시 버튼 종류 변경
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // resize 이벤트를 감지하여 상태 업데이트
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const buttons = [
    { label: "인기", type: "popular" },
    { label: "최신", type: "recent" },
    { label: "사진", type: "picture" },
    { label: "동영상", type: "video" },
    { label: "프로필", type: "profile" },
  ];

  return (
    <Wrapper>
      <BoederWrapper>
        <MenuTitle>{searchTerm || "검색"}</MenuTitle>
        <SearchBox>
          {showSearchBar ? (
            <Searchbar addSearch={handleSearch} />
          ) : isMobile ? (
            <ButtonGroup
              className="mobile-buttons"
              whileTap="click"
              drag="x"
              dragMomentum={false}
              dragConstraints={{ left: -140, right: 0 }}
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
          )}
        </SearchBox>
        <ContentsBorder>
          {contentType !== "picture" && contentType !== "video" && (
            <FollowersList
              searchTerm={searchTerm}
              contentType={contentType}
              onDataEmpty={(isEmpty) => setFollowersEmpty(isEmpty)}
            />
          )}

          {contentType !== "profile" && (
            <TimeLine2
              searchTerm={searchTerm}
              contentType={contentType}
              onDataEmpty={(isEmpty) => setDisplaysEmpty(isEmpty)}
            />
          )}

          {contentType === "profile" && followersEmpty && (
            <NoResults>프로필이 존재하지 않습니다.</NoResults>
          )}

          {(contentType === "picture" || contentType === "video") &&
            displaysEmpty && <NoResults>게시글이 존재하지 않습니다.</NoResults>}

          {contentType !== "profile" &&
            contentType !== "picture" &&
            contentType !== "video" &&
            followersEmpty &&
            displaysEmpty && (
              <NoResults>게시글 및 프로필이 존재하지 않습니다.</NoResults>
            )}
        </ContentsBorder>
      </BoederWrapper>
    </Wrapper>
  );
};
export default Search;
