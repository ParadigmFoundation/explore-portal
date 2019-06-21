import React, { PureComponent,Fragment } from 'react';
import PropTypes from 'prop-types';
import PostView from './PostView/PostView';
import PostFooter from '../../common/components/PostFooter/PostFooter';

//import { Test } from './Post.styles';

class Post extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }


  render () {
    return (
      <Fragment>
        <PostView />
        
      </Fragment>
    );
  }
}

export default Post;
