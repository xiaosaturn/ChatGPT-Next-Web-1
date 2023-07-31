import axios, { AxiosResponse } from 'axios'
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
  status: number;
  msg: string;
  data: any;
  token: string;
}

const axiosRequest = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token') || '',
  }
})

axiosRequest.interceptors.response.use((res) => {
  return res;
}, (err) => {
  return {
    status: 400,
    msg: '发生未知错误，请稍后重试'
  }
});

/**
 * 获取用户信息
 * @param
 * @returns 
 */
export async function getUserInfo(): Promise<Response> {
  try {
    const res: AxiosResponse<Response> = await axiosRequest.get<Response>('user/user-info');
    const resp: Response = res.data;
    return resp;
  } catch (error) {
    throw new Error(`Failed to get user information: ${error}`);
  }
}

export async function userLogin(bodyParams: any): Promise<Response> {
  const res: AxiosResponse<Response> = await axiosRequest.post('user/login', {
    email: bodyParams.email,
    password: bodyParams.password,
  });
  const resp: Response = res.data;
  return resp;
}

export async function userLoginByCode(bodyParams: any): Promise<Response> {
  const res: AxiosResponse<Response> = await axiosRequest.post(baseUrl + 'user/login-code', {
    email: bodyParams.email,
    verificationCode: bodyParams.verificationCode
  });
  const resp: Response = res.data;
  return resp;
}

export async function getWXaCode(): Promise<Response> {
  const res: AxiosResponse<Response> = await axiosRequest.post('wechat/acode');
  const resp: Response = res.data;
  return resp;
}

export async function subCanProblemCount(): Promise<Response> {
  const res: AxiosResponse<Response> = await axiosRequest.post('user/problem/subCanProblemCount');
  const resp: Response = res.data;
  return resp;
}

export async function userRegister(params: any) {
  const res: AxiosResponse<Response> = await axiosRequest.post('user/register', {
    email: params.email,
    password: params.password,
    verificationCode: params.verificationCode
  });
  const resp: Response = res.data;
  return resp;
}

export async function getVerificationCode(params: any) {
  const res: AxiosResponse<Response> = await axiosRequest.get('user/verification-code?email=' + params.email);
  const resp: Response = res.data;
  return resp;
}