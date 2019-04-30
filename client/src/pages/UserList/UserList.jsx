

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';
import * as memberActionCreators from '../../actions/memberCenter';
import './UserList.scss';

const mapStateToProps = (state) => {
  const ownId = _.get(state, ['auth', 'userInfo', 'id'], '');
  const memberList = _.get(state, ['member', 'memberList']);
  return { ownId, memberList };
};

const mapDispatchToProps = dispatch => ({
  memberActions: bindActionCreators(memberActionCreators, dispatch),
});
@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export default class UserList extends Component {
  static displayName = 'UserList';
  render() {
    const breadcrumb = [
      { text: '用户管理', link: '' },
      { text: '用户列表', link: '#/user/list' },
    ];
    const { memberActions, ownId, memberList } = this.props;
    return (
      <div className="user-list-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable memberActions={memberActions} ownId={ownId} memberList={memberList} />
      </div>
    );
  }
}
