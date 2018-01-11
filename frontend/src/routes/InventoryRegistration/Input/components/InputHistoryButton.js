import React, { PropTypes } from 'react';
import { Icon } from 'antd';
import InputDetailFirstRead from './InputDetailFirstRead';
import InputDetailSecondRead from './InputDetailSecondRead';
import InputDetailThirdRead from './InputDetailThirdRead';

class InputHistoryButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInputFirst: false,
      showInputSecond: false,
      showInputThird: false,
      showInputForth: false,
    };
  }
  changeshow = (type) => {
    if (type === 'First') this.setState({ showInputFirst: false });
    if (type === 'Second') this.setState({ showInputSecond: false });
    if (type === 'Third') this.setState({ showInputThird: false });
  }
  render() {
    const { step } = this.props;
    return (
      <div>
        { step > 1 &&
          <div style={{ position: 'relative', width: 100, textAlign: 'center', marginTop: 20, display: 'inline-block' }} onClick={() => { this.setState({ showInputFirst: true }); }}>
            <Icon type="file" style={{ fontSize: 30, color: '#108ee9', display: 'inline-block' }} />
            <span style={{ position: 'absolute', left: 10, top: 35 }}>软件入库申请单</span>
          </div>
        }
        {
          step > 2 &&
          <div style={{ position: 'relative', width: 80, textAlign: 'center', marginTop: 20, display: 'inline-block' }} onClick={() => { this.setState({ showInputSecond: true }); }}>
            <Icon type="file" style={{ fontSize: 30, color: '#108ee9', display: 'inline-block' }} />
            <span style={{ position: 'absolute', left: 10, top: 35 }}>入库审批单</span>
          </div>
        }
        {
          step > 3 &&
          <div style={{ position: 'relative', width: 80, textAlign: 'center', marginTop: 20, display: 'inline-block' }} onClick={() => { this.setState({ showInputThird: true }); }}>
            <Icon type="file" style={{ fontSize: 30, color: '#108ee9', display: 'inline-block' }} />
            <span style={{ position: 'absolute', left: 10, top: 35 }}>入库登记单</span>
          </div>
        }
        <InputDetailFirstRead
          visible={this.state.showInputFirst}
          handleCancel={() => { this.changeshow('First'); }}
        />
        <InputDetailSecondRead
          visible={this.state.showInputSecond}
          handleCancel={() => { this.changeshow('Second'); }}
        />
        <InputDetailThirdRead
          visible={this.state.showInputThird}
          handleCancel={() => { this.changeshow('Third'); }}
        />
      </div>
    );
  }
}
InputHistoryButton.propTypes = {
  step: PropTypes.number.isRequired,
};
export default InputHistoryButton;
