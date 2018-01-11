import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Table } from 'antd';
import moment from 'moment';
import GetDetailInfo from './../../../utils/GetDetailInfo';

class UseUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentWillMount() {
    this.props.sendInfo(this.props.id, this.handleData);
  }
  handleData = (res) => {
    console.log('resUnit', res);
    const tempData = res.data.map((item, index) => {
      return {
        number: index,
        key: index,
        unitName: item.UNIT_NAME,
        unitOrder: item.UNIT_ORDER,
        unitType: item.UNIT_TYPE,
        version: item.CATEGORY_VERSION,
        installPos: item.CATEGORY_INSTALLPOS,
        time: item.CATEGORY_CREATE_DATE,
        unitId: item.UNIT_ID,
      };
    });
    this.setState({ data: tempData });
  }
  render() {
    const columns = [{
      title: '序号',
      dataIndex: 'number',
    }, {
      title: '单位名称',
      dataIndex: 'unitName',
    }, {
      title: '单位序列',
      dataIndex: 'unitOrder',
    }, {
      title: '单位类型',
      dataIndex: 'unitType',
    }, {
      title: '当前版本',
      dataIndex: 'version',
    }, {
      title: '安装位置',
      dataIndex: 'installPos',
    }, {
      title: '时间',
      dataIndex: 'time',
      render: (text) => {
        const time = moment(text).format('YYYY-MM-DD hh:mm');
        return time;
      },
    }, {
      title: '操作',
      dataIndex: 'detail',
      render: (text, row) => <Link to={`/main/SoftwareInfo/UnitDetail/${row.unitId}`}>单位详情</Link>,
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
      <div style={{ padding: 30 }}>
        <h2 style={{ marginBottom: 10 }}>使用单位</h2>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.data}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </div>
    );
  }
}
UseUnit.propTypes = {
  sendInfo: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
const WrapUseUnit = GetDetailInfo('/api/category-version/use-unit/')(UseUnit);
export default WrapUseUnit;
// export default UseUnit;
