/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React, { PureComponent } from 'react';
import { Balloon, Icon, Nav } from '@alifd/next';
import Layout from '@icedesign/layout';
import FoundationSymbol from '@icedesign/foundation-symbol';
import cx from 'classnames';
import _ from 'lodash';
import Mock from 'mockjs';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { headerMenuConfig } from '../../../../menuConfig';
import Logo from '../Logo';
import './scss/base.scss';
import * as authActionCreators from '../../../../actions';

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
export default class Header extends PureComponent {
  render() {
    const { isMobile, className, style, auth, authActions } = this.props;
    const role = _.get(auth, ['userInfo', 'role'], []);
    const username = _.get(auth, ['userInfo', 'username'], 'Default');
    const characterAvatar = username.split('')[0].toUpperCase();
    return (
      <Layout.Header
        className={cx('ice-design-layout-header', className)}
        style={{ ...style }}
      >
        <Logo />

        <div className="ice-design-layout-header-menu">
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Nav direction="hoz" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.path;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.path;
                } else {
                  linkProps.to = nav.path;
                }
                return (
                  <Nav.Item key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        <span className="ice-head-nav-text">{!isMobile ? nav.name : null}</span>
                      </Link>
                    ) : (
                      <a {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        <span className="ice-head-nav-text">{!isMobile ? nav.name : null}</span>
                      </a>
                    )}
                  </Nav.Item>
                );
              })}
            </Nav>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}
          <Balloon
            trigger={
              <div className="ice-design-header-userpannel">
                <div className="user-avatar" style={{ backgroundColor: `${Mock.Random.color()}` }}>{characterAvatar}</div>
                <div className="user-profile">
                  <span className="user-name">{username}</span>
                  <br />
                  <span className="user-department">{role}</span>
                </div>
                <Icon
                  type="arrow-down"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li className="user-profile-menu-item">
                <Link to="/setting/basic">
                  <FoundationSymbol type="repair" size="small" />
                  设置
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/" onClick={authActions.acLogout}>
                  <FoundationSymbol type="compass" size="small" />
                  退出
                </Link>
              </li>
            </ul>
          </Balloon>
        </div>
      </Layout.Header>
    );
  }
}
