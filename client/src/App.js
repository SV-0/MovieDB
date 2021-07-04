import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./hoc/auth";
import LandingPage from "./components/LandingPage/LandingPage.js";
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <NavBar /> */}
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </Suspense>
  );
}

export default App;
