import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'antd';
// import CategoryVersionDetailIntro from './CategoryVersionDetail/CategoryVersionDetailIntro';
import CategoryVersionBasicInfo from './CategoryVersionDetail/CategoryVersionBasicInfo';
import CategoryVersionUseUnit from './CategoryVersionDetail/CategoryVersionUseUnit';
import './Category.css';
import GetDetailInfo from './../../utils/GetDetailInfo';

class CategoryVersionDetail extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.params.id;
    this.state = {
      id,
      show: 'CategoryVersion',
      data: {},
    };
  }
  componentWillMount() {
    this.props.sendInfo(this.state.id, this.handleData);
  }
  handleData = (res) => {
    this.setState({ data: res.data });
  }
  render() {
    const { data } = this.state;
    // console.log('this.state', data);
    return (
      <div>
        <div style={{ overflow: 'auto' }}>
          <Link to="/main/SoftwareInfo/CategoryDetail/1" className="SoftwareInfoDetail_return">
            <Button style={{ width: 85, height: 30 }}>
              <span style={{ marginRight: 8 }}>&lt;</span>
              <span>返回</span>
            </Button>
          </Link>
          <Link to="/main/SoftwareInfo/SoftwareDetailDelete">
            <Button type="primary" className="SoftwareInfoDetail_reflash">刷新</Button>
          </Link>
        </div>
        <div className="SoftwareInfoDetail_detail" >
          <div className="CategoryVersionDetail_headerpic">
            <span>单元版本</span>
          </div>
          <div className="SoftwareInfoDetail_content">
            <h2 style={{ display: 'inline-block' }}>{data.SU_NAME}</h2>
            <h2 style={{ display: 'inline-block', marginLeft: 25 }}>版本编号：{data.CATEGORY_VERSION}</h2>
            <div className="SoftwareInfoDetail_brief">
              <span>编号：</span>
              <span>{data.SU_CODE}</span>
              <span>研制单位：</span>
              <span>{data.V_DEV_NAME}</span>
              <span>军代表：</span>
              <span>{data.SU_OWNER_NAME}</span>
            </div>
            <div style={{ fontSize: 14 }}>
              {data.SU_DESCRIBE}
            </div>
          </div>
        </div>
        <CategoryVersionBasicInfo data={this.state.data} {...this.props} />
        <CategoryVersionUseUnit id={this.state.id} />
      </div>
    );
  }
}
CategoryVersionDetail.propTypes = {
  sendInfo: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};
const WrapCategoryVersionDetail = GetDetailInfo('/api/category-version/')(CategoryVersionDetail);
export default WrapCategoryVersionDetail;
