import { useNodeServerStore } from "@/app/store";

// let baseUrl = 'http://127.0.0.1:8686/';
// let origin = window.location.href;
// if (origin.includes('ankerxiao.com')) {
//   // 生产环境
//   baseUrl = 'https://api.yshxk.com/node/';
// }

let baseUrl = "https://api.yshxk.com/node/";

interface Response {
  code: number;
  status: number;
  msg: string;
  data: any;
  token: string;
}

/**
 * 获取用户信息
 * @param
 * @returns
 */
export async function getUserInfo(): Promise<Response> {
  return new Promise(async (resolve, reject) => {
    await fetch(baseUrl + "user/user-info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: useNodeServerStore.getState().token || "",
      },
    }).then((res) => {
      res.json().then((resp) => {
        resolve(resp);
      });
    });
  });
}

export async function userLogin(bodyParams: any): Promise<Response> {
  return new Promise(async (resolve, reject) => {
    await fetch(baseUrl + "user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: useNodeServerStore.getState().token || "",
      },
      body: JSON.stringify(bodyParams),
    }).then((res) => {
      res.json().then((resp) => {
        resolve(resp);
      });
    });
  });
  // const res: AxiosResponse<Response> = await axiosRequest.post('user/login', {
  //   email: bodyParams.email,
  //   password: bodyParams.password,
  // });
  // const resp: Response = res.data;
  // return resp;
}

export async function userLoginByCode(bodyParams: any): Promise<Response> {
  return new Promise(async (resolve, reject) => {
    await fetch(baseUrl + "user/login-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: useNodeServerStore.getState().token || "",
      },
      body: JSON.stringify(bodyParams),
    }).then((res) => {
      res.json().then((resp) => {
        resolve(resp);
      });
    });
  });
  // const res: AxiosResponse<Response> = await axiosRequest.post(baseUrl + 'user/login-code', {
  //   email: bodyParams.email,
  //   verificationCode: bodyParams.verificationCode
  // });
  // const resp: Response = res.data;
  // return resp;
}

export async function getWXaCode(): Promise<Response> {
  return new Promise(async (resolve, reject) => {
    await fetch(baseUrl + "wechat/acode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: useNodeServerStore.getState().token || "",
      },
    }).then((res) => {
      res.json().then((resp) => {
        resolve(resp);
      });
    });
  });
  // const res: AxiosResponse<Response> = await axiosRequest.post('wechat/acode');
  // const resp: Response = res.data;
  // return resp;
}

export async function subCanProblemCount(): Promise<Response> {
  return new Promise(async (resolve, reject) => {
    await fetch(baseUrl + "user/problem/subCanProblemCount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
    }).then((res) => {
      res.json().then((resp) => {
        resolve(resp);
      });
    });
  });
  // const res: AxiosResponse<Response> = await axiosRequest.post('user/problem/subCanProblemCount');
  // const resp: Response = res.data;
  // return resp;
}

export async function userRegister(params: any): Promise<Response> {
  return new Promise(async (resolve, reject) => {
    await fetch(baseUrl + "user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: useNodeServerStore.getState().token || "",
      },
      body: JSON.stringify(params),
    }).then((res) => {
      res.json().then((resp) => {
        resolve(resp);
      });
    });
  });
  // const res: AxiosResponse<Response> = await axiosRequest.post('user/register', {
  //   email: params.email,
  //   password: params.password,
  //   verificationCode: params.verificationCode
  // });
  // const resp: Response = res.data;
  // return resp;
}

export async function getVerificationCode(params: any): Promise<Response> {
  return new Promise(async (resolve, reject) => {
    await fetch(baseUrl + "user/verification-code?email=" + params.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: useNodeServerStore.getState().token || "",
      },
    }).then((res) => {
      res.json().then((resp) => {
        resolve(resp);
      });
    });
  });
  // const res: AxiosResponse<Response> = await axiosRequest.get('user/verification-code?email=' + params.email);
  // const resp: Response = res.data;
  // return resp;
}
