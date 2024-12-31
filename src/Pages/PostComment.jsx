import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { HeartIcon, Coment, UserIcon2 } from "../Components/Common/Icon";
import BackBtn from "../Components/post/BackBtn";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  onSnapshot,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../Contexts/AuthContext";
import fetchUserProfileImage from "../Utils/fetchProfile";

const AllWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Backarea = styled.div`
  display: flex;
  margin-right: 730px;
`;
const BoederWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 680px;
  height: 85%;
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderColor};
  box-shadow: ${(props) => props.theme.bordershadow};
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 전체 높이를 고정 */
  scrollbar-width: none;
  max-height: auto; /* 고정된 높이를 주어야 스크롤이 발생함 */
  overflow-y: auto; /* 스크롤을 활성화 */
  ::-webkit-scrollbar {
    display: none;
  }
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

const PostWrapper = styled.div`
  padding: 20px 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.borderColor};
  border-bottom: 1px solid ${(props) => props.theme.comentBouttomLine};
  z-index: 20;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 20px;
    border-radius: 0;
  }
`;
const Header = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 20px;
`;
const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
`;
const Username = styled.span`
  font-size: 16px;
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
  margin-top: 8px;
  margin-bottom: 5px;
  padding-left: 30px;
  line-height: 1.4;
`;
const ColumnWrapper = styled.div`
  display: flex;
`;
const Column = styled.div`
  display: flex;
  margin-left: 50px;
  margin-bottom: 12px;
  gap: 10px;
  cursor: pointer;
`;

const Photo = styled.img`
  width: 120px;
  height: 120px;
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
  width: 180px;
  height: 120px;
  border-radius: 15px;
  object-fit: cover;
  @media (max-width: 768px) {
    margin-right: 8px;
    width: 120px;
    height: 120px;
  }
`;
const Icons = styled.div`
  padding-left: 30px;
  display: flex;
  gap: 0px;
  justify-content: start;
  align-items: center;
  margin-left: 50px;
  margin-bottom: 0px;
  margin-top: 10px;
  cursor: pointer;
  color: #bababa;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  &:nth-child(1) {
    margin-left: 0;
  }
  &:nth-child(2) {
    margin-left: 5px;
  }
  &:nth-child(3) {
    margin-left: 5px;
  }
  &:nth-child(4) {
    margin-left: 5px;
  }
`;

const ScrollWrapper = styled.div``;
const CommentsList = styled.div`
  width: 100%;
  height: auto;
`;

const CommentWrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderstroke};
  width: 100%;
  height: auto;
  background: ${(props) => props.theme.borderColor};
  padding: 15px;

  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-out;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 40px;
  @media (max-width: 768px) {
    margin-left: 14px;
  }
`;
const CommentUserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const CommentUsername = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.fontcolor};
`;
const CommentTimer = styled.span`
  font-size: 10px;
  color: #9a9a9a;
  flex: 1;
`;

const DeletAll = styled.div`
  height: auto;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DeletComment = styled.div`
  padding-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
const DeletIcon = styled.img`
  opacity: 0.6;
  width: 16px;
`;
const CometdescAll = styled.div`
  padding: 10px 0;
  padding-left: 10px;
  @media (max-width: 768px) {
  }
  @media (max-width: 500px) {
  }
`;
const CommentContent = styled.div`
  width: 500px;
  font-size: 14px;
  color: ${(props) => props.theme.fontcolor};
  font-weight: 600;
  margin-left: 90px;
  line-height: 1.4;
`;
const CommentImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
  margin-left: 30px;
`;
const CommentVideo = styled.video`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
  margin-left: 30px;
`;
const NotComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 30px;
  font-size: 16px;
  color: #bababa;
`;

const PostComment = () => {
  const [post, setPost] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [dms, setDms] = useState(0);
  const [retweets, setRetweets] = useState(0);
  const [files, setFiles] = useState([]);
  const [postOwnerId, setPostOwnerId] = useState("");
  const { currentUser } = useAuth();
  const [profileImg, setProfileImg] = useState("");
  const [profileImages, setProfileImages] = useState({}); // 댓글
  const location = useLocation();
  const navigate = useNavigate();

  const {
    postId = "",
    userId = "",
    id = "",
    postContent = "",
    photos = [],
    videos = [],
    username = "",
    createdAt = { seconds: Date.now() / 1000 },
    likes: passedLikes = 0,
    dms: passedDms = 0,
    retweets: passedRetweets = 0,
  } = location.state || {};

  useEffect(() => {
    const getUserProfileImage = async () => {
      try {
        const imgUrl = await fetchUserProfileImage(userId); // 프로필 이미지 가져오기
        setProfileImg(imgUrl || "");
      } catch (error) {}
    };

    // userId가 있을 때만 프로필 이미지 가져오기
    if (userId) {
      getUserProfileImage();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      setPostOwnerId(userId); // 포스트 작성자의 ID를 설정
    }
  }, [userId]);

  useEffect(() => {
    setLikes(passedLikes);
    setDms(passedDms);
    setRetweets(passedRetweets);
  }, [passedLikes, passedDms, passedRetweets]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!location.state?.postId) return; // postId가 없으면 return
        const commentsRef = collection(
          db,
          "contents",
          location.state.postId,
          "comments"
        );
        const q = query(commentsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        // 댓글 데이터를 배열로 변환하여 상태에 저장
        const commentsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setComments(commentsList); // 댓글 리스트 저장
        setCommentsCount(commentsList.length);

        const profileImagesMap = {};
        for (let comment of commentsList) {
          const profileImg = await fetchUserProfileImage(comment.userId);
          profileImagesMap[comment.userId] = profileImg || "";
        }
        setProfileImages(profileImagesMap);
      } catch (error) {}
    };

    fetchComments();
  }, [location.state?.postId]);

  const renderTimeAgo = () => {
    if (!createdAt || !createdAt.seconds) return "방금 전";
    const date = new Date(createdAt.seconds * 1000);
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  };

  const handleCommentClick = () => {
    navigate("/", {
      state: {
        postId: id,
        postContent: post,
        photos,
        videos,
        username,
        createdAt: createdAt || { seconds: Date.now() / 1000 },
        likes,
        dms,
        retweets,
        commentsCount,
      },
    });
  };

  useEffect(() => {
    const fetchPostOwner = async () => {
      try {
        if (!id) {
          return;
        }

        // Firestore에서 포스트 데이터를 가져와 userId 확인
        const postRef = doc(db, "contents", id);
        const postSnapshot = await getDoc(postRef);
        if (postSnapshot.exists()) {
          const postData = postSnapshot.data();

          if (postData.userId) {
            setPostOwnerId(postData.userId); // userId를 상태로 저장
          } else {
          }
        } else {
        }
      } catch (error) {}
    };

    fetchPostOwner();
  }, [id]); // id가 변경될 때마다 실행

  // Firestore에서 데이터 실시간 가져오기
  useEffect(() => {
    const postRef = doc(db, "contents", postId);
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      if (snapshot.exists()) {
        const postData = snapshot.data();
        setLikes(postData.likes || 0);
        setDms(postData.dms || 0);
      } else {
        console.error("Post does not exist!");
      }
    });

    return () => unsubscribe();
  }, [postId]);

  // 좋아요
  const handleToggleLike = async () => {
    const postRef = doc(db, "contents", postId);
    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists()) {
      const postData = postSnapshot.data();
      const likesBy = postData.likesBy || []; // undefined일 경우 빈 배열로 초기화

      if (likesBy.includes(currentUser.uid)) {
        await updateDoc(postRef, {
          likes: likes - 1,
          likesBy: arrayRemove(currentUser.uid),
        });
        setLikes((prevLikes) => prevLikes - 1);
      } else {
        await updateDoc(postRef, {
          likes: likes + 1,
          likesBy: arrayUnion(currentUser.uid),
        });
        setLikes((prevLikes) => prevLikes + 1);
      }
    }
  };

  // 댓글
  const handleAddComment = async (newComment) => {
    const commentsRef = collection(db, "contents", postId, "comments");
    await addDoc(commentsRef, {
      ...newComment,
      createdAt: serverTimestamp(),
    });
    setCommentsCount((prevCount) => prevCount + 1);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const commentRef = doc(db, "contents", postId, "comments", commentId);
      await deleteDoc(commentRef);

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      setCommentsCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div>
      <AllWrap>
        <Backarea>
          <BackBtn />
        </Backarea>
        <BoederWrapper>
          <PostWrapper>
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
                    <Video key={index} controls autoPlay loop src={videoUrl} />
                  ))}
              </Column>
            </ColumnWrapper>
            <Icons>
              <IconWrapper onClick={handleToggleLike}>
                <HeartIcon width={20} /> {likes}
              </IconWrapper>
              <IconWrapper>
                <Coment width={20} onClick={handleAddComment} /> {commentsCount}
              </IconWrapper>
            </Icons>
          </PostWrapper>
          <div>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <ScrollWrapper>
                  <CommentsList>
                    <CommentWrapper key={comment.id}>
                      <CommentHeader>
                        {profileImg ? (
                          <UserImage
                            onClick={() => {
                              navigate({
                                pathname: "/profile",
                                search: `${createSearchParams({
                                  email: email,
                                })}`,
                              });
                            }}
                            src={profileImg}
                            alt="User Profile"
                          ></UserImage>
                        ) : (
                          <UserIcon2 width={40} />
                        )}
                        <CommentUsername>{comment.username}</CommentUsername>
                        <CommentTimer>
                          {formatDistanceToNow(
                            new Date(comment.createdAt.seconds * 1000),
                            {
                              addSuffix: true,
                              locale: ko,
                            }
                          )}
                        </CommentTimer>
                        {currentUser?.uid === postOwnerId && (
                          <DeletAll>
                            <DeletComment
                              onClick={() => handleDeleteComment(comment.id)} // 댓글 삭제 클릭 시
                            >
                              <DeletIcon src="/x-circle.png" alt="circle" />
                            </DeletComment>
                          </DeletAll>
                        )}
                      </CommentHeader>
                      <CometdescAll>
                        <CommentContent>
                          {typeof comment.comment === "string"
                            ? comment.comment
                            : JSON.stringify(comment.comment)}
                        </CommentContent>

                        {/* 댓글에 이미지가 있을 경우 */}
                        {comment.photoUrls && comment.photoUrls.length > 0 && (
                          <div>
                            {comment.photoUrls.map((photoUrl, index) => (
                              <CommentImage
                                key={index}
                                src={photoUrl}
                                alt={`Comment Image ${index + 1}`}
                              />
                            ))}
                          </div>
                        )}

                        {/* 댓글에 비디오가 있을 경우 */}
                        {comment.videoUrls && comment.videoUrls.length > 0 && (
                          <div>
                            {comment.videoUrls.map((videoUrl, index) => (
                              <CommentVideo
                                key={index}
                                controls
                                autoPlay
                                loop
                                muted
                                src={videoUrl}
                              />
                            ))}
                          </div>
                        )}
                      </CometdescAll>
                    </CommentWrapper>
                  </CommentsList>
                </ScrollWrapper>
              ))
            ) : (
              <NotComment>댓글이 없습니다.</NotComment>
            )}
          </div>
        </BoederWrapper>
      </AllWrap>
    </div>
  );
};

export default PostComment;
