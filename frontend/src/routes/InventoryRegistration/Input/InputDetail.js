import React, { PropTypes } from 'react';
import { Steps, Button } from 'antd';
import InputDetailFirst from './components/InputDetailFirst';
import InputDetailSecond from './components/InputDetailSecond';
import InputDetailThird from './components/InputDetailThird';
import InputDetailForth from './components/InputDetailForth';
import InputDetailFifth from './components/InputDetailFifth';
import OperationRecord from './components/OperationRecord';
import './Input.css';

const Step = Steps.Step;
class InputDetail extends React.Component {
  constructor(props) {
    super(props);
    console.log('jshdfusi', this.props);
    this.state = {
      current: 0,
      operationRecord: false,
      undoTask: false,
      flag: false,
      pagesData: {},
    };
  }
  componentWillMount() {
    let data = {};
    if (this.props.route.path === 'InputNew') {
      this.setState({ undoTask: true });
      data = {
        status: 1,
      };
    } else if (this.props.routeParams.type === 'check') {
      data = {
        status: 2,
      };
    } else {
      this.setState({ undoTask: true });
      data = {
        status: 2,
      };
    }
    this.setState({ pagesData: data, current: data.status });
  }
  next = () => {
    console.log('1111111');
    // const tempCurrent = this.state.current + 1;
    // this.setState({ current: tempCurrent });
    this.setState({ flag: true });
  }
  prev = () => {
    const tempCurrent = this.state.current - 1;
    // const tempselectedStatus = this.state.selectedStatus - 1;
    this.setState({ current: tempCurrent });
  }
  handleCancel = () => {
    this.setState({ operationRecord: false });
  }
  render() {
    const { current, undoTask, pagesData, flag } = this.state;
    const steps = [{
      title: '软件入库申请',
    }, {
      title: '入库审批',
    }, {
      title: '入库登记',
    }, {
      title: '入库登记验收',
    }, {
      title: '入库申请完成',
    }];
    return (
      <div style={{ position: 'relative' }}>
        <div className="InputDetail_stepsContent_btn" style={{ marginTop: 50 }}>
          <Button>保存</Button>
          <Button onClick={this.prev}>撤销</Button>
          <Button>打印</Button>
          <Button>打印</Button>
          <Button>另存为</Button>
          <Button onClick={() => { this.setState({ operationRecord: true }); }}>操作记录</Button>
        </div>
        {undoTask ?
          <div>
            <Steps style={{ width: '60%', marginLeft: '20%', height: 60 }}>
              {
                steps.map((item, index) => {
                  let status = 'finish';
                  if (index > current - 1) {
                    status = 'wait';
                  } else if (index === current - 1) {
                    status = 'process';
                  }
                  return (
                    <Step className="InputDetail_step" key={item.title} title={item.title} status={status} />
                  );
                })
              }
            </Steps>
            { current === 1 && <InputDetailFirst disable={flag} next={() => { this.next(); }} /> }
            { current === 2 && <InputDetailSecond disable={flag} /> }
            { current === 3 && <InputDetailThird disable={flag} /> }
            { current === 4 && <InputDetailForth disable={flag} /> }
            { current === 5 && <InputDetailFifth disable={flag} /> }
          </div> :
            <div>
              <Steps style={{ width: '60%', marginLeft: '20%', height: 60 }}>
                {
                  steps.map((item, index) => {
                    let status = 'finish';
                    if (index > current - 1) {
                      status = 'wait';
                    }
                    return (
                      <Step className="InputDetail_step" key={item.title} title={item.title} status={status} />
                    );
                  })
                }
              </Steps>
              { current === 1 &&
                <InputDetailFirst disable={pagesData.status > 0} /> }
              { current === 2 && <InputDetailSecond disable={pagesData.status > 1} /> }
              { current === 3 && <InputDetailThird disable={pagesData.status > 2} /> }
              { current === 4 && <InputDetailForth disable={pagesData.status > 3} /> }
              { current === 5 && <InputDetailFifth disable={pagesData.status > 4} /> }
            </div>
        }
        <OperationRecord
          visible={this.state.operationRecord}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}
InputDetail.propTypes = {
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
};
InputDetail.contextTypes = {
  user: PropTypes.object,
};
export default InputDetail;
