import React from "react";
import PropTypes from "prop-types";
import MarkDigm from "../../../common/components/MarkDigm/MarkDigm";
import "./StatusCard.scss";
import classNames from "classnames";
const StatusCard = ({
  title,
  value,
  subValue,
  isOrders,
  showConnect,
  isSmall,
  isLabel
}) => (
  <div className="container-fluid StatusCardWrapper">
    <div className="row row-title">
      <div className="div-title">{title}</div>
    </div>
    <div className="row-content">
      <div className="col-cont1">
        {showConnect ? (
          <div className="cont-connect">Connect to MetaMask</div>
        ) : (
          <div
            className={classNames("cont-val11", { smallfont: isSmall })}
            style={
              value.length >= 11 || isLabel
                ? { fontSize: "26px", marginTop: "6px" }
                : { fontSize: "31px" }
            }
          >
            {value}
          </div>
        )}
        {isOrders && <div className="cont-val12">Orders</div>}
      </div>
      {subValue && (
        <div className="col-cont2">
          <div className="cont-val21">{subValue}</div>
          <MarkDigm isSmallMark={true} />
        </div>
      )}
    </div>
  </div>
);

export default StatusCard;