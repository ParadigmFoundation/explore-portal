import React from "react";
import { Route, Switch } from "react-router-dom";
import LazyLoading from "common/components/LazyLoading";

import Main from "./views/Main/Main";
import Adjust from "./views/Adjust/Adjust";
import View from "./views/View/View";
import styles from "../style/index.scss";
import Init from "./views/Init/Init";
import Post from "./views/Post/Post";
import Explore from "./views/Explore/Explore";
import PostFooter from "./common/components/PostFooter/PostFooter";
import Header from "common/components/Header/Header";

module.exports = (
  <div className={styles.container}>
    <Header />
    <div className={styles.content}>
      <Switch>
        <Route exact path="/" component={Explore} />
        <Route path="/explore" component={Explore} />
        <Route path="/*" component={Explore} />
      </Switch>
    </div>
    <PostFooter />
  </div>
);
