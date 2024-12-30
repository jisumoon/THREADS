import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styled from "styled-components";
import { MicIcon, RecoderIcon } from "../Common/Icon";
import Micspinner from "./Micspinner";

const SearchWrapper = styled.div`
  width: 500px;
  min-width: 340px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 20px;
  padding-left: 10px;

  background: transparent;
  border-bottom: 1px solid ${(props) => props.theme.searchBar};
  @media (max-width: 768px) {
    width: 100%;
    padding-bottom: 5px;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;
const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.searchBar};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  &:focus {
    outline: none;
  }
  &::placeholder {
    transition: all 0.3s;
    font-size: 16px;
    @media (max-width: 468px) {
      font-size: 16px;
    }
  }
  &:focus::placeholder {
    color: transparent;
  }
  @media (max-width: 768px) {
    margin-bottom: 0;
    font-size: 16px;
  }
`;
const MicButton = styled.button`
  padding-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
  path {
    stroke: ${(props) => props.theme.searchBar};
  }
  @media (max-width: 468px) {
    margin: 0;
  }
`;
const Searchbar = ({ addSearch }) => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [timer, setTimer] = useState(null);
  // 입력 값이 변경될 때마다 상태 업데이트
  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // Enter 키
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      addSearch(searchQuery); // 검색어 전달
      setSearchQuery(""); // 검색창 초기화
    }
  };
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert("음성 인식을 지원하지 않는 브라우저입니다.");
    return null;
  }
  // 음성 인식 시작/중지 관리
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening(); // 음성 인식 중지
      clearTimeout(timer); // 타이머 중지
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "ko-KR" });
      // 타이머 설정
      const newTimer = setTimeout(() => {
        SpeechRecognition.stopListening();
      }, 5000); // 5초 동안 음성이 없을 경우 중지
      setTimer(newTimer);
    }
  };
  // 음성 인식이 종료되었을 때 검색어를 상위 컴포넌트로 전달
  useEffect(() => {
    if (!listening && transcript.trim() !== "") {
      addSearch(transcript); // 음성 인식된 텍스트를 상위 컴포넌트로 전달
      setSearchQuery(transcript); // 검색창에도 업데이트
      resetTranscript(); // 음성 인식 텍스트 초기화
      clearTimeout(timer); // 타이머 중지
    }
  }, [listening, transcript, resetTranscript, addSearch]);
  return (
    <SearchWrapper>
      <SearchBar
        type="text"
        value={searchQuery}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="검색"
      />
      <MicButton onClick={toggleListening}>
        {listening ? <Micspinner /> : <MicIcon width={20} />}
      </MicButton>
    </SearchWrapper>
  );
};
export default Searchbar;
