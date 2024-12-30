import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import {
  HeartIcon,
  DmIcon,
  RetweetIcon,
  Coment,
  CameraIcon,
  PictureIcon,
  MicIcon,
  HashtagIcon,
  UserIcon2,
} from "../Components/Common/Icon";
import { useAuth } from "../Contexts/AuthContext";
import { addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "../Components/Common/Button";
import BackBtn from "../Components/post/BackBtn";
import Loading from "../Components/LoadingLogo/Loading";
import fetchUserProfileImage from "../Utils/fetchProfile";

const AllDesc = styled.div``;

const AllWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Backarea = styled.div`
  width: 760px;
`;

const BoederWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  width: 680px;
  height: 85%;
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};
  @media (max-width: 768px) {
    position: fixed;
    border-radius: 0;
    width: 100%;
    height: calc(100% - 140px);
    bottom: 70px;
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
  }
`;
const PostWrapper = styled.div`
  margin: 0px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${(props) => props.theme.borderColor};
  padding: 20px;
  border-radius: 40px 40px 0 0;
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);
  @media (max-width: 768px) {
    height: auto;
    border-radius: 0;
  }
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;
const UserImage = styled.img`
  width: 40px;
  height: 40px;
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
`;
const ColumnWrapper = styled.div`
  display: flex;
`;
const Column = styled.div`
  display: flex;
  margin-left: 50px;
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
const Icons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: start;

  align-items: center;
  margin-left: 50px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  width: 100%;
  height: 100%;
  gap: 10px;
  background: ${(props) => props.theme.borderColor};
  @media (max-width: 768px) {
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
const Buttons = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 20px;
  border-top: ${(props) => props.theme.borderstroke};
  padding: 20px;
  @media (max-width: 768px) {
    width: 100%;
    gap: 10px;
  }
`;
const PlusImage = styled.div`
  display: flex;
  margin: 10px 20px;
  gap: 10px;
`;
const TextArea = styled.textarea`
  display: flex;
  background: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontcolor};
  border: none;
  padding: 20px;
  font-size: 16px;
  margin-top: 20px;
  width: 90%;
  height: auto;
  resize: none;
  font-family: var(--pretendard-font);
  font-weight: 300;
  &::placeholder {
    color: #bababa;
    opacity: 1;
    font-size: 16px;
    transition: opacity 0.3s;
    padding-left: 20px;
  }
  &:focus {
    &::placeholder {
      opacity: 0;
    }
    outline: none;
  }
  @media (max-width: 768px) {
    border-radius: 20px 20px 0 0;
    padding-left: 0px;
    width: 100%;
  }
`;
const IconsBtnwrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  width: 100%;
  @media (max-width: 768px) {
  }
`;
const SubmitBtn = styled.input`
  width: 300px;
  height: 70px;
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
    margin-left: 20px;
  }
`;

const Comment = ({ id }) => {
  const [post, setPost] = useState("");
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const [comments, setComments] = useState([]); // 댓글 배열
  const [commentsCount, setCommentsCount] = useState(0); // 댓글 수
  const [dms, setDms] = useState(Math.floor(Math.random() * 50));
  const [retweets, setRetweets] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // 현재 사용자 상태를 가져옴
  const [profileImg, setProfileImg] = useState("");

  const {
    postContent,
    photos,
    videos,
    username,
    createdAt,
    likes: passedLikes,
    dms: passedDms,
    retweets: passedRetweets,
    postId,
    userId,
  } = location.state || {};

  // Firebase에서 전달된 값을 상태로 설정
  useEffect(() => {
    setLikes(passedLikes);
    setDms(passedDms);
    setRetweets(passedRetweets);
  }, [passedLikes, passedDms, passedRetweets]);

  useEffect(() => {
    if (!postId) {
      return;
    }
  }, [postId]);

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

        setComments(commentsList); // 댓글 리스트 저장
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

  const handlePostChange = (e) => {
    setPost(e.target.value);
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
      // 댓글을 추가한 후 즉시 업데이트
      setComments((prevComments) => [...prevComments, commentData]);
      setCommentsCount((prevCount) => prevCount + 1);
      navigate("/");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const maxFilesCount = 3;

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

  return (
    <div>
      <AllDesc>
        <AllWrap>
          <Backarea>
            <BackBtn />
          </Backarea>
          <BoederWrapper>
            <Wrapper>
              <PostWrapper>
                <Header>
                  {profileImg ? (
                    <UserImage src={profileImg} alt="User Profile"></UserImage>
                  ) : (
                    <UserIcon2 />
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

                <Icons>
                  <IconWrapper>
                    <HeartIcon width={14} /> {likes}
                  </IconWrapper>
                  <IconWrapper>
                    <Coment width={14} /> {commentsCount}
                  </IconWrapper>
                  <IconWrapper>
                    <RetweetIcon width={14} /> {retweets}
                  </IconWrapper>
                  <IconWrapper>
                    <DmIcon width={12} /> {dms}
                  </IconWrapper>
                </Icons>
              </PostWrapper>

              <Form onSubmit={handleSubmit}>
                {isLoading ? <Loading /> : null}
                <TextArea
                  onChange={handlePostChange}
                  value={post}
                  name="contents"
                  id="contents"
                  placeholder="댓글을 작성하세요.."
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
                            width: "160px",
                            height: "160px",
                            borderRadius: "10px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <video
                          controls
                          muted
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
                      <DeleteButton onClick={() => removeFile(index)}>
                        X
                      </DeleteButton>
                    </div>
                  ))}
                </PlusImage>
                <IconsBtnwrapper>
                  <Icons>
                    <CameraButton htmlFor="camera">
                      <CameraIcon width={36} />
                      <CameraInput
                        onChange={handleFileChange}
                        id="camera"
                        type="file"
                        accept="video/*, image/*"
                      />
                    </CameraButton>
                    <PictureButton htmlFor="picture">
                      <PictureIcon width={24} />
                    </PictureButton>
                    <PictureInput
                      onChange={handleFileChange}
                      id="picture"
                      type="file"
                      accept="video/*, image/*"
                    />
                    <MicIcon width={24} />
                    <HashtagIcon width={24} />
                  </Icons>
                  <Buttons>
                    <SubmitBtn
                      text="댓글달기"
                      type="submit"
                      value={isLoading ? "댓글 다는 중" : "댓글달기"}
                    />
                  </Buttons>
                </IconsBtnwrapper>
              </Form>
            </Wrapper>
          </BoederWrapper>
        </AllWrap>
      </AllDesc>
    </div>
  );
};

export default Comment;
