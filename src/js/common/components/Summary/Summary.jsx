import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Summary.scss';
import { formatNumber } from '../../services/commonService';

class Summary extends PureComponent { 
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="container-summary container-fluid">
        <div className="row">
          {/* <div className='div-summary-label col-sm-12 col-md-5 col-lg-5 offset-lg-1 col-xl-3 offset-xl-3'>         */}
          <div className='div-summary-label '>
            <p>Become a maker</p>
            <p>to post orders to the Paradigm Network</p>
          </div>
          {/* <div className="div-summary col-sm-12 col-md-7 col-lg-6 "> */}
          <div className="div-summary  ">
            <div className="div-summary-staked ">
              <span className="badge">totalDigmStaked DIGM STAKED</span>
              <p>{formatNumber(this.props.totalDigmStaked)}</p>
            </div>
            <div className="div-summary-stakers">
              <span className="badge">TOTAL STAKERS</span>
              <p>{formatNumber(this.props.tatalStakers)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
