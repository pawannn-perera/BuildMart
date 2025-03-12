import Container from "@/components/Container";
import React from "react";

const PrivacyPage = () => {
  return (
    <Container className="max-w-3xl sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">
            1. Information Collection
          </h2>
          <p>
            BuildMart collects information you provide directly to us when
            creating an account, placing an order, or contacting customer
            support. We also collect data about your interactions with our
            platform, such as browsing history and purchase activity.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            2. Use of Information
          </h2>
          <p>
            We use the information we collect to process orders, manage
            your account, enhance our website, and provide a personalized
            shopping experience. Additionally, we may use your contact
            information to send you updates, promotions, and important
            service-related messages.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. Information Sharing
          </h2>
          <p>
            BuildMart does not sell your personal information. However, we
            may share your information with trusted third-party service
            providers to fulfill orders, process payments, or deliver
            promotional content, as required to operate our business.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p>
            We implement industry-standard measures to safeguard your
            personal information from unauthorized access, alteration, or
            destruction. Despite our efforts, no method of transmission
            over the internet is completely secure.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal
            information. For assistance with these requests or to learn
            more about your rights, please contact our customer support
            team.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">6. Policy Updates</h2>
          <p>
            BuildMart may update this Privacy Policy periodically to
            reflect changes in our practices or legal requirements. We
            encourage you to review this page regularly for the latest
            information.
          </p>
        </section>
      </div>
    </Container>
  );
};

export default PrivacyPage;
