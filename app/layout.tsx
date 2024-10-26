import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "video.js/dist/video-js.css";
import "react-toastify/dist/ReactToastify.min.css";
import "@/global.css";
import LayoutWrap from "@/components/LayoutWrap/LayoutWrap";
import Header from "@/components/Header/Header";
import Providers from "./providers";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Cuurly - A community for all things black and mixed textured hair.",
  description: "",
};

// TODO: setup typekit

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LayoutWrap>
            <Header className="row-start-1 row-span-1" />
            <main className="row-start-2 row-span-1">{children}</main>
          </LayoutWrap>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
