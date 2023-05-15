/* eslint-disable @next/next/no-page-custom-font */
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

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3587655547787611" crossOrigin="anonymous"></script>
        <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-3587655547787611"
        data-ad-slot="7040899921"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3587655547787611"
            crossOrigin="anonymous"></script>
        <ins class="adsbygoogle"
            style="display:block"
            data-ad-format="autorelaxed"
            data-ad-client="ca-pub-3587655547787611"
            data-ad-slot="2526179038"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>

      </head>
      <body>{children}</body>
    </html>
  );
}
