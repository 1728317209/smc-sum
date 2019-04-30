import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Select } from '@alifd/next';
import { abilitySource, userSource } from '../../../../../const/commonData';

const FormItem = Form.Item;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
    };
    this.field = new Field(this);
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

      const { dataIndex } = this.state;
      this.props.getFormValues(dataIndex, values);
      this.setState({
        visible: false,
      });
    });
  };

  onOpen = (index, record) => {
    this.field.setValues({ ...record });
    this.setState({
      visible: true,
      dataIndex: index,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const init = this.field.init;
    const { index, record } = this.props;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    return (
      <div style={styles.editDialog}>
        <Button type="primary" onClick={() => this.onOpen(index, record)}>
          编辑
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="编辑"
        >
          <Form field={this.field}>
            <FormItem required label="用户名：" {...formItemLayout}>
              <Input
                {...init('username', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem required label="邮箱：" {...formItemLayout}>
              <Input
                disabled
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

            <FormItem label="能力标签：" {...formItemLayout}>
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
          </Form>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};
