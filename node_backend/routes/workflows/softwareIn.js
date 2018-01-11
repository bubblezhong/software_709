const express = require('express');
const rp = require('request-promise');
const rpcfg = require('../../utils/requestPromiseOption');

const router = express.Router();

// 入库申请
const softwareIn = (req, res, next) => {
  const body = req.body;
  if (body.applicant == null) {
    return res.json({code: 1, msg: "缺少用户ID"});
  } 
  if (body.reviewer == null) {
    return res.json({code: 1, msg: "缺少审批人ID"});
  } 
  const value = {
    oddNum: body.oddNum,
    applicant: body.applicant,
    applicantName: body.applicantName,
    taskSource: body.taskSource,
    categoryId: body.categoryId,
    version: body.version,
    MD5: body.MD5,
    description: body.description,
    softwareGrade: body.softwareGrade,
    system: body.system,
    softwareKit: body.softwareKit,
    installPos: body.installPos,
    stroageStyle: body.stroageStyle,
    adjunct: body.adjunct,
    reviewer: body.reviewer,
    codeSize: body.codeSize,
    reviewerName: body.reviewerName,
    remark: body.remark,
  };
  const options = Object.assign({}, rpcfg.POST, {
    uri: rpcfg.URL + 'software-in/start',
    body: value,
  });
  rp(options).then((rst) => {
    // console.log('flow-start-rst', rst);
    if (rst.code === 0) {
      // 处理流程的数据
      res.json({ code: 0, data: rst.data[0] });
    } else {
      res.json({ code: 1, msg: rst.msg });
    }
  }).catch((err) => {
    return next(err);
  });
};

// 完成审批任务
const completeReview = (req, res, next) => {
  const body = req.body;
  if (body.handleId == null) {
    return res.json({code: 1, msg: "缺少处理人ID"});
  } 
  if (body.registrant == null) {
    return res.json({code: 1, msg: "缺少登记人ID"});
  } 
  const value = {
    reviewerName: body.handleName,
    remark: body.remark,
    reviewFile: body.reviewFile,
    registrantName: body.registrantName,
    // 一下是必须的字段：
    currentName: body.handleId,  // 当前准备执行的用户id
    processInstanceId: body.processInstanceId, // 流程实例
    status: body.status,
    nextName: body.registrant, 
    nextTaskName: 'registrant',
    currentTaskName: 'reviewer',
  };
  const options = Object.assign({}, rpcfg.POST, {
    uri: rpcfg.URL + 'software-in/complete-task',
    body: value,
  });
  rp(options).then((rst) => {
    // console.log('flow-start-rst', rst);
    if (rst.code === 0) {
      // 处理流程的数据
      res.json({ code: 0, data: rst.data[0] });
    } else {
      res.json({ code: 1, msg: rst.msg });
    }
  }).catch((err) => {
    return next(err);
  });
};

// 完成入库登记
const completeRegistrant = (req, res, next) => {
  const body = req.body;
  if (body.handleId == null) {
    return res.json({code: 1, msg: "缺少处理人ID"});
  } 
  if (body.accept == null) {
    return res.json({code: 1, msg: "缺少验收人ID"});
  } 
  const value = {
    registrantName: body.handleName,
    acceptName: body.acceptName,
    remark: body.remark,
    password: body.password,
    infoRemark: body.infoRemark,
    registrantFile: body.registrantFile,
    // 一下是必须的字段：
    currentName: body.handleId,  // 当前准备执行的用户id
    processInstanceId: body.processInstanceId, // 流程实例
    nextName: body.accept, 
    nextTaskName: 'accept',
    currentTaskName: 'registrant',
  };
  const options = Object.assign({}, rpcfg.POST, {
    uri: rpcfg.URL + 'software-in/complete-task',
    body: value,
  });
  rp(options).then((rst) => {
    if (rst.code === 0) {
      // 处理流程的数据
      res.json({ code: 0, data: rst.data[0] });
    } else {
      res.json({ code: 1, msg: rst.msg });
    }
  }).catch((err) => {
    return next(err);
  });
};

// 完成入库验收
const completeAccept = (req, res, next) => {
  const body = req.body;
  if (body.handleId == null) {
    return res.json({code: 1, msg: "缺少处理人ID"});
  } 
  if (body.accept == null) {
    return res.json({code: 1, msg: "缺少验收人ID"});
  } 
  const value = {
    acceptName: body.handleName,
    remark: body.remark,
    registrantFile: body.registrantFile,
    // 一下是必须的字段：
    currentName: body.handleId,  // 当前准备执行的用户id
    processInstanceId: body.processInstanceId, // 流程实例
    status: body.status,
    nextName: '', 
    nextTaskName: 'finished',
    currentTaskName: 'accept',
  };
  const options = Object.assign({}, rpcfg.POST, {
    uri: rpcfg.URL + 'software-in/complete-task',
    body: value,
  });
  rp(options).then((rst) => {
    if (rst.code === 0) {
      // 处理流程的数据
      res.json({ code: 0, data: rst.data[0] });
    } else {
      res.json({ code: 1, msg: rst.msg });
    }
  }).catch((err) => {
    return next(err);
  });

};

router.post("/start", softwareIn);
router.post("/review", completeReview);
router.post("/registrant", completeRegistrant);
router.post("/accept", completeAccept);

module.exports = router;
