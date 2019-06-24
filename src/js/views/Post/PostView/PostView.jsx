import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './PostView.scss';
import { actions as postActions } from '../../../redux/modules/post';
import { stat } from 'fs';
const mapStateToProps = (state) => ({
  post: state.post,
})

const mapDispatchToProps = {
  ...postActions,
}
@connect(mapStateToProps, mapDispatchToProps)

class PostView extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      strJson: '',
    };
  }

  onTextChange = (event) => {
    this.setState({strJson:event.target.value})
  }

  onPost = () => {
    const {postOrder} = this.props;
    const {strJson} = this.state;
    postOrder(strJson);
  }

  getViewDocBtnStyle = () => {
    console.log("Get Button");
    const {verifying, verified, failed,posting,posted,result} = this.props.post.toJS();
    if(posted && (result.status==false))
      return {marginTop: `47px`}
    else if(posted && (result.status==true))
      return {marginTop: `49px`}
    else 
      return {marginTop: `89px`};
  }

  render () {
    const {strJson} = this.state;
    const {postOrder, postVerifyFailed, postPosting, postPosted} = this.props;
    const {verifying, verified, failed,posting,posted,result,invalid} = this.props.post.toJS();
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className='PostViewWrapper container'>
        <div className="row">
          <p className='div-post-title col-12 col-sm-12 col-md-12 col-lg-10 col-xl-7'>Post orders to the Paradigm Network</p>
        </div>
        <div className="div-post-edit-label row">
          <p className='col-12'>Enter JSON string for the following signed order types:</p>
          <p className='col-12'><a className="pretty-code">0x, Paradigm</a></p>
        </div>
        <div className='div-post-inputbtn row'>
          <input
              id          ="input-box"
              type        ='text'
              className   ='div-post-input col-9 col-md-7 col-lg-5' 
              placeholder ='Enter order JSON here...'
              value       ={this.state.strJson}
              onChange    ={this.onTextChange}
          />
          <button 
              className='btn div-post-post-button' 
              disabled={!strJson.length}
              onClick={this.onPost}
            >
            Post
          </button>
        </div>
        {(posted&&result.status)&&
          <div className="div-post-success row">
            <span>Transaction ID = </span>
            <a href={result.link} className='span-post-trans-id'>{result.transactionID}</a>
          </div>
        }
        {(posted&&!result.status)&&
          <div className="div-post-err-no-stake row">
            <span>Network rejected order. Make sure you've </span>
            <a href={'#/bond'} className='span-post-stake-link'>staked DIGM</a>
            <span>for post access.</span>
          </div>
        }
        {(!verifying && invalid)&&
          <div className="div-post-err-no-stake row">
            <span>Invalid JSON order object.</span>
          </div>
        }

        <a  type='buttn' 
            href='https://docs.paradigm.market'
            className='btn div-post-view-docs row'
             style={this.getViewDocBtnStyle()}
        >View docs</a>
      </div>
    );
  }
}

export default PostView;
