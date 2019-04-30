import React from 'react';
import { Input, Button } from '@alifd/next';
import './index.scss';

export default class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 0,
      ciphertext: '',
    };
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

  render() {
    const { ciphertext, input } = this.state;
    return (
      <div className="step-two">
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
          readOnly
          addonAfter={<Button type="primary" size="medium" onClick={this.handleEncrypt} >发送</Button>}
        />
      </div>
    );
  }
}
