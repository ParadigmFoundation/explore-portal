import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './Header.scss';
import imglogo from '../../../../assets/images/logo.png'
import imgDown from '../../../../assets/images/down.png'

import { actions as ethereumActions } from '../../../redux/modules/ethereum';
import { actions as ballanceActions } from '../../../redux/modules/ballance';
import MarkDigm from '../MarkDigm/MarkDigm';
import { formatMoney, getConcentratedAddr } from '../../services/commonService';
import HamburgerMenu from 'react-hamburger-menu'
import CheeseburgerMenu from 'cheeseburger-menu'
import MyMenuItem from '../HamburgerMenu/MenuItem'
import Menu from '../HamburgerMenu/Menu'
import MenuButton from '../HamburgerMenu/MenuButton'
const headerMenuItem = [
  { caption: 'Bond', link: '#bond'},
  { caption: 'Explore', link: '#explore'},
  { caption: 'Post', link: '#post'},
]
const mapStateToProps = (state) => ({
  ethereum: state.ethereum,
  ballance: state.ballance,
  digm: state.digm,
});

const mapDispatchToProps = {
  ...ethereumActions,
  ...ballanceActions,
};
@connect(mapStateToProps, mapDispatchToProps)
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      selectedMenuIndex: 1,
      flgMenuUnHovered: false,
      menuOpen: false,
    };
  }

  componentDidUpdate(prevProps) {
} 
  onConnectServer = () => {
    const {connectServer} = this.props;
    connectServer();
  }

  onMouseEnter = () => {
    this.setState({showMenu: true, flgMenuUnHovered: true});
  }  

  onMenuClick = (i) => {
    this.setState({selectedMenuIndex: i,showMenu: false,flgMenuUnHovered: false, menuOpen: false});
  }
  openMenu = () => {
    this.setState({ menuOpen: true, flgMenuUnHovered: true })
  }

  closeMenu = () => {
    this.setState({ menuOpen: false })
  }
  dropDownMenu = () => {
    const {selectedMenuIndex, flgMenuUnHovered, showMenu} = this.state;
    return (
      <div className="dropdown" >
        <span >{headerMenuItem[selectedMenuIndex].caption}</span>
        <img className='img-down clickable dropbtn' src={imgDown} onMouseEnter={this.onMouseEnter}/>
          {showMenu && (
            <div className="dropdown-content">
              {headerMenuItem.map((item,index) => {
                return <a 
                        key={index} 
                        href={headerMenuItem[index].link}
                        onClick={()=>this.onMenuClick(index)}
                        onMouseEnter= { () => this.setState({flgMenuUnHovered:false})}
                        className={flgMenuUnHovered&&(selectedMenuIndex==index) ? 'selected' : ''}
                      >
                        {item.caption}
                      </a>
              })}
            </div>)
          }
    </div>
    )
  }
 
  hamburgerMenu = () => {
    return (
      <div className="hamburger-menu" >
        <HamburgerMenu
          isOpen={this.state.menuOpen}
          menuClicked={this.handleMenuClick}
          width={32}
          height={24}
          strokeWidth={3}
          rotate={0}
          color='black'
          borderRadius={0}
          animationDuration={0.5}
        />

    </div>
    )
  }
  handleMenuClick = () => {
    this.setState({menuOpen:!this.state.menuOpen});
  }
  
  handleLinkClick = () => {
    this.setState({menuOpen: false});
  }

  render() {
    const digmData = this.props.digm.toJS().result;
    const { connecting, connected, coinbase } = this.props.ethereum.toJS();
    const {selectedMenuIndex, flgMenuUnHovered, menuOpen} = this.state; 
    const { ballance } = this.props.ballance.toJS();
    const walletBalance = formatMoney(ballance ? ballance / Math.pow(10,18) : 0);
    const menuItems = headerMenuItem.map((val,index)=>{
      return (
        <MyMenuItem
          key={index} 
          delay={`${index * 0.1}s`}
          link = {val.link}
          selected = {index == selectedMenuIndex}
          onClick={()=>{this.onMenuClick(index);}}>{val.caption}</MyMenuItem>)
    });
  
    return (
      <header className='header-global container-fluid'>
        <div className='row'>
          <div className='div-logo col-6 col-sm-6 col-md-4 '>
            <img className='img-logo clickable' src={imglogo} alt='logo' />
            {this.dropDownMenu()}
          </div>
          <div className='div-meta col-md-4 d-none d-md-block text-center'>
            <p className={connected? 'connected' : '' }><span/> MetaMask <span/></p>
            {connecting 
            ? <div className="connect-state">Connecting <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div></div> 
            : (connected 
              ? <div className="connect-state"><a>{getConcentratedAddr(coinbase) }</a></div>
              : <a className="connect-state" onClick ={this.onConnectServer}>Click here to connect </a> )}
          </div>
          <div className='div-bal col-6 col-sm-6 col-md-4'>
            <div className='float-right'>
              <div className = 'div-hamburger'>
                {this.hamburgerMenu()}
              </div>
              <div className='div-bal-mark'>
                <span className='label'>Balance</span>
                <MarkDigm />
              </div>
              <p className='div-balance'>{walletBalance}</p>
            </div>
          </div>
        </div>
        <Menu open={this.state.menuOpen}>
          {menuItems}
        </Menu>        
      </header>
    );
  }
}



export default  Header;


