import network from './network';

// 登录
export function signInAPI(data) {
  return network({
    url: `/signIn`,
    method: "post",
    data
  });
}

// 注册
export function signUpAPI(data) {
  return network({
    url: `/signUp`,
    method: "post",
    data
  })
}

// 密码重置
export function resetPwdAPI(data) {
  return network({
    url: `/resetPwd`,
    method: "post",
    data
  })
}

// 任务列表
export function queryTaskListAPI(params) {
  return network({
    url: `/queryTaskList`,
    method: "get",
    params
  })
}

// 添加任务
export function addTaskAPI(data) {
  return network({
    url: `/addTask`,
    method: "post",
    data
  })
}

// 编辑任务
export function editTaskAPI(data) {
  return network({
    url: `/editTask`,
    method: "put",
    data
  })
}

// 操作任务状态
export function updateTaskStatusAPI(data) {
  return network({
    url: `/updateTaskStatus`,
    method: "put",
    data
  })
}

// 点亮红星标记
export function updateMarkAPI(data) {
  return network({
    url: `/updateMark`,
    method: "put",
    data
  })
}

// 删除任务
export function deleteTaskAPI(data) {
  return network({
    url: `/deleteTask`,
    method: "delete",
    data
  })
}