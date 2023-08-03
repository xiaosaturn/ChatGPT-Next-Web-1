import { getClientIP } from "./get-client-ip";
import { subCanProblemCount } from "./user-info";

let baseUrl = "https://api.yshxk.com/node/";

export async function canSendProblem(ipAddr: string): Promise<any> {
  // 在这里判断是否达到最大问题数
  //   const ipAddr = await getClientIP();

  return new Promise(async (resolve, reject) => {
    await fetch(baseUrl + "user/problem/subCanProblemCount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((resp) => {
          resolve(resp);
        });
      }
    });
  });

  // const res = await subCanProblemCount();
  // if (res.status == 200) {
  //   if (res.data && res.data.count <= 0) {
  //     return {
  //       error: true,
  //       msg: '次数用完了',
  //     };
  //   }
  // } else {
  //   return {
  //     error: true,
  //     msg: res.msg ? res.msg + "haisss" : "发生未知错误，请稍后重试",
  //   };
  // }

  return new Promise(async (resolve, reject) => {
    await fetch("https://api.yshxk.com/api/cansendproblem?ip=" + ipAddr).then(
      (res) => {
        if (res.status === 200) {
          res.json().then((resp) => {
            resolve(resp.data?.isCanSend);
          });
        }
      },
    );
  });
}
