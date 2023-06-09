

export async function canSendProblem() {
  // 在这里判断是否达到最大问题数
  return new Promise(async (resolve, reject) => {
    await fetch('https://api.yshxk.com/api/cansendproblem').then(res => {
      if (res.status === 200) {
        res.json().then(resp => {
            resolve(resp.data?.isCanSend)
        })
      }
    });
  })
}
