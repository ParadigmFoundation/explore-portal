import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import StatusCard from './StatusCard/StatusCard';
import { connect } from 'react-redux'
import TableTransaction from './TableTransaction/TableTransaction';

import './Explore.scss'
import TableValidators from './TableValidators/TableValidators';
import PostFooter from '../../common/components/PostFooter/PostFooter';

import { actions as websocketActions } from '../../redux/modules/websocket';
import { actions as exploreActions } from '../../redux/modules/explore';
import { actions as bandwidthlimitActions } from '../../redux/modules/bandwidthlimit';
import { formatNumber, formatMoney } from '../../common/services/commonService';

const mapStateToProps = (state) => ({
  websocket: state.websocket,
  explore: state.explore,
  bandwidthlimit: state.bandwidthlimit,
})


const mapDispatchToProps = {
  ...websocketActions,
  ...exploreActions,
  ...bandwidthlimitActions,
};

const dataTemplate = [
  {title:'Block height', value:'0', subValue:'', isOrders: false, showConnect: false},
  {title:'Rebalance period', value:'0', subValue:'', isOrders: false, showConnect: false},
  {title:'Avg. block time', value:'0s', subValue:'', isOrders: false, showConnect: false},
  {title:'Total token supply', value:'0', isSmall: true, subValue:'', isOrders: false, showConnect: false},
  {title:'Validators', value:'0', subValue:'0', isOrders: false, showConnect: false},
  {title:'Posters', value:'0', subValue:'0', isOrders: false, showConnect: false},
  {title:'Total bandwidth limit', value:'0',isSmall: true, subValue:'', isOrders: true, showConnect: false},
  {title:'Your bandwidth limit', value:'0', subValue:'', isOrders: false, showConnect: true},
]

const tableDataTrans = [
  {order_id: '2g34d90d2g34d90d', poster_address: '0x12345678',maker_address: '0x12345678', order_type: '0x'},

];

const tableDataValidatorHeader = [
  { title : 'ID', field: 'publicKey'},
  { title : 'Stake', field: 'stake'},
  { title : 'Reward', field: 'reward'},
  { title : 'Uptime', field: 'uptimePercent'},
  { title : 'Age (blocks)', field: 'firstVote'},
]
const tableDataValidator = [
  { 
    public_key: '0x12345678910',
    stake: '123', 
    reward: '321',
    uptime_percent: '11.3%', 
    first_block: '11', 
    last_voted: '11', 
    power: '11'
  },

]
@connect(mapStateToProps, mapDispatchToProps)
class Explore extends PureComponent { 
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      validators: [],
      networkStatus: [],
    };
  }
  getstatusData() {
    const { token, bandwidth, network } = this.props.explore.toJS();
    console.log("\n%o, %o, %o\n", token, bandwidth, network);
    const { bandWidthLimit } = this.props.bandwidthlimit.toJS();

    if(!token) return dataTemplate;
    let data = dataTemplate;
    data[0].value = formatNumber(network.blockHeight);
    data[1].value = formatNumber(bandwidth.rebalancePeriodNumber);
    data[2].value = network.avgBlockInterval/1000+'s';
    data[3].value = formatNumber(token.totalSupply / Math.pow(10,18));
    data[4].value = formatNumber(network.numberValidators);
    data[4].subValue = formatMoney(network.totalValidatorStake);
    data[5].value = formatNumber(bandwidth.numberPosters);
    data[5].subValue = formatMoney(network.totalPosterStake / Math.pow(10,18));
    data[6].value = formatNumber(bandwidth.remainingLimit);
    if(bandWidthLimit) {
      data[7].value = formatNumber( bandWidthLimit );
      data[7].showConnect = false;
    }
    return data;

  }
  render () {
    const { transactions, validators, network } = this.props.explore.toJS();
    const transactionData = transactions? transactions: [];
    const validatorData = validators? validators: [];
    const networkStatus = this.getstatusData();

    return (
      <div className="container ExploreWrapper">
        <div className="row">
          <p className='lbl-label col'>Network</p>
        </div>
        <div className="row row-status">
          {networkStatus.map((item,index) => (
            <div className="col-12 col-md-6 col-lg-4 col-xl-3" key = {index}>
              <StatusCard {...item} />
            </div>
          ))}
        </div>

        <div className="row">
          <p className='lbl-label col'>Orders</p>
        </div>
        <div className="row row-status">
            <div className='col'>
              <TableTransaction tableData = {transactionData} />
            </div>
        </div>

        <div className="row">
          <p className='lbl-label col'>Validators</p>
        </div>
        <div className="row row-status">
            <div className='col'>
              <TableValidators
                tableHeader = {tableDataValidatorHeader} 
                // tableData = {tableDataValidator}
                 tableData = {validatorData}
                 blockHeight = {network? network.blockHeight : 0}
              />
            </div>
        </div>            
      </div>
    );
  }
}


export default Explore;
