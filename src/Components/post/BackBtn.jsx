import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GoBack } from '../Common/Icon';

const GoBackImg = styled.div`
  width: 26px;
  height: 26px;
  background: ${(props) => props.theme.borderColor};
  box-shadow: ${(props) => props.theme.bordershadow};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 2px;
  padding-top: 2px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover{
   scale: 1.1;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const BackBtn = () => {
  const navigate = useNavigate();

  const Backbutton = () => {
    navigate(-1);
  };

  return (
    <GoBackImg onClick={Backbutton}>
      <GoBack width={18}/>
    </GoBackImg>
  );
};

export default BackBtn;
