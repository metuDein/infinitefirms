import "@styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TradingViewWidget from "@component/tradingviewwidget/TradingViewWidget";
import Navbar from "@component/navbarandfooter/Navbar";
import { getServerSession } from "next-auth";
import Nav from "@component/navbarandfooter/Nav";
import Link from "next/link";
import { DataProvider } from "@component/context/DataProvider";
import Provider from "@component/context/Provider";
import Footer from "@component/navbarandfooter/Footer";

export const metadata = {
  title: "infinitefirms",
  description:
    "Join the future of finance with our trusted crypto trading and mining investment platform.",
  alternates: {
    canonical: "https://www.infinitefirms.pro",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.infinitefirms.pro",
    title: "infinitefirms",
    description:
      "Join the future of finance with our trusted crypto trading and mining investment platform.",
    images: [
      {
        url: "/assets/logo/logo.png",
        width: 800,
        height: 600,
        alt: "logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "infinitefirms",
    description:
      "Join the future of finance with our trusted crypto trading and mining investment platform.",
    images: ["/apple-touch-icon.png"],
  },
  icons: {
    icon: ["/apple-touch-icon.png?.v=2"],
    apple: ["/apple-touch-icon.png?.v=1"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

const RootLayout = async ({ children }) => {
  const session = await getServerSession();

  return (
    <Provider>
      <DataProvider>
        <html lang="en">
          <body className="">
            <Navbar />
            {/* <TradingViewWidget /> */}
            <main
              className="bg-gray-200"
              style={{
                paddingTop: "100px",
                paddingBottom: "100px",
              }}
            >
              {children}
            </main>
            <Footer />
            <ToastContainer />
             <script type="text/javascript"> (function(w,d,v3){ w.chaportConfig = { appId : '66a3a280fc17f360dbca4dd4' };  if(w.chaport)return;v3=w.chaport={};v3._q=[];v3._l={};v3.q=function(){v3._q.push(arguments)};v3.on=function(e,fn){if(!v3._l[e])v3._l[e]=[];v3._l[e].push(fn)};var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://app.chaport.com/javascripts/insert.js';var ss=d.getElementsByTagName('script')[0];ss.parentNode.insertBefore(s,ss)})(window, document); </script> 
          </body>
        </html>
      </DataProvider>
    </Provider>
  );
};
export default RootLayout;
