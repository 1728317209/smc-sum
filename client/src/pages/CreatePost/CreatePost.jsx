

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import ContentEditor from './components/ContentEditor';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import * as memberActionCreators from '../../actions/memberCenter';
import './CreatePost.scss';

const mapStateToProps = (state) => {
  const userInfo = _.get(state, ['auth', 'userInfo'], {});
  return { userInfo };
};

const mapDispatchToProps = dispatch => ({
  memberActions: bindActionCreators(memberActionCreators, dispatch),
});
@connect(mapStateToProps, mapDispatchToProps)
export default class CreatePost extends Component {
  static displayName = 'CreatePost';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userInfo } = this.props;
    const breadcrumb = [
      { text: '文章管理', link: '' },
      { text: '添加文章', link: '#/post/create' },
    ];
    return (
      <div className="create-post-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <ContentEditor userInfo={userInfo} />
      </div>
    );
  }
}
