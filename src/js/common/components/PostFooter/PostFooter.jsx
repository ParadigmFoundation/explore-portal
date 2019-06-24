import React from 'react';
import './PostFooter.scss';

const PostFooter = ({ isAutoResize }) => (
  <div className="PostFooterWrapper container-fluid">
      <div className={isAutoResize? 'container-fluid' : 'container center'}>
        <p>© Paradigm Labs 2019</p>
        <a href='mailto:info@paradigm.market'>Contact Us</a>
      </div>
  </div>
);

export default PostFooter;
