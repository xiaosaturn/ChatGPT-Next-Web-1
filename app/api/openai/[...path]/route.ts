import { prettyObject } from "@/app/utils/format";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../auth";
import { canSendProblem } from "../../can-send-problem";
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

  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const isCanSend = await canSendProblem(ipAddress);
  if (!isCanSend) {
    return NextResponse.json({
      error: true,
      msg: "次数用完了，不允许发送了，请过段时间重试",
    });
  }

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
