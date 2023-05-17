import { useEffect } from "react";

declare global {
  interface Window { __wxjs_environment: string }
}

export function GoogleAds() {
    useEffect(() => {
      if (window && window.__wxjs_environment && window.__wxjs_environment === "miniprogram") {
        // 微信小程序不加载谷歌广告
      } else if (navigator &&  navigator.userAgent && navigator.userAgent.toLowerCase().includes("toutiaomicroapp")) {
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