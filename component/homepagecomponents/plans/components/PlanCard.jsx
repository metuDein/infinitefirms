"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const PlanCard = ({ name, price, features }) => {
  const planFeatures = () => {
    return features.map((feature, index) => (
      <div key={index} className="flex items-start justify-start gap-2 my-4">
        <div className="h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#fff" }} />
        </div>
        <div className="font-medium text-black text-sm dark:text-white">
          {feature}
        </div>
      </div>
    ));
  };

  return (
    <div className="p-1 sm:p-4 md:p-4 rounded-3xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
      <div className="plan_card flex flex-col p-2 justify-between bg-neutral-700 dark:bg-neutral-400 text-black rounded">
        <p className="font-semibold text-xl pb-6 text-white">{name}</p>

        <p className="font-semibold text-xl pb-6 text-white">
          $ <span className="text-2xl font-bold"> {price} </span> /month
        </p>

        <button className="w-full rounded bg-blue-600 text-white shadow-md text-center font-serif p-4">
          start plan
        </button>
      </div>
      <div className="mt-4">
        {planFeatures()}

        <div className="flex items-start justify-start gap-2 my-4">
          <div className="h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ">
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#fff" }} />
          </div>
          <div className="font-medium text-black text-sm dark:text-white">
            24/7 Support Available
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
