"use client";
import DummyContent from "./components/DummyContent";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const services = [
  {
    name: "Trade like the pros.",
    description:
      "Copy trading allows you to replicate the trades of seasoned investors, automatically mirroring their buying and selling decisions in real-time. This strategy is ideal for those who are new to trading or prefer a more hands-off approach, as it leverages the expertise of professional traders. By copying their trades, you can potentially achieve similar returns without needing in-depth market knowledge or spending hours analyzing charts. It's a smart way to engage in the financial markets while learning from the best.",
    imageUrl: "/assets/logo/copytrading.jpg", // Update with the correct image path
  },
  {
    name: "Mine Bitcoin with us.",
    description:
      "Bitcoin mining is the process of validating and adding transactions to the Bitcoin blockchain. Miners use powerful computers to solve complex mathematical problems that secure the network and verify transactions. By joining our mining pool, you contribute your computational power to this decentralized process, earning Bitcoin as a reward. This method of earning Bitcoin is fundamental to the cryptocurrency’s security and offers miners the opportunity to be directly involved in supporting the Bitcoin network while earning rewards over time.",
    imageUrl: "/assets/logo/btc.jpg", // Update with the correct image path
  },
  {
    name: "Secure the Ethereum network.",
    description:
      "Ethereum mining involves validating transactions on the Ethereum blockchain and contributing to the creation of new blocks. Miners are rewarded with Ether (ETH) for their efforts, which is the cryptocurrency that powers the Ethereum network. As one of the most popular and versatile blockchains, Ethereum supports a wide range of decentralized applications and smart contracts. By participating in Ethereum mining, you play a crucial role in maintaining the integrity of the network, ensuring the smooth operation of thousands of decentralized apps (dApps) and services.",
    imageUrl: "/assets/logo/eth.jpg", // Update with the correct image path
  },
  {
    name: "Earn Litecoin effortlessly.",
    description:
      "Litecoin (LTC) mining involves processing transactions and securing the Litecoin blockchain, which is a peer-to-peer cryptocurrency that aims to provide fast and low-cost payments. Similar to Bitcoin, Litecoin uses a proof-of-work mechanism where miners solve complex cryptographic puzzles to add new blocks to the chain. By joining the Litecoin mining community, you help ensure the network remains secure and efficient, all while earning LTC rewards for your contributions. Litecoin's faster block generation time makes it an attractive option for those looking to earn cryptocurrency with reduced transaction times.",
    imageUrl: "/assets/logo/ltc.jpg", // Update with the correct image path
  },
  {
    name: "Mine Monero privately.",
    description:
      "Monero (XMR) is known for its strong emphasis on privacy and anonymity. Monero mining is the process by which transactions are verified and added to the blockchain, all while keeping sender, receiver, and transaction amounts completely private. Unlike other cryptocurrencies, Monero's blockchain is designed to be opaque, ensuring that your financial activities remain confidential. By mining Monero, you contribute to this privacy-focused network, earning XMR as a reward while helping to maintain a decentralized and secure environment that prioritizes anonymity and security.",
    imageUrl: "/assets/logo/xmr.jpeg", // Update with the correct image path
  },
  {
    name: "Validate XRP transactions.",
    description:
      "XRP operates differently from most other cryptocurrencies because it does not rely on mining. Instead, it uses a unique consensus algorithm to validate transactions, which makes it one of the fastest and most energy-efficient digital assets. Although XRP itself isn’t mined, validators play a crucial role in maintaining the network's integrity by confirming transactions quickly and accurately. By participating in the XRP consensus process, you contribute to a system that facilitates instant cross-border payments and settlements, making it an essential part of the global financial ecosystem.",
    imageUrl: "/assets/logo/xrp.jpg", // Update with the correct image path
  },
  {
    name: "Ensure Zcash privacy.",
    description:
      "Zcash (ZEC) is a cryptocurrency that focuses on privacy and security, offering shielded transactions that ensure both the sender's and receiver's information remains confidential. Zcash mining involves validating transactions using advanced cryptographic techniques called zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge), which allow for secure and private verification without revealing transaction details. As a Zcash miner, you play a critical role in maintaining this high level of privacy, earning ZEC as a reward while supporting a blockchain that prioritizes confidentiality and user protection.",
    imageUrl: "/assets/logo/zcaash.jpg", // Update with the correct image path
  },
];

export function Services() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full pt-5">
      <h2
        className="text-3xl font-semibold text-center"
        style={{
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      >
        {" "}
        Our Services
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    category: "Copy Trading",
    title: "Trade like the pros.",
    src: "/assets/logo/copytrading.jpg",
    content: (
      <DummyContent
        description={services[0].description}
        src={services[0].imageUrl}
        link={"trading"}
      />
    ),
  },
  {
    category: "Bitcoin Mining",
    title: "Mine Bitcoin with us.",
    src: "/assets/logo/btc.jpg",
    content: (
      <DummyContent
        description={services[1].description}
        src={services[1].imageUrl}
        link={"mining"}
      />
    ),
  },
  {
    category: "Ethereum Mining",
    title: "Secure the Ethereum network.",
    src: "/assets/logo/eth.jpg",
    content: (
      <DummyContent
        description={services[2].description}
        src={services[2].imageUrl}
        link={"mining"}
      />
    ),
  },
  {
    category: "LTC Mining",
    title: "Earn Litecoin effortlessly.",
    src: "/assets/logo/ltc.jpg",
    content: (
      <DummyContent
        description={services[3].description}
        src={services[3].imageUrl}
        link={"mining"}
      />
    ),
  },
  {
    category: "XMR Mining",
    title: "Mine Monero privately.",
    src: "/assets/logo/xmr.jpeg",
    content: (
      <DummyContent
        description={services[4].description}
        src={services[4].imageUrl}
        link={"mining"}
      />
    ),
  },
  {
    category: "XRP Mining",
    title: "Validate XRP transactions.",
    src: "/assets/logo/xrp.jpg",
    content: (
      <DummyContent
        description={services[5].description}
        src={services[5].imageUrl}
        link={"mining"}
      />
    ),
  },
  {
    category: "ZCASH Mining",
    title: "Ensure Zcash privacy.",
    src: "/assets/logo/zcaash.jpg",
    content: (
      <DummyContent
        description={services[6].description}
        src={services[6].imageUrl}
        link={"mining"}
      />
    ),
  },
];

export default Services;
