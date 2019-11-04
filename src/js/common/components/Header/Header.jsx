import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import HamburgerMenu from "react-hamburger-menu";
import "./Header.scss";

import imgLogo from "../../../../assets/images/logo.png";
import DropDownMenu from "../DropDownMenu";
import { actions as balanceActions } from "../../../redux/modules/balance";
import { actions as ethereumActions } from "../../../redux/modules/ethereum";

import { getConcentratedAddr, formatNumber } from "../../services/helpers";
import { formatMoney } from "../../../common/services/helpers";
import DropDownCaptionMenu from "../DropDownCaptionMenu/DropDownCaptionMenu";
import CurSpan from "../CurSpan/CurSpan";

const menuItem = [
  { caption: "Create", link: "https://create.paradigm.market" },
  { caption: "Explore", link: "https://explore.paradigm.market" },
  { caption: "Search", link: "https://search.paradigm.market" },
  { caption: "Govern", link: "https://govern.paradigm.market" },
  { caption: "Account", link: "https://account.paradigm.market" }
];

const mapStateToProps = state => ({
  balance: state.balance,
  ticker: state.ticker,
  ethereum: state.ethereum
});

const mapDispatchToProps = {
  ...balanceActions,
  ...ethereumActions
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemIndex: 0,
      connectionStatus: 0,
      pageName: "Name",
      menuOpen: false
    };
  }
  onCurrencyChange = index => {
    const { getBalance } = this.props;
    getBalance();
    this.setState({ selectedItemIndex: index });
  };
  initCreate = () => {
    const { connectServer } = this.props;
    connectServer();
  };
  firstText = v => {
    if (v === undefined || v == 0 || v == null) {
      return "000000";
    } else {
      let s = formatNumber(v);

      s = s.replace(".", "");
      if (s.length > 6) return "";
      return "0".repeat(6 - s.length);
    }
  };
  secondText = v => {
    if (v === undefined || v == 0 || v == null) {
      return "";
    } else {
      return formatNumber(v);
    }
  };
  Balance = () => {
    const { balance } = this.props.balance.toJS();
    const ticker = this.props.ticker.toJS();
    return (
      <div className="div-val">
        <p className="first">{this.firstText(balance ? balance : 0)}</p>
        <p className="second">{this.secondText(balance ? balance : 0)}</p>
        <div className="div-exval">
          <span>USD</span>
          <p>
            {ticker["dai"] && balance
              ? formatMoney(balance * ticker["dai"])
              : "0"}
          </p>
        </div>
      </div>
    );
  };
  ConnectionState = () => {
    const {
      kosu,
      error,
      networkId,
      coinbase,
      connected,
      connecting
    } = this.props.ethereum.toJS();
    const { fetching } = this.props.balance.toJS();
    const { selectedItemIndex } = this.state;
    if (connecting) {
      return (
        <div className="div-disconnected">
          <div className="circle orange" />
          <p className="nohover">Connecting...</p>
          <Spinner animation="border" variant="secondary" size="sm" />
        </div>
      );
    } else if (connected) {
      if (
        networkId == 1 ||
        networkId == 3
        // networkId == 6174 ||
        // networkId == 6175
      ) {
        return (
          <React.Fragment>
            <div className="div-connected">
              <div className="circle green" />
              <div className="address">{getConcentratedAddr(coinbase)}</div>
            </div>

            <div className="div-dropdown">
              <CurSpan curType="KOSU" enabled={true} />
            </div>
            {this.Balance()}
          </React.Fragment>
        );
      } else {
        return (
          <div className="div-disconnected">
            <div className="circle red" />
            <p className="nohover">Connect to main net</p>
          </div>
        );
      }
    } else {
      if (!error) {
        return (
          <div className="div-disconnected">
            <div className="circle orange" />
            <p onClick={this.initCreate}>Click to Connect MetaMask</p>
          </div>
        );
      } else if (networkId != 1) {
        return (
          <div className="div-disconnected">
            <div className="circle red" />
            <p className="nohover">Connect to main net</p>
          </div>
        );
      } else if (error === "user denied site access") {
        return (
          <div className="div-disconnected">
            <div className="circle red" />
            <p className="nohover">Connect to main net</p>
          </div>
        );
      } else if (error === "non-ethereum browser detected") {
        return (
          <div className="div-disconnected">
            <div className="circle red" />
            <p className="nohover">Non-ethereum browser</p>
          </div>
        );
      }
    }
  };
  hamburgerMenu = () => {
    const { menuOpen } = this.state;
    return (
      <div className="hamburger-menu">
        <HamburgerMenu
          isOpen={menuOpen}
          menuClicked={this.handleMenuClick}
          width={18}
          height={12}
          strokeWidth={3}
          rotate={0}
          color="#4a4a4a"
          borderRadius={0}
          animationDuration={0.5}
        />
        {menuOpen && (
          <div
            className={menuOpen ? "dropdown-content show" : "dropdown-content"}
          >
            <ul>
              {menuItem.map(item => (
                <li key={item.caption}>
                  <a href={item.link}>{item.caption}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  handleMenuClick = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };
  render() {
    return (
      <header className="globalHeader container-fluid">
        <div className="row">
          <div className="div-logo ">
            <img className="img-logo disabled" src={imgLogo} />
            <span className="span-title">Explore</span>
            <DropDownCaptionMenu menuItem={menuItem} />
          </div>
          <div className="div-bal ">{this.ConnectionState()}</div>
          {this.hamburgerMenu()}
        </div>
      </header>
    );
  }
}

export default Header;
