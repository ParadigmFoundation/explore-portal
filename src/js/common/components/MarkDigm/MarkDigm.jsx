import React from 'react';
import PropTypes from 'prop-types';
import './MarkDigm.scss';
import classNames from 'classnames';
const MarkDigm = ({isSmallMark}) => (
  <div className="div-mark">
    <span className={classNames("badge",{'small-mark':isSmallMark})}>DIGM</span>
  </div>
);
export default MarkDigm;
          