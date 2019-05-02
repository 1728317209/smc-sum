import React from 'react';
import { Button, Input } from '@alifd/next';
import './index.scss';

export default class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      readyNum: 1,
      unReadyNum: 10,
      partyNum: null,
    };
  }

  handleReady = () => {
    this.setState({
      isReady: true,
      readyNum: this.state.readyNum + 1,
    });
    this.props.onStepChange(1);
  }

  handlePartyNumChange = (value) => {
    this.setState({
      partyNum: value.replace(/\D/g, ''),
    });
  }

  handleSendPartyNum = () => {

  }

  render = () => {
    console.log('this.state', this, this.state);
    const { isReady, readyNum, unReadyNum, partyNum } = this.state;
    return (
      <div key={0} className="step-one">
        <div className="item">
          <span>如果准备就绪，请点击就绪按钮:</span>
          <Button type="primary" disabled={!!isReady} onClick={this.handleReady}>就绪</Button>
        </div>
        <div className="item">
          <div>当前就绪人数 / 总人数所占比例:</div>
          {
            readyNum && unReadyNum
              ? <Button type="primary">{`${readyNum} / ${unReadyNum}`}</Button>
              : <Button type="primary">0 / n</Button>
          }
        </div>
        <div className="item">
          <Input
            placeholder="请输入参与方数目"
            size="medium"
            value={partyNum}
            onChange={this.handlePartyNumChange}
            addonAfter={<Button type="primary" size="medium" onClick={this.handleSendPartyNum}>发送</Button>}
          />
        </div>
      </div>
    );
  }
}
