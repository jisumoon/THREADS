// src/components/AudioMessage.jsx
import React from "react";
import styled from "styled-components";

// 오디오 메세지 플레이어용 스타일
const AudioWrapper = styled.div`
  margin-top: 10px;
  width: 30%;
  margin-left: 30px;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const AudioPlayer = styled.audio`
  width: 100%;
  outline: none;
`;

// audioURL이 없으면 컴포넌트가 렌더링되지 않도록 수정
const AudioMessage = ({ audioURL }) => {
  if (!audioURL) return null; // 오디오 URL이 없을 때는 아무것도 렌더링하지 않음

  return (
    <AudioWrapper>
      <AudioPlayer controls>
        <source src={audioURL} type="audio/mpeg" />
        Your browser does not support the audio element.
      </AudioPlayer>
    </AudioWrapper>
  );
};

export default AudioMessage;
