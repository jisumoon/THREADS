import React, { createContext, useState } from "react";

// Context 생성
export const AddPageContext = createContext();

// Provider 컴포넌트
export const AddPageProvider = ({ children }) => {
  const [addPages, setAddPages] = useState([]); // 추가된 페이지 목록 관리

  // 페이지를 추가하는 함수
  const addPage = (page) => {
    setAddPages((prevPages) => {
      if (prevPages.includes(page)) return prevPages; // 중복 방지
      return [...prevPages, page]; // 새 페이지 추가
    });
  };

  return (
    <AddPageContext.Provider value={{ setAddPages, addPages, addPage }}>
      {children}
    </AddPageContext.Provider>
  );
};
