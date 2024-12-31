import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { UserIcon2 } from "../Common/Icon";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../Common/Button";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
`;

const PofileModalBox = styled.div`
  width: 450px;
  height: 530px;
  border-radius: 12px;
  background: ${(props) => props.theme.borderColor};
  padding: 64px 11px 0 11px;
  color: ${(props) => props.theme.fontcolor};
  position: relative;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    border: 1px solid #f00;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.headerBg};
    padding: 40% 20px;
    border-radius: 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${(props) => props.theme.fontcolor};
  font-size: 18px;
  cursor: pointer;
`;

const Box = styled.div`
  width: 100%;
  border: 2px solid ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: ${(props) => props.theme.headerBg};
  margin-bottom: 10px;
  &.mobile {
    display: none;
    margin-top: 8px;
    @media screen and (max-width: 768px) {
      display: block;
      text-align: center;
      background: ${(props) => props.theme.borderstroke};
      &:hover {
        background: ${(props) => props.theme.followerfont};
        color: ${(props) => props.theme.btnBgColor};
      }
    }
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NameInput = styled.input`
  background-color: inherit;
  border-bottom: 1px solid ${(props) => props.theme.nomalIconColor};
  width: 100%;
  color: ${(props) => props.theme.userIcon};
  &::placeholder {
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
`;

const BioWrap = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    color: ${(props) => props.theme.nomalIconColor};
    font-weight: 300;
    font-size: 14px;
  }
`;

const Full = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Checkinner = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Switch = styled(motion.label)`
  width: 46px;
  height: 30px;
  background-color: ${(props) => props.theme.mouseHoverBg};
  display: flex;
  justify-content: flex-start;
  border-radius: 50px;
  padding: 3px;
  border: 2px solid ${(props) => props.theme.borderstroke};
  cursor: pointer;
  &[data-ison="true"] {
    justify-content: flex-end;
    background-color: ${(props) => props.theme.searchBar};
  }
`;

const Handle = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.theme.btnBgColor};
  border-radius: 40px;
`;

const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.fontcolor};
`;
const ImgBox = styled.label`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 50px;
  overflow: hidden;
  background-color: ${(props) => props.theme.mouseHoverBg};
`;
const Img = styled.img`
  width: 100%;
`;

const ImgInput = styled.input`
  display: none;
`;

const ButtonWrap = styled.div`
  button {
    color: ${(props) => props.theme.fontcolor};
    background-color: ${(props) => props.theme.headerBg};
    border: 2px solid ${(props) => props.theme.borderstroke};
  }
`;

const InputBtn = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid;
  color: ${(props) => props.theme.fontcolor};
  background-color: ${(props) => props.theme.headerBg};
  border: 2px solid ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  font-size: 14px;
  padding: 4px 15px;

  &:hover {
    background: ${(props) => props.theme.searchBar};
    color: ${(props) => props.theme.btnBgColor};
  }
  @media screen and (max-width: 768px) {
    display: block;
    text-align: center;
    background: ${(props) => props.theme.borderstroke};
    &:hover {
      background: ${(props) => props.theme.followerfont};
      color: ${(props) => props.theme.btnBgColor};
    }
  }
`;

const ProfileEdit = React.memo(({ open, close, profile, onProfileChange }) => {
  const [profileData, setProfileData] = useState(profile); //전체적인 프로필 내용
  const [inputData, setInputDate] = useState({}); //>> 인풋 값을 받을 state
  const user = auth.currentUser; //유저 계정 내용 ( displayName , email , photoURL  , uid)
  const [avatar, setAvarta] = useState(user?.photoURL || ""); // 유저의 이미지를 변경할 state
  const [textNum, setTextNum] = useState(); //텍스트 숫자

  // isOn 값
  const [isOn, setIsOn] = useState(true);
  const [isOn2, setIsOn2] = useState(true);

  useEffect(() => {
    if (profileData.isLinkPublic === false) {
      setIsOn(false);
    }
    if (profileData.isProfilePublic === false) {
      setIsOn2(false);
    }
  }, [open]);

  useEffect(() => {
    setProfileData({ ...profile });
  }, [profile]);

  useEffect(() => {
    setProfileData((prev) => ({
      ...prev,
      img: avatar,
    }));
  }, [avatar]);

  // 팔로우 정보 및 상태를 가져오는 함수
  const fetchFollowData = async () => {
    try {
      if (!user?.uid || !profile?.userId) {
        console.error("현재 사용자 또는 프로필 정보가 없습니다.");
        return;
      }

      const currentUserRef = doc(db, "users", user.uid); // 현재 사용자 문서
      const profileUserRef = doc(db, "users", profile.userId); // 프로필 대상 사용자 문서

      // 현재 사용자 데이터 가져오기
      const [currentUserSnapshot, profileUserSnapshot] = await Promise.all([
        getDoc(currentUserRef),
        getDoc(profileUserRef),
      ]);

      let isFollowing = false;
      let followerCount = 0;

      // 현재 사용자의 팔로잉 상태 확인
      if (currentUserSnapshot.exists()) {
        const currentUserData = currentUserSnapshot.data();
        isFollowing = currentUserData.following.includes(profile.userId);
      }

      // 프로필 사용자의 팔로워 수 확인
      if (profileUserSnapshot.exists()) {
        const profileUserData = profileUserSnapshot.data();
        followerCount = profileUserData.followers
          ? profileUserData.followers.length
          : 0;
      }

      // 상태 업데이트
      setProfileData((prev) => ({
        ...prev,
        isFollowing,
        followNum: followerCount,
      }));
    } catch (error) {
      console.error("팔로우 정보를 가져오는 중 오류 발생:", error);
    }
  };

  // useEffect에서 팔로우 데이터 가져오기
  useEffect(() => {
    if (profile.userId) {
      fetchFollowData();
    }
  }, [profile.userId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue =
      value === "" ? profile[name] : type === "checkbox" ? checked : value;
    setInputDate((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));
    if (type === "checkbox") {
      setProfileData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
    if (name === "bio") {
      let num = e.target.value.length;
      if (num < 10) {
        let num1 = String(num.toString().padStart(2, "0"));
        setTextNum(num1);
      } else {
        setTextNum(num);
      }
    }
  };

  const onImgchange = async (e) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      if (file.size > 3 * 1024 * 1024) {
        alert("5MD 미만의 이미지만 사용 가능합니다.");
        return;
      }
      const locationRef = ref(storage, `avatars/${user?.uid}}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvarta(avatarUrl);
      await updateProfile(user, { photoURL: avatar });
    } else return;
  };

  const toggleSwitch = () => setIsOn(!isOn);
  const toggleSwitch2 = () => setIsOn2(!isOn2);

  const complete = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const nameToSave =
        inputData.username || profile.username || user.displayName;
      const bioToSave = inputData.bio || profile.bio || "";
      const imgToSave = avatar || "";
      const profileQuery = query(
        collection(db, "profile"),
        where("userEmail", "==", user.email)
      );

      const querySnapshot = await getDocs(profileQuery);
      if (querySnapshot.empty) {
        // 유저 데이터가 없을 때
        const newDocRef = await addDoc(collection(db, "profile"), {
          username: nameToSave,
          userId: user.uid,
          userEmail: user.email,
          bio: bioToSave,
          isLinkPublic: profileData.isLinkPublic,
          isProfilePublic: profileData.isProfilePublic,
          img: imgToSave,
          isFollowing: profile.isFollowing,
          followNum: profile.followNum,
        });
        await updateDoc(newDocRef, { postId: newDocRef.id });
      } else {
        //데이터가 있을 떄 업로드
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          username: nameToSave,
          userId: user.uid,
          userEmail: user.email,
          bio: bioToSave,
          isLinkPublic: profileData.isLinkPublic,
          isProfilePublic: profileData.isProfilePublic,
          img: imgToSave,
        });
      }
      // auth 정보 수정
      await updateProfile(user, {
        displayName: nameToSave,
        photoURL: avatar,
      });
      //여기에 있는 profile state값 변경
      setProfileData({
        ...profileData,
        username: nameToSave,
        bio: bioToSave,
        img: avatar,
      });
      onProfileChange({
        ...profileData,
        username: nameToSave,
        bio: bioToSave,
        img: avatar,
      });
      close();
    } catch (e) {
      console.log(e);
    }
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };
  if (!open) return null;

  return (
    <>
      <ModalOverlay onClick={close}>
        <PofileModalBox onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={close}>X</CloseButton>
          <Box style={{ height: "97px" }}>
            <Left style={{ width: "90%" }}>
              <SubTitle>이름</SubTitle>
              <NameInput
                name="username"
                placeholder={user.displayName || user.email}
                onChange={handleInputChange}
              />
            </Left>
            <ImgBox htmlFor="profileImg">
              {avatar == null || avatar == "" ? (
                <UserIcon2 width="54" fill="#BABABA" />
              ) : (
                <Img src={avatar} />
              )}
            </ImgBox>
            <ImgInput
              id="profileImg"
              type="file"
              accept="image/*"
              onChange={onImgchange}
            />
          </Box>
          <Box style={{ height: "100px" }}>
            <Full>
              <SubTitle>
                <BioWrap>
                  자기소개<p>{textNum || "00"}</p>
                </BioWrap>
              </SubTitle>
              <NameInput
                name="bio"
                placeholder={profileData.bio || "자기소개를 입력하세요"}
                onChange={handleInputChange}
                maxlength="120"
              />
            </Full>
          </Box>
          <Box style={{ height: "60px" }}>
            <Checkinner>
              <SubTitle>연동 링크 공개</SubTitle>
              <Switch
                data-ison={isOn}
                onClick={toggleSwitch}
                htmlFor="isLinkPublic"
              >
                <Handle layout transition={spring} />
              </Switch>
              <input
                style={{ display: "none" }}
                type="checkbox"
                name="isLinkPublic"
                id="isLinkPublic"
                checked={profileData.isLinkPublic}
                onChange={handleInputChange}
              />
            </Checkinner>
          </Box>
          <Box style={{ height: "60px" }}>
            <Checkinner>
              <SubTitle>비공개 프로필</SubTitle>
              <Switch
                data-ison={isOn2}
                onClick={toggleSwitch2}
                htmlFor="isProfilePublic"
              >
                <Handle layout transition={spring} />
              </Switch>
              <input
                style={{ display: "none" }}
                type="checkbox"
                name="isProfilePublic"
                id="isProfilePublic"
                checked={profileData.isProfilePublic}
                onChange={handleInputChange}
              />
            </Checkinner>
          </Box>
          <ButtonWrap>
            <InputBtn onClick={complete}>완료</InputBtn>
          </ButtonWrap>
          <Box className="mobile" onClick={close}>
            모달 닫기
          </Box>
        </PofileModalBox>
      </ModalOverlay>
    </>
  );
});

export default ProfileEdit;
