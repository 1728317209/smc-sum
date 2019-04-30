/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { withRouter } from 'react-router';

import MainRoutes from './MainRoutes';
import './scss/index.scss';

@withRouter
export default class BasicLayout extends Component {
  render() {
    const layoutClassName = 'ice-design-layout';

    return (
      <div className={layoutClassName}>
        <Layout>
          <Layout.Section scrollable>
            <Layout.Main>
              <MainRoutes />
            </Layout.Main>
          </Layout.Section>
        </Layout>
      </div>
    );
  }
}
