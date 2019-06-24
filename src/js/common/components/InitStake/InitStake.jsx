import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './InitStake.scss';
import { Progress } from 'reactstrap';
import { connect } from 'react-redux'
import MarkDigm from '../MarkDigm/MarkDigm';
import imgArrow from '../../../../assets/images/arrow.png';
import imgInfo from '../../../../assets/images/question-circle-solid.svg';
import {formatNumber, } from '../../../common/services/commonService';
import { actions as digmActions } from '../../../redux/modules/digm';
import Footer from '../Footer/Footer';
import NumberFormat from 'react-number-format';
import { actions as balanceActions } from '../../../redux/modules/balance';
import { fromWei } from '../../../utils/tokenUtils'

const mapStateToProps = (state) => ({
  digm: state.digm,
  balance: state.balance,
})

const mapDispatchToProps = {
  ...digmActions,
  ...balanceActions,
}
@connect(mapStateToProps, mapDispatchToProps)
class InitStake extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      valInput: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ valInput: parseFloat(fromWei(nextProps.digm.toJS().availableBalance)) });
  }

  onValueChange = (event) => {
    if (event.target.value === 0 || event.target.value === '.')
      this.setState({ valInput: 0 });
    else
      this.setState({ valInput: event.target.value });
  };

  getProcessValue = (walletBalance, valNew) => {
    return walletBalance && valNew? valNew / walletBalance * 100: 0;
  };

  onConfirm = () => {
    // let stakeData = this.props.digm.toJS().result; //TODO
    // stakeData.staked = this.state.valInput;
    // stakeData.postLimit = this.state.valInput*1000;
    // const {saveStakeData} = this.props;
    // saveStakeData(stakeData);
  };

  progressBar = (availableBalance) => {
    let v = availableBalance && this.state.valInput ? this.state.valInput / availableBalance * 100 : 0;
    if(v > 0)
      return (<Progress className={v>100?'danger':''} value={v}/>);
    else
      return (<Progress className={'danger'} value={3}/>);

  }

  render () {
    const { availableBalance } = this.props.digm.toJS();
    const { saving } = this.props.digm.toJS();
    const availableBalanceFormatted = parseFloat(fromWei(availableBalance));
    return (
      <div className="container-init container-fluid">
        <div className="div-stake-new row">
          <p className=" col-12 d-none d-md-block col-md-2">Stake amount</p>
          <div className="div-stakte-new-val col-sm-12 col-md-3">
            <div className="div-skate-new-val-sub">
              <MarkDigm />
            </div>
            <NumberFormat
              value={this.state.valInput}
              autoFocus={true}
              precision={2}
              onChange={this.onValueChange} />
          </div>
          <div className="div-arrow d-none d-md-block col-md-2 "><img src = {imgArrow}></img></div>
          <div className="div-arrow col-12 d-md-none "><i className="fa fa-arrow-down "></i></div>
          <div className="div-stake-limit col-sm-12 col-md-4 col-lg-5">
            <div className="div-stake-limit-label">
              <p>Order post limit</p>
              <i className = "icon-question fa fa-question-circle fa-lg"></i>
            </div>
            <p className={this.getProcessValue(availableBalanceFormatted, this.state.valInput) > 100 || this.state.valInput == 0 ? 'div-stake-limit-value danger':'div-stake-limit-value'}>
              {formatNumber(this.state.valInput ? this.state.valInput * 1000: 0 )}
            </p>
          </div>
        </div>
        <div className="div-progress row">
          <div className="div-stake-progress col-sm-12 col-md-3 offset-md-2">
            <p className="label-state">{this.state.valInput?this.state.valInput:0}/{availableBalanceFormatted} DIGM</p>
            {this.progressBar(availableBalanceFormatted)}
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
          disableConfirm = {this.getProcessValue(availableBalanceFormatted,this.state.valInput)>100 || this.state.valInput==0 }
          
        />
      </div>
    );
  }
}

InitStake.propTypes = {
  // bla: PropTypes.string,
};

InitStake.defaultProps = {
  // bla: 'test',
};

export default InitStake;
