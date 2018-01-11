import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
// import { browserHistory } from 'react-router';
import Showing from './Showing/SummaryEdit';

const RequestsSummary = () => {
  return (
    <Row>
      <Col span="24">
        <Showing
          defaultValue={{}}
        />
      </Col>
    </Row>
  );
};

RequestsSummary.propTypes = {
  dictionary: PropTypes.object,
  authority: PropTypes.object,
};


export default RequestsSummary;
