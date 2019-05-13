import React from 'react';
import { Button, Input, Loading } from '@alifd/next';
import './index.scss';

export default class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      readyNum: 0,
      partyNum: 0,
    };
  }

  // componentWillMount() {
  //   this.t = setInterval(() => {
  //     this.props.actions.acCheckReadyPartyNum()
  //       .then(({ response }) => {
  //         console.error('acCheckReadyPartyNum-response', response.data);
  //         const { readyPartyNum, partyNum } = response.data;
  //         if (partyNum && readyPartyNum && partyNum === readyPartyNum) {
  //           clearInterval(this.t);
  //           this.props.onStepChange(1);
  //         }
  //       });
  //   }, 5000);
  // }

  handleReady = () => {
    this.setState({
      isReady: true,
      readyNum: this.state.readyNum + 1,
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
    if (partyNum) {
      this.props.actions.acSendPartyNum({
        partyNum,
      }).then(() => {
        console.log('then');
        this.props.onStepChange(1);
      });
    }
  }

  renderSponsor = () => {
    const { user } = this.props;
    const { readyNum, partyNum } = this.state;
    if (user.role === 'sponsor') {
      return (
        <div>
          <div className="item">
            <div>当前就绪人数 / 总人数所占比例:</div>
            {
              readyNum && partyNum
                ? <Button type="primary">{`${readyNum} / ${partyNum}`}</Button>
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
    return null;
  }

  renderWaiting = () => {
    const { user } = this.props;
    const { isReady } = this.state;
    if (user.role === 'party' && isReady) {
      return <Loading style={{ width: '350px' }} tip="等待其他人就绪..." />;
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
        {/* { this.renderWaiting() } */}
      </div>
    );
  }
}
