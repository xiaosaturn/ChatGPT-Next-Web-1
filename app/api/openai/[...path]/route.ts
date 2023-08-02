import { prettyObject } from "@/app/utils/format";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../auth";
import { canSendProblem } from "../../can-send-problem";
import { subCanProblemCount } from "../../user-info";
import { requestOpenai } from "../../common";

async function handle(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  console.log("[OpenAI Route] params ", params);

  const authResult = auth(req);
  if (authResult.error) {
    return NextResponse.json(authResult, {
      status: 401,
    });
  }

  const ipAddress = req.headers.get("x-forwarded-for") || "0.0.0.0";
  const obj = await canSendProblem(ipAddress);

  if (obj?.status == 200) {
    if (obj.data && obj.data.count <= 0) {
      return NextResponse.json({
        error: true,
        msg: "次数用完了，请至个人中心观看广告获取次数",
      });
    }
  } else {
    return NextResponse.json({
      error: true,
      msg: obj?.msg,
    });
  }

  // const res = await subCanProblemCount();
  // if (res.status == 200) {
  //   if (res.data && res.data.count <= 0) {
  //     return NextResponse.json({
  //       error: true,
  //       msg: "次数用完了，请至个人中心观看广告获取次数",
  //     });
  //   }
  // } else {
  //   return NextResponse.json({
  //     error: true,
  //     msg: res.msg ? res.msg + "haisss" : "发生未知错误，请稍后重试",
  //   });
  // }

  try {
    return await requestOpenai(req);
  } catch (e) {
    console.error("[OpenAI] ", e);
    return NextResponse.json(prettyObject(e));
  }
}

export const GET = handle;
export const POST = handle;

export const runtime = "edge";
