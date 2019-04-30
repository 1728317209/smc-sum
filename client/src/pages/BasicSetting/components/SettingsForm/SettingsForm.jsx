/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Form, Select, Field, Button } from '@alifd/next';
import './SettingsForm.scss';
import { abilitySource, userSource } from '../../../../const/commonData';


const FormItem = Form.Item;


export default class SettingsForm extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
    this.field = new Field(this);
  }

  componentDidMount() {
    const { userInfo } = this.props;
    this.field.setValues({ ...userInfo });
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('TCL: SettingsForm -> handleSubmit -> values', values);
    });
  };

  render() {
    const init = this.field.init;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <div className="settings-form">
        <IceContainer>
          <div className="formContainer">
            <Form field={this.field} className="formBlock">
              <FormItem required label="ID：" {...formItemLayout}>
                <Input
                  disabled
                  {...init('id', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
                />
              </FormItem>

              <FormItem required label="用户名：" {...formItemLayout}>
                <Input
                  {...init('username', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
                />
              </FormItem>

              <FormItem required label="邮箱：" {...formItemLayout}>
                <Input
                  {...init('email', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
                />
              </FormItem>

              <FormItem required label="用户组：" {...formItemLayout}>
                <Select
                  {...init('role', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
                  aria-label="tag mode"
                  mode="single"
                  dataSource={userSource}
                  style={{ width: '100%' }}
                />
              </FormItem>

              <FormItem required label="能力标签：" {...formItemLayout}>
                <Select
                  {...init('tags', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
                  aria-label="tag mode"
                  mode="tag"
                  dataSource={abilitySource}
                  style={{ width: '100%' }}
                />
              </FormItem>

              <FormItem label="注册时间：" {...formItemLayout}>
                <Input
                  disabled
                  {...init('createdAt', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
                />
              </FormItem>

              <FormItem label="最后操作时间：" {...formItemLayout}>
                <Input
                  disabled
                  {...init('updatedAt', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
                />
              </FormItem>
              <FormItem wrapperCol={{ span: 8, offset: 8 }}>
                <Button type="primary" size="large" onClick={this.handleSubmit}>
                  提 交
                </Button>
              </FormItem>
            </Form>
          </div>
        </IceContainer>
      </div>
    );
  }
}

