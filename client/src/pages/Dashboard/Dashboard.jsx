import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import StatisticalCard from './components/StatisticalCard';

import DataStatistics from './components/DataStatistics';

import RealTimeStatistics from './components/RealTimeStatistics';

import LatestNews from './components/LatestNews';
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

  componentWillMount() {
    const { auth, history } = this.props;
    if (_.isEmpty(auth.userInfo)) {
      history.replace('/user/login');
    }
  }

  render() {
    return (
      <div className="dashboard-page">
        <StatisticalCard />

        <DataStatistics />

        <RealTimeStatistics />

        <LatestNews />
      </div>
    );
  }
}
