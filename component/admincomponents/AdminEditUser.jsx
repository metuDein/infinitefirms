"use client";
import { useDataContext } from "@component/context/DataProvider";
import { useState } from "react";
import { toast } from "react-toastify";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faTrashCan,
  faCheck,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

const AdminEditUser = ({ params }) => {
  const { allUsers, allTransactions } = useDataContext();
  const user = allUsers.find((user) => user._id === params.id);
  const txs = allTransactions.filter((tx) => tx?.userId?._id === params.id);

  //states
  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUserName] = useState(user?.username);
  const [password, setPassword] = useState(user?.password || "");
  const [accountTypeValues, setAccountTypeValues] = useState(user?.accountType);
  const [btcBalance, setBtcbalance] = useState(user?.balances?.bitcoin);
  const [ethBalance, setEthbalance] = useState(user?.balances?.ethereum);
  const [ltcBalance, setLtcbalance] = useState(user?.balances?.litecoin);
  const [xmrBalance, setXmrbalance] = useState(user?.balances?.monero);
  const [xrpBalance, setXrpbalance] = useState(user?.balances?.ripple);
  const [zecBalance, setZecbalance] = useState(user?.balances?.zcash);

  const [depositBalance, setdepositbalance] = useState(user?.balances?.deposit);
  const [ProfitBalance, setProfitbalance] = useState(user?.balances?.profit);
  const [miningBalance, setMiningbalance] = useState(user?.balances?.mining);
  const [tradingBalance, setTradingbalance] = useState(user?.balances?.trading);

  const [cardInfo, setCardInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const RequestCard = () => {
    return (
      <div className="flex items-center  p-2 rounded justify-between">
        <div className="flex items-center ">
          <Image
            width={100}
            height={100}
            src={"/assets/images/cashoutbtc.jpg"}
            alt={"test div"}
            className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
          />
          <div className="flex flex-col p-2">
            <p> this is the headin </p>
            <span>this is th desc</span>
          </div>
        </div>
        <div
          className="p-2 bg-black text-white rounded"
          style={{ padding: "5px 20px" }}
        >
          {" "}
          view{" "}
        </div>
      </div>
    );
  };

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        body: JSON.stringify({
          userId: user._id,
          firstname: firstname,
          lastname: lastname,
          email: email,
          username: username,
          password: password, // password is not being updated for security reasons
          accountType: accountTypeValues,
          balances: {
            bitcoin: btcBalance,
            ethereum: ethBalance,
            litecoin: ltcBalance,
            monero: xmrBalance,
            ripple: xrpBalance,
            zcash: zecBalance,
            deposit: depositBalance,
            profit: ProfitBalance,
            mining: miningBalance,
            trading: tradingBalance,
          },
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      toast.success("User updated successfully!");
      // router.push("/admin/users");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleChange = (e, selectedOption) => {
    const isTrue = e.target.value === "true";

    if (isTrue) {
      // When one option is set to true, all others should be set to false
      const updatedValues = Object.keys(accountTypeValues).reduce(
        (acc, option) => {
          acc[option] = option === selectedOption; // Only the selected option will be true
          return acc;
        },
        {}
      );
      setAccountTypeValues(updatedValues);
    }
  };

  const handleApproveWithdrawal = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/requests/withdraw/approve", {
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          userId: cardInfo.userId._id,
          status: "approved",
          amount: cardInfo?.amount,
        }),
      });
      if (response.ok) {
        await fetch("/api/mails/withdraw", {
          method: "POST",
          body: JSON.stringify({
            email,
            amount: cardInfo?.amount,
            date: `${cardInfo?.createdAt.replace("T", " ").split(".")[0]}`,
            txId: cardInfo?._id,
          }),
        });

        toast.success("Withdrawal approved", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Failed to approve withdrawal", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleRejectWithdrawal = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/requests/withdraw/reject", {
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          status: "rejected",
        }),
      });
      if (response.ok) {
        toast.success("withdrawal request rejected", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Failed to reject withdrawal", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveDeposit = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/requests/deposit/approve", {
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          userId: cardInfo.userId._id,
          status: "approved",
          amount: cardInfo?.amount,
          transtype: cardInfo.transtype,
        }),
      });
      if (response.ok) {
        await fetch("/api/mails/deposit", {
          method: "POST",
          body: JSON.stringify({
            email,
            amount: cardInfo?.amount,
            date: `${cardInfo?.createdAt.replace("T", " ").split(".")[0]}`,
            txId: cardInfo?._id,
          }),
        });

        if (cardInfo.transtype.includes("mining")) {
          toast("activating mining");
          const res = await fetch("/api/subscribe", {
            method: "PATCH",
            body: JSON.stringify({
              transId: cardInfo._id,
              status: "active",
            }),
          });

          if (res.ok) {
            await fetch("/api/mails/deposit", {
              method: "POST",
              body: JSON.stringify({
                email,
                amount: cardInfo?.amount,
                date: `${cardInfo?.createdAt.replace("T", " ").split(".")[0]}`,
                txId: cardInfo?._id,
              }),
            });

            toast.success("mining activated");
          }
        }
        toast.success("Deposit approved", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Failed to approve withdrawal", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleRejectDeposit = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/requests/deposit/reject", {
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          status: "rejected",
        }),
      });
      if (response.ok) {
        toast.success("deposit request rejected", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Failed to reject withdrawal", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/requests/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
      });
      toast.success("transaction deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete transaction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-10 mx-auto max-w-xl md:max-w-4xl min-h-screen pb-10">
      <h2 className="text-3xl font-bold text-center text-black">
        Edit user accounts
      </h2>
      <div className="mt-10 w-full">
        <div className="flex justify-center mb-6 bg-gray-800 rounded-lg">
          <button
            className={`px-4 py-2 text-white ${
              activeTab === 0 ? "bg-blue-600" : "bg-gray-700"
            } rounded-l-lg focus:outline-none hover:bg-blue-500`}
            onClick={() => handleTabClick(0)}
          >
            INFO
          </button>
          <button
            className={`px-4 py-2 text-white ${
              activeTab === 1 ? "bg-blue-600" : "bg-gray-700"
            } focus:outline-none hover:bg-blue-500`}
            onClick={() => handleTabClick(1)}
          >
            Edit
          </button>
          <button
            className={`px-4 py-2 text-white ${
              activeTab === 2 ? "bg-blue-600" : "bg-gray-700"
            } focus:outline-none hover:bg-blue-500`}
            onClick={() => handleTabClick(2)}
          >
            Requests
          </button>
          <button
            className={`px-4 py-2 text-white ${
              activeTab === 3 ? "bg-blue-600" : "bg-gray-700"
            } focus:outline-none hover:bg-blue-500`}
            onClick={() => handleTabClick(3)}
          >
            Subscriptions
          </button>
        </div>
        {activeTab === 0 && (
          <form onSubmit={handleEdit}>
            <div
              className="p-2 rounded bg-neutral-900 "
              style={{
                minHeight: "300px",
                padding: "20px",
              }}
            >
              <label htmlFor="userImage">
                <span
                  className=" rounded-full block mx-auto"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    backgroundImage: `url(https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg)`,
                    backgroundSize: "contain",
                    backgroundPosition: "",
                    borderRadius: "50%",
                    position: "relative",
                    // background: "rgba(0, 0, 0, 0.6)",
                    cursor: "pointer",

                    breakAfter: {
                      content: "",
                      width: "200px",
                      height: "200px",
                      background: "rgba(0,0,0,0.6)",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      zIndex: "100",
                    },
                  }}
                ></span>
              </label>

              <div className="flex flex-col">
                <p className="font-semibold text-white"> Full name: </p>
                <p
                  className="bg-gray-200 flex justify-between items-center"
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                >
                  <span>{`${firstname} ${lastname}`}</span>
                </p>
              </div>
              <div className="flex flex-col">
                <>
                  <p className="font-semibold text-white">Email Address: </p>
                  <p
                    className="bg-gray-200 flex justify-between items-center"
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      marginTop: "10px",
                    }}
                  >
                    <span>{email}</span>
                  </p>
                </>
              </div>

              <div className="flex flex-col pt-4">
                <>
                  <p className="font-semibold text-white">Username: </p>
                  <p
                    className="bg-gray-200 flex justify-between items-center"
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      marginTop: "10px",
                    }}
                  >
                    <span>{username}</span>
                  </p>
                </>
              </div>

              <div className="flex flex-col">
                <>
                  <p className="font-semibold text-white">Password: </p>
                  <p
                    className="bg-gray-200 flex justify-between items-center"
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      marginTop: "10px",
                    }}
                  >
                    <span>{password}</span>
                  </p>
                </>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-white">
                  Account Type (Deafault: Starter plan)
                </p>
                {accountTypeValues &&
                  Object.keys(accountTypeValues).map((option, index) => (
                    <div className="bg-gray-200 mt-2 p-2 rounded" key={index}>
                      <label>{option}</label>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name={option}
                            value="true"
                            checked={accountTypeValues[option] === true}
                            // onChange={(e) => handleChange(e, option)}
                          />
                          enable
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={option}
                            value="false"
                            checked={accountTypeValues[option] === false}
                            // onChange={(e) => handleChange(e, option)}
                          />
                          disable
                        </label>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {/* <div className="flex flex-wrap items-center justify-center gap-2"> */}
                <div className="flex flex-col flex-1">
                  {/* // <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <p className="font-semibold text-white">Bitcoin: </p>
                    <p
                      className="bg-gray-200 flex justify-between items-center"
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <span>{btcBalance}</span>
                    </p>
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <p className="font-semibold text-white">Ethereum : </p>
                    <p
                      className="bg-gray-200 flex justify-between items-center"
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <span>{ethBalance}</span>
                    </p>
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* // <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <p className="font-semibold text-white">Litecoin: </p>
                    <p
                      className="bg-gray-200 flex justify-between items-center"
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <span>{ltcBalance}</span>
                    </p>
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <p className="font-semibold text-white">Monero: </p>
                    <p
                      className="bg-gray-200 flex justify-between items-center"
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <span>{xmrBalance}</span>
                    </p>
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* // <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <p className="font-semibold text-white">Ripple: </p>
                    <p
                      className="bg-gray-200 flex justify-between items-center"
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <span>{xrpBalance}</span>
                    </p>
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <p className="font-semibold text-white">Zecash: </p>
                    <p
                      className="bg-gray-200 flex justify-between items-center"
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <span>{zecBalance}</span>
                    </p>
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <p className="font-semibold text-white">Profit: </p>
                    <p
                      className="bg-gray-200 flex justify-between items-center"
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <span>{ProfitBalance}</span>
                    </p>
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <p className="font-semibold text-white">Deposit: </p>
                    <p
                      className="bg-gray-200 flex justify-between items-center"
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <span>{depositBalance}</span>
                    </p>
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <p className="font-semibold text-white">Trading: </p>
                    <p
                      className="bg-gray-200 flex justify-between items-center"
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <span>{tradingBalance}</span>
                    </p>
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <p className="font-semibold text-white">Mining: </p>
                    <p
                      className="bg-gray-200 flex justify-between items-center"
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <span>{miningBalance}</span>
                    </p>
                  </>
                </div>
              </div>
            </div>
          </form>
        )}
        {activeTab === 1 && (
          <form onSubmit={handleEdit}>
            <div
              className="p-2 rounded bg-neutral-900 "
              style={{
                minHeight: "300px",
                padding: "20px",
              }}
            >
              <label htmlFor="userImage">
                <span
                  className=" rounded-full block mx-auto"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    backgroundImage: `url(https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg)`,
                    backgroundSize: "contain",
                    backgroundPosition: "",
                    borderRadius: "50%",
                    position: "relative",
                    // background: "rgba(0, 0, 0, 0.6)",
                    cursor: "pointer",

                    breakAfter: {
                      content: "",
                      width: "200px",
                      height: "200px",
                      background: "rgba(0,0,0,0.6)",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      zIndex: "100",
                    },
                  }}
                ></span>
              </label>

              <div className="flex flex-col">
                <p className="font-semibold text-white"> Full name: </p>
                <p
                  className="bg-gray-200 flex justify-between items-center"
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                >
                  <span>{`${firstname} ${lastname}`}</span>
                </p>
              </div>
              <div className="flex flex-col">
                <>
                  <label
                    htmlFor="email"
                    className="font-semibold text-white"
                    style={{
                      marginBottom: "5px",
                    }}
                  >
                    Change email address:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </>
              </div>

              <div className="flex flex-col pt-4">
                <>
                  <label
                    htmlFor="username"
                    className="font-semibold text-white"
                    style={{
                      marginBottom: "5px",
                    }}
                  >
                    Change username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </>
              </div>

              <div className="flex flex-col">
                <>
                  <label
                    htmlFor="newpassword"
                    className="font-semibold text-white"
                    style={{
                      marginBottom: "5px",
                    }}
                  >
                    password:
                  </label>
                  <input
                    type="text"
                    id="newpassword"
                    name="password"
                    placeholder="new password"
                    className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-white">
                  Account Type (Deafault: Starter plan)
                </p>
                {accountTypeValues &&
                  Object.keys(accountTypeValues).map((option, index) => (
                    <div className="bg-gray-200 mt-2 p-2 rounded" key={index}>
                      <label>{option}</label>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name={option}
                            value="true"
                            checked={accountTypeValues[option] === true}
                            onChange={(e) => handleChange(e, option)}
                          />
                          enable
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={option}
                            value="false"
                            checked={accountTypeValues[option] === false}
                            onChange={(e) => handleChange(e, option)}
                          />
                          disable
                        </label>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {/* <div className="flex flex-wrap items-center justify-center gap-2"> */}
                <div className="flex flex-col flex-1">
                  {/* // <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <label
                      htmlFor="btc"
                      className="font-semibold text-white"
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      Bitcoin:
                    </label>
                    <input
                      type="text"
                      id="btc"
                      name="btc"
                      placeholder="new password"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={btcBalance}
                      onChange={(e) => setBtcbalance(e.target.value)}
                    />
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <label
                      htmlFor="eth"
                      className="font-semibold text-white"
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      Ethereum :
                    </label>
                    <input
                      type="text"
                      id="eth"
                      name="eth"
                      placeholder="Eth balance"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={ethBalance}
                      onChange={(e) => setEthbalance(e.target.value)}
                    />
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* // <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <label
                      htmlFor="ltc"
                      className="font-semibold text-white"
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      Litecoin balance:
                    </label>
                    <input
                      type="text"
                      id="ltc"
                      name="ltc"
                      placeholder="litecoin balance"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={ltcBalance}
                      onChange={(e) => setLtcbalance(e.target.value)}
                    />
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <label
                      htmlFor="xmr"
                      className="font-semibold text-white"
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      Monero:
                    </label>
                    <input
                      type="text"
                      id="xmr"
                      name="xmr"
                      placeholder="new password"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={xmrBalance}
                      onChange={(e) => setXmrbalance(e.target.value)}
                    />
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* // <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <label
                      htmlFor="xrp"
                      className="font-semibold text-white"
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      Ripple:
                    </label>
                    <input
                      type="text"
                      id="xrp"
                      name="xrp"
                      placeholder="ripple"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={xrpBalance}
                      onChange={(e) => setXrpbalance(e.target.value)}
                    />
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <label
                      htmlFor="zec"
                      className="font-semibold text-white"
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      Zecash:
                    </label>
                    <input
                      type="text"
                      id="zec"
                      name="zec"
                      placeholder="Zecash"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={zecBalance}
                      onChange={(e) => setZecbalance(e.target.value)}
                    />
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <label
                      htmlFor="profit"
                      className="font-semibold text-white"
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      Profit:
                    </label>
                    <input
                      type="text"
                      id="profit"
                      name="profit"
                      placeholder="Profit"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={ProfitBalance}
                      onChange={(e) => setProfitbalance(e.target.value)}
                    />
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <label
                      htmlFor="deposit"
                      className="font-semibold text-white"
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      Deposit:
                    </label>
                    <input
                      type="text"
                      id="deposit"
                      name="deposit"
                      placeholder="deposit"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={depositBalance}
                      onChange={(e) => setdepositbalance(e.target.value)}
                    />
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <label
                      htmlFor="trading"
                      className="font-semibold text-white"
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      Trading:
                    </label>
                    <input
                      type="text"
                      id="trading"
                      name="trading"
                      placeholder="trading"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={tradingBalance}
                      onChange={(e) => setTradingbalance(e.target.value)}
                    />
                  </>
                </div>
                <div className="flex flex-col flex-1">
                  {/* <p className="font-semibold text-white">User Balances</p> */}

                  <>
                    <label
                      htmlFor="mining"
                      className="font-semibold text-white"
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      Mining:
                    </label>
                    <input
                      type="text"
                      id="mining"
                      name="mining"
                      placeholder="mining"
                      className="block w-full px-3 py-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={miningBalance}
                      onChange={(e) => setMiningbalance(e.target.value)}
                    />
                  </>
                </div>
              </div>
              <button
                className="bg-gray-100 text-black w-1/2 mx-auto mt-4 active:bg-white"
                style={{
                  padding: "10px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: "10px",
                }}
              >
                Save
              </button>
            </div>
          </form>
        )}
        {activeTab === 2 && !cardInfo && (
          <div className="">
            {txs.map((item, i) => (
              <>
                <div
                  className="flex items-center  p-2 rounded justify-between"
                  onClick={() => setCardInfo(item)}
                >
                  <div className="flex items-center ">
                    <Image
                      width={100}
                      height={100}
                      src={
                        item?.image?.secure_url ||
                        `/assets/images/deposit.jpg
                        `
                      }
                      alt={"test div"}
                      className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                    />
                    <div className="flex flex-col p-2">
                      <p> {item.transtype}</p>
                      <span>{item.status}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setCardInfo(item)}
                    className="p-2 bg-black text-white rounded hidden md:block"
                    style={{ padding: "5px 20px" }}
                  >
                    {" "}
                    view{" "}
                  </button>
                </div>
              </>
            ))}
          </div>
        )}
        {activeTab === 2 && cardInfo && (
          <div
            className="w-full rounded"
            style={{ minHeight: "200px", padding: "12px 10px" }}
          >
            <div>
              <Image
                priority
                width={1000}
                height={1000}
                src={`${
                  cardInfo?.image?.secure_url || "/assets/images/deposit.jpg"
                }`}
                alt={cardInfo._id}
                className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
              />
            </div>

            <div>
              <div className="flex flex-col md:flex-row justify-between items-start p-4">
                <div className="">
                  <h3 className="font-bold text-neutral-700">
                    {cardInfo.transtype}
                  </h3>
                  <p
                    className="text-neutral-600 dark:text-neutral-400 text-sm "
                    style={{
                      maxWidth: "300px",
                    }}
                  >
                    {`${cardInfo.transtype} `}for {`${cardInfo.amount} `} to{" "}
                    <span
                      style={{
                        maxWidth: "290px",
                        overflow: "scroll",
                        display: "inline-block",
                      }}
                    >
                      {`${cardInfo.addressUsed} `}
                    </span>
                    <br />
                    Transaction date :{" "}
                    {`${cardInfo.createdAt.replace("T", "--").split(".")[0]} `}
                    <br />
                    Status: {`this transaction is ${cardInfo.status} `}
                    <br />
                    <span
                      onClick={() => {
                        window.navigator.clipboard.write(cardInfo.txhash);
                        toast("transaction hash copied");
                      }}
                      className="inline-flex mt-1 bg-black p-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      transaction hash: {cardInfo.txhash}
                      <br />
                      click to copy
                    </span>
                  </p>
                </div>
                {cardInfo.transtype.includes("withdraw") && (
                  <div className="flex flex-row md:flex-col">
                    {cardInfo?.status === "pending" && (
                      <button
                        className="p-2 text-sm rounded-full font-bold bg-green-500 text-white cursor-pointer flex items-center gap-1"
                        onClick={() => handleApproveWithdrawal(cardInfo._id)}
                      >
                        <span> Approve </span>
                        <FontAwesomeIcon icon={faCheck} />
                        {/* {active.ctaText} */}
                      </button>
                    )}
                    {cardInfo?.status === "pending" && (
                      <span
                        className="p-1 text-sm rounded-full font-bold justify-center mt-1  text-white cursor-pointer flex items-center gap-1"
                        onClick={() => handleRejectWithdrawal(cardInfo._id)}
                        style={{
                          background: "#dc2626",
                        }}
                      >
                        <span>Reject </span>
                        <FontAwesomeIcon icon={faBan} />
                        {/* {active.ctaText} */}
                      </span>
                    )}
                    <span
                      className="p-1 text-sm rounded-full font-bold justify-center mt-1 bg-black  text-white cursor-pointer flex items-center gap-1"
                      onClick={() => setCardInfo(null)}
                    >
                      <span className="p-2">Close </span>

                      {/* {active.ctaText} */}
                    </span>
                    <span
                      className="justify-center text-sm rounded-full font-bold mt-1 text-white cursor-pointer flex items-center gap-1"
                      onClick={() => handleDelete(cardInfo._id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ color: "#dc2626", fontSize: "30px" }}
                      />
                      {/* {active.ctaText} */}
                    </span>
                  </div>
                )}
                {cardInfo.transtype.includes("deposit") && (
                  <div>
                    {cardInfo?.status === "pending" && (
                      <button
                        className="p-2 text-sm rounded-full font-bold bg-green-500 text-white cursor-pointer flex items-center gap-1"
                        onClick={() => handleApproveDeposit(cardInfo._id)}
                      >
                        <span>Confirm </span>
                        <FontAwesomeIcon icon={faCheck} />
                        {/* {active.ctaText} */}
                      </button>
                    )}
                    {cardInfo?.status === "pending" && (
                      <span
                        className="p-1 text-sm rounded-full font-bold justify-center mt-1  text-white cursor-pointer flex items-center gap-1"
                        onClick={() => handleRejectDeposit(cardInfo?._id)}
                        style={{
                          background: "#dc2626",
                        }}
                      >
                        <span>Reject </span>
                        <FontAwesomeIcon icon={faBan} />
                        {/* {active.ctaText} */}
                      </span>
                    )}
                    <span
                      className="p-1 text-sm rounded-full font-bold justify-center mt-1 bg-black  text-white cursor-pointer flex items-center gap-1"
                      onClick={() => setCardInfo(null)}
                    >
                      <span className="p-2">Close </span>

                      {/* {active.ctaText} */}
                    </span>
                    <span
                      className="justify-center text-sm rounded-full font-bold mt-1 text-white cursor-pointer flex items-center gap-1"
                      onClick={() => handleDelete(cardInfo._id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ color: "#dc2626", fontSize: "30px" }}
                      />
                      {/* {active.ctaText} */}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === 3 && <div>Subscriptions</div>}
      </div>
    </section>
  );
};
export default AdminEditUser;
