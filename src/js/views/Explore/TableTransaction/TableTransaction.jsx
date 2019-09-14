import React, { PureComponent } from "react";
import imgSortDown from "../../../../assets/images/sort-down.png";
import imgSortUp from "../../../../assets/images/sort-up.png";
import { getConcentrated } from "../../../../js/common/services/commonService";
import arraySort from "array-sort";
import ReactTableContainer from "react-table-container";
import { TableHead } from "reactstrap";
import "./TableTransaction.scss";

const colNames = ["order_id", "poster_address", "order_type"];
const API_URL = "https://orders-api.kosu.io/order?id=";
class TableTransaction extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tableData: props.tableData,
      curSortIndex: -1,
      curSortState: true
    };
  }
  onClickTableHeader = col => {
    const { curSortIndex, curSortState, tableData } = this.state;
    if (col == curSortIndex)
      this.setState({
        tableData: arraySort(tableData, colNames[curSortIndex], {
          reverse: curSortState
        }),
        curSortState: !curSortState
      });
    else
      this.setState({
        tableData: arraySort(this.props.tableData, colNames[col], {
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
    }
  };
  componentDidUpdate(prevState) {
    const { curSortIndex, curSortState } = this.state;
    const { tableData } = this.props;
    if (curSortIndex >= 0) {
      this.setState({
        tableData: arraySort(tableData, colNames[curSortIndex], {
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

    return (
      <div className="TableTransactionWrapper">
        <ReactTableContainer
          className="rtc"
          width="100%"
          height="635px"
          customHeader={[TableHead]}
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
        >
          <table className="table-trans">
            <thead>
              <tr>
                <th width="1000px">
                  <div style={{ minWidth: "200px" }}>
                    <span>ID</span>
                  </div>
                </th>
                <th width="1000px">
                  <div style={{ minWidth: "200px" }}>
                    <span>Poster</span>
                  </div>
                </th>
                {/* <th width="1000px">
                  <div style={{ minWidth: "200px" }}>
                    <span>Type</span>
                  </div>
                </th> */}
              </tr>
            </thead>

            <tbody>
              {tableData.length
                ? tableData.map((row, i) => (
                    <tr key={i}>
                      <td>
                        <div className="div-circle">
                          <div
                            className="shape-circle"
                            style={{
                              backgroundColor: "#" + row.orderId.slice(-6)
                            }}
                          />
                          <a href={API_URL + row.orderId} target="_blank">
                            {getConcentrated(row.orderId)}
                          </a>
                        </div>
                      </td>
                      <td>
                        <a href={"https://etherscan.io/address/" + row.posterAddress} target="_blank">{getConcentrated(row.posterAddress)}</a>
                      </td>
                      {/* <td>
                        <span className={"type-" + row.orderType}>
                          {row.orderType}
                        </span>
                      </td> */}
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </ReactTableContainer>
      </div>
    );
  }
}

export default TableTransaction;
