import React from 'react';
import { Table, Button, Input } from 'antd';

const Search = Input.Search;
const ButtonGroup = Button.Group;

class SupportPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        key: '1',
        num: 'CL-20170427-0001',
        name: '应用软件',
        title: '技术保障申请标题112',
        unit: 'XX日常管理部门',
        operator: '张三',
        time: '2017/5/18 20:39',
        status: '申请中',
        detail: '详情',
      }, {
        key: '2',
        num: 'CL-20170427-0001',
        name: '应用软件',
        title: '技术保障申请标题112',
        unit: 'XX日常管理部门',
        operator: '张三',
        time: '2017/5/18 20:39',
        status: '申请中',
        detail: '详情',
      }, {
        key: '3',
        num: 'CL-20170427-0001',
        name: '应用软件',
        title: '技术保障申请标题112',
        unit: 'XX日常管理部门',
        operator: '张三',
        time: '2017/5/18 20:39',
        status: '申请中',
        detail: '详情',
      }, {
        key: '4',
        num: 'CL-20170427-0001',
        name: '应用软件',
        title: '技术保障申请标题112',
        unit: 'XX日常管理部门',
        operator: '张三',
        time: '2017/5/18 20:39',
        status: '申请中',
        detail: '详情',
      }, {
        key: '5',
        num: 'CL-20170427-0001',
        name: '应用软件',
        title: '技术保障申请标题112',
        unit: 'XX日常管理部门',
        operator: '张三',
        time: '2017/5/18 20:39',
        status: '申请中',
        detail: '详情',
      }, {
        key: '6',
        num: 'CL-20170427-0001',
        name: '应用软件',
        title: '技术保障申请标题112',
        unit: 'XX日常管理部门',
        operator: '张三',
        time: '2017/5/18 20:39',
        status: '申请中',
        detail: '详情',
      }, {
        key: '7',
        num: 'CL-20170427-0001',
        name: '应用软件',
        title: '技术保障申请标题112',
        unit: 'XX日常管理部门',
        operator: '张三',
        time: '2017/5/18 20:39',
        status: '申请中',
        detail: '详情',
      }, {
        key: '8',
        num: 'CL-20170427-0001',
        name: '应用软件',
        title: '技术保障申请标题112',
        unit: 'XX日常管理部门',
        operator: '张三',
        time: '2017/5/18 20:39',
        status: '申请中',
        detail: '详情',
      }, {
        key: '9',
        num: 'CL-20170427-0001',
        name: '应用软件',
        title: '技术保障申请标题112',
        unit: 'XX日常管理部门',
        operator: '张三',
        time: '2017/5/18 20:39',
        status: '申请中',
        detail: '详情',
      }, {
        key: '10',
        num: 'CL-20170427-0001',
        name: '应用软件',
        title: '技术保障申请标题112',
        unit: 'XX日常管理部门',
        operator: '张三',
        time: '2017/5/18 20:39',
        status: '申请中',
        detail: '详情',
      }, {
        key: '11',
        num: 'CL-20170427-0001',
        name: '应用软件',
        title: '技术保障申请标题112',
        unit: 'XX日常管理部门',
        operator: '张三',
        time: '2017/5/18 20:39',
        status: '申请中',
        detail: '详情',
      }, {
        key: '12',
        num: 'CL-20170427-0001',
        name: '应用软件',
        title: '技术保障申请标题112',
        unit: 'XX日常管理部门',
        operator: '张三',
        time: '2017/5/18 20:39',
        status: '申请中',
        detail: '详情',
      }],
    };
  }
  render() {
    const Btns = (
      <div>
        <ButtonGroup style={{ marginBottom: 10 }}>
          <Button icon="reload" style={{ width: 110, height: 40, fontSize: 14 }}>刷新</Button>
          <Button icon="file-add" style={{ width: 110, height: 40, fontSize: 14 }}>新增</Button>
          <Button icon="login" style={{ width: 110, height: 40, fontSize: 14 }}>导入</Button>
          <Button icon="logout" style={{ width: 110, height: 40, fontSize: 14 }}>导出</Button>
          <Button icon="printer" style={{ width: 110, height: 40, fontSize: 14 }}>打印</Button>
          <Button icon="delete" style={{ width: 110, height: 40, fontSize: 14 }}>删除</Button>
        </ButtonGroup>
        <Search
          placeholder="搜索软件名称、申请单位等"
          style={{ width: 380, height: 40, float: 'right' }}
          onSearch={value => console.log(value)}
        />
      </div>
    );
    const columns = [{
      title: '方案编号',
      dataIndex: 'num',
    }, {
      title: '软件名称',
      dataIndex: 'name',
    }, {
      title: '方案标题',
      dataIndex: 'title',
    }, {
      title: '制定单位',
      dataIndex: 'unit',
    }, {
      title: '制定人',
      dataIndex: 'operator',
    }, {
      title: '制定时间',
      dataIndex: 'time',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '操作',
      dataIndex: 'detail',
      render: text => <a>{text}</a>,
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
      <div>
        {Btns}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.data}
          pagination={{ pageSize: 10 }}
        />
      </div>
    );
  }
}
export default SupportPlan;

