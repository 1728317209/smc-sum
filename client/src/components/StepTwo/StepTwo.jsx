import React from 'react';
import { Input, Button, Loading } from '@alifd/next';
import './index.scss';

export default class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null,
      ciphertext: '',
      secretKey: null,
      publicKey: null,
      showSecretKey: false,
    };
  }

  componentWillMount() {
    this.setState({
      publicKey: '',
      secretKey: '',
    });
  }

  sendPublishKey = () => {

  }

  handleChange = (value) => {
    this.setState({
      input: value.replace(/\D/g, ''),
    });
  }

  handleEncrypt = (text) => {
    console.log('text', text);
    this.props.onStepChange(2);
  };

  handleShowSecretKey = () => {
    this.setState({
      showSecretKey: !this.state.showSecretKey,
    });
  }

  renderMakeKey = () => {
    // const { secretKey, publicKey, showSecretKey } = this.state;
    const { isSponsor = ' ' } = this.props;
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
    const { input } = this.state;
    const { isSponsor, publicKey = '1f9b99e1b69569a3683f422502e980e2ea020aa867fb177977b8b67accada317d246f37dd015e9fb72198804f240cbd522be0af8d4b4d6cae0e8f79c7778101d4d4b6512172ee2037325ad563ed93744cfe9a2e0c5e4589490b47a0f24389b497c0b466fb5c7511a955370d605efa814de14a38d3bbdecd34acfb1fb0231c3c8acae274800e494f619ad97cd32c1ae1831ebaf82f2e3064278cdcdb5ce94ab5fd21eaae0bfa475245fb9b052268fa875d17a142aa2ac1695d26f3e099abe94da867a8d8dd1e79ed703674646f27cd79dfce62590cc7c77cb7eac129083469cbb249610293811b2b98e1f45cf6d9de61281b44a49a4929eb2ae23850264685c01' } = this.props;
    if (isSponsor || publicKey) {
      return (
        <div className="send-data">
          <Input
            className="item"
            placeholder="输入自己的隐私数据"
            size="medium"
            value={input}
            onChange={this.handleChange}
            addonAfter={<Button type="primary" size="medium">加密</Button>}
          />
          <Input
            className="item"
            placeholder="点击加密得到的密文"
            size="medium"
            value={publicKey}
            readOnly
            addonAfter={<Button type="primary" size="medium" onClick={this.handleEncrypt} >发送</Button>}
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
