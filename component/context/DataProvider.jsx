"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const { data: session } = useSession();

  const [keepAlert, setKeepAlert] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [appLoading, setAppLoading] = useState(true);
  const [allTransactions, setAllTransactions] = useState([]);
  const [allTraders, setAllTraders] = useState([]);
  const [allCopiers, setAllCopiers] = useState([]);
  const [allSubscription, setAllSubscription] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentUserTransactions, setCurrentUserTransactions] = useState([]);
  const [kycs, setKycs] = useState([]);
  const [btcRate, setBtcRate] = useState(null);
  const [ethRate, setEthRate] = useState(null);
  const [ltcRate, setLtcRate] = useState(null);
  const [xmrRate, setXmrRate] = useState(null);
  const [xrpRate, setXrpRate] = useState(null);
  const [zecRate, setZecRate] = useState(null);

  // const getAllUsers = async () => {
  //   try {
  //     const response = await fetch("/api/auth/getusers");
  //     const data = await response.json();

  //     if (response.ok) {
  //       setAllUsers(data.users || []);
  //     } else {
  //       setAllUsers([]);
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const getUser = async () => {
    try {
      const response = await fetch("/api/auth/getcurrentuser");
      const data = await response.json();
      if (response.ok) {
        setCurrentUser(data.user);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Data collection
  const appData = async () => {
    try {
      const response = await fetch("/api/datarefresh");
      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setAllUsers(data.users || []);
        setCurrentUser(data.user);
        setAllTransactions(data.tx || []);
        const userTx = allTransactions.filter(
          (item) => item.userId._id === currentUser._id
        );
        setCurrentUserTransactions(userTx);
        setAllTraders(data.traders || []);
        setAllSubscription(data.subscriptions || []);
        setTestimonials(data.testimonials || []);
        setAllCopiers(data.copyTradings || []);
        setKycs(data.kycs || []);
      }
    } catch (error) {
      console.log(`${error.name} : ${error.message}`);
    }
  };

  const getCopiers = async () => {
    try {
      const response = await fetch("/api/copytrader");
      const data = await response.json();
      if (response.ok) {
        setAllCopiers(data.copyTradings || []);
        // console.log(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCryptoRates = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,monero,ripple,zcash&vs_currencies=usd"
      );
      const data = await response.json();

      setBtcRate(data.bitcoin.usd);
      setEthRate(data.ethereum.usd);
      setLtcRate(data.litecoin.usd);
      setXmrRate(data.monero.usd);
      setXrpRate(data.ripple.usd);
      setZecRate(data.zcash.usd);
    } catch (error) {
      console.error("Error fetching crypto rates:", error);
    }
  };
  const getAppData = () => {
    // getUser();
    // getKycs();
    // getCopiers();
    // getTraders();
    // getAllUsers();
    // getTestimonials();
    // getTransactions();
    // getSubscriptions();
    appData();
    fetchCryptoRates();
    setTimeout(() => {
      setAppLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getAppData();
    // Update the app data every 3 minutes (180000 milliseconds) to avoid hitting the API rate limit
    setInterval(() => {
      getAppData();
    }, 180000);
  }, []);

  return (
    <DataContext.Provider
      value={{
        currentUser,
        allUsers,
        currentUserTransactions,
        appLoading,
        allTransactions,
        setAppLoading,
        allTraders,
        allCopiers,
        allSubscription,
        kycs,
        btcRate,
        ethRate,
        ltcRate,
        xmrRate,
        xrpRate,
        zecRate,
        getUser,
        getCopiers,
        testimonials,
        setKeepAlert,
        keepAlert,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

export const useDataContext = () => useContext(DataContext);
