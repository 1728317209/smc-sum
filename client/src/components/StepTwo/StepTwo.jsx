import React from 'react';
import { BigInteger } from 'jsbn';
import { Input, Button, Loading } from '@alifd/next';
import Paillier from '../../common/paillier';
import './index.scss';

export default class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    const { user } = props;
    let keys = {};
    const isSponsor = user.role === 'sponsor';
    if (isSponsor) {
      keys = Paillier.generateKeys(1024);
      props.onGetSecKey(keys.sec);
    }
    this.state = {
      input: '',
      isSponsor,
      encInput: null,
      pubKey: keys.pub,
      showSecretKey: false,
    };
  }

  componentWillMount() {
    if (!this.state.isSponsor) {
      this.t = setInterval(() => {
        this.props.actions.acGetPubKey()
          .then(({ response }) => {
            clearInterval(this.t);
            const pubKey = { ...response.pubKey };
            Object.assign(pubKey, Paillier.PublicKeyPrototype);
            const arr = ['n', 'n2', 'np1'];
            arr.forEach((item) => {
              pubKey[item] = new BigInteger(pubKey[item], 16);
            });
            console.log('pubKey', pubKey);
            this.setState({ pubKey });
          });
      }, 5000);
    }
  }

  sendPublishKey = () => {
    const pubKey = { ...this.state.pubKey };
    console.log('pubKey', pubKey);
    const arr = ['n', 'n2', 'np1'];
    arr.forEach((item) => {
      pubKey[item] = pubKey[item].toString(16);
    });
    this.props.actions.acSendPubKey({ pubKey });
  }

  handleChange = (value) => {
    this.setState({
      input: value.replace(/\D/g, ''),
    });
  }

  handleSendData = () => {
    this.props.onStepChange(2);
    this.props.actions.acSendData({
      encData: this.state.encInput.toString(16),
    });
  };

  handleEncrypt = (e) => {
    e.preventDefault();
    const { input } = this.state;
    const bigInput = new BigInteger(input);
    const encInput = this.state.pubKey.encrypt(bigInput);
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
    if (this.state.isSponsor) {
      return (
        <div className="send-key">
          密钥已生成，请点击发布公钥：<Button type="primary" size="medium" onClick={this.sendPublishKey}>发布</Button>
        </div>
      );
    }
    return null;
  }

  renderSendData = () => {
    const { input, pubKey, encInput, isSponsor } = this.state;
    if (isSponsor || pubKey) {
      return (
        <div className="send-data">
          <Input
            className="item"
            placeholder="输入自己的隐私数据"
            size="medium"
            value={input || ''}
            onChange={this.handleChange}
            addonAfter={<Button type="primary" size="medium" onClick={this.handleEncrypt}>加密</Button>}
          />
          <Input
            className="item"
            placeholder="点击加密得到的密文"
            size="medium"
            value={encInput ? encInput.toString(16) : ''}
            readOnly
            addonAfter={<Button type="primary" size="medium" onClick={this.handleSendData} >发送</Button>}
          />
        </div>
      );
    }
    return <Loading style={{ width: '300px' }} tip="生成密钥中..." />;
  }

  render() {
    return (
      <div className="step-two">
        { this.renderMakeKey() }
        { this.renderSendData() }
      </div>
    );
  }
}
