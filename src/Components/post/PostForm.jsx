import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  updateDoc,
  addDoc,
  serverTimestamp,
  doc,
  collection,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { CameraIcon, PictureIcon, MicIcon, RecoderIcon } from "../Common/Icon";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loading from "../Loading";
import { ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const AllWrapp = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
`;
``;

const ModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalWrapper = styled.div`
  width: 580px;
  border-radius: 12px;
  background: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontcolor};
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const TextAreaWrapper = styled.div`
  padding: 30px;
`;

const TextArea = styled.textarea`
  background: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontcolor};
  border: none;
  font-size: 16px;
  width: 100%;
  height: 150px;
  resize: none;
  font-family: var(--pretendard-font);
  &::placeholder {
    color: #bababa;
    opacity: 1;
  }
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
`;

const PlusImage = styled.div`
  display: flex;
  margin: 10px 20px;
  gap: 10px;
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
`;

const ButtonGroupWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const Icons = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 20px;
`;

const IconBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const UploadButton = styled.button`
  background: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.logoColor};
  border: 1px solid ${(props) => props.theme.borderstroke};
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.mouseHoverFontcolor};
    color: ${(props) => props.theme.mouseHoverBg};
  }
`;

const DelButton = styled.button`
  background: ${(props) => props.theme.mouseHoverBg};
  color: ${(props) => props.theme.fontcolor};
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  &:hover {
    background: ${(props) => props.theme.mouseHoverFontcolor};
    color: ${(props) => props.theme.mouseHoverBg};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const PostForm = ({ onCancel, onSubmitSuccess }) => {
  const [postContent, setPostContent] = useState(""); // 게시글 내용
  const [files, setFiles] = useState([]); // 업로드할 파일
  const [audioBlob, setAudioBlob] = useState(null); // 녹음 파일
  const [isRecording, setIsRecording] = useState(false); // 녹음 상태
  const mediaRecorderRef = useRef(null); // MediaRecorder 참조
  const [isLoading, setIsLoading] = useState(false);

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [dms, setDms] = useState(0);
  const [retweets, setRetweets] = useState(0);

  const navigate = useNavigate();
  const { currentUser } = useAuth(); // 현재 사용자 상태 가져오기

  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const maxFilesCount = 3;

  const generateCustomId = () => {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 1000000).toString();
    return timestamp + randomNum; // 두 값을 조합하여 고유 식별자 생성
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > maxFilesCount) {
      alert(`최대 ${maxFilesCount}개의 파일만 업로드할 수 있습니다.`);
      return;
    }
    const validFiles = selectedFiles.filter((file) => {
      if (file.size > maxFileSize) {
        alert("파일 크기는 5MB를 초과할 수 없습니다.");
        return false;
      }
      return true;
    });
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const startRecording = () => {
    if (isRecording) return; // 이미 녹음 중이라면 중복 생성 방지

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const audio = new Blob(chunks, { type: "audio/mp3" });
        setAudioBlob(audio);
        setFiles((prevFiles) => [
          ...prevFiles,
          new File([audio], "recording.mp3", { type: "audio/mp3" }),
        ]);
      };
    });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) {
      alert("내용을 입력하세요!"); // 입력값 확인
      return;
    }
    if (isLoading) return;

    try {
      setIsLoading(true);

      // Firebase에 초기 데이터 저장
      const docRef = await addDoc(collection(db, "contents"), {
        post: postContent,
        createdAt: serverTimestamp(),
        username: currentUser?.displayName || "Anonymous",
        userId: currentUser.uid,
        email: currentUser.email,
        customPostId: generateCustomId(),
        likes: 0,
        comments: 0,
        dms: 0,
        retweets: 0,
      });
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const fileRef = ref(storage, `posts/${docRef.id}/${file.name}`);
          await uploadBytes(fileRef, file);
          return getDownloadURL(fileRef);
        })
      );

      await updateDoc(doc(db, "contents", docRef.id), {
        files: uploadedFiles, // 업로드된 파일의 URL 추가
      });

      // 상태 초기화
      setPostContent("");
      setFiles([]);
      setAudioBlob(null);

      if (onSubmitSuccess) onSubmitSuccess();
      else navigate("/"); // 저장 후 메인 페이지로 이동
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <AllWrapp>
      <ModalOverlay
        onClick={(e) => {
          e.stopPropagation();
          handleCancel();
        }}
      >
        <ModalWrapper onClick={(e) => e.stopPropagation()}>
          <TextAreaWrapper>
            <TextArea
              placeholder="내용을 입력하세요"
              value={postContent}
              onChange={handleContentChange}
            />
          </TextAreaWrapper>
          <PlusImage>
            {files.map((file, index) => (
              <div key={index} style={{ position: "relative" }}>
                <Img src={URL.createObjectURL(file)} alt={`file-${index}`} />
                <DeleteButton onClick={() => removeFile(index)}>X</DeleteButton>
              </div>
            ))}
          </PlusImage>
          <Buttons>
            <Icons>
              <label style={{ cursor: "pointer" }}>
                <PictureIcon width={24} />
                <input
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  multiple
                  onChange={handleFileChange}
                />
              </label>
              {!isRecording ? (
                <IconBtn onClick={startRecording}>
                  <MicIcon width={24} />
                </IconBtn>
              ) : (
                <IconBtn onClick={stopRecording}>
                  <RecoderIcon width={24} />
                </IconBtn>
              )}
            </Icons>
            <ButtonGroupWrapper>
              <UploadButton onClick={handleSubmit}>
                {isLoading ? <Loading /> : "작성"}
              </UploadButton>
              <DelButton onClick={handleCancel}>취소</DelButton>
            </ButtonGroupWrapper>
          </Buttons>
        </ModalWrapper>
      </ModalOverlay>
    </AllWrapp>
  );
};

export default PostForm;
