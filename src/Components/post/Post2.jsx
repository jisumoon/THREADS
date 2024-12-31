import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../../firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import {
  HeartIcon,
  DmIcon,
  RetweetIcon,
  EtcIcon,
  Coment,
  UserIcon2,
} from "../Common/Icon";

import { createSearchParams, useNavigate } from "react-router-dom";
// Styled Components
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import PostSetModal from "../Common/PostSetModal";
import AudioMessage from "../Audio/AudioMessage";
import EtcModal from "./EtcModal";
import fetchUserProfileImage from "../../Utils/fetchProfile";
import PostCommentModal from "../../Pages/PostComment";
import CoModal from "./CoModal";
import ImageModal from "./ImageModal";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 30px 20px;
  margin-bottom: 10px;
  display: flex;

  flex-direction: column;
  background: ${(props) => props.theme.borderColor};
  border-bottom: 1px solid ${(props) => props.theme.comentBouttomLine};
  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;
const ColumnWrapper = styled.div`
  display: flex;
`;
const Column = styled.div`
  margin-left: 20px;
  display: flex;
  margin-left: 50px;
  margin-bottom: 12px;
  gap: 10px;
  cursor: pointer;
`;

const Photo = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
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
  width: 220px;
  height: 160px;
  border-radius: 15px;
  object-fit: cover;
  @media (max-width: 768px) {
    margin-right: 8px;
    width: 120px;
    height: 120px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
`;
const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;
const Username = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.fontcolor};
  cursor: pointer;
`;

const Timer = styled.span`
  flex: 1;
  font-size: 10px;
  color: #9a9a9a;
`;

const Etc = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Payload = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 5px;
  line-height: 1.4;
  padding-left: 19px;
`;

const Icons = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 70px;
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

const Button = styled.button`
  background: ${(props) => props.bg || "#7f8689"};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
`;

const EditPostFormTextArea = styled.textarea`
  background: #fff;
  color: #fff;
  width: 94%;
  height: 50%;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  border-radius: 10px;
  resize: none;

  &::placeholder {
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    ::placeholder {
      opacity: 0;
    }
    outline: none;
    border: 1px solid #1d9bf0;
  }
`;

const Post = ({
  post,
  userId,
  photos,
  videos,
  username,
  id,
  createdAt,
  email,
  audioURL,
  comment,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhoto, setEditedPhoto] = useState(null);
  const [commentsCount, setCommentsCount] = useState(0); // 댓글 수 상태 추가
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [dms, setDms] = useState(Math.floor(Math.random() * 50));
  const [retweets, setRetweets] = useState(2);
  const [isRetweets, setIsRetweets] = useState(false);
  const [openModalId, setOpenModalId] = useState(null);
  const [isEtcModalOpen, setIsEtcModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  useEffect(() => {
    const getUserProfileImage = async () => {
      try {
        const imgUrl = await fetchUserProfileImage(userId);
        setProfileImg(imgUrl || "");
      } catch (error) {}
    };

    if (userId) {
      getUserProfileImage();
    }
  }, [userId]);

  // const user = auth.currentUser;

  const renderTimeAgo = () => {
    if (!createdAt || !createdAt.seconds) return "방금 전";
    const date = new Date(createdAt.seconds * 1000);
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  };

  //PostSetModal
  const openModal = (postId) => {
    setOpenModalId(postId);
  };
  const closeModal = () => {
    setOpenModalId(null);
  };

  // EtcModal
  const handleEdit = () => {
    setIsEtcModalOpen(true);
    setOpenModalId(null);
  };
  const closeEtcModal = () => {
    setIsEtcModalOpen(false);
  };

  // Img Modal
  const handleMediaClick = (mediaUrl, type) => {
    setSelectedMedia(mediaUrl);
    setMediaType(type);
    setIsImgModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsImgModalOpen(false);
    setSelectedMedia(null);
    setMediaType(null);
  };

  const handleClickOutside = (e) => {
    if (openModalId && !e.target.closest(".modal-content")) {
      closeModal();
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPostAndCommentsData = async () => {
      try {
        const postRef = doc(db, "contents", id);
        const postSnap = await getDoc(postRef);

        if (!postSnap.exists()) {
          await setDoc(postRef, {
            likes: likes,
            dms: dms,
            retweets: retweets,
          });
        } else {
          const postData = postSnap.data();
          setLikes(postData.likes || likes);
          setDms(postData.dms || dms);
          setRetweets(postData.retweets || retweets);
        }

        const commentsCollectionRef = collection(
          db,
          "contents",
          id,
          "comments"
        );
        const commentsSnapshot = await getDocs(commentsCollectionRef);
        setCommentsCount(commentsSnapshot.size);
      } catch (error) {}
    };

    fetchPostAndCommentsData();
  }, [id, likes, dms, retweets]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModalId]);

  const user = auth.currentUser;

  const handleClose = () => {
    setIsEditing(false);
  };

  const onClickSetContent = (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setEditedPhoto(files[0]);
    }
  };
  const onDelete = async () => {
    if (confirm("이 글을 삭제하시겠습니까?") && user?.uid === userId) {
      try {
        await deleteDoc(doc(db, "contents", id));
        if (photos.length > 0) {
          const photoRef = ref(storage, `contents/${user.uid}/${id}`);
          await deleteObject(photoRef);
        }
      } catch (error) {}
    } else {
      alert("삭제할 권한이 없습니다.");
    }
  };

  const handleSave = (updatedContent) => {
    setEditedPost(updatedContent);
  };

  const handleLike = async () => {
    const postRef = doc(db, "contents", id);

    if (isLiked) {
      setLikes((prevLikes) => prevLikes - 1);
      await updateDoc(postRef, { likes: likes - 1 });
    } else {
      setLikes((prevLikes) => prevLikes + 1);
      await updateDoc(postRef, { likes: likes + 1 });
    }

    setIsLiked((prevLiked) => !prevLiked);
  };

  const openCommentModal = () => {
    setCommentModalOpen(true);
  };
  const closeCommentModal = async () => {
    setCommentModalOpen(false);

    try {
      const commentsRef = collection(db, "contents", postId, "comments");
      const commentsSnapshot = await getDocs(commentsRef);

      const newCommentsCount = commentsSnapshot.size;
      setCommentsCount(newCommentsCount);
    } catch (error) {}
  };
  const handleCommentSubmitSuccess = async () => {
    try {
      const commentsRef = collection(db, "contents", id, "comments");
      const commentsSnapshot = await getDocs(commentsRef);
      setCommentsCount(commentsSnapshot.size);
      setCommentModalOpen(false);
    } catch (error) {}
  };
  const PostCommentClick = () => {
    navigate("/PostComment/${id}", {
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
        userId,
        comment,
      },
    });
  };

  const handleRetweetClick = async () => {
    const postRef = doc(db, "contents", id);

    if (isRetweets) {
      setRetweets((prevRet) => prevRet - 1);
      await updateDoc(postRef, { retweets: retweets - 1 });
    } else {
      setRetweets((prevRet) => prevRet + 1);
      await updateDoc(postRef, { retweets: retweets + 1 });
    }

    setIsRetweets((prevRet) => !prevRet);
  };
  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const commentsRef = collection(db, "contents", id, "comments");
        const commentsSnapshot = await getDocs(commentsRef);
        setCommentsCount(commentsSnapshot.size);
      } catch (error) {}
    };

    fetchCommentsCount();
  }, [id]);

  return (
    <>
      <Wrapper>
        <Header>
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
            <UserIcon2 width={50} />
          )}

          <Username
            onClick={() => {
              navigate({
                pathname: "/profile",
                search: `${createSearchParams({
                  email: email,
                })}`,
              });
            }}
          >
            {username}
          </Username>
          <Timer>{renderTimeAgo()}</Timer>
          <Etc onClick={() => openModal(id)}>
            <EtcIcon width={20} fill="gray" />
          </Etc>

          {openModalId === id && (
            <div className="modal-content">
              <PostSetModal
                onClose={closeModal}
                onEdit={handleEdit}
                onDelete={onDelete}
                isAuthor={user?.uid === userId}
                setIsEtcModalOpen={setIsEtcModalOpen}
              />
            </div>
          )}
          {/* EtcModal - 수정 모달 */}
          {isEtcModalOpen && (
            <EtcModal
              post={post}
              photos={photos}
              id={id}
              onSave={handleSave}
              onCancel={closeEtcModal}
              setIsEtcModalOpen={setIsEtcModalOpen}
            />
          )}
        </Header>

        <Column onClick={PostCommentClick}>
          {isEditing ? (
            <EditPostFormTextArea
              onChange={(e) => setEditedPost(e.target.value)}
              value={editedPost}
              placeholder={post}
            />
          ) : (
            <Payload onClick={PostCommentClick}>{post ?? comment}</Payload> // 하나의 Payload만 남겨두기
          )}
        </Column>

        <ColumnWrapper>
          {/* Render multiple photos */}
          {photos && photos.length > 0 && (
            <Column>
              {photos.map((photoUrl, index) => (
                <Photo
                  key={index}
                  src={photoUrl}
                  alt={`Post Image ${index + 1}`}
                  onClick={() => handleMediaClick(photoUrl, "image")}
                />
              ))}
            </Column>
          )}

          {videos && videos.length > 0 && (
            <Column>
              {videos.map((videoUrl, index) => (
                <Video
                  key={index}
                  controls
                  autoPlay
                  loop
                  src={videoUrl}
                  onClick={() => handleMediaClick(videoUrl, "video")}
                />
              ))}
            </Column>
          )}
        </ColumnWrapper>
        <AudioMessage audioURL={audioURL} />

        <Icons>
          <IconWrapper onClick={handleLike}>
            <HeartIcon width={20} /> {likes}
          </IconWrapper>
          <IconWrapper onClick={openCommentModal}>
            <Coment width={20} /> {commentsCount}
          </IconWrapper>
        </Icons>
        {commentModalOpen && (
          <CoModal
            onClose={() => setCommentModalOpen(false)}
            onSubmitSuccess={handleCommentSubmitSuccess}
            postId={id}
            postContent={post}
            photos={photos}
            videos={videos}
            username={username}
            createdAt={createdAt || { seconds: Date.now() / 1000 }}
            likes={likes}
            dms={dms}
            retweets={retweets}
            userId={userId}
            comment={comment}
          />
        )}

        {isImgModalOpen && selectedMedia && (
          <ImageModal
            mediaUrl={selectedMedia}
            mediaType={mediaType}
            onClose={handleCloseModal}
          />
        )}
      </Wrapper>
    </>
  );
};

export default Post;
