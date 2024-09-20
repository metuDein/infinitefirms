import PlanCard from "./components/PlanCard";

const InvestmentPlans = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-10 max-w-5xl mx-auto md:grid-cols-3 xl:grid-cols-3">
      <PlanCard
        name={"Lite"}
        price={750}
        features={[
          "1000 free trades",
          "30% ROI Investment",
          "No fees",
          "5 - 10 Available   Pro Traders",
        ]}
      />
      <PlanCard
        name={"Pro"}
        price={3000}
        features={[
          "Unlimited trades",
          "50% ROI Investment",
          "No fees",
          "30 - 50 Available  Pro Traders",
        ]}
      />
      <PlanCard
        name={"Ultra"}
        price={7000}
        features={[
          "Unlimited trades",
          "70% ROI Investment",
          "No fees",
          "60 - 100 Available Pro Traders",
        ]}
      />
    </div>
  );
};

export default InvestmentPlans;
