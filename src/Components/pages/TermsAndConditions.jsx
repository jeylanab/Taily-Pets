import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen text-black py-12 px-4 md:px-16 lg:px-32">
      <h1 className="text-3xl font-bold mb-6">Taily Terms & Conditions</h1>
      <p className="mb-4">Effective Date: [Insert Date]</p>
      <p className="mb-4">
        Thank you for using Taily! These Terms and Conditions (the “Terms”) constitute a binding legal agreement (“Agreement”) between you and Taily (“Taily,” “we,” “us,” or “our”). These Terms govern your use of our software applications, services, and tools designed to help pet owners and pet companions connect, communicate, and arrange voluntary pet-related support or companionship (collectively, the “Taily Service”).
      </p>
      <p className="mb-4">
        These Terms govern your access to and use of the Taily website, including any subdomains thereof, and any other sites or platforms through which Taily makes its service available, including mobile, tablet, smart device apps, and online support (collectively, the “Site” or “Platform”). By accessing or using the Taily Service, you accept these Terms. If you do not agree to these Terms or are unable to comply with them, you may not use the Taily Service. Misuse of the Platform or breach of these Terms may result in civil or criminal liability.
      </p>

      {/* Section List */}
      <h2 className="text-2xl  font-semibold mt-6 mb-2 text-orange-500">Sections Included</h2>
      <ul classNam e="list-disc list-inside mb-4">
        <li>Key Terms</li>
        <li>Nature of Our Site and Services</li>
        <li>Eligibility</li>
        <li>Use of Site and Compliance</li>
        <li>User Content and Communication Guidelines</li>
        <li>Your User Content and Photos</li>
        <li>No Payments or Booking Fees</li>
        <li>Risk, Emergencies, and Pet Handling</li>
        <li>Disclaimers of Warranties</li>
        <li>Limitation of Liability and Release</li>
        <li>Indemnification</li>
        <li>Termination and Account Cancellation</li>
        <li>Intellectual Property Rights</li>
        <li>No Employment or Withholding</li>
        <li>No Agency</li>
        <li>Governing Law</li>
        <li>Severability</li>
        <li>Miscellaneous</li>
      </ul>

      {/* Example: Key Terms */}
      <h2 className="text-xl  font-semibold mt-6 mb-2 text-orange-500">1. Key Terms</h2>
      <ul classNam e="list-disc list-inside mb-4 space-y-1">
        <li><strong>USER:</strong> Any individual who creates an account on the Taily platform, including both Pet Owners and Companions.</li>
        <li><strong>PET OWNER:</strong> A User who seeks companionship, care, or voluntary time spent with their pet by another User.</li>
        <li><strong>COMPANION:</strong> A User who offers to spend time with, support, or otherwise voluntarily engage with another User’s pet.</li>
        <li><strong>LISTING:</strong> A profile or offering created by a User describing available companionship or preferences for interaction.</li>
        <li><strong>TAILY SERVICE:</strong> The tools, platform, and community space provided by Taily for users to discover each other and arrange voluntary pet-related time.</li>
        <li><strong>CONTENT:</strong> All materials, including photos, videos, messages, listings, and reviews, submitted by Users.</li>
        <li><strong>USER CONTENT:</strong> Any content uploaded or shared by Users, including profile photos, pet descriptions, ratings, and communications.</li>
        <li><strong>THIRD-PARTY PROVIDERS:</strong> Contractors, service vendors, or partners who may provide optional or background services on behalf of Taily.</li>
      </ul>

      {/* Example: Nature of Our Site */}
      <h2 className="text-xl  font-semibold mt-6 mb-2 text-orange-500">2. Nature of Our Site and Services</h2>
      <p className ="mb-4">
        Important Notice: Taily is a free community-based platform. It does not charge for use, does not facilitate or process payments of any kind, and is not a marketplace or booking system. All pet-related interactions are voluntary, non-commercial, and arranged directly between Users. Taily does not provide, monitor, endorse, insure, or supervise any pet care services, and is not responsible for any legal, financial, or personal consequences that may arise from user interactions.
      </p>
      <p className="mb-4">
        Taily is an online platform designed to help Pet Owners ("Pet Owners") find, communicate with, and engage individuals who voluntarily offer companionship, attention, or assistance with pets ("Companions"). Taily is a neutral venue. We do not provide pet services. We do not supervise, control, employ, or certify Users. All interactions are arranged directly between Users at their own discretion and risk.
      </p>

      {/* Add remaining sections similarly */}
     <h2 className="text-2xl  font-semibold mt-6 mb-2 text-orange-500">5. User Content and Communication Rules and Guidelines</h2>
      <p>
         By using the Taily Platform, you agree to engage in clear, respectful, and timely communication and to post only responsible and lawful content. These rules apply to all users of the Platform, including both Pet Owners and Companions, and are designed to foster a safe, transparent, and positive community for all.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">5.1 Communication Responsibilities</h3>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Respond to messages and enquiries within a reasonable timeframe (ideally within 24–48 hours).</li>
        <li>Maintain open and timely communication before, during, and after any pet-related interaction.</li>
        <li>Inform the other party promptly if plans change or emergencies arise.</li>
        <li>Respect each other’s time, safety, and boundaries.</li>
      </ul>
      <p>Additional responsibilities for Pet Owners and Companions are outlined in the Terms above.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">5.2 User Content Guidelines</h3>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Do not infringe on intellectual property rights or use copyrighted material without permission.</li>
        <li>Do not disclose another person’s personal information without consent.</li>
        <li>Avoid posting defamatory, false, misleading, abusive, offensive, obscene, or objectionable content.</li>
        <li>No hate speech, discrimination, spam, advertisements, impersonation, or illegal content.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">5.3 Moderation and Removal of Content</h3>
      <p>Taily may review, monitor, or remove User Content at its discretion, including if it violates Terms or applicable law.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">5.4 License to Use User Content</h3>
      <p>
        By submitting content, you grant Taily a non-exclusive, worldwide, royalty-free license to use, reproduce, adapt, display, distribute, and create derivative works for platform operation, promotion, and improvement.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">5.5 Reviews and Feedback</h3>
      <p>Reviews must reflect honest, first-hand experiences and remain factual, constructive, and respectful.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">5.6 Disputes Between Users</h3>
      <p>Taily does not mediate disputes. Users are responsible for resolving issues directly.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">5.7 Pricing and Private Agreements</h3>
      <p>Taily is not a payment platform; financial arrangements between Users are private and at Users' discretion.</p>

      <h2 className="text-2xl  font-semibold mt-6 mb-2 text-orange-500">6. Your User Content and Photos</h2>
      <p>
         Users are solely responsible for their content. Taily has a license to use content for platform operation, marketing, and improvement.
      </p>

      <h2 className="text-2xl  font-semibold mt-6 mb-2 text-orange-500">7. Private Arrangements, Financial Terms, and Limitation of Liability</h2>
      <h3 classNam e="text-xl font-semibold mt-4 mb-2">7.1 No Payments Handled by Taily</h3>
      <p>Taily does not process or supervise payments. All financial arrangements are off-platform and Users’ responsibility.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">7.2 Emergencies, Abandonment, and Pet-Related Incidents</h3>
      <p>Companions may act in emergencies, but all resulting costs are Pet Owner’s responsibility.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">7.3 Limitation of Liability and Waiver of Claims</h3>
      <p>
        Taily is not liable for injury, loss, misconduct, or other incidents arising from Platform use. Users assume all risks and waive claims.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">7.4 No Guarantees, No Responsibility for User Behavior</h3>
      <p>Taily does not guarantee interactions, user identities, or service delivery. Users must conduct due diligence.</p>

      <h2 className="text-2xl  font-semibold mt-6 mb-2 text-orange-500">8. Cancellations and Refunds</h2>
      <p>Taily doe s not process cancellations, refunds, or financial claims. Users must manage arrangements directly.</p>

      <h2 className="text-2xl  font-semibold mt-6 mb-2 text-orange-500">9. Links to Third-Party Websites</h2>
      <p>Taily is  not responsible for third-party websites, products, or privacy practices. Use at your own risk.</p>

      <h2 className="text-2xl  font-semibold mt-6 mb-2 text-orange-500">10. Disclaimers of Warranties</h2>
      <p>The Platform is provided "as is" and "as available" without warranties. Users assume all risks.</p>

      <h2 className="text-2xl  font-semibold mt-6 mb-2 text-orange-500">11. Limitation of Liability and Release</h2>
      <p>
        Taily is a neutral platform and shall not be liable for damages arising from interactions between Users. Total liability, if any, is limited to €100.
      </p>
    </div>
  );
};

export default TermsAndConditions;
