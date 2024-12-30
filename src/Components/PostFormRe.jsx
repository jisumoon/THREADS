import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import {
  CameraIcon,
  PictureIcon,
  MicIcon,
  HashtagIcon,
} from "../Components/Common/Icon";
import { useAuth } from "../Contexts/AuthContext";
import Loading from "./Loading";

// Styled Components
const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
`;

const BoederWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  margin: 0 auto;
  width: 680px;
  height: 85%;
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};
  @media (max-width: 768px) {
    position: fixed;
    border-radius: 0;
    width: 100%;
    height: calc(100% - 100px);
    bottom: 70px;
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const Form = styled.form`
  position: absolute;
  left: 50%;
  height: 50%;
  bottom: 0;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 660px;
  height: calc(100% - 10px);
  gap: 10px;
  background: ${(props) => props.theme.borderColor};
  border-radius: 30px 30px 0 0;
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 0 0 0 0;
  }
`;

const PlusImage = styled.div`
  display: flex;
  margin: 10px 20px;
  gap: 10px;
`;

const TextArea = styled.textarea`
  background: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontcolor};
  border: none;
  padding: 20px;
  padding-left: 10px;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 40px;
  width: 600px;
  height: 600px;
  resize: none;
  font-family: var(--pretendard-font);
  font-weight: 300;
  &::placeholder {
    color: #bababa;
    opacity: 1;
    font-size: 16px;
    transition: opacity 0.3s;
  }
  &:focus {
    &::placeholder {
      opacity: 0;
    }
    outline: none;
  }
  @media screen and (width: 390px) {
    border-radius: 0 0 0 0;
  }
`;

const Icons = styled.div`
  display: flex;
  margin: 20px 0;
  margin-left: 20px;
  gap: 20px;
  @media (max-width: 768px) {
    margin: 0;
    margin-left: 20px;
  }
`;

const CameraButton = styled.label`
  cursor: pointer;
  fill: none;
`;

const CameraInput = styled.input`
  display: none;
`;

const PictureButton = styled.label`
  cursor: pointer;
`;

const PictureInput = styled.input`
  display: none;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  gap: 20px;
  border-top: ${(props) => props.theme.borderstroke};
  padding: 20px;
  @media (max-width: 768px) {
    width: 100%;
    gap: 10px;
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

const OpenButton = styled.button`
  width: 300px;
  height: 80px;
  background: #d6d6d6;
  border: none;
  color: #000;
  font-size: 15px;
  font-weight: bold;
  border-radius: 30px;
  transition: all 0.3s;
  &:hover {
    background: #eaeaea;
    color: #494949;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const SubmitBtn = styled.input`
  width: 300px;
  height: 80px;
  background: #1c1c1c;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  border-radius: 30px;
  transition: all 0.3s;
  &:hover {
    background: #fff;
    color: #1c1c1c;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(""); // 게시글 상태
  const [files, setFiles] = useState([]); // 파일 상태
  const [audioBlob, setAudioBlob] = useState(null); // 녹음 파일 상태
  const [audioURL, setAudioURL] = useState(null); // 녹음 파일 미리보기 URL 상태
  const [isRecording, setIsRecording] = useState(false); // 녹음 중 상태
  const mediaRecorderRef = useRef(null); // MediaRecorder 참조
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, [currentUser, navigate]);

  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const maxFilesCount = 3;

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).filter((file) => {
        if (file.size > maxFileSize) {
          alert("The maximum file size is 5MB.");
          return false;
        }
        return true;
      });

      if (files.length + newFiles.length > maxFilesCount) {
        alert(`You can upload a maximum of ${maxFilesCount} files.`);
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // 녹음 시작
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);

      mediaRecorder.ondataavailable = (e) => {
        const url = URL.createObjectURL(e.data);
        setAudioBlob(e.data); // 녹음 완료 시 audioBlob에 데이터 저장
        setAudioURL(url); // 미리보기용 URL 생성
      };
    });
  };

  // 녹음 중지
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || post === "" || post.length > 180) return;

    try {
      setIsLoading(true);

      const docRef = await addDoc(collection(db, "contents"), {
        post,
        createdAt: serverTimestamp(),
        username: user?.displayName || "Anonymous",
        userId: user.uid,
        email: user.email,
        likes: 0, // 초기값 0
        comments: 0, // 초기값 0
        dms: 0, // 초기값 0
        retweets: 0, // 초기값 0
      });

      const photoUrls = [];
      const videoUrls = [];

      // 파일 업로드
      await Promise.all(
        files.map(async (file) => {
          const locationRef = ref(
            storage,
            `contents/${user.uid}/${docRef.id}/${file.name}`
          );
          const result = await uploadBytes(locationRef, file);
          const url = await getDownloadURL(result.ref);

          if (file.type.startsWith("image/")) {
            photoUrls.push(url);
          } else if (file.type.startsWith("video/")) {
            videoUrls.push(url);
          }
        })
      );

      // 녹음 파일 업로드
      if (audioBlob) {
        const audioRef = ref(
          storage,
          `contents/${user.uid}/${docRef.id}/recording.mp3`
        );
        await uploadBytes(audioRef, audioBlob);
        const audioURL = await getDownloadURL(audioRef);
        await updateDoc(docRef, { audioURL });
      }

      await updateDoc(docRef, {
        photos: photoUrls,
        videos: videoUrls,
      });

      // 상태 초기화
      setPost("");
      setFiles([]);
      setAudioBlob(null);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <BoederWrapper>
        <Form onSubmit={handleSubmit}>
          {isLoading ? <Loading /> : null}
          <TextArea
            onChange={handlePostChange}
            value={post}
            name="contents"
            id="contents"
            placeholder="내용을 작성하세요"
            required
          />
          <PlusImage>
            {files.map((file, index) => (
              <div key={index} style={{ position: "relative", margin: "5px" }}>
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded Preview ${index + 1}`}
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "10px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <video
                    controls
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  >
                    <source src={URL.createObjectURL(file)} />
                  </video>
                )}
                <DeleteButton onClick={() => removeFile(index)}>X</DeleteButton>
              </div>
            ))}
          </PlusImage>
          <Icons>
            <CameraButton htmlFor="camera">
              <CameraIcon width={38} />
              <CameraInput
                onChange={handleFileChange}
                id="camera"
                type="file"
                accept="video/*, image/*"
              />
            </CameraButton>
            <PictureButton htmlFor="picture">
              <PictureIcon width={24} />
              <PictureInput
                onChange={handleFileChange}
                id="picture"
                type="file"
                accept="video/*, image/*"
              />
            </PictureButton>

            {!isRecording ? (
              <button type="button" onClick={startRecording}>
                녹음 시작
              </button>
            ) : (
              <button type="button" onClick={stopRecording}>
                녹음 중지
              </button>
            )}
          </Icons>
          {/* 녹음 완료된 오디오 미리보기 */}
          {audioURL && (
            <div>
              <audio controls src={audioURL} style={{ width: "100%" }}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          <Buttons>
            <SubmitBtn
              text="스레드 업로드"
              type="submit"
              value={isLoading ? "Posting" : "Post"}
            />
          </Buttons>
        </Form>
      </BoederWrapper>
    </Wrapper>
  );
};

export default PostForm;
