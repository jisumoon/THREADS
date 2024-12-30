import React, { useState, useEffect } from "react";
import Logo from "../LoadingLogo/Logo";
import LogoTextMark from "../LoadingLogo/LogoTextMark";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useMediaQuery } from "react-responsive";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../../Contexts/AuthContext";

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
      await updateProfile(credentials.user, {
        displayName: id,
      });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        // Firebase 에러 코드에 따른 메시지 처리
        if (e.code === "auth/email-already-in-use") {
          setError("이미 존재하는 아이디입니다.");
        } else {
          setError(e.message); // 다른 에러의 경우 기본 메시지 출력
        }
      }
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
            <StyledLabel htmlFor="id">
              사용자 이름, 전화번호 또는 이메일 주소
            </StyledLabel>
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
              value={isLoading ? "ㅋ.." : "회원가입 하기"}
            />
          </InputWrapper>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
      </LoginInner>
    </Wrapper>
  );
};

export default CreateAccountItemDk;
