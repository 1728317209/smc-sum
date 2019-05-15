import React from 'react';
import { BigInteger } from 'jsbn';
import { Loading, Input, Button } from '@alifd/next';
import './index.scss';

export default class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      isSponsor: props.user.role === 'sponsor',
    };
  }

  componentWillMount() {
    this.t = setInterval(() => {
      if (this.state.isSponsor) {
        this.props.actions.acGetEncDataProduct()
          .then(({ response }) => {
            clearInterval(this.t);
            this.setState({
              encDataProduct: new BigInteger(response.encDataProduct, 16),
            });
          });
      } else {
        this.props.actions.acGetResult()
          .then(({ response }) => {
            clearInterval(this.t);
            this.setState({
              result: response.result,
            });
          });
      }
    }, 5000);
  }

  handleDecrypt = () => {
    const { encDataProduct } = this.state;
    console.log('encDataProduct', encDataProduct);
    console.log('this.props', this.props);
    const result = this.props.priKey.decrypt(encDataProduct);
    this.setState({
      result: result.toString(16),
    });
  }

  publishResult = () => {
    this.props.acSendRsult({
      result: this.state.result,
    });
  }

  renderSponsor = () => {
    const { result, encDataProduct } = this.state;
    if (encDataProduct) {
      return (
        <div className="step-three">
          <Input
            className="item"
            placeholder="各参与方密文的乘积"
            size="medium"
            value={encDataProduct.toString(16)}
            readOnly
            addonAfter={<Button type="primary" size="medium" onClick={this.handleDecrypt}>解密</Button>}
          />
          <Input
            className="item"
            placeholder="点击解密得到的明文"
            size="medium"
            value={result}
            readOnly
            addonAfter={<Button type="primary" size="medium" onClick={this.publishResult} >发布</Button>}
          />
        </div>
      );
    }
    return <Loading style={{ width: '300px' }} tip="正在计算..." />;
  }

  renderUnSponsor = () => {
    const { decryptedSum } = this.props;
    if (decryptedSum) {
      return (
        <div className="step-three">
          <Input addonBefore={<Button type="primary" size="medium">最终结果</Button>} />
        </div>
      );
    }
    return <Loading style={{ width: '300px' }} tip="正在计算..." />;
  }

  render() {
    const { user } = this.props;
    if (user.role === 'sponsor') {
      return this.renderSponsor();
    }
    return this.renderUnSponsor();
  }
}
