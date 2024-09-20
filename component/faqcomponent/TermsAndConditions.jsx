import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 py-10 px-5 md:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-8">
          Terms and Conditions
        </h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-lg leading-relaxed">
            Welcome to Infinite firms. By accessing and using our services, you
            agree to comply with and be bound by the following terms and
            conditions. Please review the terms carefully before using our
            platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
          <p className="text-lg leading-relaxed">
            Our services include copy trading and cloud mining. You agree to use
            these services for lawful purposes and in accordance with all
            relevant laws and regulations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Account Responsibility
          </h2>
          <p className="text-lg leading-relaxed">
            As a user, you are responsible for maintaining the confidentiality
            of your account information and for all activities that occur under
            your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Fees and Payments</h2>
          <p className="text-lg leading-relaxed">
            You agree to pay all applicable fees for the use of our services.
            Fees are subject to change, and we will notify you of any changes in
            advance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
          <p className="text-lg leading-relaxed">
            We reserve the right to suspend or terminate your account if you
            violate any of these terms. Upon termination, your right to access
            our services will cease immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitation of Liability
          </h2>
          <p className="text-lg leading-relaxed">
            We are not liable for any losses or damages arising from the use of
            our services. Our platform is provided on an "as is" and "as
            available" basis without warranties of any kind.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p className="text-lg leading-relaxed">
            We reserve the right to update these terms and conditions at any
            time. Your continued use of our services after such changes
            constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Contact Information
          </h2>
          <p className="text-lg leading-relaxed">
            If you have any questions about these terms, please contact us at{" "}
            <a
              href="mailto:support@yourcompany.com"
              className="text-blue-600 hover:underline"
            >
              support@yourcompany.com
            </a>
            .
          </p>
        </section>

        <p className="text-center text-gray-500 text-sm mt-10">
          &copy; {new Date().getFullYear()} Horizonmarketcapital. All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
