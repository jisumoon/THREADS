// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import styled from "styled-components";
// import { CloseIcon } from "../Common/Icon";
// import { FixIcon } from "../Common/Icon";
// import { storage, db } from "../../firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { addDoc, collection } from "firebase/firestore";

// const Box = styled(motion.div)`
//   z-index: 100;
//   background: ${({ background }) => background || "rgba(255, 255, 255, 0.3)"};
//   position: fixed;
//   top: 0px;
//   left: 0px;
//   backdrop-filter: blur(13px); /* 배경 흐림 효과 추가 */
//   /* filter: brightness(0.7) contrast(0.5) grayscale(0.1); */
// `;

// const CloseBtnWrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const CloseBtn = styled.div`
//   width: 40px;
//   height: 40px;
//   position: absolute;
//   left: 20px;
//   top: 20px;
//   border: 1px solid #ccc;
//   border-radius: 50%;
//   background-color: #f5f5f5;
// `;

// const ReportContents = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 20px;
// `;

// const TextAreaWrapper = styled.div`
//   width: 370px;
//   height: 220px;
//   /* background-color: ${(props) => props.theme.btnBgColor}; */
//   background-color: #fff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 20px;
//   border-radius: 12px;
//   /* border: 2px solid ${(props) => props.theme.borderstroke}; */
//   border: 2px solid #e9e9e9;
//   /* box-shadow: ${(props) => props.theme.bordershadow}; */
//   box-shadow: 0 0 15px #c9c9c9;
//   /* border: 1px solid skyblue; */
//   padding: 5% 5%;
// `;

// const TextAreaTitle = styled.h1`
//   text-align: center;
// `;

// const TextAreaForm = styled.form`
//   width: 100%;
//   height: 100%;
//   /* border: 1px solid red; */
// `;

// const TextArea = styled.textarea`
//   resize: none;
//   outline: none;
//   border: none;
//   width: 100%;
//   height: 80%;
//   &:focus {
//     outline: none;
//   }
// `;

// const SubmitArea = styled.div`
//   width: 100%;
//   height: 20%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   label {
//   }
// `;

// const SubmitAreaFile = styled.input`
//   display: none;
// `;

// const SubmitAreaFileBtn = styled.span`
//   background-color: transparent;
//   cursor: pointer;
//   /* border: 1px solid skyblue; */
// `;

// const SubmitAreaBtn = styled.input`
//   background: none;
//   cursor: pointer;
// `;

// const defaultVariants = {
//   initial: {
//     opacity: 0,
//     scale: 0,
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.3,
//     },
//     // rotateZ: 360,
//   },
//   leaving: {
//     opacity: 0,
//     y: 20,
//   },
// };

// const ReportModal = ({
//   width = "500px",
//   height = "500px",
//   background,
//   borderRadius,
//   variants = defaultVariants,
//   initial = "initial",
//   animate = "visible",
//   exit = "leaving",
//   isVisible = true,
//   setShowing,
// }) => {
//   const placeholderText = "내용을 최대한 상세히 적어주세요.";
//   const [placeholder, setPlaceholder] = useState(placeholderText);
//   const [files, setFiles] = useState([]); // 파일 리스트 상태
//   const [reportText, setReportText] = useState(""); // 신고 내용
//   const [uploading, setUploading] = useState(false);

//   const stopPropGationFuc = (e, customFuc) => {
//     e.stopPropagation();
//     if (customFuc) {
//       e.stopPropagation();
//       customFuc();
//     }
//   };
//   // 파일 추가 핸들러
//   const handleFileChange = (e) => {
//     const newFiles = Array.from(e.target.files);
//     setFiles(newFiles); // 기존 파일을 덮어쓰기
//   };

//   // 파일 업로드 및 신고 제출
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!reportText || files.length === 0) {
//       alert("신고 내용과 파일을 추가해 주세요.");
//       return;
//     }
//     setUploading(true);

//     try {
//       // 각 파일을 Firebase Storage에 업로드
//       const uploadedFiles = await Promise.all(
//         files.map(async (file) => {
//           const storageRef = ref(storage, `reports/${file.name}`);
//           await uploadBytes(storageRef, file);
//           const downloadURL = await getDownloadURL(storageRef);
//           return { name: file.name, url: downloadURL };
//         })
//       );

//       // Firestore에 신고 내용과 파일 URL 저장
//       await addDoc(collection(db, "reports"), {
//         text: reportText,
//         files: uploadedFiles,
//         createdAt: new Date(),
//       });

//       alert("신고가 성공적으로 제출되었습니다.");
//       setFiles([]);
//       setReportText("");
//       setShowing(false);
//     } catch (error) {
//       console.error("신고 제출 중 오류 발생:", error);
//       alert("신고 제출 중 오류가 발생했습니다.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <Box
//           style={{ width, height }}
//           background={background}
//           borderRadius={borderRadius}
//           variants={variants}
//           initial={initial}
//           animate={animate}
//           exit={exit}
//           onClick={() => {
//             setShowing(false);
//             setPlaceholder(placeholderText);
//           }}
//         >
//           <CloseBtn
//             onClick={() => {
//               setShowing((current) => !current);
//               setPlaceholder(placeholderText);
//             }}
//           >
//             <CloseBtnWrapper>
//               <CloseIcon fill={"#bababa"} />
//             </CloseBtnWrapper>
//           </CloseBtn>
//           <ReportContents>
//             <TextAreaTitle>문제 신고</TextAreaTitle>
//             <TextAreaWrapper>
//               <TextAreaForm
//                 onClick={(e) => {
//                   stopPropGationFuc(e);
//                   handleSubmit();
//                 }}
//               >
//                 <TextArea
//                   placeholder={placeholder}
//                   onClick={(e) => stopPropGationFuc(e)}
//                   onChange={(e) => setReportText(e.target.value)}
//                 ></TextArea>
//                 <SubmitArea>
//                   <label>
//                     <SubmitAreaFileBtn onClick={(e) => stopPropGationFuc(e)}>
//                       <FixIcon width={"20px"} fill={"#bababa"} />
//                     </SubmitAreaFileBtn>
//                     <SubmitAreaFile
//                       type="file"
//                       onClick={(e) => stopPropGationFuc(e)}
//                       onChange={handleFileChange}
//                       multiple // 다중 파일 업로드 허용
//                     />
//                   </label>
//                   <label>
//                     <SubmitAreaBtn type="submit" />
//                   </label>
//                 </SubmitArea>
//               </TextAreaForm>
//             </TextAreaWrapper>
//             <FileList>
//               {files.map((file, index) => (
//                 <FileItem key={index}>{file.name}</FileItem>
//               ))}
//             </FileList>
//           </ReportContents>
//         </Box>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ReportModal;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { CloseIcon } from "../Common/Icon";
import { FixIcon } from "../Common/Icon";
import { storage, db } from "../../firebase"; // Firebase Storage 및 Firestore 가져오기
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage 관련 함수
import { addDoc, collection } from "firebase/firestore"; // Firestore 관련 함수

// Styled components 정의
const Box = styled(motion.div)`
  z-index: 100;
  background: ${({ background }) => background || "rgba(255, 255, 255, 0.3)"};
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(13px);
`;

const CloseBtnWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseBtn = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  left: 20px;
  top: 20px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #f5f5f5;
`;

const ReportContents = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const TextAreaWrapper = styled.div`
  width: 370px;
  height: 220px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: 12px;
  border: 2px solid #e9e9e9;
  box-shadow: 0 0 15px #c9c9c9;
  padding: 5% 5%;
`;

const TextAreaTitle = styled.h1`
  text-align: center;
`;

const TextAreaForm = styled.form`
  width: 100%;
  height: 100%;
`;

const TextArea = styled.textarea`
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  height: 80%;
  &:focus {
    outline: none;
  }
`;

const SubmitArea = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmitAreaFile = styled.input`
  display: none;
`;

const SubmitAreaFileBtn = styled.span`
  background-color: transparent;
  cursor: pointer;
`;

const SubmitAreaBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const FileList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: left;
  position: absolute;
  top: 105%;
`;

const FileItem = styled.li`
  padding: 5px;
`;

const defaultVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  leaving: {
    opacity: 0,
    y: 20,
  },
};

const ReportModal = ({
  width = "500px",
  height = "500px",
  background,
  borderRadius,
  variants = defaultVariants,
  initial = "initial",
  animate = "visible",
  exit = "leaving",
  isVisible = true,
  setShowing,
}) => {
  const placeholderText = "내용을 최대한 상세히 적어주세요.";
  const [placeholder, setPlaceholder] = useState(placeholderText);
  const [files, setFiles] = useState([]); // 파일 리스트 상태
  const [reportText, setReportText] = useState(""); // 신고 내용
  const [uploading, setUploading] = useState(false); // 업로드 상태

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // 파일 추가 핸들러
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // 새 파일을 추가
  };

  // 파일 업로드 및 신고 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportText || files.length === 0) {
      alert("신고 내용과 파일을 추가해 주세요.");
      return;
    }
    setUploading(true);

    try {
      // 각 파일을 Firebase Storage에 업로드
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const storageRef = ref(storage, `reports/${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          return { name: file.name, url: downloadURL };
        })
      );

      // Firestore에 신고 내용과 파일 URL 저장
      await addDoc(collection(db, "reports"), {
        text: reportText,
        files: uploadedFiles,
        createdAt: new Date(),
      });

      alert("신고가 성공적으로 제출되었습니다.");
      setFiles([]);
      setReportText("");
      setShowing(false);
    } catch (error) {
      alert("신고 제출 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Box
          style={{ width, height }}
          background={background}
          borderRadius={borderRadius}
          variants={variants}
          initial={initial}
          animate={animate}
          exit={exit}
          onClick={() => {
            setShowing(false);
            setPlaceholder(placeholderText);
            setFiles([]);
            setReportText("");
          }}
        >
          <CloseBtn
            onClick={() => {
              setShowing((current) => !current);
              setPlaceholder(placeholderText);
              setFiles([]);
              setReportText("");
            }}
          >
            <CloseBtnWrapper>
              <CloseIcon fill={"#bababa"} />
            </CloseBtnWrapper>
          </CloseBtn>
          <ReportContents>
            <TextAreaTitle>문제 신고</TextAreaTitle>
            <TextAreaWrapper>
              <TextAreaForm onSubmit={handleSubmit} onClick={stopPropagation}>
                <TextArea
                  placeholder={placeholder}
                  onChange={(e) => setReportText(e.target.value)}
                ></TextArea>
                <SubmitArea>
                  <label>
                    <SubmitAreaFileBtn>
                      <FixIcon width={"20px"} fill={"#bababa"} />
                    </SubmitAreaFileBtn>
                    <SubmitAreaFile
                      type="file"
                      onChange={handleFileChange}
                      multiple // 다중 파일 업로드 허용
                    />
                  </label>
                  <SubmitAreaBtn type="submit" disabled={uploading}>
                    {uploading ? "ㅋ" : "제출"}
                  </SubmitAreaBtn>
                </SubmitArea>
              </TextAreaForm>
            </TextAreaWrapper>
            <FileList>
              {files.map((file, index) => (
                <FileItem key={index}>{file.name}</FileItem>
              ))}
            </FileList>
          </ReportContents>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default ReportModal;
