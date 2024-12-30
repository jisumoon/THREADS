import React, { useState } from "react";
import styled from "styled-components";
import { Line } from "../../Components/SettingsItem_de";
import { useMediaQuery } from "react-responsive";
import { Overlay } from "../../Components/Common/MentionModal";

const AuthorityModal = () => {
  const [activeOption, setActiveOption] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)", // 닫는 괄호 추가
  });
  const handleOptionClick = (option) => {
    setActiveOption(option);
    setIsOptionSelected(true);
    onSelectOption(option); // 부모 컴포넌트에 선택된 옵션 전달
    onClose(); // 모달 닫기
  };

  // 모달 외부 클릭 시 닫히는 함수
  const handleOverlayClick = () => {
    if (isOptionSelected) {
      onClose();
    }
  };
  return <div></div>;
};

export default AuthorityModal;
