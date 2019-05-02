import React from 'react';
import { Loading, Input, Button } from '@alifd/next';
import './index.scss';

export default class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plaintextSum: null,
    };
  }

  handleDecrypt = (encryptedSum) => {
    console.log('encryptedSum', encryptedSum);
    this.setState({
      // plaintextSum: '',
    });
  }

  renderSponsor = () => {
    const { encryptedSum } = this.props;
    if (encryptedSum) {
      return (
        <div className="step-three">
          <Input
            className="item"
            placeholder="各参与方密文的乘积"
            size="medium"
            value={encryptedSum}
            readOnly
            addonAfter={<Button type="primary" size="medium" onClick={this.handleDecrypt}>解密</Button>}
          />
          <Input
            className="item"
            placeholder="点击解密得到的明文"
            size="medium"
            readOnly
            addonAfter={<Button type="primary" size="medium" >发布</Button>}
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
    const { isSponsor } = this.props;
    if (isSponsor) {
      return this.renderSponsor();
    }
    return this.renderUnSponsor();
  }
}
