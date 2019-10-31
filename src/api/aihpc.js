import { axios } from '@/utils/request'
import api from '@/api/index'

export function getAreaList (parameter) { // 数据中心列表
  return axios({
    url: api.areaInfo,
    method: 'get'
    // params: parameter
  })
}

export function getAreaDetail (parameter) { // 修改数据中心详情
  return axios({
    url: `${api.areaInfo}/${parameter._id}`,
    method: 'post'
    // params: parameter
  })
}





// export function getBuyDetail (parameter) { // 购买信息
//   return axios({
//     url: api.hpcBuy,
//     method: 'get',
//     params: parameter
//   })
// }
//
// export function subBuyInfo (parameter) { // 购买
//   return axios({
//     url: api.hpcBuy,
//     method: 'post',
//     data: parameter
//   })
// }
//
// export function getBuyMaxNode (parameter) { // 获取购买时最大核数
//   return axios({
//     url: `${api.getMaxNode}/${parameter._id}`,
//     method: 'get'
//     // params: parameter
//   })
// }
//
// export function getHpcList (parameter) { // hpc列表
//   return axios({
//     url: api.getHpcList,
//     method: 'get',
//     params: parameter
//   })
// }
