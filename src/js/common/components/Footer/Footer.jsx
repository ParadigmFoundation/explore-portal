import React, { PureComponent } from 'react';
import { Progress } from 'reactstrap';
import PropTypes from 'prop-types';
//import { Test } from './Footer.styles';
import "./Footer.scss";
class Footer extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      confirmingState: 0,  //0: confirm 1: confirming 2: confirmed.
      progresssValue: 0,
    };
  }
  onConfirmClick = () => {
    this.props.onConfirm();
    this.setState({confirmingState:1, progresssValue: 0});
    let timeId = setInterval(() => {
      if(this.state.confirmingState == 2)
      {
        this.props.onCancel();
        setTimeout(()=> {clearInterval(timeId)},200);
        ;
      }
      else if(!this.props.saving) {
        this.setState({progresssValue:100, confirmingState:2});
      }
      else if(this.state.progresssValue < 90)
        this.setState({confirmingState:1,progresssValue: this.state.progresssValue+10});
      else
      {
      }
    },200)
  }
  btnConfirm = () => {
    if(this.state.confirmingState == 0)
    return (<button className='btn btn-green' 
        onClick={this.onConfirmClick} 
        disabled = {this.props.disableConfirm}>
      Confirm  
    </button>)
    else{
      if(!this.props.saving)
        return (<button className='btn btn-green' 
            onClick={this.props.onConfirmed} 
            disabled = {this.props.disableConfirm}>
          Confirmed
        </button>)
      else
      return <Progress className='' value={this.state.progresssValue}><div>Confirming</div></Progress>;  
    }
  }
  render () {
    //if(this.state.confirmingState == 2)
      

    return (
      <div className="div-footer container-fluid row">
        <button className='btn btn-gray' onClick={this.props.onCancel}>Cancel</button>
        {this.btnConfirm()}
      </div>
    );
  }
}

export default Footer;
