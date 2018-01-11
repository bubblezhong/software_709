import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, Form, Input, Select, Row, Radio, Upload, Icon, Col } from 'antd';
import EditAndCreate from './../../../utils/EditAndCreate';
import DevUnitSelect from './../../../utils/DevUnitSelect';
import UnitRepresentSelect from './../../../utils/UnitRepresentSelect';
import CategoryVersionTreeSelect from './../../../utils/CategoryVersionTreeSelect';
import SoftwareNameSelect from './../../../utils/SoftwareNameSelect';

const FormItem = Form.Item;
const Option = Select.Option;
class SoftwareDetailEdit extends React.Component {
  constructor(props) {
    super(props);
    let id;
    if (this.props.params.id) {
      id = this.props.params.id;
    }
    // console.log('version', this.props);
    this.state = {
      id,
      addNewStatus: false,
      data: {},
      parentData: {},
    };
  }
  componentWillMount() {
    if (this.props.routes[2].name === '软件版本信息编辑') {
      this.props.getData((res) => { this.handleInitData(res); });
    }
    if (this.props.routes[2].name === '添加软件版本') {
      this.setState({ addNewStatus: true });
      this.props.getData((res) => { this.handleAddData(res); });
    }
  }
  handleAddData = (res) => {
    this.setState({ parentData: res.data });
  }
  handleInitData = (res) => {
    const tempData = res.data;
    const pData = {
      NAME: tempData.NAME,
      PID: tempData.PID,
      MODULE_ID: tempData.MODULE_ID,
    };
    this.setState({ parentData: pData });
    if (tempData.INSTALLPOS !== null) {
      tempData.INSTALLPOS = tempData.INSTALLPOS.split(',');
    }
    if (tempData.SW_SYSTEM !== null) {
      tempData.SW_SYSTEM = tempData.SW_SYSTEM.split(',');
    }
    if (tempData.SW_MATING !== null) {
      tempData.SW_MATING = tempData.SW_MATING.split(',');
    }
    if (tempData.DEPARTMENT_ID !== undefined) {
      tempData.DEPARTMENT_ID = tempData.DEPARTMENT_ID.toString();
    }
    if (tempData.SW_OWNER !== undefined) {
      tempData.SW_OWNER = tempData.SW_OWNER.toString();
    }
    tempData.MODULE_RELATION = tempData.MODULE_RELATION.split(' ');
    tempData.SW_STORAGE = tempData.SW_STORAGE.toString();
    this.setState({ data: tempData });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.addNewStatus) {
      this.props.form.validateFields((err, values) => {
        // console.log(err, values);
        if (!err) {
          console.log('Received addNewvalues of form: ', values);
          values.INSTALLPOS = values.INSTALLPOS.join(',');
          values.SW_SYSTEM = values.SW_SYSTEM.join(',');
          values.SW_MATING = values.SW_MATING.join(',');
          values.PID = this.state.id;
          values.NAME = this.state.parentData.NAME;
          values.MODULE_ID = this.state.parentData.MODULE_ID;
          // const temp = values.MODULE_RELATION.map((item) => {
          //   return item.value;
          // });
          values.MODULE_RELATION = values.MODULE_RELATION.join(' ');
          // console.log('versionValue', values.MODULE_RELATION);
          this.props.createData(values, this.handleResult);
          // console.log('Received');
        }
      });
    } else {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          values.INSTALLPOS = values.INSTALLPOS.join(',');
          values.SW_SYSTEM = values.SW_SYSTEM.join(',');
          values.SW_MATING = values.SW_MATING.join(',');
          values.PID = this.state.parentData.PID;
          values.NAME = this.state.parentData.NAME;
          values.MODULE_ID = this.state.parentData.MODULE_ID;
          values.MODULE_RELATION = values.MODULE_RELATION.join(' ');
          // console.log('Received valuesEdit of form: ', values);
          this.props.editData(values, this.handleResult);
          // console.log('Received');
        }
      });
    }
  }
  handleResult = (res) => {
    console.log(res);
  }
  handleSelect = (val) => {
    console.log('valval', val);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.state;
    // console.log('id', id);
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const formItemLayoutDesc = {
      labelCol: { span: 3 },
      wrapperCol: { span: 19 },
    };
    return (
      <div>
        <div style={{ overflow: 'hidden', marginBottom: 20 }}>
          <Link to={`/main/SoftwareInfo/SoftwareVersionDetail/${this.state.id}`}>
            <Button style={{ width: 85, height: 30 }} className="SoftwareInfoDetail_return" >
              <span style={{ marginRight: 8 }}>&lt;</span>
              <span>返回</span>
            </Button>
          </Link>
          <Link to="/main/SoftwareInfo/SoftwareVersionDetail">
            <Button type="primary" className="SoftwareInfoDetail_reflash">完成</Button>
          </Link>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem style={{ position: 'relative', top: -63, right: '-94%', zIndex: 9999 }}>
            <Button style={{ width: 80, height: 30 }} type="primary" htmlType="submit">确定</Button>
          </FormItem>
          <div style={{ marginBottom: 20, marginTop: 20, marginLeft: '5%', width: '90%', height: 50, backgroundColor: '#edf7fc', lineHeight: '50px', paddingLeft: 20 }}>软件基本信息</div>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="软件版本"
              >
                {getFieldDecorator('SW_VERSION', {
                  initialValue: data.SW_VERSION,
                  rules: [{
                    required: true, message: '请输入软件版本!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="编号"
              >
                {getFieldDecorator('SW_CODE', {
                  initialValue: data.SW_CODE,
                  rules: [{
                    required: true, message: '请输入编号!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="软件类型"
              >
                {getFieldDecorator('SW_TYPE', {
                  initialValue: data.SW_TYPE,
                  rules: [
                    { required: true, message: '请输入软件类型' },
                  ],
                })(
                  <Select>
                    <Option value="远程目标判断软件">远程目标判断软件</Option>
                    <Option value="优化模块">优化模块</Option>
                    <Option value="目标指示模块">目标指示模块</Option>
                    <Option value="总体模块">总体模块</Option>
                    <Option value="声呐控制">声呐控制</Option>
                    <Option value="策略生成">策略生成</Option>
                    <Option value="定位计算">定位计算</Option>
                  </Select>
                  )}
              </FormItem>
            </Col>
            <Col span={12} className="moduleRelation">
              <FormItem
                {...formItemLayout}
                label="软件模块关系"
              >
                {getFieldDecorator('MODULE_RELATION', {
                  initialValue: data.MODULE_RELATION,
                  rules: [
                    { message: '请输入软件模块关系', type: 'array' },
                  ],
                })(
                  <CategoryVersionTreeSelect {...this.props} onChange={this.handleSelect} />
                  )}
              </FormItem>
            </Col>
          </Row>
          <div style={{ marginBottom: 20, marginTop: 20, marginLeft: '5%', width: '90%', height: 50, backgroundColor: '#edf7fc', lineHeight: '50px', paddingLeft: 20 }}>单位基本信息</div>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="研制单位"
              >
                {getFieldDecorator('DEPARTMENT_ID', {
                  initialValue: data.DEPARTMENT_ID,
                  rules: [{ required: true, message: 'Please select your developUnit!' }],
                })(
                  <DevUnitSelect />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="军代表"
              >
                {getFieldDecorator('SW_OWNER', {
                  initialValue: data.SW_OWNER,
                  rules: [{ required: true, message: 'Please select your developUnit!' }],
                })(
                  <UnitRepresentSelect />
                )}
              </FormItem>
            </Col>
          </Row>
          <div style={{ marginBottom: 20, marginTop: 20, marginLeft: '5%', width: '90%', height: 50, backgroundColor: '#edf7fc', lineHeight: '50px', paddingLeft: 20 }}>软件描述信息</div>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="操作系统"
              >
                {getFieldDecorator('SW_SYSTEM', {
                  initialValue: data.SW_SYSTEM,
                  rules: [{ required: true, message: '请输入典型操作系统！', type: 'array' }],
                })(
                  <Select mode="multiple">
                    <Option value="radhat">radhat</Option>
                    <Option value="linux">linux</Option>
                    <Option value="centOS">centOS</Option>
                    <Option value="Windows">Windows</Option>
                    <Option value="塞班">塞班</Option>
                    <Option value="Android">Android</Option>
                    <Option value="ubuntu">ubuntu</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="典型安装位置"
              >
                {getFieldDecorator('INSTALLPOS', {
                  initialValue: data.INSTALLPOS,
                  rules: [
                    { required: true, message: '请输入典型安装位置!', type: 'array' },
                  ],
                })(
                  <Select mode="multiple">
                    <Option value="中控板">中控板</Option>
                    <Option value="交叉控制板">交叉控制板</Option>
                    <Option value="指挥中心">指挥中心</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="配套软件"
              >
                {getFieldDecorator('SW_MATING', {
                  initialValue: data.SW_MATING,
                  rules: [
                    { message: '请输入配套软件', type: 'array' },
                  ],
                })(
                  <SoftwareNameSelect mode="multiple" />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="存储位置"
              >
                {getFieldDecorator('SW_SAVEPOS', {
                  initialValue: data.SW_SAVEPOS,
                  rules: [{
                    required: true, message: '请输入存储位置',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="存储方式"
              >
                {getFieldDecorator('SW_STORAGE', {
                  initialValue: data.SW_STORAGE,
                  rules: [{
                    required: true, message: '请输入存储方式',
                  }],
                })(
                  <Radio.Group>
                    <Radio value="0">自持</Radio>
                    <Radio value="1">网络存储</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="MD5校验码"
              >
                {getFieldDecorator('MD5', {
                  initialValue: data.MD5,
                  rules: [{
                    message: '请输入MD5校验码',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="附件"
              >
                {getFieldDecorator('SW_ANNEX', {
                  rules: [{ message: '请点击上传附件' }],
                })(
                  <Upload>
                    <Button>
                      <Icon type="upload" />点击上传
                    </Button>
                  </Upload>
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayoutDesc}
                label="版本说明"
              >
                {getFieldDecorator('SW_INFO', {
                  initialValue: data.SW_INFO,
                  rules: [{ message: '请输入版本说明' }],
                })(
                  <Input type="textarea" rows={10} />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

SoftwareDetailEdit.propTypes = {
  routes: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired,
  createData: PropTypes.func.isRequired,
};
const FormSoftwareDetailEdit = Form.create()(SoftwareDetailEdit);
const WrapFormSoftwareDetailEdit = EditAndCreate('/api/basic-software/software/', '/api/basic-software/software/', '/api/basic-software/software')(FormSoftwareDetailEdit);
export default WrapFormSoftwareDetailEdit;
