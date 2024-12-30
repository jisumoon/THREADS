import LoginItemDk from "../Components/Login/LoginItem_dk";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// import LoginItemDe from "../Components/Login/LoginItem_de";

const Login = () => {
  const { currentUser } = useAuth(); // 현재 사용자 상태를 가져옴
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 1024px)",
  });

  useEffect(() => {
    if (currentUser) {
      // 사용자가 로그인한 상태라면 Home으로 리디렉션
      navigate("/");
    }
  }, [currentUser, navigate]);

  return <LoginItemDk />;
};

export default Login;
