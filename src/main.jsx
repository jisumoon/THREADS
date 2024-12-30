import "regenerator-runtime/runtime"; // 추가

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import ThreadProvider from "./Contexts/ThreadContext";
import ThemeProvider from "./Contexts/ThemeContext";
import AuthProvider from "./Contexts/AuthContext";
import { AddPageProvider } from "./Contexts/AddPageContext";

import GlobalStyles from "./styles/GlobalStyles.styles";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <ThreadProvider>
        <AddPageProvider>
          <GlobalStyles />
          <RouterProvider router={router}></RouterProvider>
        </AddPageProvider>
      </ThreadProvider>
    </AuthProvider>
  </ThemeProvider>
);
