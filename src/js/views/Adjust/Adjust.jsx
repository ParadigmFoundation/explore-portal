import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AdjustStake from '../../common/components/AdjustStake/AdjustStake';
import Footer from '../../common/components/Footer/Footer';
import InitStake from '../../common/components/InitStake/InitStake';
//import { Test } from './Adjust.styles';

class Adjust extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }
  onCancel = () => {
    this.props.history.push('/bond');
  }
  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className='AdjustWrapper container-fluid'>
        <AdjustStake 
          onCancel = {this.onCancel}
        />
      </div>
    );
  }
}

Adjust.propTypes = {
  // bla: PropTypes.string,
};

Adjust.defaultProps = {
  // bla: 'test',
};

export default Adjust;
