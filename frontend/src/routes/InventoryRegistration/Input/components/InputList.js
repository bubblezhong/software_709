import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Table } from 'antd';
import LoadByUserAuthority from './../../../utils/LoadByUserAuthority';
// import moment from 'moment';
// import { getInputList } from './../../../../Models/Process/Input';
// import '../../../Common/Common.css';
// import { dictionaryProcessInput } from './../../../../DataDictionary/index';


class InputList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }
  componentWillMount() {
    console.log('this.context.user', this.context, this.context.user);
    const params = {
      name: this.context.user.ID,
      type: 'all',
    };
    this.props.getData(params, (res) => { this.handleData(res); });
  }
  handleData = (res) => {
    console.log('res', res);
    const tempData = res.data.map((item, index) => {
      return {
        key: index,
        oddNum: item.processInstanceHistory.applicantInfo.oddNum,
        version: item.processInstanceHistory.applicantInfo.version,
        applicant: item.processInstanceHistory.applicantInfo.applicantName,
        status: item.processStatus,
      };
    });
    this.setState({ dataSource: tempData });
  }
  render() {
    const columns = [{
      title: '单号',
      dataIndex: 'oddNum',
    }, {
      title: '谱系',
      dataIndex: 'ancestry',
    }, {
      title: '软件名称',
      dataIndex: 'name',
    }, {
      title: '软件单元名称',
      dataIndex: 'unit_name',
    }, {
      title: '软件单元版本',
      dataIndex: 'unit_version',
    }, {
      title: '申请人',
      dataIndex: 'applicant',
    }, {
      title: '研制单位',
      dataIndex: 'creator',
    }, {
      title: '申请时间',
      dataIndex: 'time',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '操作',
      dataIndex: 'operate',
      render: (text, row) => <Link to={`/main/InventoryRegistration/InputDetail/check/${row.status}`}>详情</Link>,
    }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };
    return (
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={this.state.dataSource}
        bordered
      />
    );
  }
}
InputList.propTypes = {
  getData: PropTypes.func.isRequired,
};
InputList.contextTypes = {
  user: PropTypes.object,
};
const WrapInputList = LoadByUserAuthority('/api/workflow/my-tasks')(InputList);
export default WrapInputList;
