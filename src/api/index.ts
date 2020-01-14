import { axios } from '@/utils/request'
import qs from 'qs'

/**
 * @description: API
 * @param {Object} Home [*]
 * @return: api
 * @author yylong 2020/1/02
 */

const api = {
  customizeSchemeInfo: '/api/bx/customizeSchemeInfo',
  schemeProblemInfoList: '/api/bx/schemeProblemInfoList',
  smsVerifyCode: '/api/smsVerifyCode',
  submitProblemInfo: '/api/user/submitProblemInfo',
  getSalesInfo: '/api/user/getSalesInfo',
  schemePriceInfoList: '/api/bx/schemePriceInfoList',
  myInsuranceInfo: '/api/user/myInsuranceInfo',
  basicData: '/api/basicData',
  addOrUpdateInsuranceInfo: '/api/user/addOrUpdateInsuranceInfo',
  insuranceInfo: '/api/user/insuranceInfo',
  mySchemeInfo: '/api/user/mySchemeInfo',
  wxShareSign: '/api/share/wxShareSign',
  login: '/api/login',
  confirmPay: '/api/pay/confirm_pay',
  callbackPay: '/api/pay/pay_callback'
}

/**
 * @description: 首页banner
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: customizeSchemeInfo
 */

export function customizeSchemeInfo(paramter: any) {
  return axios({
    method: 'get',
    url: api.customizeSchemeInfo,
    params: paramter
  })
}

/**
 * @description: 问卷调查
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: schemeProblemInfoList
 */

export function schemeProblemInfoList(paramter: any) {
  return axios({
    method: 'get',
    url: api.schemeProblemInfoList,
    params: paramter
  })
}

/**
 * @description: 短信验证码
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: smsVerifyCode
 */

export function smsVerifyCode(parameter: any) {
  return axios({
    method: 'post',
    url: api.smsVerifyCode,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 方案问题提交
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: submitProblemInfo
 */

export function submitProblemInfo(parameter: any) {
  return axios({
    method: 'post',
    url: api.submitProblemInfo,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 用户销售查询
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: getSalesInfo
 */

export function getSalesInfo(parameter: any) {
  return axios({
    method: 'get',
    url: api.getSalesInfo,
    params: parameter
  })
}

/**
 * @description: 方案价格
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: schemePriceInfoList
 */

export function schemePriceInfoList(parameter: any) {
  return axios({
    method: 'get',
    url: api.schemePriceInfoList,
    params: parameter
  })
}

/**
 * @description: 保单管理 => 请求列表
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: myInsuranceInfo
 */

export function myInsuranceInfo(parameter: any) {
  return axios({
    method: 'get',
    url: api.myInsuranceInfo,
    params: parameter
  })
}

/**
 * @description: 保单管理 => 图片上传
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: upload
 */

export function upload(parameter: any) {
  return axios({
    method: 'post',
    url: 'http://upload.dameicm.cn/upload.htm?app=bxImage&type=json',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true,
    data: parameter
  })
}

/**
 * @description: 保单管理 => 基础数据
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: basicData
 */

export function basicData(parameter: any) {
  return axios({
    method: 'get',
    url: api.basicData,
    params: parameter
  })
}

/**
 * @description: 保单管理 => 添加保单信息提交
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: addOrUpdateInsuranceInfo
 */

export function addOrUpdateInsuranceInfo(parameter: any) {
  return axios({
    method: 'post',
    url: api.addOrUpdateInsuranceInfo,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 保单管理 => 添加保单信息详情
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: insuranceInfo
 */

export function insuranceInfo(parameter: any) {
  return axios({
    method: 'get',
    url: api.insuranceInfo,
    params: parameter
  })
}

/**
 * @description: 方案 => 方案信息
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: mySchemeInfo
 */

export function mySchemeInfo(parameter: any) {
  return axios({
    method: 'get',
    url: api.mySchemeInfo,
    params: parameter
  })
}

/**
 * @description: 公共 => 微信分享
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: wxShareSign
 */

export function wxShareSign(parameter: any) {
  return axios({
    method: 'get',
    url: api.wxShareSign,
    params: parameter
  })
}

/**
 * @description: 公共 => 微信授权登录
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: login
 */

export function login(parameter: any) {
  return axios({
    method: 'post',
    url: api.login,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 公共 => 微信支付
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: confirmPay
 */

export function confirmPay(parameter: any) {
  return axios({
    method: 'post',
    url: api.confirmPay,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 公共 => 微信支付回调
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: callbackPay
 */

export function callbackPay(parameter: any) {
  return axios({
    method: 'post',
    url: api.callbackPay,
    data: qs.stringify(parameter)
  })
}
