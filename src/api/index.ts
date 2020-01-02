import { axios } from '@/utils/request'
import qs from 'qs'

/**
 * @description: API
 * @param {Object} Home [*]
 * @return: api
 * @author yylong 2020/1/02
 */

const api = {
  schemeProblemInfoList: '/api/bx/schemeProblemInfoList'
}

/**
 * @description: 问卷调查
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: schemeProblemInfoList
 */

export function schemeProblemInfoList(paramter: any) {
  return axios({
    method: 'post',
    url: api.schemeProblemInfoList,
    data: qs.stringify(paramter)
  })
}
