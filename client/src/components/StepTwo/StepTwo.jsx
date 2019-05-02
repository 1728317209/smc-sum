import React from 'react';
import { BigInteger } from 'jsbn';
import { Input, Button, Loading } from '@alifd/next';
import Paillier from '../../common/paillier';
import './index.scss';

export default class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    const { isSponsor } = props;
    console.log('isSponsor', isSponsor);
    let keys = {};
    if (isSponsor) {
      keys = Paillier.generateKeys(1024);
      console.log('keys', keys.pub, keys.sec);
    }
    this.state = {
      input: '',
      encInput: null,
      ciphertext: '',
      secretKey: keys.sec || null,
      publicKey: keys.pub || null,
      showSecretKey: false,
    };
  }

  sendPublishKey = () => {

  }

  handleChange = (value) => {
    this.setState({
      input: value.replace(/\D/g, ''),
    });
  }

  handleSendData = (text) => {
    console.log('text', text);
    this.props.onStepChange(2);
    // const { encInput } = this.state;
    // this.props.action(encInput);
  };

  handleEncrypt = (e) => {
    e.preventDefault();
    const { input } = this.state;
    console.error('input', input);
    const bigInput = new BigInteger(input);
    console.error('bigInput', bigInput);
    console.log('this.state.publicKey', this.state.publicKey);
    const encInput = this.state.publicKey.encrypt(bigInput);
    console.error('encInput', encInput);
    this.setState({
      encInput,
    });
  }

  handleShowSecretKey = () => {
    this.setState({
      showSecretKey: !this.state.showSecretKey,
    });
  }

  renderMakeKey = () => {
    const { isSponsor } = this.props;
    if (isSponsor) {
      return (
        <div className="send-key">
          密钥已生成，请点击发布公钥：<Button type="primary" size="medium" onClick={this.sendPublishKey}>发布</Button>
        </div>
      );
    }
    return null;
  }

  renderSendData = () => {
    const { isSponsor } = this.props;
    const { input, publicKey } = this.state;
    console.log('input, publicKey', input, publicKey);
    if (isSponsor || publicKey) {
      return (
        <div className="send-data">
          <Input
            className="item"
            placeholder="输入自己的隐私数据"
            size="medium"
            value={input}
            onChange={this.handleChange}
            addonAfter={<Button type="primary" size="medium" onClick={this.handleEncrypt}>加密</Button>}
          />
          <Input
            className="item"
            placeholder="点击加密得到的密文"
            size="medium"
            value={publicKey.toString()}
            readOnly
            addonAfter={<Button type="primary" size="medium" onClick={this.handleSendData} >发送</Button>}
          />
        </div>
      );
    }
    return <Loading style={{ width: '300px' }} tip="正在生成密钥..." />;
  }

  render() {
    const { ciphertext, input } = this.state;
    return (
      <div className="step-two">
        { this.renderMakeKey() }
        { this.renderSendData() }
      </div>
    );
  }
}
