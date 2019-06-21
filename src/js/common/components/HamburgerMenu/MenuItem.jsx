import React, { Component } from 'react';

class MenuItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      hover:false,
    }
  }
  
  handleHover(){
    this.setState({hover:!this.state.hover});
  }
  
  render(){
    const styles={
      container: {
        opacity: 0,
        animation: '1s appear forwards',
        animationDelay:this.props.delay,
        marginBottom: '12px',
      },
      menuItem:{
        fontFamily:'Gilroy-Medium',
        fontSize: '1.5rem',
        padding: '1rem 0',
        margin: '2rem 9%',
        cursor: 'pointer',
        color: this.state.hover || this.props.selected? '#303030':'#808080',
        transition: 'color 0.2s ease-in-out',
        animation: '0.5s slideIn forwards',
        animationDelay:this.props.delay,
        textDecoration: 'none',
      },
    }
    return(
      <div style={styles.container}>
        <a 
          style={styles.menuItem} 
          onMouseEnter={()=>{this.handleHover();}} 
          onMouseLeave={()=>{this.handleHover();}}
          onClick={this.props.onClick}
          href = {this.props.link}
        >
          {this.props.children}  
        </a>
    </div>  
    )
  }
}

export default  MenuItem;