import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as authActionCreators from '../../actions';

import './Dashboard.scss';

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActionCreators, dispatch),
});
@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-page">
        SMC-多方安全计算
      </div>
    );
  }
}
