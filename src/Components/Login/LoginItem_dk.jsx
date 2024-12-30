// import React, { useState, useEffect } from "react";
// import Logo from "../LoadingLogo/Logo";
// import LogoTextMark from "../LoadingLogo/LogoTextMark";
// import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../../firebase";
// import { FirebaseError } from "firebase/app";
// import { useMediaQuery } from "react-responsive";
// import Border from "../Common/Border_dk";
// import ReportModal from "./ReportModal";
// import Loading from "../LoadingLogo/Loading";
// import {
//   EyeOpenIcon,
//   EyeCloseIcon,
//   AttentionNote,
//   RightArrowIcon,
// } from "../Common/Icon";
// import styled from "styled-components";
// import Intro from "../Intro";
// import {
//   Wrapper,
//   BgImg,
//   LoginInner,
//   LogoWrapper,
//   LoginP,
//   Form,
//   InputWrapper,
//   StyledInput,
//   StyledLabel,
//   SingnUpText,
//   ForgotPasswordText,
//   Hr,
//   Or,
//   Error,
//   Linebreak,
//   StyledSpan,
//   FooterWrapper,
//   FooterContainer,
//   FooterMenuUl,
//   FooterMenuLi,
//   FooterMenubasic,
// } from "./RecycleStyles/login_dk";

// import { signInWithEmailAndPassword } from "firebase/auth";

// import { keyframes } from "styled-components";

// // 다은 추가 스타일 여기부터

// // 오른쪽으로 이동하는 애니메이션 정의
// const MoveRight = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(5px);
//   }
// `;

// // IconWrapper 스타일 정의
// const IconWrapper = styled.div`
//   display: inline-block;
//   transition: transform 0.3s ease;

//   // 호버 시 애니메이션 적용
//   ${Border}:hover & {
//     animation: ${MoveRight} 0.3s forwards;
//   }
// `;
// const PasswordInput = styled.input`
//   padding: 20px;
//   width: 100%;
//   height: 54px;
//   border: none;
//   border-radius: 12px;
//   font-size: 14px;
//   font-weight: 400;
//   color: #7e7e7e;
//   box-shadow: 0 0 0 0 ${(props) => props.theme.loginInputSelectColor};
//   transition: all 0.2s ease-in-out;
//   margin-bottom: 24px;
//   margin-right: 30px;
//   &:focus + label,
//   &:not(:placeholder-shown) + label {
//     opacity: 0;
//   }
//   &:focus {
//     outline: none;
//     box-shadow: 0 0 1px 2px ${(props) => props.theme.loginInputSelectColor};
//   }
//   &[type="submit"] {
//     cursor: pointer;
//     background-color: #000;
//     color: #fff;
//     border: 1px solid ${(props) => props.theme.mouseHoverFontcolor};
//     margin-bottom: 27px;
//   }
//   &.insta-btn {
//     width: 100%;
//     height: 37px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: #67b5fa;
//     outline: none;
//     border: none;
//     padding: 0px;
//     color: #fff;
//     border-radius: 12px;
//   }
// `;

// const IntroWrapper = styled.div`
//   position: absolute;
//   left: 0px;
//   top: 0px;
//   z-index: 9999999;
// `;

// const EyeIconWrapper = styled.div`
//   position: absolute;
//   right: 10px;
//   top: 28px;
//   transform: translateY(-50%);
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   svg {
//     width: 28px;
//     height: 28px;
//     transition: fill 0.2s, stroke 0.2s; /* 부드러운 전환 효과 */
//   }
//   &:hover svg {
//     fill: #000; /* 호버 시 색상 */
//   }
// `;

// const PasswordError = styled.div`
//   color: red;
//   font-size: 12px;
//   font-weight: 400;
//   display: flex;
//   justify-content: flex-end; /* 오른쪽 정렬 */
//   margin-top: -12px; /* 아이콘과의 간격 조정 */
// `;

// // 다은 추가 스타일 여기까지!

// const LoginItemDk = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");

//   // modal showing
//   const [showing, setShowing] = useState(false);
//   const toggleShowing = () => setShowing((prev) => !prev);

//   const navigate = useNavigate();

//   // 다은 추가 미디어 쿼리
//   const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
//   const isTablet = useMediaQuery({
//     query: "(min-width: 769px) and (max-width: 1024px)",
//   });

//   // 다은 키보드 열었을 때 푸터 안보이게 하는 것
//   const [dynamicBottom, setDynamicBottom] = useState(30); // 초기 값

//   useEffect(() => {
//     const updateFooterPosition = () => {
//       const keyboardOpen = window.innerHeight < window.visualViewport.height;
//       setDynamicBottom(keyboardOpen ? 0 : 30); // 키보드 열릴 때는 0으로 설정
//     };

//     window.visualViewport.addEventListener("resize", updateFooterPosition);
//     return () => {
//       window.visualViewport.removeEventListener("resize", updateFooterPosition);
//     };
//   }, []);

//   // 다은 추가 부분 여기부터
//   // 눈 아이콘 상태 변화
//   const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   // Caps 켜져있을 때 상태 변화
//   const [isCapsLockOn, setIsCapsLockOn] = useState(false);
//   const handleCapsLock = (e) => {
//     const isCaps = e.getModifierState && e.getModifierState("CapsLock");
//     setIsCapsLockOn(isCaps); // CapsLock이 켜지면 true로 설정
//   };
//   // PassWord 조건 안 맞았을 때 상태 변화
//   const [passwordError, setPasswordError] = useState(""); // 비밀번호 오류 메시지 상태
//   // 비밀번호 입력 핸들링
//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);

//     // 비밀번호 조건 체크
//     if (newPassword.length === 0) {
//       setPasswordError(""); // 비밀번호가 비어있을 때 경고 메시지 제거
//     } else if (newPassword.length < 6) {
//       setPasswordError("비밀번호는 최소 6자여야 합니다."); // 6자 미만 경고
//     } else if (newPassword.length > 12) {
//       setPasswordError("비밀번호는 최대 12자여야 합니다."); // 12자 초과 경고
//     } else {
//       setPasswordError(""); // 조건을 만족할 경우 경고 메시지 지우기
//     }
//   };
//   // 다은 추가

//   const onChange = (e) => {
//     const {
//       target: { name, value },
//     } = e;

//     if (name === "id") setId(value);
//     if (name === "password") setPassword(value);
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (isLoading || id === "" || password === "") return;
//     try {
//       setIsLoading(true);

//       await signInWithEmailAndPassword(auth, id, password);

//       // 로그인 성공 후 로컬 스토리지에 사용자 이메일과 비밀번호 저장
//       let storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
//       const userEmail = auth.currentUser.email;

//       // 중복된 계정이 없도록 이메일을 기준으로 추가
//       const accountExists = storedAccounts.some(
//         (account) => account.email === userEmail
//       );

//       if (!accountExists) {
//         storedAccounts.push({ email: userEmail, password });
//         localStorage.setItem("accounts", JSON.stringify(storedAccounts));
//       }

//       // 이동
//       navigate("/");
//     } catch (e) {
//       if (e instanceof FirebaseError) {
//         // Firebase 에러 처리
//         switch (e.code) {
//           case "auth/user-not-found":
//           case "auth/wrong-password":
//             setError("아이디나 비밀번호가 잘못되었습니다.");
//             break;
//           case "auth/invalid-email":
//             setError("유효한 이메일을 입력하세요.");
//             break;
//           default:
//             setError("아이디와 비밀번호를 확인해주세요.");
//         }
//       }
//       console.log(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // 다은 변경 각 텍스트 클릭시 특정 링크로 수정
//   const footerMenuList = [
//     {
//       label: "Threads 약관",
//       url: "https://help.instagram.com/769983657850450",
//     },
//     {
//       label: "개인정보처리방침",
//       url: "https://help.instagram.com/515230437301944",
//     },
//     {
//       label: "쿠키정책",
//       url: "https://privacycenter.instagram.com/policies/cookies/",
//     },
//     { label: "문제 신고", url: "https://www.threads.net/login" }, // 이부분은 우리가 만든 것으로 수정해야 될 것 같아요.
//   ];

//   return (
//     <Wrapper>
//       <BgImg $isSmallScreen={isSmallScreen} src="/login/thread_login_bg.png" />
//       <LoginInner>
//         <LogoWrapper $isSmallScreen={isSmallScreen}>
//           <Logo width={40} />
//         </LogoWrapper>
//         <LoginP>
//           <LogoTextMark width={66} />
//           <StyledSpan $isSmallScreen={isSmallScreen}>
//             계정으로 로그인
//           </StyledSpan>
//         </LoginP>
//         <Form onSubmit={onSubmit}>
//           {isLoading ? (
//             <IntroWrapper>
//               <Intro />
//             </IntroWrapper>
//           ) : null}

//           <InputWrapper>
//             <StyledInput
//               onChange={onChange}
//               type="text"
//               id="id"
//               name="id"
//               placeholder=""
//               required
//               value={id}
//             />
//             <StyledLabel htmlFor="id">
//               사용자 이름, 전화번호 또는 이메일 주소
//             </StyledLabel>
//           </InputWrapper>
//           <InputWrapper>
//             <PasswordInput
//               onChange={handlePasswordChange} // 비밀번호 입력 시 상태 변경
//               type={isPasswordVisible ? "text" : "password"}
//               id="password"
//               name="password"
//               placeholder=""
//               required
//               value={password}
//               onKeyDown={handleCapsLock} // 캡스락 핸들링
//               onBlur={() => setIsCapsLockOn(false)} // 캡스락 상태 초기화
//             />
//             <StyledLabel htmlFor="password">비밀번호</StyledLabel>
//             {/* Eye 아이콘: 비밀번호가 보이는 경우 EyeCloseIcon, 보이지 않는 경우 EyeOpenIcon */}
//             <EyeIconWrapper onClick={togglePasswordVisibility}>
//               {isPasswordVisible ? (
//                 <EyeCloseIcon width="28px" />
//               ) : (
//                 <EyeOpenIcon width="28px" />
//               )}
//             </EyeIconWrapper>
//             {/* CapsLock 경고 메시지 */}
//             {isCapsLockOn && (
//               <AttentionNote>Caps Lock이 켜져 있습니다.</AttentionNote>
//             )}
//             {/* 비밀번호 오류 메시지 */}
//             {passwordError && <PasswordError>{passwordError}</PasswordError>}
//           </InputWrapper>
//           <InputWrapper isSmallScreen={isSmallScreen} isTablet={isTablet}>
//             <StyledInput
//               type="submit"
//               value={isLoading ? "Loading.." : "로그인"}
//             />
//           </InputWrapper>
//           <Link to="/create-account">
//             <SingnUpText isSmallScreen={isSmallScreen} isTablet={isTablet}>
//               회원가입
//             </SingnUpText>
//           </Link>
//           <ForgotPasswordText isSmallScreen={isSmallScreen} isTablet={isTablet}>
//             비밀번호를 잊으셨나요?
//           </ForgotPasswordText>
//           <Linebreak isSmallScreen={isSmallScreen} isTablet={isTablet}>
//             <Hr $isSmallScreen={isSmallScreen} />
//             <Or $isSmallScreen={isSmallScreen}>또는</Or>
//             <Hr $isSmallScreen={isSmallScreen} />
//           </Linebreak>
//           <Link to="/login-insta">
//             <Border type="loginborder" text="instagram으로 계속">
//               <IconWrapper>
//                 {" "}
//                 <RightArrowIcon width="28px" />
//               </IconWrapper>
//             </Border>
//           </Link>
//           {error !== "" ? <Error>{error}</Error> : null}
//         </Form>
//       </LoginInner>
//       <FooterContainer isSmallScreen={isSmallScreen} isTablet={isTablet}>
//         <FooterWrapper>
//           <FooterMenuUl>
//             <FooterMenubasic>© 2024</FooterMenubasic>
//             {footerMenuList.map((menu, index) => (
//               <FooterMenuLi
//                 key={index}
//                 onClick={() => (window.location.href = menu.url)}
//               >
//                 {menu.label}
//               </FooterMenuLi>
//             ))}
//           </FooterMenuUl>
//         </FooterWrapper>
//       </FooterContainer>
//       <ReportModal
//         width="100%"
//         height="100vh"
//         background="rgba(255, 255, 255, 0.9)"
//         borderRadius="20px"
//         isVisible={showing}
//         setShowing={setShowing}
//       />
//     </Wrapper>
//   );
// };

// export default LoginItemDk;

import React, { useState, useEffect } from "react";
import Logo from "../LoadingLogo/Logo";
import LogoTextMark from "../LoadingLogo/LogoTextMark";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { useMediaQuery } from "react-responsive";
import Border from "../Common/Border_dk";
import ReportModal from "./ReportModal";
import Loading from "../LoadingLogo/Loading";
import {
  EyeOpenIcon,
  EyeCloseIcon,
  AttentionNote,
  RightArrowIcon,
} from "../Common/Icon";
import styled from "styled-components";
import Intro from "../Intro";
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
  Error,
  Linebreak,
  StyledSpan,
  FooterWrapper,
  FooterContainer,
  FooterMenuUl,
  FooterMenuLi,
  FooterMenubasic,
} from "./RecycleStyles/login_dk";

import { signInWithEmailAndPassword } from "firebase/auth";

import { keyframes } from "styled-components";

// 다은 추가 스타일 여기부터

// 오른쪽으로 이동하는 애니메이션 정의
const MoveRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(5px);
  }
`;

// IconWrapper 스타일 정의
const IconWrapper = styled.div`
  display: inline-block;
  transition: transform 0.3s ease;

  // 호버 시 애니메이션 적용
  ${Border}:hover & {
    animation: ${MoveRight} 0.3s forwards;
  }
`;

const PasswordInput = styled.input`
  padding: 20px;
  width: 100%;
  height: 54px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 400;
  color: #7e7e7e;
  box-shadow: 0 0 0 0 ${(props) => props.theme.loginInputSelectColor};
  transition: all 0.2s ease-in-out;
  margin-bottom: 24px;
  margin-right: 30px;
  &:focus + label,
  &:not(:placeholder-shown) + label {
    opacity: 0;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 1px 2px ${(props) => props.theme.loginInputSelectColor};
  }
  &[type="submit"] {
    cursor: pointer;
    background-color: #000;
    color: #fff;
    border: 1px solid ${(props) => props.theme.mouseHoverFontcolor};
    margin-bottom: 27px;
  }
  &.insta-btn {
    width: 100%;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #67b5fa;
    outline: none;
    border: none;
    padding: 0px;
    color: #fff;
    border-radius: 12px;
  }
`;

const IntroWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 9999999;
`;

const EyeIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 28px;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 28px;
    height: 28px;
    transition: fill 0.2s, stroke 0.2s; /* 부드러운 전환 효과 */
  }
  &:hover svg {
    fill: #000; /* 호버 시 색상 */
  }
`;

const PasswordError = styled.div`
  color: red;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  margin-top: -12px; /* 아이콘과의 간격 조정 */
`;

// 다은 추가 스타일 여기까지!

const LoginItemDk = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // modal showing
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);

  const navigate = useNavigate();

  // 다은 추가 미디어 쿼리
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 1024px)",
  });

  // 다은 키보드 열었을 때 푸터 안보이게 하는 것
  const [dynamicBottom, setDynamicBottom] = useState(30); // 초기 값

  useEffect(() => {
    const updateFooterPosition = () => {
      const keyboardOpen = window.innerHeight < window.visualViewport.height;
      setDynamicBottom(keyboardOpen ? 0 : 30); // 키보드 열릴 때는 0으로 설정
    };

    window.visualViewport.addEventListener("resize", updateFooterPosition);
    return () => {
      window.visualViewport.removeEventListener("resize", updateFooterPosition);
    };
  }, []);

  // 다은 추가 부분 여기부터
  // 눈 아이콘 상태 변화
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // Caps 켜져있을 때 상태 변화
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const handleCapsLock = (e) => {
    const isCaps = e.getModifierState && e.getModifierState("CapsLock");
    setIsCapsLockOn(isCaps); // CapsLock이 켜지면 true로 설정
  };
  // PassWord 조건 안 맞았을 때 상태 변화
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 오류 메시지 상태
  // 비밀번호 입력 핸들링
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // 비밀번호 조건 체크
    if (newPassword.length === 0) {
      setPasswordError(""); // 비밀번호가 비어있을 때 경고 메시지 제거
    } else if (newPassword.length < 6) {
      setPasswordError("비밀번호는 최소 6자여야 합니다."); // 6자 미만 경고
    } else if (newPassword.length > 12) {
      setPasswordError("비밀번호는 최대 12자여야 합니다."); // 12자 초과 경고
    } else {
      setPasswordError(""); // 조건을 만족할 경우 경고 메시지 지우기
    }
  };
  // 다은 추가

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "id") setId(value);
    if (name === "password") setPassword(value);
  };

  // 로그인 후 2초 동안 Intro 표시
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false); // 2초 뒤 로딩 상태 해제
      }, 2000);

      return () => clearTimeout(timer); // 타이머 클린업
    }
  }, [isLoading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || id === "" || password === "") return;
    try {
      setIsLoading(true);

      await signInWithEmailAndPassword(auth, id, password);

      // 로그인 성공 후 로컬 스토리지에 사용자 이메일과 비밀번호 저장
      let storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
      const userEmail = auth.currentUser.email;

      // 중복된 계정이 없도록 이메일을 기준으로 추가
      const accountExists = storedAccounts.some(
        (account) => account.email === userEmail
      );

      if (!accountExists) {
        storedAccounts.push({ email: userEmail, password });
        localStorage.setItem("accounts", JSON.stringify(storedAccounts));
      }

      // 이동
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        // Firebase 에러 처리
        switch (e.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
            setError("아이디나 비밀번호가 잘못되었습니다.");
            break;
          case "auth/invalid-email":
            setError("유효한 이메일을 입력하세요.");
            break;
          default:
            setError("아이디와 비밀번호를 확인해주세요.");
        }
      }
    }
  };

  // 다은 변경 각 텍스트 클릭시 특정 링크로 수정
  const footerMenuList = [
    {
      label: "Threads 약관",
      url: "https://help.instagram.com/769983657850450",
    },
    {
      label: "개인정보처리방침",
      url: "https://help.instagram.com/515230437301944",
    },
    {
      label: "쿠키정책",
      url: "https://privacycenter.instagram.com/policies/cookies/",
    },
    { label: "문제 신고", url: "https://www.threads.net/login" }, // 이부분은 우리가 만든 것으로 수정해야 될 것 같아요.
  ];

  return (
    <Wrapper>
      <BgImg $isSmallScreen={isSmallScreen} src="/login/thread_login_bg.png" />
      <LoginInner>
        <LogoWrapper $isSmallScreen={isSmallScreen}>
          <Logo width={40} />
        </LogoWrapper>
        <LoginP>
          <LogoTextMark width={66} />
          <StyledSpan $isSmallScreen={isSmallScreen}>
            계정으로 로그인
          </StyledSpan>
        </LoginP>
        <Form onSubmit={onSubmit}>
          {isLoading && (
            <IntroWrapper>
              <Intro />
            </IntroWrapper>
          )}

          <InputWrapper>
            <StyledInput
              onChange={onChange}
              type="text"
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
            <PasswordInput
              onChange={handlePasswordChange} // 비밀번호 입력 시 상태 변경
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder=""
              required
              value={password}
              onKeyDown={handleCapsLock} // 캡스락 핸들링
              onBlur={() => setIsCapsLockOn(false)} // 캡스락 상태 초기화
            />
            <StyledLabel htmlFor="password">비밀번호</StyledLabel>
            {/* Eye 아이콘: 비밀번호가 보이는 경우 EyeCloseIcon, 보이지 않는 경우 EyeOpenIcon */}
            <EyeIconWrapper onClick={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <EyeCloseIcon width="28px" />
              ) : (
                <EyeOpenIcon width="28px" />
              )}
            </EyeIconWrapper>
            {/* CapsLock 경고 메시지 */}
            {isCapsLockOn && (
              <AttentionNote>Caps Lock이 켜져 있습니다.</AttentionNote>
            )}
            {/* 비밀번호 오류 메시지 */}
            {passwordError && <PasswordError>{passwordError}</PasswordError>}
          </InputWrapper>
          <InputWrapper isSmallScreen={isSmallScreen} isTablet={isTablet}>
            <StyledInput type="submit" value={isLoading ? "0.." : "로그인"} />
          </InputWrapper>
          <Link to="/create-account">
            <SingnUpText isSmallScreen={isSmallScreen} isTablet={isTablet}>
              회원가입
            </SingnUpText>
          </Link>
          <ForgotPasswordText isSmallScreen={isSmallScreen} isTablet={isTablet}>
            비밀번호를 잊으셨나요?
          </ForgotPasswordText>
          <Linebreak isSmallScreen={isSmallScreen} isTablet={isTablet}>
            <Hr $isSmallScreen={isSmallScreen} />
            <Or $isSmallScreen={isSmallScreen}>또는</Or>
            <Hr $isSmallScreen={isSmallScreen} />
          </Linebreak>
          <Link to="/login-insta">
            <Border type="loginborder" text="instagram으로 계속">
              <IconWrapper>
                {" "}
                <RightArrowIcon width="28px" />
              </IconWrapper>
            </Border>
          </Link>
          {error !== "" ? <Error>{error}</Error> : null}
        </Form>
      </LoginInner>
      <FooterContainer isSmallScreen={isSmallScreen} isTablet={isTablet}>
        <FooterWrapper>
          <FooterMenuUl>
            <FooterMenubasic>© 2024</FooterMenubasic>
            {footerMenuList.map((menu, index) => (
              <FooterMenuLi
                key={index}
                onClick={() => (window.location.href = menu.url)}
              >
                {menu.label}
              </FooterMenuLi>
            ))}
          </FooterMenuUl>
        </FooterWrapper>
      </FooterContainer>
      <ReportModal
        width="100%"
        height="100vh"
        background="rgba(255, 255, 255, 0.9)"
        borderRadius="20px"
        isVisible={showing}
        setShowing={setShowing}
      />
    </Wrapper>
  );
};

export default LoginItemDk;
