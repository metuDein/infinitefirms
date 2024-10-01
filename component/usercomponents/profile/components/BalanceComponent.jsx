import { HoverEffect } from "@components/ui/card-hover-effect";
import Balance from "./Balance";
import Details from "./Details";
import { useDataContext } from "@component/context/DataProvider";
import ProfitBalance from "./ProfitBalance";
import { useState, useEffect } from "react";
import AcctType from "./AccountType";

const BalanceComponent = () => {
  const { currentUser } = useDataContext();
  const { balances, accountType } = currentUser;
  console.log(balances);
  const [actType, setActType] = useState("");
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/getcryptoprices", {
          method: "POST",
          body: {
            btc: balances?.bitcoin,
            eth: balances?.ethereum,
            ltc: balances?.litecoin,
            xmr: balances?.monero,
            xrp: balances?.ripple,
            zec: balances?.zcash,
          },
        });

        const data = await response.json();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    acType();
    fetchPrices();
  }, [balances]);

  const acType = () => {
    switch (accountType) {
      case accountType?.gold:
        return setActType("Gold");
      case accountType?.silver:
        return setActType("Silver");
      case accountType?.bronze:
        return setActType("Bronze");
      case accountType?.starter:
        return setActType("Starter");

      default:
        break;
    }
  };

  const projects = [
    {
      title: ``,
      description: (
        <Details email={currentUser?.email} username={currentUser?.username} />
      ),
      link: "/user/profile/settings",
    },
    {
      title: "",
      description: (
        <ProfitBalance
          balance={currentUser?.balances?.profit}
          expectedProfit={
            currentUser?.balances?.expectedMining &&
            currentUser?.balances?.expectedTrading
              ? currentUser?.balances?.expectedTrading +
                currentUser?.balances.expectedMining
              : 0
          }
          title={"Profit:"}
        />
      ),
      link: "/user/profile/withdrawal",
    },
    {
      title: "",
      description: (
        <Balance
          title={"BTC Equivalent:"}
          balance={Number(currentUser?.balances?.bitcoin).toFixed(6)}
        />
      ),
      link: "/user/profile/history",
    },

    {
      title: "",
      description: (
        <AcctType title={"Account status:"} accountStatus={actType} />
      ),
      link: "/user/profile/upgrade",
    },
  ];

  return (
    <div className="w-full mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
};

export default BalanceComponent;
