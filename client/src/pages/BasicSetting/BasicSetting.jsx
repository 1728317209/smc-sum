

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import SettingsForm from './components/SettingsForm';
import * as memberActionCreators from '../../actions/memberCenter';


import './BasicSetting.scss';

const mapStateToProps = (state) => {
  const userInfo = _.get(state, ['auth', 'userInfo'], {});
  return { userInfo };
};

const mapDispatchToProps = dispatch => ({
  memberActions: bindActionCreators(memberActionCreators, dispatch),
});
@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export default class BasicSetting extends Component {
  static displayName = 'BasicSetting';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '通用设置', link: '' },
      { text: '基本设置', link: '#/setting/basic' },
    ];
    const { userInfo } = this.props;
    return (
      <div className="basic-setting-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <SettingsForm userInfo={userInfo} />
      </div>
    );
  }
}
