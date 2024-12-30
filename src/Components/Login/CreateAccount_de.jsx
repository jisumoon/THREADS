import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../LoadingLogo/Logo";
import LogoTextMark from "../LoadingLogo/LogoTextMark";
import JoinQR from "../../images/QRcode.jpg";

const AppQRcode = styled.img`
  width: 70px;
  height: auto;
  position: absolute;
  top: 666px;
  left: 396px;
`;

import {
  LoginInner,
  LogoWrapper,
  LoginP,
  Form,
  InputWrapper,
  StyledInput,
  StyledBtn,
  StyledLabel,
} from "../Login/RecycleStyles/login_de";

import {
  CreateAccountWrapper,
  WelcomeMessage,
  CautionInfo,
} from "../Login/RecycleStyles/CreateAccountItem_de";

// const StyledInput = styled.button`
//   background: #0396f6;
// `;

const CreateAccount_de = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // 추가
  const [confirmPassword, setConfirmPassword] = useState(""); // 추가

  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "id") setId(value);
    if (id === "username") setUsername(value); // 수정
    if (id === "password") setPassword(value);
    if (id === "confirmPassword") setConfirmPassword(value);
  };

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <CreateAccountWrapper isSmallScreen={isSmallScreen}>
      <LoginInner>
        <LogoWrapper isSmallScreen={isSmallScreen}>
          <Logo width={40} />
        </LogoWrapper>
        <LoginP>
          <WelcomeMessage isSmallScreen={isSmallScreen}>
            <LogoTextMark width={62} />
            에서 다양한 사람과 소통해 보세요!
          </WelcomeMessage>
        </LoginP>
        <Form isSmallScreen={isSmallScreen} gap="24px">
          <InputWrapper>
            <StyledInput
              bgColor="#f0f0f0"
              onChange={onChange}
              type="text" // 수정
              id="id"
              placeholder=""
              required
              value={id}
            />
            <StyledLabel htmlFor="id">전화번호 또는 이메일 주소</StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              bgColor="#f0f0f0"
              onChange={onChange}
              type="text" // 수정
              id="username" // id 변경
              placeholder=""
              required
              value={username}
            />
            <StyledLabel htmlFor="username">사용자 이름</StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              bgColor="#f0f0f0"
              onChange={onChange}
              type="password"
              id="password"
              placeholder=""
              required
              value={password}
            />
            <StyledLabel htmlFor="password">
              비밀번호를 입력해주세요.
            </StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              bgColor="#f0f0f0"
              onChange={onChange}
              type="password"
              id="confirmPassword" // id 변경
              placeholder=""
              required
              value={confirmPassword} // 수정
              autoComplete="new-password"
            />
            <StyledLabel htmlFor="confirmPassword">
              비밀번호를 확인해주세요.
            </StyledLabel>
          </InputWrapper>
          <CautionInfo>
            저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에
            업로드했을 수도 있습니다.
          </CautionInfo>
        </Form>
        <InputWrapper>
          <StyledBtn type="join">가입하기</StyledBtn>
        </InputWrapper>
        <AppQRcode src={JoinQR} alt="JoinQR" />
      </LoginInner>
    </CreateAccountWrapper>
  );
};

export default CreateAccount_de;
