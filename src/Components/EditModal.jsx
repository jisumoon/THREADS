import React, { useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.borderColor};
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const EditTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  resize: none;
`;

const Button = styled.button`
  background: #1d9bf0;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background: #1a7dc6;
  }
`;

const CancelButton = styled(Button)`
  background: #ccc;
  margin-left: 10px;
  &:hover {
    background: #aaa;
  }
`;

const EditModal = ({ initialContent, onClose, onSave }) => {
  const [newContent, setNewContent] = useState(initialContent);

  const handleSave = () => {
    onSave(newContent); // 새 내용 저장
    onClose(); // 모달 닫기
  };

  return (
    <ModalBackground>
      <ModalContent>
        <h2>게시글 수정</h2>
        <EditTextArea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <div>
          <Button onClick={handleSave}>저장</Button>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </div>
      </ModalContent>
    </ModalBackground>
  );
};

export default EditModal;
