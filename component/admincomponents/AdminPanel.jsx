"use client";
import Image from "next/image";
import { Tabs } from "@components/ui/tabs";
import {
  IconManualGearbox,
  IconUsersPlus,
  IconUsersGroup,
  IconUserHexagon,
  IconFileTime,
  IconPackages,
} from "@tabler/icons-react";
import { useDataContext } from "@component/context/DataProvider";
import { ExpandableCardDemo } from "./components/TransactionsTab";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentMedical,
  faEnvelopeOpenText,
  faMoneyCheckDollar,
  faClockRotateLeft,
  faUserPlus,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const AdminPanel = () => {
  const router = useRouter();
  const { allTransactions, allUsers, allTraders, allSubscription, kycs } =
    useDataContext();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const TabsDemo = () => {
    const tabs = [
      {
        title: (
          <p className="flex bg-black p-1 rounded">
            Tools <IconManualGearbox className="ml-1" />{" "}
          </p>
        ),
        value: "tools",
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
            <p>Tools</p>
            <DummyContent />
          </div>
        ),
      },
      {
        title: (
          <p className="flex bg-black p-1 rounded">
            Users <IconUsersGroup className="ml-1" />{" "}
          </p>
        ),
        value: "users",
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
            <p>Users </p>
            <DummyContentUsers />
          </div>
        ),
      },
      {
        title: (
          <p className="flex bg-black p-1 rounded">
            Traders <IconUserHexagon className="ml-1" />{" "}
          </p>
        ),
        value: "Traders",
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
            <p>Traders</p>
            <DummyContent />
          </div>
        ),
      },
      {
        title: (
          <p className="flex bg-black p-1 rounded">
            Requests <IconPackages className="ml-1" />{" "}
          </p>
        ),
        value: "Requests",
        content: (
          <div className="w-full overflow-hidden relative max-h-screen overflow-y-auto rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
            <p>Requests</p>
          </div>
        ),
      },
    ];

    return (
      <div className="min-h-sreen md:h-[40rem]  relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
        <Tabs tabs={tabs} />
      </div>
    );
  };

  const ToolsCard = ({ href, icon, text }) => {
    return (
      <div
        className="flex flex-col justify-center ml-1 mx-auto text-white"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "15px",
          overflow: "hidden",
          background: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
        }}
        onClick={() => router.push(href)}
      >
        {icon}
        <p className="text-xl font-normal">{text}</p>
      </div>
    );
  };

  const UsersCards = ({ email, firstname, deposit, id }) => {
    return (
      <div
        onClick={() => router.push(`/admin/panel/user/${id}`)}
        className="flex flex-col justify-center ml-1 mx-auto text-white"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "15px",
          overflow: "hidden",
          background: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <IconUserHexagon />
        <div className="w-full">
          {/* <p className="text-sm font-normal text-left">{email}</p> */}
          <p className="text-sm font-normal text-center">{firstname}</p>
          {/* <p className="text-sm font-normal">${deposit}</p> */}
        </div>
      </div>
    );
  };
  const TradersCards = ({ email, firstname, deposit, id }) => {
    return (
      <div
        onClick={() => router.push(`/admin/panel/traders/${id}`)}
        className="flex flex-col justify-center ml-1 mx-auto text-white"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "15px",
          overflow: "hidden",
          background: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <IconUserHexagon />
        <div className="w-full">
          {/* <p className="text-sm font-normal text-left">{email}</p> */}
          <p className="text-sm font-normal text-center">{firstname}</p>
          {/* <p className="text-sm font-normal">${deposit}</p> */}
        </div>
      </div>
    );
  };
  return (
    <section
      className="mx-auto max-w-[290px] md:max-w-5xl min-h-screen"
      style={{
        paddingBottom: "160px",
      }}
    >
      <h2 className="text-2xl font-bold text-black text-center">
        {" "}
        Admin Panel{" "}
      </h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-2">
        <div
          className=""
          style={{
            width: "200px",
            height: "200px",
            background: "#000",
          }}
        ></div>
        <div
          className=""
          style={{
            width: "200px",
            height: "200px",
            background: "#000",
          }}
        ></div>
        <div
          className=""
          style={{
            width: "200px",
            height: "200px",
            background: "#000",
          }}
        ></div>
        <div
          className=""
          style={{
            width: "200px",
            height: "200px",
            background: "#000",
          }}
        ></div>
        <div
          className=""
          style={{
            width: "200px",
            height: "200px",
            background: "#000",
          }}
        ></div>
        <div
          className=""
          style={{
            width: "200px",
            height: "200px",
            background: "#000",
          }}
        ></div>
      </div> */}
      <div
        className="flex justify-center mb-6 bg-gray-800 rounded-lg "
        style={{
          overflow: "scroll",
        }}
      >
        <button
          className={`px-4 py-2 text-white ${
            activeTab === 0 ? "bg-blue-600" : "bg-gray-700"
          } rounded-l-lg focus:outline-none hover:bg-blue-500`}
          onClick={() => handleTabClick(0)}
        >
          Tools
        </button>
        <button
          className={`px-4 py-2 text-white ${
            activeTab === 1 ? "bg-blue-600" : "bg-gray-700"
          } focus:outline-none hover:bg-blue-500`}
          onClick={() => handleTabClick(1)}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 text-white ${
            activeTab === 2 ? "bg-blue-600" : "bg-gray-700"
          } rounded-r-lg focus:outline-none hover:bg-blue-500`}
          onClick={() => handleTabClick(2)}
        >
          Traders
        </button>
        {/* <button
          className={`px-4 py-2 text-white ${
            activeTab === 3 ? "bg-blue-600" : "bg-gray-700"
          } rounded-r-lg focus:outline-none hover:bg-blue-500`}
          onClick={() => handleTabClick(3)}
        >
          Requests{" "}
        </button> */}
        <button
          className={`px-4 py-2 text-white ${
            activeTab === 4 ? "bg-blue-600" : "bg-gray-700"
          } rounded-r-lg focus:outline-none hover:bg-blue-500`}
          onClick={() => handleTabClick(4)}
        >
          Kyc{" "}
        </button>
        <button
          className={`px-4 py-2 text-white ${
            activeTab === 5 ? "bg-blue-600" : "bg-gray-700"
          } rounded-r-lg focus:outline-none hover:bg-blue-500`}
          onClick={() => handleTabClick(5)}
        >
          Subscriptions{" "}
        </button>
      </div>
      <div className="p-2 md:p-6 bg-gray-900 text-white rounded-lg shadow-md mt-2">
        {activeTab === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <ToolsCard
              text={"New user"}
              href={"/admin/panel/newuser"}
              icon={
                <FontAwesomeIcon
                  icon={faUserPlus}
                  style={{
                    fontSize: "80px",
                  }}
                />
              }
            />
            <ToolsCard
              text={"Transaction"}
              href={"/admin/panel/newtransaction"}
              icon={
                <FontAwesomeIcon
                  icon={faClockRotateLeft}
                  style={{
                    fontSize: "80px",
                  }}
                />
              }
            />
            <ToolsCard
              text={"Add new Trader"}
              href={"/admin/panel/newtrader"}
              icon={
                <FontAwesomeIcon
                  icon={faUserTie}
                  style={{
                    fontSize: "80px",
                  }}
                />
              }
            />
            <ToolsCard
              text={"Send an email"}
              href={"/admin/panel/newemail"}
              icon={
                <FontAwesomeIcon
                  icon={faEnvelopeOpenText}
                  style={{
                    fontSize: "80px",
                  }}
                />
              }
            />
            <ToolsCard
              text={"Add Testimonial"}
              href={"/admin/panel/newtestimonial"}
              icon={
                <FontAwesomeIcon
                  icon={faCommentMedical}
                  style={{
                    fontSize: "80px",
                  }}
                />
              }
            />
            <ToolsCard
              text={"Subscriptions"}
              href={"/admin/panel/newtrader"}
              icon={
                <FontAwesomeIcon
                  icon={faMoneyCheckDollar}
                  style={{
                    fontSize: "80px",
                  }}
                />
              }
            />
            {/* <ToolsCard text={"Requests"} href={""} icon={<IconPackageImport />} /> */}
          </div>
        )}
        {activeTab === 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {allUsers.map((user) => (
              <UsersCards
                key={user._id}
                email={user.email}
                firstname={user.firstname}
                deposit={user.balances.deposit}
                id={user._id}
              />
            ))}
          </div>
        )}

        {activeTab === 2 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {allTraders.map((user) => (
              <TradersCards
                key={user._id}
                firstname={user.traderName}
                id={user._id}
              />
            ))}
          </div>
        )}
        {/* {activeTab === 3 && (
          <div>
            <ExpandableCardDemo tx={allTransactions} />
          </div>
        )} */}

        {activeTab === 4 &&
          kycs.map((item, id) => (
            <>
              <div
                className="flex items-center  p-2 rounded justify-between text-white max-w-4xl mx-auto"
                key={id}
              >
                <div className="flex items-center ">
                  <Image
                    width={100}
                    height={100}
                    src={`/assets/images/id-card.png`}
                    alt={"test div"}
                    className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                  />
                  <div className="flex flex-col p-2">
                    <p> {item?.userId?.firstname}</p>
                    <span>{item?.userId?.email}</span>
                  </div>
                </div>
                <Link
                  href={`/admin/panel/kyc/${item?._id}`}
                  className="p-2 bg-black text-white rounded hidden md:block text-center"
                  style={{ padding: "5px 20px" }}
                >
                  {" "}
                  view{" "}
                </Link>
              </div>
            </>
          ))}
        {activeTab === 5 &&
          allSubscription.map((item, id) => (
            <>
              <div
                className="flex items-center  p-2 rounded justify-between text-white max-w-4xl mx-auto"
                key={id}
              >
                <div className="flex items-center ">
                  <Image
                    width={100}
                    height={100}
                    src={`/assets/images/id-card.png`}
                    alt={"test div"}
                    className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                  />
                  <div className="flex flex-col p-2">
                    <p> {item?.userId?.firstname}</p>
                    <span>{item?.instruments}</span>
                  </div>
                </div>
                <Link
                  href={`/admin/panel/subs/${item?._id}`}
                  className="p-2 bg-black text-white rounded hidden md:block text-center"
                  style={{ padding: "5px 20px" }}
                >
                  {" "}
                  view{" "}
                </Link>
              </div>
            </>
          ))}
      </div>
    </section>
  );
};
export default AdminPanel;
