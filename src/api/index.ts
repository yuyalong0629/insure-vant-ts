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
  myInsuranceInfo: '/api/user/myInsuranceInfo'
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
