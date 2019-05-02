import React from 'react';
import { Step } from '@alifd/next';
import StepOne from '../StepOne';
import StepTwo from '../StepTwo';
import StepThree from '../StepThree';
import './index.scss';

const steps = ['准备就绪', '发送数据', '计算并发布结果'];

export default class SmcStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      isSponsor: true,
      encryptedSum: null,
      decryptedSum: null,
    };
  }

  handleIsSponsor = (isSponsor) => {
    if (isSponsor) {
      this.setState({ isSponsor });
    }
  }

  handleEncryptedSum = (encryptedSum) => {
    this.setState({ encryptedSum });
  }

  handleStepChange = (step) => {
    if (step > this.state.step) {
      this.setState({ step });
    }
  }

  renderStep = (step) => {
    const { isSponsor, encryptedSum, decryptedSum } = this.state;
    switch (step) {
      case 0:
        return (
          <StepOne
            onIsSponsor={this.handleIsSponsor}
            onStepChange={this.handleStepChange}
          />
        );
      case 1:
        return (
          <StepTwo
            isSponsor={isSponsor}
            onStepChange={this.handleStepChange}
            onGetEncryptedSum={this.handleEncryptedSum}
          />
        );
      case 2:
        return (
          <StepThree
            isSponsor={isSponsor}
            encryptedSum={encryptedSum}
            decryptedSum={decryptedSum}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const { step } = this.state;
    return (
      <div className="smc">
        <div className="smc-step">
          { this.renderStep(step) }
        </div>
        <Step current={step} className="steps">
          { steps.map((item, index) => <Step.Item key={index} title={item} />)}
        </Step>
      </div>
    );
  }
}
