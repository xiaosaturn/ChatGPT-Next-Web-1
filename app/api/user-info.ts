import axios from 'axios'
import { message } from 'antd';

let baseUrl = 'http://127.0.0.1:8686/';
let origin = window.location.href;
if (origin.includes('ankerxiao.com')) {
  // 生产环境
  baseUrl = 'https://api.yshxk.com/node/';
}

// baseUrl = 'https://api.yshxk.com/node/';

interface Response {
  code: number;
  msg: string;
  data: any;
}

const axiosRequest = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token') || '',
  }
})

axiosRequest.interceptors.response.use((res) => {
  return res.data;
}, (err) => {
  return {
    code: 400,
    msg: '发生未知错误，请稍后重试'
  }
});

/**
 * 获取用户信息
 * @param
 * @returns 
 */
export async function getUserInfo() {
  const res = await axiosRequest.get(baseUrl + 'user/user-info');
  return res;
}

export async function userLogin(bodyParams: any) {
  const res = await axiosRequest.post(baseUrl + 'user/login', {
    email: bodyParams.email,
    password: bodyParams.password,
  });
  return res;
}

export async function userLoginByCode(bodyParams: any) {
  const res = axiosRequest.post(baseUrl + 'user/login-code', {
    email: bodyParams.email,
    verificationCode: bodyParams.verificationCode
  });
  return res;
}

export async function getWXaCode() {
  const res = axiosRequest.post(baseUrl + 'wechat/acode');
  return res;
}