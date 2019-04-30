import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Document, Page, Outline } from 'react-pdf';
import { Button, Icon, Input, Grid, Rating, Form } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import { demoPdfUrl } from '../../const/commonData';
import './index.scss';

const { Row, Col } = Grid;
const FormItem = Form.Item;

class ReviewContent extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }
  componentWillMount() {}

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      numPages,
      pageNumber: 1,
    });
  }
  changePage = offset => this.setState(prevState => ({
    pageNumber: prevState.pageNumber + offset,
  }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  onItemClick = ({ pageNumber }) => this.setState({ pageNumber });

  validateAllFormField = () => {
    this.reviewForm.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      console.log('values:', values);
    });
  };

  render() {
    console.log(1111, this.props.match.params.id);
    const { pageNumber, numPages } = this.state;
    const breadcrumb = [
      { text: '文章列表', link: '#/post/list' },
      { text: '文章审阅', link: '' },
    ];
    return (
      <React.Fragment>
        <CustomBreadcrumb dataSource={breadcrumb} />
        <IceContainer style={{ padding: '0 20px 20px' }}>
          <div className="reviewContainer">
            <div className="contentBlock">
              <Document file={demoPdfUrl} onLoadSuccess={this.onDocumentLoadSuccess}>
                <Outline onItemClick={this.onItemClick} />
                <Page pageNumber={pageNumber} />
              </Document>
              <div className="optionBlock">
                <span className="pageText">共 {numPages || '--'} 页 / 第 {pageNumber || (numPages ? 1 : '--')} 页</span>
                <Button.Group>
                  <Button type="primary" disabled={pageNumber <= 1} onClick={this.previousPage}>
                    <Icon type="arrow-left" /> 上一页
                  </Button>
                  <Button type="primary" disabled={pageNumber >= numPages} onClick={this.nextPage}>
                    下一页 <Icon type="arrow-right" />
                  </Button>
                </Button.Group>
              </div>
            </div>
            <div className="inputContainer">
              <h1>审稿意见</h1>
              <IceFormBinderWrapper
                ref={(refInstance) => {
                  this.reviewForm = refInstance;
                }}
              >
                <Form labelAlign="top" className="formContainer">
                  <Row>
                    <Col span="24">
                      <FormItem label="评价：" required>
                        <IceFormBinder name="review" required >
                          <Input.TextArea
                            autoHeight={{ minRows: 20, maxRows: 40 }}
                            placeholder="这里填写您对稿件的评价"
                          />
                        </IceFormBinder>
                        <IceFormError name="review" />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                      <FormItem label="评分：" required>
                        <IceFormBinder name="rating" required >
                          <Rating defaultValue={0} allowHalf />
                        </IceFormBinder>
                        <IceFormError name="rating" />
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </IceFormBinderWrapper>
              <Row style={{ marginTop: 20 }}>
                <Col offset="3">
                  <Button type="primary" size="large" onClick={this.validateAllFormField}>
                    提 交
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </IceContainer>
      </React.Fragment>
    );
  }
}

export default ReviewContent;
