import React from "react";

import "./CurSpan.scss";

const CurSpan = ({ curType, enabled }) => (
  <div className="span-currency">
    <div className={enabled ? curType : "disabled"}>{curType}</div>
  </div>
);

export default CurSpan;
