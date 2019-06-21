import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InitStake from '../../common/components/InitStake/InitStake';
class Init extends PureComponent { 

  onCancel = () => {
    this.props.history.push('/bond');
  }

  render () {
    return (
      <div className="InitWrapper container-fluid">
        <InitStake 
          onCancel = {this.onCancel}
          onConfirmed = {this.onConfirm}
        />
      </div>
    );
  }
}
export default Init;
