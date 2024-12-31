import React, { useState, useEffect } from "react";
import Logo from "../LoadingLogo/Logo";
import LogoTextMark from "../LoadingLogo/LogoTextMark";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { useMediaQuery } from "react-responsive";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../../Contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";

import {
  Wrapper,
  BgImg,
  LoginInner,
  LogoWrapper,
  LoginP,
  Form,
  InputWrapper,
  StyledInput,
  StyledLabel,
  Error,
} from "./RecycleStyles/login_dk";

const CreateAccountItemDk = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const { currentUser } = useAuth(); // 현재 사용자 상태를 가져옴

  useEffect(() => {
    if (currentUser) {
      // 사용자가 로그인한 상태라면 Home으로 리디렉션
      navigate("/");
    }
  }, [currentUser, navigate]);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  // 입력 필드 변경 핸들러
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "id") setId(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  // 유효성 검사
  const validateForm = () => {
    if (id === "" || password === "" || confirmPassword === "") {
      setError("모든 필드를 입력해 주세요.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const createUserInFirestore = async (user) => {
    try {
      if (!user || !user.uid) {
        throw new Error("User 객체가 유효하지 않습니다. UID가 없습니다.");
      }

      // Firestore에 사용자 정보 추가
      const userRef = doc(db, "users", user.uid); // userId 대신 uid 사용
      await setDoc(userRef, {
        userId: user.uid,
        username: user.displayName || "Anonymous",
        email: user.email || "unknown", // 이메일이 없을 경우 대비
        followers: [], // 초기 팔로워 배열
        following: [], // 초기 팔로잉 배열
        createdAt: new Date(), // 가입 시간
      });
    } catch (error) {}
  };

  // 폼 제출 핸들러
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || !validateForm()) return;

    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        id,
        password
      );
      const userId = credentials.user.uid;

      await updateProfile(credentials.user, { displayName: id });

      // Firestore에 사용자 데이터 저장
      await createUserInFirestore(credentials.user);

      navigate("/");
    } catch (e) {
      console.error("회원가입 오류:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <BgImg $isSmallScreen={isSmallScreen} src="/login/thread_login_bg.png" />
      <LoginInner>
        <LogoWrapper $isSmallScreen={isSmallScreen}>
          <Logo width={40} />
        </LogoWrapper>
        <LoginP>
          <LogoTextMark width={66} />
          <span>계정 생성하기</span>
        </LoginP>
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <StyledInput
              onChange={onChange}
              type="email"
              id="id"
              name="id"
              placeholder=""
              required
              value={id}
            />
            <StyledLabel htmlFor="id">이메일 주소</StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              onChange={onChange}
              type="password"
              id="password"
              placeholder=""
              required
              name="password"
              value={password}
            />
            <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              onChange={onChange}
              type="password"
              id="confirmPassword"
              placeholder=""
              required
              name="confirmPassword"
              value={confirmPassword}
            />
            <StyledLabel htmlFor="confirmPassword">비밀번호 확인</StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              type="submit"
              value={isLoading ? "회원가입 중" : "회원가입 하기"}
            />
          </InputWrapper>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
      </LoginInner>
    </Wrapper>
  );
};

export default CreateAccountItemDk;
