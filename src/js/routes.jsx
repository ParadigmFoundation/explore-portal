import React from "react";
import { Route, Switch } from "react-router-dom";
import LazyLoading from "common/components/LazyLoading";

import styles from "../style/index.scss";
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
    {/* <PostFooter /> */}
  </div>
);
