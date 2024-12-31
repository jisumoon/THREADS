import React, { useState } from "react";
import styled from "styled-components";
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { PictureIcon } from "../Common/Icon";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loading from "../LoadingLogo/Loading";

const AllWrapp = styled.div`
  /* position: relative;  */
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }
`;

const ModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  @media (max-width: 768px) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }
`;

const ModalWrapper = styled.div`
  width: 580px;
  height: 360px;
  border-radius: 12px;
  background: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontcolor};
  display: flex;
  flex-direction: column;
  z-index: 1000;
  @media (max-width: 768px) {
    margin: 10px;
  }
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  z-index: 900;
  @media (max-width: 768px) {
    border-radius: 0;
    width: 100%;
    height: 100%;
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const TextArea = styled.textarea`
  background: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontcolor};
  border: none;
  font-size: 16px;
  width: 100%;
  height: 100%;
  resize: none;
  padding: 0px;
  font-family: var(--pretendard-font);
  font-weight: 300;
  &::placeholder {
    color: #bababa;
    opacity: 1;
    font-size: 16px;
    transition: opacity 0.3s;
  }
  &:focus {
    &::placeholder {
      opacity: 0;
    }
    outline: none;
  }
`;
const PlusImage = styled.div`
  display: flex;
  margin: 10px 20px;
  gap: 10px;
  width: 140px;
  height: 140px;
  border-radius: 10px;
  object-fit: cover;
`;
const Img = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const Buttons = styled.div`
  width: 100%;
  border-top: 1px solid rgba(204, 204, 204, 0.4);
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
const Icons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
`;

const CameraButton = styled.label`
  cursor: pointer;
  fill: none;
`;
const CameraInput = styled.input`
  display: none;
`;

const PictureButton = styled.label`
  cursor: pointer;
`;
const PictureInput = styled.input`
  display: none;
`;

const EditButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const UploadButton = styled.button`
  background: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.logoColor};
  border: 1px solid ${(props) => props.theme.borderstroke};
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.2s;
  &:hover {
    background: ${(props) => props.theme.mouseHoverBg};
    color: ${(props) => props.theme.mouseHoverFontcolor};
  }
`;

const DelButton = styled.button`
  background: ${(props) => props.theme.mouseHoverBg};
  color: ${(props) => props.theme.fontcolor};
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;
const CharacterCount = styled.div`
  text-align: right;
  font-weight: 500;
  font-size: 12px;
  ${(props) => props.theme.fontcolor};
  opacity: 0.6;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const EtcModal = ({
  onSave,
  post,
  photos = [], // 기본값 설정
  id,
  onCancel,
  setIsEtcModalOpen,
}) => {
  const [newContent, setNewContent] = useState(post); // 수정할 내용을 상태로 관리
  const [files, setFiles] = useState([]); // 새로운 파일
  const [existingPhotos, setExistingPhotos] = useState(photos); // 기존 사진 관리
  const [isLoading, setIsLoading] = useState(false);

  const maxFilesCount = 3;

  const handleSave = async () => {
    try {
      setIsLoading(true);
      let newFileUrls = [];

      // 새로운 파일 업로드
      if (files.length > 0) {
        for (const file of files) {
          const fileRef = ref(storage, `posts/${id}/${file.name}`);
          await uploadBytes(fileRef, file);
          const fileUrl = await getDownloadURL(fileRef);
          newFileUrls.push(fileUrl);
        }
      }

      // Firestore에 수정된 내용 및 사진 업데이트
      const postRef = doc(db, "contents", id);
      await updateDoc(postRef, {
        post: newContent,
        photos: [...existingPhotos, ...newFileUrls], // 기존 사진 + 새로운 파일 URL
      });

      onSave(newContent);
      setIsEtcModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // 현재 업로드된 파일 수 + 새로 선택한 파일 수가 최대 파일 수를 초과하지 않도록 제한
    if (files.length + selectedFiles.length > maxFilesCount) {
      alert(`최대 ${maxFilesCount}개의 파일만 업로드할 수 있습니다.`);
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const removeExistingPhoto = (index) => {
    setExistingPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleContentChange = (e) => {
    const content = e.target.value;
    setNewContent(content);
  };

  return (
    <AllWrapp>
      <ModalOverlay>
        <ModalWrapper onClick={(e) => e.stopPropagation()}>
          <TextAreaWrapper>
            <CharacterCount>{newContent.length}자 입력 중</CharacterCount>
            <TextArea
              value={newContent || ""}
              onChange={handleContentChange}
              placeholder="내용을 입력하세요"
            />
          </TextAreaWrapper>
          <PlusImage>
            {/* 기존 사진 표시 */}
            {existingPhotos.map((photo, index) => (
              <div key={index} style={{ position: "relative", margin: "5px" }}>
                <Img src={photo} alt={`Existing Photo ${index + 1}`} />
                <DeleteButton onClick={() => removeExistingPhoto(index)}>
                  X
                </DeleteButton>
              </div>
            ))}
            {/* 새로 추가된 파일 표시 */}
            {files.map((file, index) => (
              <div key={index} style={{ position: "relative", margin: "5px" }}>
                {file.type.startsWith("image/") ? (
                  <Img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded Preview ${index + 1}`}
                  />
                ) : null}
                <DeleteButton onClick={() => removeFile(index)}>X</DeleteButton>
              </div>
            ))}
          </PlusImage>
          <Buttons>
            <Icons>
              <PictureButton htmlFor="picture">
                <PictureIcon width={24} />
                <PictureInput
                  onChange={handleFileChange}
                  id="picture"
                  type="file"
                  accept="video/*, image/*"
                  multiple // 한 번에 여러 파일을 선택할 수 있게 하는 속성
                />
              </PictureButton>
            </Icons>
            <EditButton>
              <UploadButton onClick={handleSave}>
                {isLoading ? <Loading /> : null}
                저장
              </UploadButton>
              <DelButton onClick={onCancel}>취소</DelButton>
            </EditButton>
          </Buttons>
        </ModalWrapper>
      </ModalOverlay>
    </AllWrapp>
  );
};

export default EtcModal;
