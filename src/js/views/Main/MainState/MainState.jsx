import React from 'react';
import  { Redirect } from 'react-router-dom'

import {formatMoney, formatMoneyPlus,formatNumber} from '../../../common/services/commonService';

import PropTypes from 'prop-types';
import './MainState.scss';
import MarkDigm from '../../../common/components/MarkDigm/MarkDigm';

const MainState = (props) => {
  return (
  <div className='container-mainstate container-fluid'>
    <div className='div-state '>
      <div>
        <p className='div-state-label'>Your</p>
        {/* <span className='bage'>DIGM</span> */}
        <MarkDigm />
        <p className='div-state-label'>staked</p>
      </div>
      <p className={props.stakeData.staked ? 'div-state-value black':'div-state-value'}>{formatNumber(props.stakeData.staked ? props.stakeData.staked : 0)}</p>
      <p className='div-state-label'>Order post limit</p>
      <p className={props.stakeData.staked ? 'div-state-value black':'div-state-value'}>{formatNumber(props.stakeData.postLimit ? props.stakeData.postLimit : 0)}</p>
    </div>
    <div className='div-state-btngroup   '>
      <button className='btn btn-gray-black' onClick={ props.onViewStakers }>View Stakers</button>
      <button className={props.connected?'btn btn-green':'btn btn-gray'}
              disabled={!props.connected}
              onClick={props.onAdjustStake}>
        {props.stakeData.staked > 0 ? 'Adjust stake' : 'Stake'}
      </button>
    </div>
  </div>
)};

MainState.propTypes = {
};

MainState.defaultProps = {
};

export default MainState;
