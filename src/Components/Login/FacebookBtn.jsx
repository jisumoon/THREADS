import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase"; // Firebase 초기화 파일 경로

const Button = styled.span`
  width: 100%;
  color: 0 0 0 0 ${(props) => props.theme.fontcolor};
  margin-top: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 50px;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

const FacebookBtn = () => {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new FacebookAuthProvider(); // FacebookAuthProvider 사용
      await signInWithPopup(auth, provider); // 팝업으로 로그인 처리
      navigate("/"); // 로그인 후 이동할 페이지
    } catch (e) {
      console.error(e); // 에러 로그 출력
    }
  };

  return <Button onClick={onClick}>페이스북으로 로그인</Button>;
};

export default FacebookBtn;

// //

// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../../firebase"; // Firebase 초기화 파일 경로

// const Button = styled.span`
//   width: 100%;
//   background: #fff;
//   color: #000;
//   padding: 10px 20px;
//   margin-top: 20px;
//   font-weight: 600;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 5px;
//   border-radius: 50px;
//   cursor: pointer;
// `;

// const Logo = styled.img`
//   height: 25px;
// `;

// const FacebookBtn = () => {
//   const navigate = useNavigate();
//   const onClick = async () => {
//     try {
//       const provider = new FacebookAuthProvider(); // FacebookAuthProvider 사용
//       await signInWithPopup(auth, provider); // 팝업으로 로그인 처리
//       navigate("/"); // 로그인 후 이동할 페이지
//     } catch (e) {
//       console.error(e); // 에러 로그 출력
//     }
//   };

//   return (
//     <Button onClick={onClick}>
//       <Logo src="/facebook-logo.svg" /> {/* Facebook 로고 이미지 경로 */}
//       페이스북으로 로그인
//     </Button>
//   );
// };

// export default FacebookBtn;
