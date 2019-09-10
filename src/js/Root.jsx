import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/scss/font-awesome.scss";
import { actions as ethereumActions } from "./redux/modules/ethereum";
import { connect } from "react-redux";
import { actions as tickerActions } from "./redux/modules/ticker";
import { actions as webSocketActions } from "./redux/modules/websocket";

const mapStateToProps = state => ({
  ethereum: state.ethereum
});

const mapDispatchToProps = {
  ...ethereumActions,
  ...tickerActions,
  ...webSocketActions
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Root extends Component {
  constructor(props) {
    super(props);

    const { getTicker, connectWebSocket } = props;
    getTicker();
    connectWebSocket("");
  }

  get content() {
    const { routes } = this.props;
    return <Router>{routes}</Router>;
  }

  render() {
    const { store } = this.props;

    return <Provider store={store}>{this.content}</Provider>;
  }
}

Root.propTypes = {
  routes: PropTypes.element.isRequired,
  store: PropTypes.object.isRequired
};

export default connect(
  null,
  null
)(Root);
