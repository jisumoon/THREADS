// src/components/AudioRecorder.jsx
import React, { useState, memo } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // 파일명 고유성을 위한 UUID
import styled from "styled-components";
// import { MicIcon, FaStop, FaCheck } from "../Components/Common/Icon"; // 아이콘 임포트
import { storage } from "../../firebase"; // Firebase storage import

const RecorderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const MicButton = styled.button`
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
  border-radius: 50%;
`;

const RecorderControls = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const RecordingStatus = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #ff6f61;
`;

const AudioRecorder = memo(({ setAudioBlob }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);

      recorder.ondataavailable = (e) => {
        setAudioBlob(e.data); // 외부 상태 업데이트
      };
    });
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

  return (
    <RecorderWrapper>
      {!isRecording && (
        <button onClick={startRecording}>
          {/* <MicIcon width={24} /> */}
          <div>start</div>
        </button>
      )}

      {isRecording && (
        <RecorderControls>
          <button onClick={stopRecording}>
            <div>Stop</div>
          </button>
          <RecordingStatus>녹음 중...</RecordingStatus>
        </RecorderControls>
      )}
    </RecorderWrapper>
  );
});

export default AudioRecorder;
