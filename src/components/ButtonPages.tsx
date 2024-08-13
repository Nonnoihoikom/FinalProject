import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button`
  background-color: #ffc300;
  border: none;
  border-radius: 50px;
  color: black;
  padding-top: 3rem;
  padding: 10px 25px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 0.1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffa200;
  }
`;

const ButtonPages: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default ButtonPages;
