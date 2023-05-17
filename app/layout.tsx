/* eslint-disable @next/next/no-page-custom-font */
import { useEffect } from "react";
import dynamic from "next/dynamic";
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { getBuildConfig } from "./config/build";

const buildConfig = getBuildConfig();

export const metadata = {
  title: "黄老师的ChatGPT",
  description: "您的个人问答助理",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
  appleWebApp: {
    title: "黄老师的ChatGPT",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="version" content={buildConfig.commitId} />
        <link rel="manifest" href="/site.webmanifest"></link>
        <script src="/serviceWorkerRegister.js" defer></script>
      </head>
      <body>
        <GoogleAds />
        {children}
      </body>
    </html>
  );
}

function GoogleAds() {
  useEffect(() => {
    if (window && window.__wxjs_environment == "miniprogram") {
      // 微信小程序不加载谷歌广告
    } else if (navigator &&  navigator.userAgent && navigator.userAgent.toLowerCase().includes("toutiaomicoapp")) {
      // 字节系小程序不加载谷歌广告
    } else {
      // 浏览器打开的，加载谷歌广告
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);

      const script2 = document.createElement("script");
      const newContent = document.createTextNode("(adsbygoogle = window.adsbygoogle || []).push({});");
      script2.appendChild(newContent);
      document.body.appendChild(script2);
    }
  }, []);
  return (
    <>
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3587655547787611"
        data-ad-slot="7040899921"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>

      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-3587655547787611"
        data-ad-slot="2526179038">
      </ins>
    </>
  );
}
