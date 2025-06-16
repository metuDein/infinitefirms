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
{/* <script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/684b642547f3b9190b9fda86/1itj7ug2t';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script> */}
<script src="https://embed.tawk.to/684b642547f3b9190b9fda86/1itj7ug2t">

</script>
          </body>
        </html>
      </DataProvider>
    </Provider>
  );
};
export default RootLayout;

// import "@styles/globals.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import TradingViewWidget from "@component/tradingviewwidget/TradingViewWidget";
// import Navbar from "@component/navbarandfooter/Navbar";
// import { getServerSession } from "next-auth";
// import Nav from "@component/navbarandfooter/Nav";
// import Link from "next/link";
// import { DataProvider } from "@component/context/DataProvider";
// import Provider from "@component/context/Provider";
// import Footer from "@component/navbarandfooter/Footer";
// import { LanguageProvider } from "@component/context/LanguageContext"; // Add this

//  export const metadata = {
//   title: "infinitefirms",
//   description:
//     "Join the future of finance with our trusted crypto trading and mining investment platform.",
//   alternates: {
//     canonical: "https://www.infinitefirms.pro",
//     languages: {
//       "en-US": "/en-US",
//     },
//   },
//   openGraph: {
//     type: "website",
//     url: "https://www.infinitefirms.pro",
//     title: "infinitefirms",
//     description:
//       "Join the future of finance with our trusted crypto trading and mining investment platform.",
//     images: [
//       {
//         url: "/assets/logo/logo.png",
//         width: 800,
//         height: 600,
//         alt: "logo",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "infinitefirms",
//     description:
//       "Join the future of finance with our trusted crypto trading and mining investment platform.",
//     images: ["/apple-touch-icon.png"],
//   },
//   icons: {
//     icon: ["/apple-touch-icon.png?.v=2"],
//     apple: ["/apple-touch-icon.png?.v=1"],
//     shortcut: ["/apple-touch-icon.png"],
//   },
//   manifest: "/site.webmanifest",
// };


// const RootLayout = async ({ children }) => {
//   const session = await getServerSession();

//   return (
//     <Provider>
//       <DataProvider>
//         <LanguageProvider> {/* Wrap with LanguageProvider */}
//           <html lang="en">
//             <body className="">
//               <Navbar />
//               <main
//                 className="bg-gray-200"
//                 style={{
//                   paddingTop: "100px",
//                   paddingBottom: "100px",
//                 }}
//               >
//                 {children}
//               </main>
//               <Footer />
//               <ToastContainer />
//               <script src="https://embed.tawk.to/684b642547f3b9190b9fda86/1itj7ug2t"></script>
//             </body>
//           </html>
//         </LanguageProvider>
//       </DataProvider>
//     </Provider>
//   );
// };

// export default RootLayout;