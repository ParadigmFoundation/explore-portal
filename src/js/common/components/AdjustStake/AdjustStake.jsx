import React, { PureComponent } from 'react';
import { Progress } from 'reactstrap';
import { connect } from 'react-redux'
import MarkDigm from '../MarkDigm/MarkDigm';
import styles from './AdjustStake.scss';
import { actions as digmActions } from '../../../redux/modules/digm';
import {formatMoney, formatMoneyPlus,formatNumber, formatNumberPlus} from '../../../common/services/commonService';
import Footer from '../Footer/Footer';
import imgArrow from '../../../../assets/images/arrow.png';
import NumberFormat from 'react-number-format';
import { actions as balanceActions } from '../../../redux/modules/balance';
import {fromWei} from "../../../utils/tokenUtils";

const mapStateToProps = (state) => ({
  digm: state.digm,
  balance: state.balance,
})

const mapDispatchToProps = {
  ...digmActions,
  ...balanceActions,
}
@connect(mapStateToProps, mapDispatchToProps)
class AdjustStake extends PureComponent { 
  constructor(props) {
    super(props);
    this.state = {
      valInput: parseFloat(fromWei(this.props.digm.toJS().userPosterTokens)),
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({valInput: parseFloat(fromWei(this.props.digm.toJS().userPosterTokens)) });
  }
  onValueChange = (event) => {
    if(event.target.value == 0 || event.target.value =='.') 
      this.setState({valInput: 0});
    else 
      this.setState({valInput: event.target.value});
  }

  onConfirm = () => {
    // let stakeData = this.props.digm.toJS().result; //todo
    // stakeData.staked = this.state.valInput;
    // stakeData.postLimit = this.state.valInput*1000;
    // const {saveStakeData} = this.props;
    // saveStakeData(stakeData);
  }
  getProcessValue = (walletBalance, valNew) => {
    return walletBalance && valNew? valNew / walletBalance * 100: 0;
  }

progressBar = (availableBalance) => {
    let v = availableBalance && this.state.valInput? this.state.valInput / availableBalance * 100: 0;
    if(v > 0)
      return (<Progress className={v>100?'danger':''} value={v}/>);
    else
      return (<Progress className={'danger'} value={3}/>);

  }

    render () {
    const stakeData = {
      staked: parseFloat(fromWei(this.props.digm.toJS().userPosterTokens)),
      availableBalance: parseFloat(fromWei(this.props.digm.toJS().availableBalance))
    };

    const saving = this.props.digm.toJS().saving;
    const { balance } = this.props.balance.toJS();
    const walletBalance = balance ? balance / Math.pow(10,18) : 0;      

    return (
      <div className="container-adjust container-fluid">
        <div className="div-stake-current row">
          <p className="col-12 col-sm-6  d-sm-block d-md-none  d-lg-block col-lg-2 ">Current Stake</p>
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <MarkDigm />
            <p>{formatMoney(stakeData.staked?stakeData.staked:0)}</p>
          </div>
          
        </div>
        <div className="div-stake-new row">
          <p className="col-12 col-sm-6 d-sm-block d-md-none d-lg-block col-lg-2 ">New stake amount</p>
          <div className="div-stakte-new-val col-12 col-sm-6 col-md-5  col-lg-3 ">
            <div className="div-skate-new-val-sub">
              <MarkDigm />
              <p>({this.state.valInput-stakeData.staked?formatMoneyPlus(this.state.valInput-stakeData.staked):'+'+0})</p>
            </div>
            <NumberFormat 
              value={this.state.valInput} 
              autoFocus={true}
              precision={2} 
              onChange={this.onValueChange} />

          </div>
          <div className="div-arrow d-none d-md-block col-md-2 "><img src = {imgArrow}></img></div>
          <div className="div-arrow col-12 d-md-none "><i className="fa fa-arrow-down "></i></div>
          
          <div className="div-stake-limit col-sm-12 col-md-5  ">
            <div className="div-stake-limit-label">
              <p>New order post limit</p>
              <i className = "icon-question fa fa-question-circle fa-lg"></i>
              <p>({this.state.valInput&&this.state.valInput? formatNumberPlus(this.state.valInput*1000-stakeData.postLimit): '+0' })</p>
            </div>
            <p className={this.getProcessValue(walletBalance,this.state.valInput)>100 || this.state.valInput == 0?'div-stake-limit-value danger':'div-stake-limit-value'}>
              {formatNumber(this.state.valInput&&this.state.valInput? this.state.valInput*1000: 0 )}
            </p>

          </div>
        </div>
        <div className="div-progress row">
          <div className="div-stake-progress col-sm-12 col-md-5 offset-md-0 col-lg-3 offset-lg-2">
            <p className="label-state">{this.state.valInput?this.state.valInput:0}/{stakeData.availableBalance} DIGM</p>
            {this.progressBar(stakeData.availableBalance)}
            <div className="label-progress">
              <div>0%</div>
              <div>25%</div>
              <div>50%</div>
              <div>75%</div>
              <div>100%</div>
            </div>
          </div>
        </div>
        <Footer
          onCancel = {this.props.onCancel}
          onConfirm = {this.onConfirm}
          onConfirmed = {this.props.onCancel}
          saving = {saving}
          disableConfirm = {(this.getProcessValue(walletBalance,this.state.valInput)>100) || (Number(stakeData.staked) == Number(this.state.valInput)) }
        />
      </div>
    );
  }
}

export default AdjustStake;
