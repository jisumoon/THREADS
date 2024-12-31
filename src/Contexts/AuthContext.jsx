// // contexts/AuthContext.js
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged, getAuth } from "firebase/auth";
// import { auth } from "../firebase";
// import Intro from "../Components/Intro";

// // AuthContext 생성
// const AuthContext = createContext();

// // Custom hook
// export const useAuth = () => useContext(AuthContext);

// // Provider 컴포넌트
// const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true); // 상태 초기화

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false); // 사용자 상태를 확인한 후 로딩 완료
//     });

//     // 컴포넌트가 언마운트되면 구독 해제
//     return () => unsubscribe();
//   }, []);

//   // 로딩이 완료되기 전까지 로딩 상태 유지
//   if (loading) {
//     return (
//       <div>
//         <Intro />
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth } from "../firebase";
import Intro from "../Components/logo/Intro";

// AuthContext 생성
const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

// Provider 컴포넌트
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // 상태 초기화

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // 2초 지연 후 로딩 상태 해제
      setTimeout(() => {
        setLoading(false);
      }, 2000); // 2000ms = 2초
    });

    // 컴포넌트가 언마운트되면 구독 해제
    return () => unsubscribe();
  }, []);

  // 로딩이 완료되기 전까지 로딩 상태 유지
  if (loading) {
    return (
      <div>
        <Intro />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
