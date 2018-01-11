import React, { PropTypes } from 'react';
import { Button, Form, Input, Select, Row, Radio, Upload, Icon, Col, Tree } from 'antd';
// import InputDetailFirstDisable from './InputDetailFirstDisable';
import ModuleTreeSelect from './../../../utils/ModuleTreeSelect';
import SoftwareNameSelect from './../../../utils/SoftwareNameSelect';
import CategoryTreeSelect from './../../../utils/CategoryTreeSelect';
import UnitRepresentSelect from './../../../utils/UnitRepresentSelect';
import CreateNewData from './../../../utils/CreateNewData';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const Option = Select.Option;
// const SHOW_PARENT = TreeSelect.SHOW_PARENT;
class InputDetailFirst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: {
        oddNumbers: 'CL-20170427-0001',
        applicantName: '张三',
        applyUnit: '中船重工709',
        applicant: '1',
      },
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('this.context.user', this.context, this.context.user);
    this.props.form.validateFields((err, values) => {
      console.log(err, values);
      if (!err) {
        console.log('Received Newvalues of form: ', values);
        values.installPos = values.installPos.join(',');
        values.system = values.system.join(',');
        values.oddNumbers = this.state.initialData.oddNumbers;
        values.applicantName = this.context.user.NAME;
        values.applicant = this.context.user.ID;
        values.applyUnit = this.context.user.SU_NAME;
        values.reviewer = values.reviewerName.key;
        values.reviewerName = values.reviewerName.label;
        console.log(JSON.stringify(values));
        this.props.createData(values, (res) => { this.handleResult(res); });
        console.log('Received');
      }
    });
  }
  handleResult = (res) => {
    console.log('resres', res);
    if (res.code === 0) {
      this.props.next();
    }
  }
  render() {
    const { initialData } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const formItemLayoutDesc = {
      labelCol: { span: 3 },
      wrapperCol: { span: 19 },
    };
    return (
      <div className="InputDetail_stepsContent">
        {this.props.disable ?
          <Form onSubmit={this.handleSubmit} style={{ width: '80%', marginLeft: '10%', minHeight: 900 }}>
            <div style={{ marginBottom: 20, marginTop: 20, marginLeft: '3%', width: '90%', height: 50, backgroundColor: '#edf7fc', lineHeight: '50px', paddingLeft: 20 }}>软件入库申请单基本信息</div>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="单号"
                >
                  <span>{initialData.oddNumbers}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="申请人"
                >
                  <span>{initialData.applicant}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="申请单位"
                >
                  <span>{initialData.applyUnit}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="处理人"
                >
                  <span>{initialData.handlePerson}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="任务来源"
                >
                  <span>{initialData.takeSource}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="审核人"
                >
                  <span>{initialData.checker}</span>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem
                  {...formItemLayoutDesc}
                  label="说明"
                >
                  <span>{initialData.explain}</span>
                </FormItem>
              </Col>
            </Row>
            <div style={{ marginBottom: 20, marginTop: 20, marginLeft: '3%', width: '90%', height: 50, backgroundColor: '#edf7fc', lineHeight: '50px', paddingLeft: 20 }}>软件单元基本信息</div>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="软件名称"
                >
                  <span>{initialData.softwareName}</span>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="软件单元名称"
                >
                  <span>{initialData.unitName}</span>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="软件单元版本"
                >
                  <span>{initialData.unitVersion}</span>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="软件单元等级"
                >
                  <span>{initialData.grade}</span>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="谱系"
                >
                  <span>{initialData.module}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="软件模块关系"
                >
                  <Tree
                    style={{ marginTop: -15 }}
                    showLine
                    defaultExpandedKeys={['0-0-0']}
                    onSelect={this.onSelect}
                  >
                    <TreeNode title="远程目标软件" key="0-0">
                      <TreeNode title="模块优化" key="0-0-0">
                        <TreeNode title="模块优化" key="0-0-0-0" />
                      </TreeNode>
                      <TreeNode title="目标指示模块" key="0-0-1">
                        <TreeNode title="声呐控制" key="0-0-1-0" />
                      </TreeNode>
                      <TreeNode title="总体生成" key="0-0-2">
                        <TreeNode title="leaf" key="0-0-2-0" />
                        <TreeNode title="leaf" key="0-0-2-1" />
                      </TreeNode>
                      <TreeNode title="策略生成" key="0-0-3">
                        <TreeNode title="leaf" key="0-0-3-0" />
                        <TreeNode title="leaf" key="0-0-3-1" />
                      </TreeNode>
                    </TreeNode>
                  </Tree>
                </FormItem>
              </Col>
            </Row>
            <div style={{ marginBottom: 20, marginTop: 20, marginLeft: '3%', width: '90%', height: 50, backgroundColor: '#edf7fc', lineHeight: '50px', paddingLeft: 20 }}>软件描述信息</div>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="操作系统"
                >
                  <span>{initialData.operateSystem}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="典型安装位置"
                >
                  <span>{initialData.installPos}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="配套软件"
                >
                  <span>{initialData.matingSoftware}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="存储位置"
                >
                  <span>{initialData.savePos}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="代码规模"
                >
                  <span>{initialData.codeScale}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="MD5校验值"
                >
                  <span>{initialData.MD5Value}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="存储方式"
                >
                  <span>{initialData.saveType}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="附件"
                >
                  <span>{initialData.file}</span>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem
                  {...formItemLayoutDesc}
                  label="软件描述"
                >
                  <span>{initialData.softwareDescription}</span>
                </FormItem>
              </Col>
            </Row>
          </Form> :
            <Form onSubmit={this.handleSubmit} style={{ width: '80%', marginLeft: '10%', minHeight: 900 }}>
              <div style={{ marginBottom: 20, marginTop: 20, marginLeft: '3%', width: '90%', height: 50, backgroundColor: '#edf7fc', lineHeight: '50px', paddingLeft: 20 }}>软件入库申请单基本信息</div>
              <FormItem style={{ position: 'fixed', top: 250, left: 270 }}>
                <Button style={{ width: 120, height: 30 }} htmlType="submit">提交</Button>
              </FormItem>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="单号"
                  >
                    <span>{initialData.oddNumbers}</span>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="申请人"
                  >
                    <span>{initialData.applicantName}</span>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="申请单位"
                  >
                    <span>{initialData.applyUnit}</span>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="任务来源"
                  >
                    {getFieldDecorator('taskSource', {
                      rules: [{ required: true, message: '请选择任务来源' }],
                    })(
                      <Select>
                        <Option value="DD2017051102112升级完善任务">DD2017051102112升级完善任务</Option>
                        <Option value="DD2017051102112调度任务">DD2017051102112调度任务</Option>
                        <Option value="03-yy中队指挥所">03-yy中队指挥所</Option>
                        <Option value="04-yy中队指挥所">04-yy中队指挥所</Option>
                        <Option value="05-yy中队指挥所">05-yy中队指挥所</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="选择审核人"
                  >
                    {getFieldDecorator('reviewerName', {
                      rules: [{ required: true, message: '请选择审核人' }],
                    })(
                      <UnitRepresentSelect labelInValue onChange={(val) => { console.log('onChange', val); }} />
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    {...formItemLayoutDesc}
                    label="说明"
                  >
                    {getFieldDecorator('remark', {
                      rules: [{ message: '请输入相关说明' }],
                    })(
                      <Input type="textarea" rows={10} />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div style={{ marginBottom: 20, marginTop: 20, marginLeft: '3%', width: '90%', height: 50, backgroundColor: '#edf7fc', lineHeight: '50px', paddingLeft: 20 }}>软件单元基本信息</div>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="谱系"
                  >
                    {getFieldDecorator('ancestary', {
                      initialValue: initialData.ancestary,
                      rules: [{ required: true, message: '请输入谱系!' }],
                    })(
                      <ModuleTreeSelect />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="软件名称"
                  >
                    {getFieldDecorator('softwarename', {
                      rules: [{
                        required: true, message: '请选择软件名称!',
                      }],
                    })(
                      <SoftwareNameSelect />
                    )}
                  </FormItem>
                </Col>
                <Col style={{ height: 55.8 }} span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="软件单元名称"
                  >
                    {getFieldDecorator('categoryId', {
                      rules: [{
                        required: true, message: '请输入软件单元名称!',
                      }],
                    })(
                      <CategoryTreeSelect />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="软件单元版本"
                  >
                    {getFieldDecorator('version', {
                      rules: [{ required: true, message: '请输入谱系!' }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="软件单元等级"
                  >
                    {getFieldDecorator('softwareGrade', {
                      rules: [{ required: true, message: '请输入软件等级!' }],
                    })(
                      <Select>
                        <Option value="公开">公开</Option>
                        <Option value="内部公开">内部公开</Option>
                        <Option value="保密">保密</Option>
                        <Option value="机密">机密</Option>
                        <Option value="秘密">秘密</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div style={{ marginBottom: 20, marginTop: 20, marginLeft: '3%', width: '90%', height: 50, backgroundColor: '#edf7fc', lineHeight: '50px', paddingLeft: 20 }}>软件单元描述信息</div>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="操作系统"
                  >
                    {getFieldDecorator('system', {
                      rules: [{ type: 'array', required: true, message: '请输入典型操作系统！' }],
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
                    {getFieldDecorator('installPos', {
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
                    label="代码规模"
                  >
                    {getFieldDecorator('codeSize', {
                      rules: [{ required: true, message: '请输入代码规模' }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="MD5校验值"
                  >
                    {getFieldDecorator('MD5', {
                      rules: [{ required: true, message: '请输入MD5校验值' }],
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
                    {getFieldDecorator('stroageStyle', {
                      rules: [{ required: true, message: '请输入存储方式' }],
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
                    label="附件"
                  >
                    {getFieldDecorator('adjunct', {
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
                    label="版本描述"
                  >
                    {getFieldDecorator('description', {
                      rules: [{ message: '请输入软件描述' }],
                    })(
                      <Input type="textarea" rows={10} />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
        }
      </div>
    );
  }
}

InputDetailFirst.propTypes = {
  form: PropTypes.object.isRequired,
  disable: PropTypes.bool.isRequired,
  createData: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
InputDetailFirst.contextTypes = {
  user: PropTypes.object,
};
const InputDetailFirstForm = Form.create()(InputDetailFirst);
const WrapInputDetailFirst = CreateNewData('/api/software-in/start')(InputDetailFirstForm);
export default WrapInputDetailFirst;
