import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { updateDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage, auth } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  HeartIcon,
  DmIcon,
  RetweetIcon,
  Coment,
  CameraIcon,
  PictureIcon,
  MicIcon,
  RecoderIcon,
  UserIcon2,
} from "../Common/Icon";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useAuth } from "../../Contexts/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import Loading from "../Loading";
import fetchUserProfileImage from "../../Utils/fetchProfile";
import { useLocation } from "react-router-dom";
const AllWrapp = styled.div`
  /* position: relative;  */
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
  z-index: 900;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  @media (max-width: 768px) {
  }
`;

const PostComentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: auto;
  margin-top: 10px;
  border-radius: 40px;
  background: ${(props) => props.theme.borderWrapper};
  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    margin: 10px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 0;
  }
`;
const PostAll = styled.div`
  display: grid;
  flex-direction: column;
  width: 100%;
  border-radius: 30px;
  height: auto;
  padding: 0 10px;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;
const PostArea = styled.div`
  padding: 10px;
  margin: 10px;
  display: grid;
  flex: 2;
  background: ${(props) => props.theme.borderWrapper};
  height: auto;
  width: 580px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 8px;
`;
const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
`;
const Username = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.fontcolor};
`;
const Timer = styled.span`
  flex: 1;
  font-size: 10px;
  color: #9a9a9a;
`;
const Posted = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-left: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 40px;
`;
const ColumnWrapper = styled.div`
  display: flex;
`;
const Column = styled.div`
  display: flex;
  margin-left: 30px;
  margin-bottom: 12px;
  gap: 10px;
`;
const Photo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover/contain;
  margin-left: 0px;
  border-radius: 8px;
  @media (max-width: 768px) {
    margin-right: 8px;
    width: 120px;
    height: 120px;
  }
`;
const Video = styled.video`
  display: flex;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  object-fit: cover;
  @media (max-width: 768px) {
    margin-right: 8px;
    width: 120px;
    height: 120px;
  }
`;
const PostIcons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: start;
  align-items: center;
  margin-left: 30px;
  padding-left: 40px;
  margin-top: 10px;
  cursor: pointer;
  color: #bababa;
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
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const CommentArea = styled.div`
  width: 100%;
  height: 230px;
  background: ${(props) => props.theme.borderWrapper};
  color: ${(props) => props.theme.fontcolor};
  display: flex;
  flex-direction: column;
  border-radius: 0 0 30px 30px;
  z-index: 1000;
  @media (max-width: 768px) {
    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  z-index: 999999;
  margin: 0;
  border-radius: 30px;
  background: ${(props) => props.theme.borderWrapper};
  @media (max-width: 768px) {
    border-radius: 30px;
    width: 100%;
    height: auto;
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const TextArea = styled.textarea`
  background: ${(props) => props.theme.borderWrapper};
  color: ${(props) => props.theme.fontcolor};
  border: none;
  font-size: 16px;
  width: 96%;
  height: 100%;
  margin: 0;
  margin-left: 20px;
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
  @media (max-width: 768px) {
    border-radius: 30px;
    height: auto;
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;
const PlusImage = styled.div`
  display: flex;
  margin: 10px 20px;
  gap: 10px;
  width: 140px;
  height: 140px;
  border-radius: 10px;
  object-fit: cover;
`;
const Img = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: contain/ cover;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const BottomWrapp = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0 10px 0px;
  background: ${(props) => props.theme.borderWrapper};
  border-radius: 0 0 30px 30px;
  border-top: 1px solid rgba(204, 204, 204, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Icons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-left: 18px;
  justify-content: center;
`;

const EditButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const UploadButton = styled.button`
  background: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.logoColor};
  border: 1px solid ${(props) => props.theme.borderstroke};
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.2s;
  &:hover {
    background: ${(props) => props.theme.mouseHoverBg};
    color: ${(props) => props.theme.mouseHoverFontcolor};
  }
`;

const DelButton = styled.button`
  background: ${(props) => props.theme.mouseHoverBg};
  color: ${(props) => props.theme.fontcolor};
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-right: 10px;
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
const Title = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
`;
const CharacterCount = styled.div`
  text-align: right;
  font-weight: 500;
  font-size: 12px;
  ${(props) => props.theme.fontcolor};
  opacity: 0.6;
  margin-right: 20px;
  margin-bottom: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  width: 100%;
  height: 100%;
  gap: 10px;
  border-radius: 40px;
  padding-top: 20px;
  background: ${(props) => props.theme.borderWrapper};
  @media (max-width: 768px) {
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
const Buttons = styled.div`
  height: auto;
  width: auto;
  border-top: ${(props) => props.theme.borderstroke};
  padding: 10px;
  @media (max-width: 768px) {
    width: 100%;
    gap: 10px;
  }
`;

const IconsBtnwrapper = styled.div`
  border-radius: 0 0 30px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  width: 100%;
  padding: 0 20px;
  border-top: 1px solid rgba(204, 204, 204, 0.4);
  @media (max-width: 768px) {
    padding: 0 10px;
    gap: 0px;
  }
`;
const SubmitBtn = styled.input`
  background: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.logoColor};
  border: 1px solid ${(props) => props.theme.borderstroke};
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.2s;
  &:hover {
    background: ${(props) => props.theme.mouseHoverFontcolor};
    color: ${(props) => props.theme.mouseHoverBg};
  }
`;
const CenBtn = styled.div`
  width: 100%;
  background: ${(props) => props.theme.borderWrapper};
  padding: 20px 20px 16px 40px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 40px 40px 0 0;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 18px;
    gap: 0px;
  }
`;

const IconBtn = styled.button`
  border: 1px solid #f00;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const CoModal = ({
  userId,
  postId,
  postContent,
  photos,
  videos,
  username,
  createdAt,
  likes: passedLikes,
  dms: passedDms,
  retweets: passedRetweets,
  onClose,
  onSubmitSuccess,
}) => {
  const [post, setPost] = useState("");
  const [files, setFiles] = useState([]);
  const [profileImg, setProfileImg] = useState("");
  const { currentUser } = useAuth();
  const [dms, setDms] = useState(Math.floor(Math.random() * 50));
  const [comments, setComments] = useState([]); // 댓글 배열
  const [commentsCount, setCommentsCount] = useState(0); // 댓글 수
  const [isLoading, setIsLoading] = useState(false);
  const [retweets, setRetweets] = useState(2);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const location = useLocation();
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const maxFilesCount = 3;
  const [isRecording, setIsRecording] = useState(false); // 녹음 상태
  const mediaRecorderRef = useRef(null); // MediaRecorder 참조

  // Firebase에서 전달된 값을 상태로 설정
  useEffect(() => {
    if (passedLikes) setLikes(passedLikes);
    if (passedDms) setDms(passedDms);
    if (passedRetweets) setRetweets(passedRetweets);
  }, [passedLikes, passedDms, passedRetweets]);

  useEffect(() => {
    const getUserProfileImage = async () => {
      try {
        const imgUrl = await fetchUserProfileImage(userId); // 프로필 이미지 가져오기

        setProfileImg(imgUrl || ""); // 이미지가 없으면 빈 값
      } catch (error) {}
    };

    // userId가 있을 때만 프로필 이미지 가져오기
    if (userId) {
      getUserProfileImage();
    }
  }, [userId]);

  // Firestore에서 댓글 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return; // postId가 없을 경우 함수 종료

      try {
        const commentsCollectionRef = collection(
          db,
          "contents",
          postId,
          "comments"
        );
        const commentsSnapshot = await getDocs(commentsCollectionRef);

        const commentsList = commentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCommentsCount(commentsSnapshot.size); // 댓글 수 저장
      } catch (error) {}
    };

    if (postId) fetchComments();
  }, [postId]);

  const renderTimeAgo = () => {
    if (!createdAt || !createdAt.seconds) return "방금 전";
    const date = new Date(createdAt.seconds * 1000);
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).filter((file) => {
        if (file.size > maxFileSize) {
          alert("업로드 가능한 파일의 최대 크기는 5MB입니다.");
          return false;
        }
        return true;
      });

      if (files.length + newFiles.length > maxFilesCount) {
        alert(`파일은 최대 ${maxFilesCount}장까지만 업로드할 수 있습니다.`);
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    const user = auth.currentUser;
    e.preventDefault();
    if (!currentUser || isLoading || !post.trim() || post.length > 180) return;
    try {
      setIsLoading(true);
      const commentData = {
        comment: post.trim(),
        createdAt: serverTimestamp(),
        username: currentUser?.displayName || "Anonymous",
        userId: currentUser.uid,
        photoUrls: [],
        videoUrls: [],
        email: user.email,
      };
      const commentsRef = collection(db, "contents", postId, "comments");
      const photoUrls = [];
      const videoUrls = [];

      if (files.length > 0) {
        await Promise.all(
          files.map(async (file) => {
            const storageRef = ref(
              storage,
              `comments/${currentUser.uid}/${file.name}`
            );
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            if (file.type.startsWith("image/")) {
              photoUrls.push(downloadURL);
            } else if (file.type.startsWith("video/")) {
              videoUrls.push(downloadURL);
            }
          })
        );
        commentData.photoUrls = photoUrls;
        commentData.videoUrls = videoUrls;
      }

      await addDoc(commentsRef, commentData);
      setPost(""); // 상태 초기화
      setFiles([]); // 업로드 파일 초기화
      onSubmitSuccess();
      // 댓글을 추가한 후 즉시 업데이트
      setComments((prevComments) => [...prevComments, commentData]);
      setCommentsCount((prevCount) => prevCount + 1);
      onClose();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const [charCount, setCharCount] = useState(post.length || 0); // 글자 수 상태 관리
  const handleContentChange = (e) => {
    const content = e.target.value;
    setNewContent(content);
    setCharCount(content.length); // 글자 수 업데이트
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

  const commentCancle = () => {
    onClose();
  };

  return (
    <AllWrapp onClick={commentCancle}>
      <ModalOverlay>
        <Title>댓글</Title>
        <PostComentWrapper>
          <CenBtn onClick={commentCancle}>취소</CenBtn>
          <PostAll>
            <PostArea>
              <Header>
                {profileImg ? (
                  <UserImage src={profileImg} alt="User Profile"></UserImage>
                ) : (
                  <UserIcon2 width={50} />
                )}
                <Username>{username}</Username>
                <Timer>{renderTimeAgo()}</Timer>
              </Header>
              <Column>
                <Posted>{postContent}</Posted>
              </Column>

              <ColumnWrapper>
                <Column>
                  {photos &&
                    photos.length > 0 &&
                    photos.map((photoUrl, index) => (
                      <Photo
                        key={index}
                        src={photoUrl}
                        alt={`Post Image ${index + 1}`}
                      />
                    ))}
                </Column>

                <Column>
                  {videos &&
                    videos.length > 0 &&
                    videos.map((videoUrl, index) => (
                      <Video
                        key={index}
                        controls
                        autoPlay
                        loop
                        muted
                        src={videoUrl}
                      />
                    ))}
                </Column>
              </ColumnWrapper>

              <PostIcons>
                <IconWrapper>
                  <HeartIcon width={16} /> {likes}
                </IconWrapper>
                <IconWrapper>
                  <Coment width={16} /> {commentsCount}
                </IconWrapper>
              </PostIcons>
            </PostArea>

            <Form onSubmit={handleSubmit}>
              {isLoading ? <Loading /> : null}
              <CharacterCount>{charCount}자 입력 중</CharacterCount>
              <TextArea
                value={post || ""} // 상태를 post로 통일
                onChange={(e) => {
                  const content = e.target.value;
                  setPost(content); // post 상태를 업데이트
                  setCharCount(content.length); // 글자 수 업데이트
                }}
                name="contents"
                id="contents"
                placeholder="내용을 작성하세요"
                required
              />
              <PlusImage>
                {files.map((file, index) => (
                  <div
                    key={index}
                    style={{ position: "relative", margin: "5px" }}
                  >
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded Preview ${index + 1}`}
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <video
                        controls
                        muted
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      >
                        <source src={URL.createObjectURL(file)} />
                      </video>
                    )}
                    <DeleteButton onClick={() => removeFile(index)}>
                      X
                    </DeleteButton>
                  </div>
                ))}
              </PlusImage>
              <IconsBtnwrapper>
                <Icons>
                  <PictureButton htmlFor="picture">
                    <PictureIcon width={24} />
                  </PictureButton>
                  <PictureInput
                    onChange={handleFileChange}
                    id="picture"
                    type="file"
                    accept="video/*, image/*"
                  />
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
                <Buttons>
                  <SubmitBtn
                    text="게시"
                    type="submit"
                    value={isLoading ? "게시중..." : "게시"}
                  />
                </Buttons>
              </IconsBtnwrapper>
            </Form>
          </PostAll>
        </PostComentWrapper>
      </ModalOverlay>
    </AllWrapp>
  );
};

export default CoModal;
