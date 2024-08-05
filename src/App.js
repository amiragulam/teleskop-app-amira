import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AssetsPage from "./pages/AssetsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./components/NotFound";
import CryptoDetailPage from "./pages/CryptoDetailPage";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/assets" component={AssetsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/crypto/:id" component={CryptoDetailPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
