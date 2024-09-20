"use client";
import HomePage from "@component/HomePage";
import { useDataContext } from "@component/context/DataProvider";
import Loader from "@component/loader/Loader";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const page = () => {
  const popupdata = [
    {
      name: "Kota Nakamura",
      country: "Japan",
      amount: "2127",
      type: "invested",
    },
    {
      name: "Jack Walker",
      country: "United Kingdom",
      amount: "2292",
      type: "invested",
    },
    {
      name: "Haruto Tanaka",
      country: "Japan",
      amount: "8194",
      type: "withdrawn",
    },
    { name: "Ravi Gupta", country: "India", amount: "3115", type: "invested" },
    {
      name: "Paul Hoffmann",
      country: "Germany",
      amount: "5622",
      type: "withdrawn",
    },
    {
      name: "Samuel Stewart",
      country: "Canada",
      amount: "2779",
      type: "invested",
    },
    {
      name: "Jack Clark",
      country: "United Kingdom",
      amount: "9753",
      type: "withdrawn",
    },
    {
      name: "Jorge Lopez",
      country: "Mexico",
      amount: "8668",
      type: "withdrawn",
    },
    {
      name: "Vijay Verma",
      country: "India",
      amount: "4913",
      type: "withdrawn",
    },
    {
      name: "Jonas Fischer",
      country: "Germany",
      amount: "6087",
      type: "invested",
    },
    {
      name: "Harry Clark",
      country: "United Kingdom",
      amount: "1885",
      type: "withdrawn",
    },
    {
      name: "Théo Martin",
      country: "France",
      amount: "2773",
      type: "invested",
    },
    {
      name: "Lucas Laurent",
      country: "France",
      amount: "7811",
      type: "invested",
    },
    { name: "Ravi Sharma", country: "India", amount: "943", type: "invested" },
    {
      name: "Carlos Gonzalez",
      country: "Mexico",
      amount: "2395",
      type: "withdrawn",
    },
    {
      name: "Jorge Gonzalez",
      country: "Mexico",
      amount: "812",
      type: "withdrawn",
    },
    {
      name: "Ryan Scott",
      country: "Canada",
      amount: "2718",
      type: "withdrawn",
    },
    {
      name: "Arthur Thomas",
      country: "France",
      amount: "6487",
      type: "withdrawn",
    },
    {
      name: "Zhou Jie Zhang",
      country: "China",
      amount: "5962",
      type: "invested",
    },
    {
      name: "Vijay Sharma",
      country: "India",
      amount: "4462",
      type: "invested",
    },
    {
      name: "Harry Evans",
      country: "United Kingdom",
      amount: "8357",
      type: "withdrawn",
    },
    {
      name: "Jonas Schäfer",
      country: "Germany",
      amount: "2757",
      type: "invested",
    },
    {
      name: "Joshua Edwards",
      country: "United Kingdom",
      amount: "9256",
      type: "invested",
    },
    {
      name: "Max Weber",
      country: "Germany",
      amount: "1559",
      type: "withdrawn",
    },
    {
      name: "Zhang Wei Yang",
      country: "China",
      amount: "9448",
      type: "invested",
    },
    {
      name: "Miguel Martinez",
      country: "Mexico",
      amount: "3461",
      type: "invested",
    },
    {
      name: "Théo Laurent",
      country: "France",
      amount: "6204",
      type: "invested",
    },
    {
      name: "Sanjay Gupta",
      country: "India",
      amount: "4198",
      type: "withdrawn",
    },
    {
      name: "Ren Takahashi",
      country: "Japan",
      amount: "8353",
      type: "invested",
    },
    {
      name: "Joshua Walker",
      country: "United Kingdom",
      amount: "7831",
      type: "withdrawn",
    },
    {
      name: "Zhou Jie Zhou",
      country: "China",
      amount: "7937",
      type: "invested",
    },
    { name: "Tom Durand", country: "France", amount: "5513", type: "invested" },
    { name: "Sota Kato", country: "Japan", amount: "7464", type: "withdrawn" },
    {
      name: "Daniel Martin",
      country: "United States",
      amount: "9181",
      type: "withdrawn",
    },
    {
      name: "Charlie Evans",
      country: "United Kingdom",
      amount: "7877",
      type: "invested",
    },
    {
      name: "William Wood",
      country: "United Kingdom",
      amount: "5655",
      type: "invested",
    },
    {
      name: "Juan Ramirez",
      country: "Mexico",
      amount: "9824",
      type: "invested",
    },
    {
      name: "Jorge Hernandez",
      country: "Mexico",
      amount: "9288",
      type: "withdrawn",
    },
    {
      name: "Lucas Petit",
      country: "France",
      amount: "7643",
      type: "withdrawn",
    },
    {
      name: "Haruto Suzuki",
      country: "Japan",
      amount: "171",
      type: "invested",
    },
    {
      name: "Raphaël Laurent",
      country: "France",
      amount: "3217",
      type: "withdrawn",
    },
    { name: "Haruto Sato", country: "Japan", amount: "1416", type: "invested" },
    {
      name: "Max Fischer",
      country: "Germany",
      amount: "3812",
      type: "withdrawn",
    },
  ];

  const DataPopup = ({ dataArray }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isStopped, setIsStopped] = useState(false);

    useEffect(() => {
      if (isStopped) return;

      const interval = setInterval(() => {
        setIsVisible(true); // Show the data every 5 seconds
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dataArray.length); // Cycle through dataArray
        setTimeout(() => setIsVisible(false), 2000); // Hide after 2 seconds
      }, 5000); // Interval for every 5 seconds

      return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [dataArray.length, isStopped]);

    // Function to stop the alerts
    const handleStopAlerts = () => {
      setIsStopped(true);
      setIsVisible(false); // Hide the popup immediately when stopping alerts
    };
    return (
      <div>
        {isVisible && (
          <div
            className="popup bg-white text-gray-800 p-4 rounded shadow-lg mt-5 md:mt-0 w-1/2 absolute"
            style={{
              zIndex: "1000",
            }}
          >
            <p>{`${dataArray[currentIndex].name} has just ${dataArray[currentIndex].type} ${dataArray[currentIndex].amount} USD from ${dataArray[currentIndex].country}`}</p>
            <button
              onClick={handleStopAlerts}
              className=" m-4 bg-red-600 text-white p-2 rounded"
              style={{
                background: "#dc2626",
              }}
            >
              Stop Alert
            </button>
          </div>
        )}
      </div>
    );
  };
  const { appLoading } = useDataContext();
  if (appLoading) return <Loader />;

  return (
    <>
      <DataPopup dataArray={popupdata} />
      <HomePage />
    </>
  );
};

export default page;
