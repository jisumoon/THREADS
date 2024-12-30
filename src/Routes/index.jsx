// @ts-nocheck

import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import HomeDK from "../Pages/Home_dk";
import Search from "../Pages/Search";
import Login from "../Pages/Login";
import LoginInsta from "../Pages/LoginInsta";
import Follow from "../Pages/Follow";
import Activity from "../Pages/Activity";
import Profile from "../Pages/Profile";
import PostForm from "../Components/post/PostForm";
import Insites from "../Pages/Insites";
// import CreateAccount from "../Components/Login/CreateAccount_de";
import CreateAccount from "../Components/Login/CreateAccountItem_dk";
// import CreateAccount from "../Pages/CreateAccount";
import Settings from "../Pages/Settings";
import Comment from "../Pages/Comment";
import PostComment from "../Pages/PostComment";
// import CreateAccount from "../Components/Login/CreateAccount";

export const router = createBrowserRouter([
  {
    path: "/", // 루트 경로에 Layout 적용
    element: <Layout />, // Layout을 적용
    children: [
      {
        path: "/", // 각 경로는 Outlet을 통해 렌더링됨
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "Profile",
        element: <Profile />,
      },
      {
        path: "Follow",
        element: <Follow />,
      },
      {
        path: "Activity",
        element: <Activity />,
      },
      {
        path: "PostForm",
        element: <PostForm />,
      },
      {
        path: "Insites", // 다은 추가
        element: <Insites />,
      },
      {
        path: "Settings", // 다은 추가
        element: <Settings />,
      },
      {
        path: "Comment/:customPostId",
        element: <Comment />,
      },
      {
        path: "PostComment/:customPostId",
        element: <PostComment />,
      },
      // {
      //   path: "PostComment",
      //   element: <PostComment />,
      // },
    ],
  },
  {
    path: "Login", // 이 라우트는 Layout 바깥에 있음
    element: <Login />,
  },
  {
    path: "LoginInsta", // 이 라우트도 Layout 바깥에 있음
    element: <LoginInsta />,
  },
  {
    path: "Create-Account", // dan 추가한 라우트
    element: <CreateAccount />,
  },

  {
    path: "Login-insta", // 이 라우트도 Layout 바깥에 있음
    element: <LoginInsta />,
  },

  // {
  //   path: "CreateAccount", // dan 추가한 라우트
  //   element: <CreateAccount />,
  // },
]);
