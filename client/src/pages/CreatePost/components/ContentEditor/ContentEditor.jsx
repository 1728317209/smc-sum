import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select, Message, Upload, Dialog } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { abilitySource } from '../../../../const/commonData';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const UploadDragger = Upload.Dragger;

const BYTE_IN_ONE_MEGA_BYTE = 1048576;

export default class ContentEditor extends Component {
  static displayName = 'ContentEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        title: '',
        desc: '',
        author: '',
        body: null,
        cats: [],
      },
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  handleSubmit = () => {
    this.postForm.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }

      Message.success('提交成功');
    });
  };

  onDragOver = () => {
    console.log('dragover callback');
  }

  onDrop = (fileList) => {
    console.log('drop callback : ', fileList);
  }

  checkUploadFile =(file, options) => {
    console.log(11111, file, options);
    if (Math.ceil(file.size / BYTE_IN_ONE_MEGA_BYTE) > 15) {
      Dialog.alert({
        title: '文件大小超出限制',
        content: '要求上传文件大小不超过15MB',
        onOk: () => console.log('ok'),
      });
      return false;
    }
  }

  handleUploadSuccess = (file, value) => {
    console.log('TCL: ContentEditor -> handleUploadSuccess -> file,value', file, value);
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div className="content-editor">
        <IceFormBinderWrapper
          ref={(refInstance) => {
            this.postForm = refInstance;
          }}
          value={this.state.value}
          onChange={this.formChange}
        >
          <IceContainer>
            <h2 style={styles.title}>添加文章</h2>
            <Form labelAlign="top" style={styles.form}>
              <Row>
                <Col span="11">
                  <FormItem label="标题" required>
                    <IceFormBinder name="title" required message="标题必填">
                      <Input placeholder="这里填写文章标题" />
                    </IceFormBinder>
                    <IceFormError name="title" />
                  </FormItem>
                </Col>
                <Col span="11" offset="2">
                  <FormItem label="作者" required>
                    <IceFormBinder
                      name="author"
                      required
                      message="作者信息必填"
                    >
                      <Input placeholder="填写作者名称" />
                    </IceFormBinder>
                    <IceFormError name="author" />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                  <FormItem label="第二作者">
                    <IceFormBinder
                      name="secondAuthor"
                    >
                      <Input placeholder="填写第二作者名称" />
                    </IceFormBinder>
                    <IceFormError name="secondAuthor" />
                  </FormItem>
                </Col>
                <Col span="11" offset="2">
                  <FormItem label="分类" required>
                    <IceFormBinder
                      name="cats"
                      required
                      type="array"
                      message="分类必填支持多个"
                    >
                      <Select
                        style={styles.cats}
                        mode="multiple"
                        placeholder="请选择分类"
                        dataSource={abilitySource}
                      />
                    </IceFormBinder>
                  </FormItem>
                </Col>
              </Row>
              <FormItem label="描述" required>
                <IceFormBinder name="desc">
                  <Input.TextArea placeholder="这里填写正文描述" />
                </IceFormBinder>
              </FormItem>
              <FormItem label="正文" required>
                <UploadDragger
                  listType="text"
                  headers={{ 'X-Requested-With': null }}
                  data={{ ownId: userInfo.id }}
                  withCredentials={false}
                  limit={1}
                  action="http://localhost:3000/api/upload"
                  accept=".pdf"
                  beforeUpload={this.checkUploadFile}
                  onSuccess={this.handleUploadSuccess}
                  onDragOver={this.onDragOver}
                  onDrop={this.onDrop}
                />
              </FormItem>
              <FormItem label=" ">
                <Button type="primary" onClick={this.handleSubmit}>
                  发布文章
                </Button>
              </FormItem>
            </Form>
          </IceContainer>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0px 0px 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
};
