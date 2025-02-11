import React, { PureComponent } from "react";
import imgSortDown from "../../../../assets/images/sort-down.png";
import imgSortUp from "../../../../assets/images/sort-up.png";
import arraySort from "array-sort";
import ReactTableContainer from "react-table-container";
import { TableHead } from "reactstrap";
import "./TableValidators.scss";
import { getConcentrated, formatNumber } from "../../../common/services/commonService";


class TableValidators extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tableData: props.tableData,
      curSortIndex: -1,
      curSortState: true
    };
  }
  onClickTableHeader = col => {
    console.log(col);

    const { tableHeader } = this.props;
    const { curSortIndex, curSortState, tableData } = this.state;

    if (col == curSortIndex)
      this.setState({
        tableData: arraySort(
          this.props.tableData,
          tableHeader[curSortIndex].field,
          { reverse: curSortState }
        ),
        curSortState: !curSortState
      });
    else
      this.setState({
        tableData: arraySort(this.props.tableData, tableHeader[col].field, {
          reverse: !curSortState
        }),
        curSortIndex: col,
        curSortState: true
      });
  };

  sortImage = col => {
    const { curSortIndex, curSortState } = this.state;
    if (col == curSortIndex) {
      return curSortState ? <img src={imgSortDown} /> : <img src={imgSortUp} />;
    } else {
      return null;
    }
  };

  componentDidUpdate(prevState) {
    const { curSortIndex, curSortState } = this.state;
    const { tableData, tableHeader } = this.props;
    if (curSortIndex >= 0) {
      this.setState({
        tableData: arraySort(tableData, tableHeader[curSortIndex].field, {
          reverse: curSortState
        })
      });
    } else {
      this.setState({
        tableData: tableData
      });
    }
  }
  render() {
    const { tableData } = this.state;
    const { tableHeader, blockHeight } = this.props;
    const tableWidth = ["200px", "80px", "140px", "110px", "140px"];
    return (
      <div className="TableValidatorsWrapper">
        <ReactTableContainer
          className="rtc"
          width="100%"
          // height="635px"
          scrollbarStyle={{
            background: {
              marginRight: "5px",
              backgroundColor: "transparent"
            },
            backgroundFocus: {
              marginRight: "5px",
              backgroundColor: "transparent"
            },
            foreground: {
              marginRight: "5px",
              opacity: 0.28,
              borderRadius: "6.5px",
              backgroundColor: "#000000"
            },
            foregroundFocus: {
              marginRight: "5px",
              opacity: 0.28,
              borderRadius: "6.5px",
              backgroundColor: "#000000"
            }
          }}
          customHeader={[TableHead]}
        >
          <table className="table-validator">
            <thead>
              <tr>
                {tableHeader.map((item, index) => (
                  <th width="1000px" key={index}>
                    <div style={{ minWidth: tableWidth[index] }}>
                      <span onClick={() => this.onClickTableHeader(index)}>
                        {item.title}
                      </span>
                      {this.sortImage(index)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tableData.length
                ? tableData.map((row, i) => (
                    <tr key={i}>
                      <td>
                        <div className="div-circle">
                          <div className="shape-circle" />
                          <div>
                            <a>{getConcentrated(row.publicKey, true)}</a>
                          </div>
                        </div>
                      </td>
                      <td>{formatNumber((row.stake) / Math.pow(10, 18))}</td>
                      <td>{row.reward} ETH/period</td>
                      <td>{row.uptimePercent}%</td>
                      <td>{formatNumber(row.lastVoted - row.firstVote)}</td>
                    </tr>
                  ))
                : (
                  <tr className="tr-no-order">
                    <td colSpan="5">No validators to display.</td>
                  </tr>
                )}
            </tbody>
          </table>
        </ReactTableContainer>
      </div>
    );
  }
}

export default TableValidators;
