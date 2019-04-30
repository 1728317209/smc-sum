import React, { PureComponent } from 'react';
import Layout from '@icedesign/layout';
import Logo from '../Logo';

import './Footer.scss';

export default class Footer extends PureComponent {
  render() {
    return (
      <Layout.Footer className="ice-design-layout-footer">
        <div className="ice-design-layout-footer-body">
          <div style={{ filter: 'grayscale(100%)', opacity: 0.3 }}>
            <Logo />
          </div>
          <div className="copyright">
            © 2019 Theme designed by{' '}
            <a
              href="#"
              target="_blank"
              className="copyright-link"
              rel="noopener noreferrer"
            >
              BruinK
            </a>
          </div>
        </div>
      </Layout.Footer>
    );
  }
}
