// components/ThirdwebWalletModal.js
import { ConnectWallet } from "@thirdweb-dev/react";

const ThirdwebWalletModal = () => {
  return (
    <ConnectWallet
      theme="dark"
      modalTitle="Connect Wallet"
      modalTitleIconUrl=""
      welcomeScreen={{
        title: "Infinite firms coinbase deposit",
        subtitle: "Connect your wallet and select coinbase",
        cta: "Connect Wallet",
        imageUrl: "https://www.infinitefirms.pro/_next/image?url=%2Fassets%2Flogo%2Flogo.png&w=64&q=75", // Replace with your image URL
      }}
      modalSize="wide"
      termsOfServiceUrl=""
      privacyPolicyUrl=""
    />
  );
};

export default ThirdwebWalletModal;