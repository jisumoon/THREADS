import React, { useState } from "react";
import styled from "styled-components";

const SearchBar = styled.input`
  width: 358px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #fff;
  background: #e9e9e9;
  padding: 14px 20px;
  color: #1d1d1d;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #aaa;
  }
`;

// const SearchImg = styled.img`
//   width: 16px;
//   height: 16px;
//   color: #545454;
// `;

const Search = ({ onClick, type }) => {
  const [placeholder, setPlaceholder] = useState("검색");

  const handleFocus = () => setPlaceholder("");

  const handleBlur = () => setPlaceholder("검색");

  return (
    <SearchBar
      type="text"
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          onClick();
        }
      }}
    ></SearchBar>
  );
};

export default Search;
