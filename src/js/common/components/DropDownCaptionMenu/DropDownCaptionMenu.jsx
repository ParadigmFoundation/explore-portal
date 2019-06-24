import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import imgDown from '../../../../assets/images/down.png'
import './DropDownCaptionMenu.scss';

const headerMenuItem = [
  { caption: 'Create', link: '#create'},
  { caption: 'Explore', link: '#explore'},
  { caption: 'Search', link: '#post'},
]
class DropDownCaptionMenu extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      selectedMenuIndex: 0,
      flgMenuUnHovered: false,
    };
  }
  onMouseEnter = () => {
    this.setState({showMenu: true, flgMenuUnHovered: true});
  }  

  onMenuClick = (i) => {
    this.setState({selectedMenuIndex: i,showMenu: false,flgMenuUnHovered: false, });
  }
  openMenu = () => {
    this.setState({ menuOpen: true, flgMenuUnHovered: true })
  }

  closeMenu = () => {
    this.setState({ menuOpen: false })
  }

  render () {
    const {selectedMenuIndex, flgMenuUnHovered, showMenu} = this.state;
    return (
      <div className="dropdown-caption" >
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
}

export default DropDownCaptionMenu;
