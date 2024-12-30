import React, { useState } from "react";
import Searchbar from "./Searchbar";
import styled from "styled-components";
import GlobalStyles, {
  lightTheme,
  darkTheme,
} from "../../styles/GlobalStyles.styles";
import { CloseIcon } from "../Common/Icon";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchBox = styled.div`
  margin-top: 10px;
  width: 590px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: ${(props) => props.theme.searchBar};
  color: ${(props) => props.theme.searchColor};
  transition: all 0.5s;
`;

const SearchHistoryItem = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border: none;
  transition: all 0.5s;
`;

const Search = styled.p`
  font-size: 13px;
  padding-left: 10px;
`;

const SearchClose = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  path {
    stroke: ${(props) => props.theme.searchColor};
  }
`;

const Searchhistory = () => {
  const [history, setHistory] = useState([]);

  // 검색 기록 추가
  const addSearch = (query) => {
    setHistory([query, ...history]);
  };

  // 검색 기록 삭제
  const removeSearch = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  return (
    <Wrapper>
      <Searchbar addSearch={addSearch} />
      <SearchBox style={{ display: history.length > 0 ? "block" : "none" }}>
        {history.map((query, index) => (
          <SearchHistoryItem key={index}>
            <Search>{query}</Search>
            <SearchClose onClick={() => removeSearch(index)}>
              <CloseIcon width={8} />
            </SearchClose>
          </SearchHistoryItem>
        ))}
      </SearchBox>
    </Wrapper>
  );
};

export default Searchhistory;
