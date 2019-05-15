import React from 'react';
import { Button, Input, Message } from '@alifd/next';
import './index.scss';

export default class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      partyNum: '',
    };
  }

  handleReady = () => {
    this.setState({
      isReady: true,
    });
    this.props.actions.acReady()
      .then(({ response }) => {
        if (response.data.role === 'party') {
          this.props.onStepChange(1);
        }
      });
  }

  handlePartyNumChange = (value) => {
    this.setState({
      partyNum: value.replace(/\D/g, ''),
    });
  }

  handleSendPartyNum = () => {
    const { partyNum } = this.state;
    if (partyNum && partyNum > 1) {
      this.props.actions.acSendPartyNum({
        partyNum,
      }).then(() => {
        this.props.onStepChange(1);
      });
    } else {
      Message.show({
        type: 'warning',
        content: '输入不合法！',
      });
    }
  }

  renderSponsor = () => {
    const { user } = this.props;
    const { partyNum } = this.state;
    if (user.role === 'sponsor') {
      return (
        <div className="item">
          <Input
            placeholder="请输入参与方数目"
            size="medium"
            value={partyNum}
            onChange={this.handlePartyNumChange}
            addonAfter={<Button type="primary" size="medium" onClick={this.handleSendPartyNum}>发送</Button>}
          />
        </div>
      );
    }
    return null;
  }

  render = () => {
    const { isReady } = this.state;
    return (
      <div key={0} className="step-one">
        <div className="item">
          <span>如果准备就绪，请点击就绪按钮:</span>
          <Button type="primary" disabled={!!isReady} onClick={this.handleReady}>就绪</Button>
        </div>
        { this.renderSponsor() }
      </div>
    );
  }
}
