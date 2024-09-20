"use client";
import React from "react";
import AboutUs from "./homepagecomponents/homepageItem/AboutUs";
import Welcome from "./homepagecomponents/homepageItem/Welcome";
import InvestmentPlans from "./homepagecomponents/plans/InvestmentPlans";
import Testimonials from "./homepagecomponents/testimonials/Testimonials";
import GlobalAccess from "./homepagecomponents/global/GlobalAccess";
import JoinNow from "./homepagecomponents/joinnow/JoinNow";
import WhyChooseUs from "./homepagecomponents/Choose/WhyChooseUs";
import Services from "./homepagecomponents/services/Services";

const HomePage = () => {
  return (
    <main className="w-full min-h-screen">
      <section className="w-full min-h-screen">
        <Welcome />
      </section>

      <section className="min-h-screen bg-gray-300">
        <AboutUs />
      </section>
      <section className="min-h-screen">
        <Services />
      </section>
      <section className="min-h-screen w-full">
        <h2 className="text-center text-black text-4xl font-sans font-bold mb-3 underline">
          {" "}
          The perfect plans just for you{" "}
        </h2>
        <InvestmentPlans />
      </section>
      <section className="">
        <GlobalAccess />
      </section>
      <section className="min-h-[50vh]">
        <JoinNow />
      </section>
      <section className="min-h-screen bg-black">
        <Testimonials />
      </section>
      <section className="pt-4 pb-6 border-t-black border-solid ">
        <h2 className="text-center pt-3 pb-6 text-black text-4xl font-sans font-bold mb-3 underline-offset-0">
          {" "}
          Why Invest With Infinite firms?{" "}
        </h2>
        <WhyChooseUs />
      </section>
    </main>
  );
};

export default HomePage;
