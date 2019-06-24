import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap';

import './Header.scss';

import imgLogo from '../../../../assets/images/logo.png';
import DropDownMenu from '../DropDownMenu';
import { actions as initActions } from '../../../redux/modules/init';
import { actions as balanceActions } from '../../../redux/modules/balance';

import { getConcentratedAddr, formatNumber } from '../../services/helpers';
import {formatMoney} from '../../../common/services/helpers';


const headerMenuItem = [
  { caption: 'DAI', name: 'dai'},
  { caption: 'ZRX', name: 'zrx'},
  { caption: 'WETH', name: 'weth'},
]

const mapStateToProps = (state) => ({
  init: state.init,
  balance: state.balance,
  ticker: state.ticker,
});

const mapDispatchToProps = {
  ...initActions,
  ...balanceActions,
};
@connect(mapStateToProps, mapDispatchToProps)
class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemIndex: 0,
      connectionStatus: 0, 
      pageName: 'Name',
    };    
  }
  onCurrencyChange = (index) => {
    const {getBalance} = this.props;
    getBalance(headerMenuItem[index].name)
    this.setState({selectedItemIndex: index});

  }
  initCreate = () => {
    const {initCreateInstance} = this.props;
    initCreateInstance();
  }
  firstText = (v) => {
    if(v === undefined || v == 0 || v == null) {
      return '000000';
    } else {
      let s = formatNumber(v);
      
      s = s.replace('.','');
      if (s.length > 6) return '';
      return '0'.repeat(6-s.length);
    }

  }
  secondText = (v) => {
    if(v === undefined || v == 0 || v == null) {
      return '';
    } else {
      return formatNumber(v);
    }
  }
  Balance = () => {
    const bal = this.props.balance.toJS();
    const ticker = this.props.ticker.toJS();
    const type = headerMenuItem[this.state.selectedItemIndex].name;
    return (
      <div className='div-val'>
        <p className='first'>{this.firstText((bal[type]? bal[type]: 0))}</p>
        <p className='second'>{this.secondText((bal[type]?bal[type]:0))}</p>
        <div className='div-exval'>
          <span>USD</span>
          <p>{ticker[type] && bal[type] ? formatMoney(bal[type]*ticker[type]):'0'}</p>
        </div>
      </div>
    )
  }
  ConnectionState = () => {
    const { create, initializing, error, networkId} = this.props.init.toJS();
    const { fetching } = this.props.balance.toJS();
    const {selectedItemIndex} = this.state;
    if(initializing) {
      return (
      <div className='div-disconnected'>
        <span></span>
        <p>
          Connecting MetaMask...
        </p>
        {/* <Spinner animation="border" variant="secondary" size="sm"/> */}
      </div>)
    } else if(create) {
      if(networkId == 1) {
        return (
          <React.Fragment>
            <div className='div-connected'>
              <div className='circle green'/>
              <div className='address'>{getConcentratedAddr(create.coinbase)}</div>
            </div>

            <div className='div-dropdown'>
              <DropDownMenu
                headerMenuItem = {headerMenuItem}
                selectedMenuIndex = {selectedItemIndex}
                onChange = {this.onCurrencyChange}
                enabled = {true}
              />
            </div>
            {this.Balance()}
          </React.Fragment>)
      } else {
        return (<div className='div-disconnected'>
          <div className='circle orange'/>
            <span></span>
            <p className='nohover'>Connect to Ethereum Main Net</p>          
        </div>)
      }
    } else {
      if(!error) {
        return (
          <div className='div-disconnected'>
            <span></span>
            <p onClick={this.initCreate}>Connect to MetaMask</p>
          </div>
        )
      } else if( networkId != 1 ) {
        return (<div className='div-disconnected'>
          <div className='circle orange'/>
          <span></span>
          <p onClick={this.initCreate}>Connect to Ethereum Main Net</p>          
        </div>)

      } else if (error === 'user denied site access') {
        return (<div className='div-disconnected'>
          <div className='circle orange'/>
          <span></span>
          <p>Connect to Ethereum Main Net</p>          
        </div>)       
      } else if (error === 'non-ethereum browser detected') {
        return (
          <div className='div-disconnected'>
            <span></span>
            <p onClick={this.initCreate}>Connect to MetaMask</p>
          </div>
        )
      }
    }
  }
  render() {
    // const { location } = this.props;
    // const { pathname } = location;
    // const { create, pageName } = this.props.init.toJS();
    // const isHome = pathname === '/';
    // const isJustAnotherPage = pathname === '/page';

    return (
      <header className='globalHeader container-fluid'>
        <div className='row'>
          <div className='div-logo '>
            <img className='img-logo disabled' src={imgLogo}/> 
            <span className='span-title'>Explore</span>
            {/* <DropDownCaptionMenu /> */}
          </div>
          <div className='div-bal '>
            {this.ConnectionState()}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
