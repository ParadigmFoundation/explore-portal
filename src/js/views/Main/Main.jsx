import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Summary from '../../common/components/Summary/Summary';
import MainState from './MainState/MainState';
import { fromWei } from "../../utils/tokenUtils";

import { actions as stakeActions } from '../../redux/modules/digm';
import { actions as exploreActions } from "../../redux/modules/explore";
import { actions as ethereumActions } from "../../redux/modules/ethereum";

const mapStateToProps = state => ({
  ethereum: state.ethereum,
  explore: state.explore,
  digm: state.digm,
  stake: state.stake
});

const mapDispatchToProps = {
  ...stakeActions,
  ...exploreActions,
  ...ethereumActions,
};

@connect(mapStateToProps, mapDispatchToProps)
class Main extends PureComponent {
  onViewStakers = () => {
    this.props.history.push('/view');
  };

  onAdjustStake = () => {
    const stakeData = { staked: parseFloat(fromWei(this.props.digm.toJS().userPosterTokens)) };

    if (stakeData.staked > 0) this.props.history.push("/adjust");
    else this.props.history.push("/init");
  };

  render() {
    const { connected } = this.props.ethereum.toJS();
    const { bandwidth, network } = this.props.explore.toJS();

    const stakeData = {
      staked: parseFloat(fromWei(this.props.digm.toJS().userPosterTokens)),
      totalDigmStaked: parseFloat(fromWei(this.props.digm.toJS().totalPosterTokensContributed)),
    };
    const tatalStakers = network? network.number_validators + bandwidth.number_posters : 0;

    return (
      <div className="MainWrapper">
        <Summary
          totalDigmStaked={stakeData.totalDigmStaked}
          tatalStakers={tatalStakers}
        />
        <MainState
          onViewStakers={this.onViewStakers}
          onAdjustStake={this.onAdjustStake}
          connected={connected}
          stakeData={stakeData}
        />
      </div>
    );
  }
}

export default Main;
