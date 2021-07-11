import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";

import Auth from "./hoc/auth";
import LandingPage from "./components/LandingPage/LandingPage";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import RegisterPage from "./components/Auth/RegisterPage";
import LoginPage from "./components/Auth/LoginPage";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScrollToTop />
      <NavBar />
      <div style={{ minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
