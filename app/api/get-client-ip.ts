

export async function getClientIP() {
    // 获取客户端IP
    return new Promise(async (resolve, reject) => {
      await fetch('https://api.yshxk.com/api/getIPAddr').then(res => {
        if (res.status === 200) {
          res.text().then(resp => {
              resolve(resp);
          })
        }
      });
    })
  }
  