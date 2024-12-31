import React, { useState, useEffect } from "react";
import InstaTextLogo from "./InstaTextLogo";
import LogoTextMark from "../LoadingLogo/LogoTextMark";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { useMediaQuery } from "react-responsive";
import Border from "../Common/Border_de";
import { InstaIcon } from "../Common/Icon";
import FacebookBtn from "./FacebookBtn";
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
  SingnUpText,
  ForgotPasswordText,
  Hr,
  Or,
  Linebreak,
  StyledSpan,
  LoginInstaUl,
  LoginInstaLi,
} from "./RecycleStyles/login_dk";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginItemInstaDk = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useAuth(); // 현재 사용자 상태를 가져옴

  useEffect(() => {
    if (currentUser) {
      // 사용자가 로그인한 상태라면 Home으로 리디렉션
      navigate("/");
    }
  }, [currentUser, navigate]);

  // 로컬스토리지 기본 아이디 목록 가져오기
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
    setAccounts(storedAccounts);
  }, []);

  const handleAccountClick = async (account) => {
    // 기존 계정으로 로그인 처리 로직
    // 계정 클릭 시 로그인 시도

    try {
      setIsLoading(true);
      // Firebase Authentication에 해당 계정으로 로그인 시도 (비밀번호는 미리 설정된 값으로 처리해야 함)
      await signInWithEmailAndPassword(auth, account.email, account.password);

      navigate("/");
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "id") setId(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || id === "" || password === "") return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, id, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <BgImg $isSmallScreen={isSmallScreen} src="/login/thread_login_bg.png" />
      {accounts.length > 0 ? (
        <LoginInner>
          <LogoWrapper $isSmallScreen={isSmallScreen}>
            {/* <Logo width={40} /> */}
            <InstaTextLogo width={183} />
          </LogoWrapper>
          <LoginP>
            <Link to="/login">
              <LogoTextMark width={62} />
              <StyledSpan $isSmallScreen={isSmallScreen}>로 이동</StyledSpan>
            </Link>
          </LoginP>
          <LoginInstaUl>
            {accounts.map((account, index) => (
              <LoginInstaLi
                key={index}
                onClick={() => handleAccountClick(account)}
              >
                {account.email}
              </LoginInstaLi>
            ))}
          </LoginInstaUl>
          <FacebookBtn />
        </LoginInner>
      ) : (
        <LoginInner>
          <LogoWrapper $isSmallScreen={isSmallScreen}>
            {/* <Logo width={40} /> */}
            <InstaTextLogo width={183} />
          </LogoWrapper>
          <LoginP>
            <Link to="/login">
              <LogoTextMark width={62} />
              <StyledSpan $isSmallScreen={isSmallScreen}>로 이동</StyledSpan>
            </Link>
          </LoginP>
          <Form onSubmit={onSubmit}>
            <InputWrapper>
              <StyledInput
                onChange={onChange}
                type="text" // 'id'는 유효한 input 타입이 아니므로 'text'로 수정
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
                name="password"
                placeholder=""
                required
                value={password}
              />
              <StyledLabel htmlFor="password">비밀번호</StyledLabel>
            </InputWrapper>
            <InputWrapper>
              <StyledInput
                className="insta-btn"
                type="submit"
                value={isLoading ? "0.." : "로그인"}
              />
            </InputWrapper>
            {/* 
          <Link to="/create-account">
            <SingnUpText>다른 INSTAGRAM 계정으로 로그인</SingnUpText>
          </Link> */}

            <Linebreak $isSmallScreen={isSmallScreen}>
              <Hr $isSmallScreen={isSmallScreen} />
              <Or $isSmallScreen={isSmallScreen}>또는</Or>
              <Hr $isSmallScreen={isSmallScreen} />
            </Linebreak>
          </Form>
          <FacebookBtn />
        </LoginInner>
      )}
    </Wrapper>
  );
};

export default LoginItemInstaDk;
