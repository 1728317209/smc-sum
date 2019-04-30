/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import * as authActionCreators from '../../actions';


const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActionCreators, dispatch),
});
@connect(mapStateToProps, mapDispatchToProps)
@withRouter
class UserRegister extends Component {
  static displayName = 'UserRegister';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        email: '',
        passwd: '',
        rePasswd: '',
      },
    };
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values && values !== stateValues.passwd) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = () => {
    const { authActions } = this.props;
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      const { name: username, passwd: password, email } = values;
      authActions.acRegister({ username, password, email })
        .then(
          (res) => {
            const { ret, errMsg } = res.response;
            if (ret === 1) {
              Message.success('注册成功,正在自动登录...');
              setTimeout(() => {
                this.props.history.push('/');
              }, 2000);
            } else {
              Message.error(errMsg);
            }
          })
        .catch(
          (err) => {
            Message.error(err);
          }
        );
    });
  };

  render() {
    return (
      <div style={styles.container}>
        <h4 style={styles.title}>注 册</h4>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formItems}>
            <div style={styles.formItem}>
              <IceIcon type="person" size="small" style={styles.inputIcon} />
              <IceFormBinder name="name" required message="请输入正确的用户名">
                <Input
                  size="large"
                  placeholder="用户名"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="name" />
            </div>

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
              <IceFormBinder
                name="passwd"
                required
                validator={this.checkPasswd}
              >
                <Input
                  htmlType="password"
                  size="large"
                  placeholder="至少8位密码"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="passwd" />
            </div>

            <div style={styles.formItem}>
              <IceIcon type="lock" size="small" style={styles.inputIcon} />
              <IceFormBinder
                name="rePasswd"
                required
                validator={(rule, values, callback) =>
                  this.checkPasswd2(rule, values, callback, this.state.value)
                }
              >
                <Input
                  htmlType="password"
                  size="large"
                  placeholder="确认密码"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="rePasswd" />
            </div>

            <div className="footer">
              <Button
                type="primary"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
                size="large"
              >
                注 册
              </Button>
              <Link to="/user/login" style={styles.tips}>
                使用已有账户登录
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

export default UserRegister;
