import { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  limit,
  orderBy,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import styled from "styled-components";
import Button from "../Components/Common/Button";
import Post2 from "../Components/Post2";
import {
  PlusIcon,
  InstaIcon,
  FacebookIcon,
  UserIcon2,
} from "../Components/Common/Icon";
import FollowModal from "../Components/profile/FollowModal";
import ProfileEdit from "../Components/profile/ProfileEdit";
import { useNavigate, useSearchParams } from "react-router-dom";
import OtherBtnModal from "../Components/profile/OtherBtnModal";
import { useAuth } from "../Contexts/AuthContext";
import { el } from "date-fns/locale";

const Wrapper = styled.div`
  height: 100vh;
  @media (max-width: 768px) {
    height: 100vh;
    width: 100%;
  }
`;
const BoederWrapper = styled.div`
  background: ${(props) => props.theme.borderColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 680px;
  bottom: 0;
  height: calc(100vh - 120px);
  border-radius: 40px 40px 0px 0px;
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
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
  background: ${(props) => props.theme.borderColor};
  margin: 0 10px 8px;
  @media (max-width: 768px) {
    padding: 14px 18px;
    width: calc(100% - 10px);
    height: 260px;
    border: none;
    border-radius: 30px 30px 10px 10px;
    background: ${(props) => props.theme.borderColor};
    margin: 40px auto 0px;
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
    gap: 5px;
  }
`;
const ProfileWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Desk = styled.div`
  padding-top: 20px;
  height: 84px;
  font-size: 14px;
  color: ${(props) => props.theme.fontcolor};
  word-break: break-all;
  @media (max-width: 768px) {
    font-size: 14px;
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
  display: flex;
  flex-direction: column;
  gap: 25px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    color: ${(props) => props.theme.headerBg};
    background-color: ${(props) => props.theme.selectedbtn};
    border: 2px solid ${(props) => props.theme.borderstroke};
    @media screen and (max-width: 480px) {
      width: 100%;
      margin-top: 10px;
    }
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

const OvarlayHC = styled.div`
  width: 680px;
  height: 20px;
  position: absolute;
  background: ${(props) =>
    `linear-gradient(${props.theme.borderColor}, #ffffff00)`};
  z-index: 5;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    width: 100%;
    gap: 0;
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
  & > div {
  }
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
  background: transparent;
  flex: 0 0 auto;
  width: 154px;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) =>
    props.selected ? props.theme.selectedbtn : props.theme.notSelectbtn};
  border-bottom: ${(props) =>
    props.selected ? `1px solid ${props.theme.selectedbtn}` : "none"};
  @media (max-width: 768px) {
    width: 100px;
    margin-bottom: 0px;
  }
`;

const NoResults = styled.p`
  font-size: 16px;
  text-align: center;
  color: #999;
  margin-top: 60px;
`;

const Profile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser; //유저정보

  const [avatar, setAvarta] = useState(null || undefined); //이미지관리목적
  const [posts, setPosts] = useState([]); //데이터베이스에 객체형태로 정의된 데이터들
  const [editbtn, setEditbtn] = useState(true);
  const [searchParams] = useSearchParams();
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
  const { currentUser } = useAuth(); // 현재 사용자 상태를 가져옴

  useEffect(() => {
    if (!currentUser) {
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
        navigate("/login"); // "예"를 누르면 로그인 페이지로 이동
      } else {
        navigate("/");
      }
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (emailAdress) {
      CheckProfile();
      fetchComments();
      if (profile.img) {
        setAvarta(profile.img); // profile.img가 있을 경우 avatar에 반영
      } else {
        setAvarta("");
      }
      handleButtonClick("thresds");
    }
  }, [emailAdress, profile.img]);

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
  }, [, emailAdress]);

  //이메일로 비교해서 db에 저장된 profile 데이터 비교 후 가져와 setProfile에 넣기기
  const CheckProfile = async () => {
    try {
      const profileQuery = query(
        collection(db, "profile"),
        where("userEmail", "==", emailAdress)
      );

      const unsubscribe = onSnapshot(profileQuery, (querySnapshot) => {
        //db에 firebase에 사람이 있다면 ?
        if (!querySnapshot.empty) {
          const profileDoc = querySnapshot.docs[0].data(); //이메일이 프로필db에 있는 사람의 데이터.
          const imgUrl = profileDoc.img;
          setAvarta(imgUrl);
          //유저 정보가 있다면
          if (!profileDoc.empty) {
            setProfile((prev) => ({
              ...prev,
              postId: profileDoc.postId,
              username: profileDoc.username,
              userEmail: profileDoc.userEmail,
              bio: profileDoc.bio,
              isLinkPublic: profileDoc.isLinkPublic,
              isProfilePublic: profileDoc.isProfilePublic,
              img: imgUrl,
              isFollowing: profileDoc.isFollowing,
              followNum: profileDoc.followNum,
            }));
          }
        } else {
          // 사람이 없다면?
          setProfile((prev) => ({
            ...prev,
            postId: "",
            username: emailAdress,
            userEmail: emailAdress,
            bio: "",
            isLinkPublic: true,
            isProfilePublic: true,
            img: null,
            isFollowing: true,
            followNum: Math.floor(Math.random() * 10),
          }));
        }
      });
      return () => unsubscribe();
    } catch (error) {}
  };

  useEffect(() => {
    if (posts.length > 0) {
      filterList("thresds");
    }
  }, [posts]);

  //이메일 정보로 content DB에 값 가져오기
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

  //// 모달 모음 ////
  //팔로우 클릭
  const onfollow = () => {
    setFollowModal((prev) => !prev);
  };

  //프로필수정모달
  const onProfileEdite = () => {
    setEditModal((prev) => !prev);
  };

  //프로필수정모달
  const onOtherbtn = () => {
    setOtherBtn((prev) => !prev);
  };

  const handleProfileChange = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  // 필터링 적용 함수
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
    setContentType(type);
    filterList(type);
  };

  const handleScroll = () => {
    const element = wrapperRef.current;
    if (element.scrollTop === 0) {
      setIsBouncing(true);

      setTimeout(() => {
        setIsBouncing(false);
      }, 500);
    }
  };

  const wrapperRef = useRef(null);

  const buttons = [
    { label: "스레드", type: "thresds" },
    { label: "답글", type: "comment" },
    { label: "사진", type: "photos" },
    { label: "동영상", type: "videos" },
  ];

  return (
    <>
      {followModal ? (
        <FollowModal open={true} close={onfollow} profile={profile} />
      ) : (
        <FollowModal open={false} close={onfollow} profile={profile} />
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
                      <PulsLinkIcon>
                        <a href={"https://www.instagram.com/"} target="_blank">
                          <InstaIcon />
                        </a>
                        <a
                          href="https://www.facebook.com/?locale=ko_KR"
                          target="_blank"
                        >
                          <FacebookIcon />
                        </a>
                      </PulsLinkIcon>
                    </Links>
                  ) : null}
                </FollowLink>
                {user?.email === emailAdress ? (
                  <Button
                    type="edit"
                    text="프로필 수정"
                    onClick={onProfileEdite}
                    height={"40px"}
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
                    onClick={() => handleButtonClick(button.type)}
                    selected={contentType === button.type}
                  >
                    {button.label}
                  </ButtonStyle>
                ))}
              </ButtonGroup>
              <OvarlayHC />
              <PostWrap
                ref={wrapperRef}
                className={isBouncing ? "bounce" : ""}
                onScroll={handleScroll}
              >
                {filteredData.length === 0 ? (
                  <NoResults>게시글이 없습니다.</NoResults>
                ) : (
                  filteredData.map((post) => <Post2 key={post.id} {...post} />)
                )}
              </PostWrap>
            </ThreadInner>
          </PostlistWrapper>
        </BoederWrapper>
      </Wrapper>
    </>
  );
};

export default Profile;
