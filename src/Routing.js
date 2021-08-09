import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductInfo from "./components/ProductInfo";
import AppBar from "./components/AppBar";
import ProductCard from "./components/ProductCard";

function Routing() {
  return (
    <Router>
      <AppBar></AppBar>
      <Switch>
        <Route path="/" exact={true} component={ProductCard} />
        <Route path="/products/:id" component={ProductInfo} />
      </Switch>
    </Router>
  );
}

export default Routing;
