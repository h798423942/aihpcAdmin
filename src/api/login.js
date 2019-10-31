import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    url: '/admin/login',
    method: 'post',
    data: parameter
  })
}

export function getVerifyCode (parameter) {
  return axios({
    url: '/captcha',
    method: 'get',
    data: parameter
  })
}

export function logout () {
  return axios({
    url: '/logout',
    method: 'get'
  })
}