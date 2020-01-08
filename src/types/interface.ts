/**
 * @description: 问卷查询列表 res
 * @param {type} *
 * @return: ProblemList
 */

export interface ProblemList {
  problemOption?: string
  id: number
  problemFlag: string
  problem: string
  problemSort: number
  type: number
  isMust: number
}

