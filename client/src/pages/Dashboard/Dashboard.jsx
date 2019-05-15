import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actionCreators from '../../actions';

import Title from '../../components/Title';
import SmcStep from '../../components/SmcStep';

import './Dashboard.scss';

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
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
        <Title
          name="Secure multiparty summation"
          actions={this.props.actions}
        />
        <SmcStep />
      </div>
    );
  }
}
