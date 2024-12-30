// @ts-nocheck
import React from "react";
import styled from "styled-components";

const ButtonItem = styled.button`
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
  }

  ${({ type }) =>
    type === "bigupload" &&
    `
      width: 300px;
      height: 80px;
      background: #1c1c1c;
      color: #fff;
      font-size: 15px;
      font-weight: bold;
      border-radius: 30px;
      transition: all 0.3s;
      &:hover {
        background: #fff; 
        color: #1c1c1c;
      }
    `}
  ${({ type }) =>
    type === "follow" &&
    `
      width: 90px;
      height: 34px;
      background: #fff;
      color: #000;
      font-size: 14px;
      font-weight: 800;
      border-radius: 8px;
      transition: all 0.3s;
      &:hover {
        background: #000; 
        color: #fff; 
      }
    `}
  ${({ type }) =>
    type === "edit" &&
    `
      width: 100%;
      height: 39px;
      color: #000;
      font-size: 15px;
      font-weight: Medium;
      border-radius: 6px;
      transition: all 0.3s;
      &:hover {
        background: {#1c1c1c}; 
        color: #fff; 
        outline: none;
      }
      @media (max-width: 768px) {
      height: 38px;
      width: 100%;
      outline: none;
  }
    `}
  ${({ type }) =>
    type === "smalupload" &&
    `
      width: 64px;
      height: 36px;
      background: #fff;
      color: #000; 
      font-size: 15px;
      font-weight: Medium;
      border-radius: 6px;
      transition: all 0.3s;
      &:hover {
        background: #1c1c1c; 
        color: #fff; 
      }
    `}
`;

const Button = ({ text, type, onClick, width, heith, bg }) => {
  return (
    <ButtonItem
      type={type}
      onClick={onClick}
      style={{ width: `${width}`, height: `${heith}` }}
    >
      {text || "button"}
    </ButtonItem>
  );
};

export default Button;
