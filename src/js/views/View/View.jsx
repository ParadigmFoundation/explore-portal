import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import ViewStaker from '../../common/components/ViewStaker/ViewStaker';
import Summary from '../../common/components/Summary/Summary';

import { actions as stakeActions } from '../../redux/modules/digm';
import { actions as tableActions } from '../../redux/modules/table';
import Loading from '../../common/components/LazyLoading/Loading';
import {fromWei} from "../../utils/tokenUtils";
const mapStateToProps = (state) => ({
  ethereum: state.ethereum,
  digm: state.digm,
  explore: state.explore,
  table: state.table,
})

const mapDispatchToProps = {
  ...stakeActions,
  ...tableActions,
};

@connect(mapStateToProps, mapDispatchToProps)
class View extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentDidMount() {
    const {getTableData} = this.props;
    getTableData();
  }

  onAdjustStake = () => {
    const stakeData = { staked: parseFloat(fromWei(this.props.digm.toJS().userPosterTokens)) };
    if(stakeData.staked > 0) this.props.history.push('/adjust');
    else this.props.history.push('/init');
  };

  onClose = () => {
    this.props.history.push('/bond');
  };

  render() {
    const stakeData = {
      staked: parseFloat(fromWei(this.props.digm.toJS().userPosterTokens)),
      totalDigmStaked: parseFloat(fromWei(this.props.digm.toJS().totalPosterTokensContributed )),
    };
    const { connected } = this.props.ethereum.toJS();
    const { bandwidth, network } = this.props.explore.toJS();
    const tatalStakers = network ? network.number_validators + bandwidth.number_posters : 0;

    const tableData = this.props.table.toJS();
    return (
      <div className='ViewWrapper'>
        <Summary
          totalDigmStaked={stakeData.totalDigmStaked}
          tatalStakers={tatalStakers}
        />
        <Loading isLoading = {tableData.fetching}/>
          {tableData.fetched&&<ViewStaker
          onAdjustStake = {this.onAdjustStake}
          onClose = {this.onClose}
          connected = {connected}
          stakeData = {stakeData}
          tableData = {tableData}
        />}
      </div>
    );
  }
}

View.propTypes = {
  // bla: PropTypes.string,
};

View.defaultProps = {
  // bla: 'test',
};

export default View;
