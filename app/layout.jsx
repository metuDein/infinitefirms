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
  title: "Horizonmarketcapital",
  description:
    "Join the future of finance with our trusted crypto trading and mining investment platform.",
  alternates: {
    canonical: "https://www.horizonmarketcapital.com",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.horizonmarketcapital.com",
    title: "Horizonmarketcapital",
    description:
      "Join the future of finance with our trusted crypto trading and mining investment platform.",
    images: [
      {
        url: "/assets/logo/horizon.png",
        width: 800,
        height: 600,
        alt: "horizon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizonmarketcapital",
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
          </body>
        </html>
      </DataProvider>
    </Provider>
  );
};
export default RootLayout;
