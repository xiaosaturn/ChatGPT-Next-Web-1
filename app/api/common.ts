import { NextRequest, NextResponse } from "next/server";
import { useNodeServerStore } from "@/app/store";
import { subCanProblemCount } from "./user-info";

export const OPENAI_URL = "api.openai.com";
const DEFAULT_PROTOCOL = "https";
const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;

export async function requestOpenai(req: NextRequest) {
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
  //     msg: res.msg ? res.msg + 'haisss' : "发生未知错误，请稍后重试",
  //   });
  // }

  const controller = new AbortController();
  const authValue = req.headers.get("Authorization") ?? "";
  const openaiPath = `${req.nextUrl.pathname}${req.nextUrl.search}`.replaceAll(
    "/api/openai/",
    "",
  );

  let baseUrl = BASE_URL;

  if (!baseUrl.startsWith("http")) {
    baseUrl = `${PROTOCOL}://${baseUrl}`;
  }

  console.log("[Proxy] ", openaiPath);
  console.log("[Base Url]", baseUrl);

  if (process.env.OPENAI_ORG_ID) {
    console.log("[Org ID]", process.env.OPENAI_ORG_ID);
  }

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10 * 60 * 1000);

  const fetchUrl = `${baseUrl}/${openaiPath}`;
  const fetchOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authValue,
      ...(process.env.OPENAI_ORG_ID && {
        "OpenAI-Organization": process.env.OPENAI_ORG_ID,
      }),
    },
    cache: "no-store",
    method: req.method,
    body: req.body,
    signal: controller.signal,
    // @ts-ignore
    duplex: "half",
  };

  try {
    const res = await fetch(fetchUrl, fetchOptions);
    console.log("chatgpt的返回", res);
    if (res.status === 401) {
      // to prevent browser prompt for credentials
      res.headers.delete("www-authenticate");
    }

    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}
