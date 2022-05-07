import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navigation";
import Home from "./pages/home";
import { createTheme, ThemeProvider } from "@mui/material";
import DetailRecipe from "./components/DetailRecipe";
import SearchResult from "./components/SearchResult";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useAppDispatch } from "./store";
import {
  fetchAsyncUserWithStoredToken,
  selectToken,
} from "./store/auth/loginSlice";
import UserPage from "./components/UserComponent";
import TagsPage from "./components/TagsPage";
import { useSelector } from "react-redux";
import { getToken } from "./store/auth/signupSlice";
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  // interface Palette {
  //   neutral: Palette["secondary"];
  // }
  // interface PaletteOptions {
  //   neutral: PaletteOptions["secondary"];
  // }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
    light?: string;
    text?: string;
  }
  interface ThemeOptions {
    status: {
      main: React.CSSProperties["color"];
    };
  }
}

export const theme = createTheme({
  status: {
    main: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#00695c",
      darker: "#003d33",
      light: "#439889",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f44336",
      darker: "#ba000d",
      light: "#ff7961",
      contrastText: "#ffffff",
    },
  },
});

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(fetchAsyncUserWithStoredToken());
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <ThemeProvider theme={theme}>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes/:id" element={<DetailRecipe />} />
            <Route path="/result/:term" element={<SearchResult />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={token ? <UserPage /> : <Login />} />
            <Route path="/tags/:id" element={<TagsPage />} />
          </Routes>
        </ThemeProvider>
      </div>
    </>
  );
};

export default App;
