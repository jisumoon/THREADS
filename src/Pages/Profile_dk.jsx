import { useState, useContext, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  limit,
  orderBy,
  query,
  where,
  documentId,
  getDocs,
} from "firebase/firestore";
import styled from "styled-components";
import Button from "../Components/Common/Button";
import Post from "../Components/Post";
import {
  PlusIcon,
  InstaIcon,
  FacebookIcon,
  UserIcon2,
} from "../Components/Common/Icon";
import FollowModal from "../Components/profile/FollowModal";
import LinkPluse from "../Components/profile/LinkPluse";
import ProfileEdit from "../Components/profile/ProfileEdit";
import { useNavigate, useSearchParams } from "react-router-dom";
import OtherBtnModal from "../Components/profile/OtherBtnModal";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
  /* width: 100%; */
  /* height: calc(100vh - 120px); */
  /* overflow: hidden; */

  height: 100vh;
  margin-top: 120px;
  @media (max-width: 768px) {
    height: 100vh;
  }
`;

// const BoederWrapper = styled.div`
//   /* position: fixed; */
//   /* position: fixed; */
//   /* bottom: 0; */
//   /* left: 50%; */
//   /* transform: translate(-50%); */
//   /* bottom: 0;
//   left: 50%; */
//   /* transform: translate(-50%); */
//   /* margin: 0 auto; */
//   /* height: 85%; */
//   width: 680px;
//   height: 100%;
//   border-radius: 40px 40px 0px 0px;
//   background: ${(props) => props.theme.headerBg};
//   box-shadow: ${(props) => props.theme.bordershadow};
//   /* overflow: hidden; */
//   @media (max-width: 768px) {
//     position: static;
//     margin: 0;
//     width: 100vw;
//     height: calc(100% - 140px);
//     box-shadow: none;
//     border-radius: 0px;
//     background: ${(props) => props.theme.borderColor};
//     transform: translate(0%);
//   }
// `;
const BoederWrapper = styled.div`
  /* position: fixed; */
  bottom: 0;
  /* left: 50%; */
  /* transform: translate(-50%); */
  /* margin: 0; */
  width: 680px;
  height: 100%;
  /* height: 85%; */
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};
  /* overflow: hidden; */
  @media (max-width: 768px) {
    /* position: absolute; */
    width: 100%;
    bottom: 0;
    border-radius: 0;
    width: 100%;
    height: calc(100% - 70px);
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const ProfileInnner = styled.div`
  padding: 30px 40px 4px 40px;
  width: calc(100% - 20px);
  height: 306px;
  border: 306px;
  border-radius: 40px 40px 18px 18px;
  background: ${(props) => props.theme.headerBg};
  margin: 0 10px 8px;
  @media (max-width: 768px) {
    padding: 14px 18px;
    width: calc(100% - 10px);
    height: 260px;
    border: none;
    border-radius: 30px 30px 10px 10px;
    background: ${(props) => props.theme.borderColor};
    margin: 70px auto 0px;
  }
`;

const PostlistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  height: 100%;
  width: 100%;
  padding: 10px 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin-top: 6px;
    padding: 0 5px;
    gap: 5px;
  }
`;
const ProfileWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Desk = styled.div`
  height: 84px;
  font-size: 18px;
  color: ${(props) => props.theme.fontcolor};
  word-break: break-all;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const IdWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const IdText = styled.h3`
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.nomalIconColor};
`;

const ImgWrap = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 50px;
  overflow: hidden;
`;
const Img = styled.img`
  width: 100%;
`;

const Nick = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${(props) => props.theme.fontcolor};
`;

const BottomWrap = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  button {
    padding: 10px;
    border-radius: 10px;
    color: ${(props) => props.theme.fontcolor};
    background-color: ${(props) => props.theme.headerBg};
    border: 2px solid ${(props) => props.theme.borderstroke};
  }
  @media screen and (max-width: 768px) {
    gap: 8px;
  }
`;

const FollowLink = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Follow = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.searchBar};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const LinkPlus = styled.div`
  border: 1px solid ${(props) => props.theme.nomalIconColor};
  border-radius: 50px;
  width: 24px;
  height: 24px;
  text-align: center;
  path {
    stroke: ${(props) => props.theme.nomalIconColor};
  }
`;

const PulsLinkIcon = styled.div`
  width: 50px;
  height: 22px;
  display: flex;
  align-items: center;
  gap: 8px;
  path {
    width: 22px;
    height: 22px;
    text-align: center;
    stroke: ${(props) => props.theme.fontcolor};
  }
`;

const ThreadInner = styled.div`
  width: 100%;
  height: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  margin-bottom: 6px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 0px;
  }
  button {
    flex: 0 0 auto;
    width: 130px;
    padding: 10px 20px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: all;

    @media (max-width: 768px) {
      width: 90px;
      padding: 8px 15px;
      background-color: ${(props) => props.theme.borderColor};
    }
    @media (max-width: 480px) {
      width: 80px;
      padding: 6px 10px;
    }
  }
`;

const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: calc(100% - 80px);
  padding: 10px 0px 260px;
  overflow-y: scroll;
  scrollbar-width: none;
  transition: transform 0.3s ease-out;
  ::-webkit-scrollbar {
    display: none;
  }
  &.bounce {
    animation: bounce-back 1s ease-in-out;
  }

  @keyframes bounce-back {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(40px); /* 살짝 위로 올렸다가 */
    }
    100% {
      transform: translateY(0px); /* 원래 자리로 돌아오기 */
    }
  }
`;

const ButtonStyle = styled.button`
  background-color: ${(props) => props.theme.headerBg};
`;

const Profile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser; //유저정보

  const [avatar, setAvarta] = useState(null || undefined); //이미지관리목적
  const [posts, setPosts] = useState([]); //데이터베이스에 객체형태로 정의된 데이터들
  const [editbtn, setEditbtn] = useState(true);
  const [searchParams] = useSearchParams();
  //emailAdress
  // const [emailAdress, setEmailAdress] = useState("");
  // const adress = searchParams.get("email");
  const emailAdress = searchParams.get("email");
  const [followModal, setFollowModal] = useState(false);
  const [linkmodal, setLinkModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [otherBtn, setOtherBtn] = useState(false);
  const [followNum, setFollowNum] = useState(Math.floor(Math.random() * 10));
  const [profile, setProfile] = useState({
    postId: "",
    username: "",
    userId: "",
    userEmail: "",
    bio: "",
    isLinkPublic: true,
    isProfilePublic: true,
    img: `${avatar ?? ""}`,
    isFollowing: true,
    followNum: followNum,
  });

  const [savedData, setSavedData] = useState([]); // 모든 데이터를 저장
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 저장
  const [contentType, setContentType] = useState("thresds"); // 선택된 필터 상태
  // NotificationList에서 데이터를 받아옴
  const [isBouncing, setIsBouncing] = useState(false);
  const [comments, setComments] = useState([]);

  // const PickProfile = ()=>{
  //   if(!프롭스 == "") {
  //     setEmailAdress(프롭스)
  //   } else {
  //     setEmailAdress(adress)
  //   }
  // }

  const handleDataUpdate = (listData) => {
    if (listData.length > 0) {
      setSavedData(listData); // 전체 데이터를 저장
      setFilteredData(listData); // 필터링 없이 모든 데이터를 먼저 보여줌
    }
  };

  const buttonCheck = () => {
    if (user?.email === emailAdress) {
      setEditbtn(true);
    } else {
      setEditbtn(false);
    }
  };

  // const CheckProfile = async () => {
  //   try {
  //     const profileQuery = query(
  //       collection(db, "profile"),
  //       where("userEmail", "==", emailAdress)
  //     );
  //     const unsubscribe = onSnapshot(profileQuery, (querySnapshot) => {
  //       //db에 firebase에 사람이 있다면 ?
  //       if (!querySnapshot.empty) {
  //         const profileDoc = querySnapshot.docs[0].data(); //이메일이 프로필db에 있는 사람의 데이터.
  //         const imgUrl = profileDoc.img;
  //         // const imgUrl = ref(storage, `avatars/${profileDoc.userId}`);

  //         // 에러
  //         setAvarta(imgUrl);
  //         //유저 정보가 있다면
  //         if (!profileDoc.empty) {
  //           setProfile((prev) => ({
  //             ...prev,
  //             postId: profileDoc.postId,
  //             username: profileDoc.username,
  //             userEmail: profileDoc.userEmail,
  //             bio: profileDoc.bio,
  //             isLinkPublic: profileDoc.isLinkPublic,
  //             isProfilePublic: profileDoc.isProfilePublic,
  //             img: imgUrl,
  //             isFollowing: profileDoc.isFollowing,
  //             followNum: profileDoc.followNum,
  //           }));
  //         }
  //       } else {
  //         // 사람이 없다면?
  //         setProfile((prev) => ({
  //           ...prev,
  //           postId: "",
  //           username: emailAdress,
  //           userEmail: emailAdress,
  //           bio: "",
  //           isLinkPublic: true,
  //           isProfilePublic: true,
  //           img: null,
  //           isFollowing: true,
  //           followNum: Math.floor(Math.random() * 10),
  //         }));
  //       }
  //     });
  //     return () => unsubscribe();
  //   } catch (error) {}
  // };

  const CheckProfile = async () => {
    try {
      const profileQuery = query(
        collection(db, "profile"),
        where("userEmail", "==", emailAdress)
      );
      const unsubscribe = onSnapshot(profileQuery, async (querySnapshot) => {
        if (!querySnapshot.empty) {
          const profileDoc = querySnapshot.docs[0].data();
          const imgUrl = profileDoc.img;

          // 현재 사용자가 팔로우 중인지 확인
          const currentUserRef = doc(db, "users", currentUser.uid);
          const currentUserDoc = await getDoc(currentUserRef);
          const { following = [] } = currentUserDoc.data();

          setProfile((prev) => ({
            ...prev,
            postId: profileDoc.postId,
            username: profileDoc.username,
            userEmail: profileDoc.userEmail,
            bio: profileDoc.bio,
            isLinkPublic: profileDoc.isLinkPublic,
            isProfilePublic: profileDoc.isProfilePublic,
            img: imgUrl,
            isFollowing: following.includes(profileDoc.userId), // 배열 포함 여부로 확인
            followNum: profileDoc.followNum,
          }));
        } else {
          setProfile((prev) => ({
            ...prev,
            postId: "",
            username: emailAdress,
            userEmail: emailAdress,
            bio: "",
            isLinkPublic: true,
            isProfilePublic: true,
            img: null,
            isFollowing: false,
            followNum: Math.floor(Math.random() * 10),
          }));
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("프로필 확인 실패:", error);
    }
  };

  useEffect(() => {
    CheckProfile();
    buttonCheck();
  }, [emailAdress]);

  const fetchComments = async () => {
    try {
      // 이메일이 없으면 종료
      if (!emailAdress) return;

      // 'contents' 컬렉션에서 이메일이 일치하는 문서 가져오기
      const commentsRef = collection(db, "contents");
      const q = query(commentsRef, where("email", "==", emailAdress));
      const querySnapshot = await getDocs(q);

      // 각 문서에서 'comments' 서브 컬렉션 가져오기
      const commentsPromises = querySnapshot.docs.map(async (doc) => {
        const commentsCollectionRef = collection(doc.ref, "comments");
        const commentsQuery = query(
          commentsCollectionRef,
          orderBy("createdAt", "desc")
        );
        const commentsSnapshot = await getDocs(commentsQuery);

        // 댓글 데이터를 배열로 변환
        return commentsSnapshot.docs.map((commentDoc) => ({
          id: commentDoc.id,
          ...commentDoc.data(),
        }));
      });

      // 모든 댓글을 가져오고 평탄화하여 단일 배열로 만듭니다.
      const commentsLists = await Promise.all(commentsPromises);
      const flattenedComments = commentsLists.flat();

      // 댓글 리스트 상태에 저장
      setComments(flattenedComments);

      if (flattenedComments.length === 0) {
      }
    } catch (error) {}
  };

  const onfollow = () => {
    setFollowModal((prev) => !prev);
    //팔로우 클릭
  };

  const onLinkPlus = () => {
    setLinkModal((prev) => !prev);
    //아이콘추가
  };

  const onProfileEdite = () => {
    setEditModal((prev) => !prev);
    //프로필수정모달
  };

  const onOtherbtn = () => {
    setOtherBtn((prev) => !prev);
    //프로필수정모달
  };

  useEffect(() => {
    fetchComments();

    let unsubscribe = null;
    const fetchPosts = async () => {
      const postsQuery = query(
        collection(db, "contents"),
        where("email", "==", emailAdress),
        orderBy("createdAt", "desc"),
        limit(15)
      );
      unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const { createdAt, photos, videos, post, userId, username, email } =
            doc.data();
          return {
            id: doc.id,
            createdAt,
            photos: photos || [],
            videos: videos || [],
            post,
            userId,
            username,
            email,
          };
        });
        setPosts(posts);
      });
    };
    fetchPosts();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  useEffect(() => {
    let unsubscribe = null;
    const fetchPosts = async () => {
      const postsQuery = query(
        collection(db, "contents"),
        where("email", "==", emailAdress),
        orderBy("createdAt", "desc"),
        limit(15)
      );
      unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const { createdAt, photos, videos, post, userId, username, email } =
            doc.data();
          return {
            id: doc.id,
            createdAt,
            photos: photos || [],
            videos: videos || [],
            post,
            userId,
            username,
            email,
          };
        });
        setPosts(posts);
      });
    };
    fetchPosts();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  const handleProfileChange = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  // 필터링
  const filterList = (type) => {
    if (type === "thresds") {
      setFilteredData(posts);
    } else if (type === "photos") {
      const filteredPhotos = posts.filter((data) => data.photos.length > 0);
      setFilteredData(filteredPhotos);
    } else if (type === "videos") {
      const filteredVideos = posts.filter((data) => data.videos.length > 0);
      setFilteredData(filteredVideos);
    } else if (type === "comment") {
      setFilteredData(comments);
    }
  };

  // 버튼 클릭 시 필터링 적용
  const handleButtonClick = (type) => {
    setContentType(type); // 필터 상태 업데이트
    filterList(type); // 필터링 적용
  };

  const handleScroll = () => {
    const element = wrapperRef.current;
    // 스크롤이 가장 위에 도달했는지 확인
    if (element.scrollTop === 0) {
      // 텐션감을 위한 애니메이션 트리거
      setIsBouncing(true);

      // 0.5초 후에 애니메이션 클래스 제거
      setTimeout(() => {
        setIsBouncing(false);
      }, 500);
    }
  };

  const wrapperRef = useRef(null);
  const getButtonStyle = (type) => ({
    color: contentType === type ? "#000" : "rgba(204, 204, 204, 0.8)",
    borderBottom: contentType === type ? "1.5px solid #000" : "none",
  });

  const buttons = [
    { label: "스레드", type: "thresds" },
    { label: "답글", type: "comment" },
    { label: "사진", type: "photos" },
    { label: "동영상", type: "videos" },
  ];
  return (
    <div>
      {followModal ? (
        <FollowModal open={true} close={onfollow} profile={profile} />
      ) : (
        <FollowModal open={false} close={onfollow} profile={profile} />
      )}
      {linkmodal ? (
        <LinkPluse open={true} close={onLinkPlus} />
      ) : (
        <LinkPluse open={false} close={onLinkPlus} />
      )}
      {editmodal ? (
        <ProfileEdit
          open={true}
          close={onProfileEdite}
          profile={profile}
          onProfileChange={() => handleProfileChange}
        />
      ) : (
        <ProfileEdit
          open={false}
          close={onProfileEdite}
          profile={profile}
          onProfileChange={() => handleProfileChange}
        />
      )}
      {otherBtn ? (
        <OtherBtnModal
          open={true}
          close={onOtherbtn}
          profile={profile}
          onProfileChange={() => handleProfileChange}
        />
      ) : (
        <OtherBtnModal
          open={false}
          close={onOtherbtn}
          profile={profile}
          onProfileChange={() => handleProfileChange}
        />
      )}
      <Wrapper>
        <BoederWrapper>
          <PostlistWrapper>
            <ProfileInnner>
              <ProfileWrap>
                <IdWrap>
                  <Nick> {profile.username}</Nick>
                  <IdText>{emailAdress}</IdText>
                </IdWrap>
                <ImgWrap>
                  {Boolean(avatar) ? (
                    <Img src={avatar} />
                  ) : (
                    <UserIcon2 width="54" fill="#BABABA" />
                  )}
                </ImgWrap>
              </ProfileWrap>
              <BottomWrap>
                <Desk>{profile.bio ?? "프로필을 꾸며보세요!"}</Desk>
                <FollowLink>
                  <Follow onClick={onfollow}>팔로워 {profile.followNum}</Follow>
                  {profile.isLinkPublic ? (
                    <Links>
                      {user?.email === emailAdress ? (
                        <LinkPlus onClick={onLinkPlus}>
                          <PlusIcon width="16px" />
                        </LinkPlus>
                      ) : null}

                      <PulsLinkIcon>
                        <InstaIcon />
                        <FacebookIcon />
                      </PulsLinkIcon>
                    </Links>
                  ) : null}
                </FollowLink>
                {user?.email === emailAdress ? (
                  <Button
                    type="edit"
                    text="프로필 수정"
                    onClick={onProfileEdite}
                    heith={"40px"}
                  />
                ) : (
                  <Button type="edit" text="팔로잉" onClick={onOtherbtn} />
                )}
              </BottomWrap>
            </ProfileInnner>
            <ThreadInner>
              <ButtonGroup>
                {buttons.map((button) => (
                  <ButtonStyle
                    key={button.type}
                    style={getButtonStyle(button.type)}
                    onClick={() => handleButtonClick(button.type)}
                  >
                    {button.label}
                  </ButtonStyle>
                ))}
              </ButtonGroup>
              <PostWrap
                ref={wrapperRef}
                className={isBouncing ? "bounce" : ""}
                onScroll={handleScroll}
              >
                {contentType === "thresds"
                  ? posts.map((post) => <Post key={post.id} {...post} />)
                  : filteredData.map((filter) => (
                      <Post key={filter.id} {...filter} />
                    ))}
              </PostWrap>
            </ThreadInner>
          </PostlistWrapper>
        </BoederWrapper>
      </Wrapper>
    </div>
  );
};

export default Profile;
