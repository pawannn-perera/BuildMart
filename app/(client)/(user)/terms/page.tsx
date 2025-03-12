import Container from "@/components/Container";
import React from "react";

const TermsPage = () => {
  return (
    <Container className="max-w-3xl sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using BuildMart&apos;s services, you agree to
            be bound by these Terms and Conditions. If you do not agree,
            please refrain from using our services.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            2. Use of Services
          </h2>
          <p>
            You agree to use BuildMart&apos;s services only for lawful
            purposes and in compliance with all applicable laws and
            regulations. Unauthorized use, including the resale of
            materials, is strictly prohibited.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. Product Information
          </h2>
          <p>
            BuildMart makes every effort to provide accurate descriptions,
            pricing, and availability of products. However, errors may
            occur, and we reserve the right to correct them without prior
            notice.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            4. Intellectual Property
          </h2>
          <p>
            All content, images, trademarks, and materials available on
            BuildMart&apos;s website are the property of BuildMart and are
            protected by applicable intellectual property laws.
            Unauthorized use is strictly prohibited.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            5. Limitation of Liability
          </h2>
          <p>
            BuildMart shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising from your
            use of our services, including but not limited to delays in
            delivery, product availability, or data inaccuracies.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            6. Returns and Refunds
          </h2>
          <p>
            BuildMart&apos;s return and refund policy is subject to
            specific terms. Products may only be returned or refunded if
            they meet the conditions outlined in our Return Policy.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">7. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed
            in accordance with the laws of the jurisdiction where BuildMart
            operates.
          </p>
        </section>
      </div>
    </Container>
  );
};

export default TermsPage;
