/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import * as authActionCreators from '../../actions';

// 寻找背景图片可以从 https://unsplash.com/ 寻找
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
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        email: '',
        password: '',
        checkbox: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { authActions } = this.props;
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      const { email, password } = values;
      authActions.acLogin({ email, password }).then(
        (res) => {
          const { ret, errMsg } = res.response;
          if (ret === 1) {
            Message.success('登录成功');
            setTimeout(() => {
              this.props.history.push('/');
            }, 2000);
          } else {
            Message.error(errMsg);
          }
        }
      ).catch(
        (err) => {
          Message.error(err);
        }
      );
    });
  };

  render() {
    const { auth } = this.props;
    return (
      <div style={styles.container}>
        <h4 style={styles.title}>登 录</h4>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formItems}>
            <div style={styles.formItem}>
              <IceIcon type="mail" size="small" style={styles.inputIcon} />
              <IceFormBinder
                type="email"
                name="email"
                required
                message="请输入正确的邮箱"
              >
                <Input
                  size="large"
                  maxLength={20}
                  placeholder="邮箱"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="email" />
            </div>

            <div style={styles.formItem}>
              <IceIcon type="lock" size="small" style={styles.inputIcon} />
              <IceFormBinder name="password" required message="必填">
                <Input
                  size="large"
                  htmlType="password"
                  placeholder="密码"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="password" />
            </div>

            <div style={styles.formItem}>
              <IceFormBinder name="checkbox">
                <Checkbox style={styles.checkbox}>记住账号</Checkbox>
              </IceFormBinder>
            </div>

            <div style={styles.footer}>
              <Button
                type="primary"
                size="large"
                loading={auth.isLogging}
                onClick={this.handleSubmit}
                style={styles.submitBtn}
              >
                登 录
              </Button>
              <Link to="/user/register" style={styles.tips}>
                立即注册
              </Link>
            </div>
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '400px',
    padding: '40px',
    background: '#fff',
    borderRadius: '6px',
  },
  title: {
    margin: '0 0 40px',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '28px',
    fontWeight: '500',
    textAlign: 'center',
  },
  formItem: {
    position: 'relative',
    marginBottom: '20px',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '12px',
    color: '#666',
  },
  inputCol: {
    width: '100%',
    paddingLeft: '20px',
  },
  submitBtn: {
    width: '100%',
  },
  tips: {
    marginTop: '20px',
    display: 'block',
    textAlign: 'center',
  },
};

export default UserLogin;
