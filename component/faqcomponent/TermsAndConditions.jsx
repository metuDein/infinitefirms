import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 py-10 px-5 md:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-8">
          Terms and Conditions of Use
        </h1>
        
        {/* <p className="text-lg mb-8 text-center italic">
          Last Updated: {new Date().toLocaleDateString()}
        </p> */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-lg leading-relaxed mb-4">
            Welcome to Infinite Firms. These Terms and Conditions govern your access to and use of our investment platform available at http://infinitefirms.pro/, including any content, functionality, and services offered on or through the Platform.
          </p>
          <p className="text-lg leading-relaxed">
            By accessing or using the Platform, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of these Terms, you must not access the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Investment Services</h2>
          <h3 className="text-xl font-medium mb-2">2.1 Copy Trading</h3>
          <p className="text-lg leading-relaxed mb-4">
            Our copy trading service allows you to automatically replicate the trades of experienced investors. You acknowledge that:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Past performance is not indicative of future results</li>
            <li>You retain full responsibility for your investment decisions</li>
            <li>We do not guarantee profits or protection from losses</li>
            <li>Copy trading involves the same risks as direct trading</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2">2.2 Cloud Mining</h3>
          <p className="text-lg leading-relaxed">
            Our cloud mining services provide remote access to mining hardware. You understand that:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Mining profitability depends on cryptocurrency market conditions</li>
            <li>Hardware maintenance and upgrades may temporarily affect service</li>
            <li>Regulatory changes may impact service availability</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2">2.3 General Provisions</h3>
          <p className="text-lg leading-relaxed">
            All investment services carry risk of capital loss. We do not provide financial advice. You should consult with a qualified financial advisor before making investment decisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
          <p className="text-lg leading-relaxed mb-4">
            To access certain features, you must register for an account. You agree to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your information</li>
            <li>Maintain the security of your credentials</li>
            <li>Be responsible for all activities under your account</li>
            <li>Notify us immediately of any unauthorized access</li>
          </ul>
          <p className="text-lg leading-relaxed">
            We reserve the right to refuse service, suspend, or terminate accounts at our sole discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Fees and Payments</h2>
          <p className="text-lg leading-relaxed mb-4">
            You agree to pay all applicable fees as described on our Platform. Fees may include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Management fees for copy trading services</li>
            <li>Performance fees based on investment returns</li>
            <li>Cloud mining service fees</li>
            <li>Transaction fees</li>
          </ul>
          <p className="text-lg leading-relaxed mb-4">
            We reserve the right to modify our fee structure with 30 days' notice. Continued use after notice constitutes acceptance of new fees.
          </p>
          <p className="text-lg leading-relaxed">
            All payments are non-refundable except as required by law or at our sole discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Risk Disclosure</h2>
          <p className="text-lg leading-relaxed mb-4">
            Investing involves substantial risk of loss and is not suitable for all investors. You acknowledge that:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>The value of investments may fluctuate</li>
            <li>Past performance does not guarantee future results</li>
            <li>Leverage can magnify both gains and losses</li>
            <li>Cryptocurrency investments are particularly volatile</li>
            <li>You could lose all or more than your initial investment</li>
          </ul>
          <p className="text-lg leading-relaxed">
            You alone assume the sole responsibility of evaluating the merits and risks associated with using our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
          <p className="text-lg leading-relaxed mb-4">
            The Platform and its entire contents, features, and functionality are owned by Infinite Firms and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
          <p className="text-lg leading-relaxed">
            You are granted a limited, non-exclusive, non-transferable license to access and use the Platform for personal, non-commercial use only.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="text-lg leading-relaxed mb-4">
            To the maximum extent permitted by law, in no event shall Infinite Firms, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Any indirect, consequential, exemplary, incidental, or punitive damages</li>
            <li>Loss of profits, revenue, data, or use</li>
            <li>Damages related to investments made through the Platform</li>
            <li>Unauthorized access to or alteration of your transmissions or data</li>
          </ul>
          <p className="text-lg leading-relaxed">
            Our total cumulative liability shall not exceed the fees you paid to us in the 12 months preceding the claim.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
          <p className="text-lg leading-relaxed mb-4">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including if you breach these Terms.
          </p>
          <p className="text-lg leading-relaxed">
            Upon termination, your right to use the Platform will cease immediately. All provisions which by their nature should survive termination shall survive.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
          <p className="text-lg leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of United States of America, without regard to its conflict of law provisions. Any disputes shall be resolved exclusively in the courts of United States of America.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
          <p className="text-lg leading-relaxed mb-4">
            We reserve the right to modify these Terms at any time. We will provide notice of material changes through the Platform or via email.
          </p>
          <p className="text-lg leading-relaxed">
            Your continued use after changes become effective constitutes acceptance of the new Terms. If you disagree with the changes, you must stop using the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
          <p className="text-lg leading-relaxed">
            For questions about these Terms, please contact us at:
            <br />
            Email: <a href="mailto:Infinitefirmpro@gmail.com" className="text-blue-600 hover:underline">Infinitefirmpro@gmail.com</a>
            <br />
            Website: <a href="http://infinitefirms.pro/" className="text-blue-600 hover:underline">http://infinitefirms.pro/</a>
          </p>
        </section>

        <p className="text-center text-gray-500 text-sm mt-10">
          &copy; {new Date().getFullYear()} Infinite Firms. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;

