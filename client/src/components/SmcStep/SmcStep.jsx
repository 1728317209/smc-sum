import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Step } from '@alifd/next';
import * as allActions from '../../actions/index';
import StepOne from '../StepOne';
import StepTwo from '../StepTwo';
import StepThree from '../StepThree';
import './index.scss';

const steps = ['准备就绪', '发送数据', '计算并发布结果'];

class SmcStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }

  handleStepChange = (step) => {
    if (step > this.state.step) {
      this.setState({ step });
    }
  }

  handlePriKey = (priKey) => {
    console.log('priKey', priKey);
    this.setState({
      priKey,
    });
  }

  renderStep = (step) => {
    const { priKey } = this.state;
    const { actions, user } = this.props;
    switch (step) {
      case 0:
        return (
          <StepOne
            user={user}
            actions={actions}
            onStepChange={this.handleStepChange}
          />
        );
      case 1:
        return (
          <StepTwo
            user={user}
            actions={actions}
            onGetSecKey={this.handlePriKey}
            onStepChange={this.handleStepChange}
          />
        );
      case 2:
        return (
          <StepThree
            user={user}
            priKey={priKey}
            actions={actions}
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

function mapStateToProps(state) {
  const { smc } = state;
  return { ...smc };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(allActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SmcStep);
