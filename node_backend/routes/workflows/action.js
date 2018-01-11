const express = require('express');
const rp = require('request-promise');
const rpcfg = require('../../utils/requestPromiseOption');
const router = express.Router();
// 根据用户id查询，由该用户发起的所有流程
const getMyTasks = (req, res, next) => {
  const query = req.query;
  if (!query.name) {
    return res.json({code: 0, msg: "查询参数不能为空！"});
  }
  const value = {
    name: query.name,
    status: query.type || "all",  // 默认为空
  };
  const options = Object.assign({}, rpcfg.POST, {
    uri: rpcfg.URL + 'software-in/my-tasks',
    body: value,
  });
  rp(options).then((rst) => {
    // console.log('flow-start-rst', rst);
    if (rst.code === 0) {
      // 处理流程的数据
      res.json({ code: 0, data: rst.data });
    } else {
      res.json({ code: 1, msg: rst.msg });
    }
  }).catch((err) => {
    return next(err);
  });
};

// 根据流程ID，查询历史纪录
const getHistory = (req, res, next) => {
  const processId = req.params.id;
  if (!processId) return res.json({ code: 1, msg: '缺少流程ID'});
  const options = Object.assign({}, rpcfg.POST, {
    uri: rpcfg.URL + 'history',
    body: { processId },
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

// 查询个人所有任务
const getMyTask = (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.json({ code: 1, msg: '缺少用户ID'});
  const options = Object.assign({}, rpcfg.POST, {
    uri: rpcfg.URL + 'get-my-tasks',
    body: { name: id },
  });
  rp(options).then((rst) => {
    // console.log('flow-start-rst', rst);
    if (rst.code === 0) {
      // 处理流程的数据
      res.json({ code: 0, data: rst.data });
    } else {
      res.json({ code: 1, msg: rst.msg });
    }
  }).catch((err) => {
    return next(err);
  });
};

router.get("/my-tasks", getMyTasks);
router.get("/history/:id", getHistory);
router.get("/get-my-tasks/:id", getMyTask);

module.exports = router;