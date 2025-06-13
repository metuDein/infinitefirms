
"use client"
// pages/buy-crypto.js
export default function BuyCrypto() {
  const redirectToMoonPay = () => {
    const params = new URLSearchParams({
      apiKey: process.env.NEXT_PUBLIC_MOONPAY_KEY,
      currencyCode: 'usdt',
      walletAddress: '0xce3332C5E4B32d02E382F6d76FeCa5D9AB87b6F0', // user's wallet
      redirectURL: `${window.location.origin}/payment-complete`,
    });

    window.location.href = `https://buy.moonpay.com/?${params.toString()}`;
  };

  return (
    <div style={{
  padding: "1.75rem 1rem", // py-7 (1.75rem) px-4 (1rem)
  "@media (min-width: 768px)": {
    paddingLeft: "2.5rem", // md:px-10 (2.5rem)
    paddingRight: "2.5rem"
  },
  "@media (min-width: 1024px)": {
    paddingLeft: "5rem", // lg:px-20 (5rem)
    paddingRight: "5rem"
  },
  color: "#000", // text-[#000]
  minHeight: "100vh", // min-h-screen
  width: "100%", // w-full
  backgroundColor: "#f3f4f6", // bg-gray-100
  display: "flex", // flex
  alignItems: "center", // items-center
  justifyContent: "center", // justify-center
  flexDirection: "column" // flex-col
}}>

    <button onClick={redirectToMoonPay} >
      Buy with MoonPay (Redirect)
    </button>
    </div>
  );
}