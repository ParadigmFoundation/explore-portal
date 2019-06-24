import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ViewStaker.scss'
import imgSortDown from '../../../../assets/images/sort-down.png';
import imgSortUp from '../../../../assets/images/sort-up.png';
import imgSearch from '../../../../assets/images/search.png';
import imgClose from '../../../../assets/images/close.png';
import arraySort from 'array-sort';

class ViewStaker extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      showSearch: false,
      tableData : props.tableData.result,
      curSortIndex: -1,
      curSortState: true
    };
    
  }
  showSearchInput = () => {
    this.state.showSearch 
      ? this.setState({tableData:this.props.tableData.result,showSearch:!this.state.showSearch})
      : this.setState({showSearch:!this.state.showSearch})
  }
  closeSearchInput = () => {
    this.setState({
      tableData: this.props.tableData.result,
      showSearch:false
    });
  }
  onInputChange = (event) => {
    
    this.setState({
      showSearch: true,
      tableData: this.props.tableData.result.filter((row) => row.address.toLowerCase().includes(event.target.value.toLowerCase()))
    })
  }

  getAddressText = (address) => {
    // if(address.length > 12)
    //   return address.slice(0,7)+'...'+address.slice(-5);
    // else
      return address;
  }
  onSortData = (curSortIndex, curSortState,tableData) => {
    
    return arraySort(tableData,s[curSortIndex],{reverse:!curSortState})
  }
  onClickTableHeader = (col) => {
    
    const {curSortIndex,curSortState,tableData} = this.state;
    const s = ['staker','address','stakeAmount','orderPostLimit'];
    if(col == curSortIndex) 
      this.setState({
        tableData:arraySort(tableData,s[curSortIndex],{reverse:curSortState}),
        curSortState:!curSortState
      });
    else 
      this.setState({
        showSearch:false,
        tableData:arraySort(this.props.tableData.result,s[curSortIndex],{reverse:!curSortState}),
        curSortIndex:col, curSortState:true
      });
  }
  sortImage = (col) => {
    const {curSortIndex,curSortState} = this.state;
    if(col == curSortIndex)  return (curSortState?<img src={imgSortDown}/>:<img src={imgSortUp}/>);
    else return null;
  }
  render () {
    const {showSearch, tableData} = this.state;
    return(
      <div className='ViewStakerWrapper '>
        <div className='row'>
          <table className='table-data table col-sm-12 col-md-11 offset-md-1'>
            <thead>
              <tr>
                <th width='10%' >
                  <span onClick={()=>this.onClickTableHeader(0)}>Staker</span>
                  {this.sortImage(0)}
                </th>
                <th width='40%' >
                  <span onClick={()=>this.onClickTableHeader(1)}>Address</span>
                  {this.sortImage(1)}
                  <span onClick={this.showSearchInput}><img src={imgSearch}/></span>
                    {showSearch&&(<div className='div-search-edit'>
                    <input type='text' onChange = {this.onInputChange}  />
                    <span onClick ={this.closeSearchInput} ><img src={imgClose}/></span>
                  </div>)}
                </th >
                <th width='20%' >
                  <span onClick={()=>this.onClickTableHeader(2)}>Stake Amount</span>
                  {this.sortImage(2)}
                </th>
                <th width='30%' >
                  <span onClick={()=>this.onClickTableHeader(3)}>Order post limit</span>
                  {this.sortImage(3)}
                </th>
              </tr>
            </thead>
            <tbody>
            {tableData.length?
              tableData.map((row, i) =>
                (<tr key={i}>
                  <td>{row.staker}</td>
                  <td>{this.getAddressText(row.address)}</td>
                  <td>{row.stakeAmount}</td>
                  <td>{row.orderPostLimit}</td>
                </tr>)
              )
              :null
            }
            </tbody>
          </table>
          {!tableData.length&&<div className='div-no-result col-sm-12 col-md-11 offset-md-1'>No results found</div>}
        </div>
        <div className='div-view-button row'>
          <button className='btn btn-gray' onClick={this.props.onClose}>Close</button>
          <button 
              className={this.props.connected ? 'btn btn-green':'btn btn-gray'} 
              disabled={!this.props.connected}
              onClick={this.props.onAdjustStake}> 
            {this.props.stakeData.staked > 0 ? 'Adjust stake' : 'Stake'}
          </button>
        </div>
      </div>
    );
    }
  }
  const mapStateToProps = state => ({
  });
  
  const mapDispatchToProps = dispatch => ({
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ViewStaker);
  
