import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-6xl my-10 mx-auto px-4 grid md:grid-cols-2 gap-8 items-center text-gray-800">
      {/* Left Column: Policy Content */}
      <div className="col-span-2 md:col-span-2 space-y-6">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">
          Privacy & Cookie Policy
        </h1>
        <p className="text-sm text-gray-500">
          Effective date: [Insert Date] <br />
          Last updated: [Insert Date]
        </p>

        <p>
          Taily (“we,” “us,” or “our”) operates a platform that connects pet
          owners and companions for pet-related interactions and community
          engagement (the “Platform”). This Privacy & Cookie Policy explains how
          we collect, use, disclose, store, and protect your personal data when
          you use our Platform, including any websites, mobile applications, and
          related services.
        </p>

        <p>
          We are committed to conducting our operations in compliance with the
          highest ethical and legal standards, including the General Data
          Protection Regulation (EU) 2016/679 (“GDPR”), and to safeguarding the
          privacy of individuals whose personal data we process.
        </p>

        <h2 className="text-2xl font-semibold text-orange-500 mt-6">
          1. General Information
        </h2>
        <p>
          This Privacy Policy outlines the principles and practices applied by
          Taily with respect to the collection, use, storage, disclosure, and
          protection of Personal Data. “Personal Data” refers to any information
          relating to an identified or identifiable individual (“Data Subject”),
          and any processing operation includes, without limitation, the
          collection, organization, structuring, storage, adaptation or
          alteration, retrieval, consultation, use, disclosure, combination,
          restriction, erasure, or destruction of such data.
        </p>

        <h2 className="text-2xl font-semibold text-orange-500 mt-6">2. Definitions</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Account</strong>: Refers to a set of resources and rights within a given computer system assigned to you as the User for the purpose of accessing and/or using the Platform.</li>
          <li><strong>Cookie</strong>: Refers to a small data file that Taily transfers to the User's device hard disk for record-keeping purposes.</li>
          <li><strong>Consent</strong>: Means any freely given, specific, informed and unambiguous indication of the data subject’s agreement.</li>
          <li><strong>Data Controller</strong>: Refers to the natural or legal person which, alone or jointly with others, determines the purposes and means of the processing of Personal Data.</li>
          <li><strong>Data Processor</strong>: Refers to a natural or legal person which processes Personal Data on behalf of the Controller.</li>
          <li><strong>GDPR</strong>: Refers to the General Data Protection Regulation (EU) 2016/679.</li>
          <li><strong>Personal Data</strong>: Refers to any information relating to an identified or identifiable natural person.</li>
          <li><strong>Platform</strong>: Refers to the digital environment operated by Taily, including mobile applications and websites.</li>
          <li><strong>Processing</strong>: Refers to any operation performed on Personal Data, such as collection, storage, use, disclosure, or deletion.</li>
          <li><strong>User</strong>: Refers to any natural person using the Platform.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-orange-500 mt-6">
          3. Collection of Personal Data by Taily
        </h2>
        <p>
          Taily collects, stores, and processes various categories of personal
          data to enable the proper functioning of the platform, facilitate user
          interactions, ensure safety, and comply with legal obligations.
        </p>

        <h3 className="text-xl font-semibold text-orange-400 mt-4">a. Information You Provide</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Registration and account details (name, email, phone, address).</li>
          <li>Profile information (photos, pet details, interests).</li>
          <li>Payment details when transactions occur.</li>
          <li>Communications with other users or Taily support.</li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-400 mt-4">b. Information Collected Automatically</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Log data (IP address, browser type, operating system).</li>
          <li>Device data (device model, unique identifiers).</li>
          <li>Cookies and tracking technologies.</li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-400 mt-4">c. Information from Third Parties</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Social media services if you link your account.</li>
          <li>Payment providers and fraud prevention partners.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-orange-500 mt-6">
          4. Purposes for which the Personal Data is Collected by Taily
        </h2>
        <p>
          Taily uses, stores, and processes information, including Personal
          Data, about the User in order to operate and improve the Platform,
          ensure a safe and trustworthy environment, comply with its legal
          obligations, and enhance the User experience.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>To operate and provide access to the Platform.</li>
          <li>To personalize the user experience and suggest relevant features.</li>
          <li>To facilitate communication between users.</li>
          <li>To process payments securely.</li>
          <li>To detect and prevent fraud or illegal activities.</li>
          <li>To comply with applicable legal obligations.</li>
        </ul>

        {/* ✅ Placeholder for Section 5 and beyond */}
        <div className="border-t border-orange-200 mt-10 pt-6">
          <div className="mb-8">
  <h2 className="text-2xl font-bold text-orange-600 mb-4">
    5. THE USER’S PRIVACY RIGHTS
  </h2>
  <p className="mb-4">
    In accordance with the General Data Protection Regulation (GDPR) and other applicable privacy laws, Users of the Taily Platform are entitled to exercise specific rights regarding their personal data. To exercise any of these rights, Users can contact Taily at <a href="mailto:tailypetlovers@gmail.com" className="text-orange-500 underline">tailypetlovers@gmail.com</a>.
  </p>

  <p className="mb-2">The rights include, but are not limited to:</p>
  <ul className="list-disc pl-6 space-y-2 mb-4">
    <li>
      <span className="font-semibold">Right to be informed –</span> You have the right to know:
      <ul className="list-decimal pl-6 space-y-1 mt-2">
        <li>the identity and contact details of the Data Controller, and, where applicable, the Controller’s representative;</li>
        <li>the contact details of the person responsible for data protection matters;</li>
        <li>the purposes for which your personal data is processed and the legal basis for such processing;</li>
        <li>the recipients or categories of recipients of your personal data;</li>
        <li>the period for which your personal data will be stored;</li>
        <li>whether the provision of your personal data is a statutory or contractual requirement, or a requirement necessary to enter into a contract, as well as the possible consequences of failure to provide such data.</li>
      </ul>
    </li>
    <li><span className="font-semibold">Right of access –</span> You have the right to request a copy of the personal data held about you, to obtain confirmation whether such data is being processed, and to receive further information regarding the processing.</li>
    <li><span className="font-semibold">Right to rectification, erasure, or restriction of processing –</span> You have the right to request that your personal data be corrected, deleted, or that processing be restricted. Please note that Taily will maintain your name and email address in a suppression list to confirm compliance with your request, which will be retained for five (5) years.</li>
    <li><span className="font-semibold">Right to object –</span> You have the right to object to the processing of your personal data where there is a serious and legitimate reason, including processing for direct marketing purposes.</li>
    <li><span className="font-semibold">Right to withdraw consent –</span> Where processing is based on consent, you have the right to withdraw your consent at any time without affecting the lawfulness of processing prior to such withdrawal.</li>
    <li><span className="font-semibold">Right to data portability –</span> You have the right to receive your personal data in a structured, commonly used and machine-readable format and to transmit those data to another controller without hindrance from Taily, where technically feasible.</li>
    <li><span className="font-semibold">Right to lodge a complaint –</span> You have the right to file a complaint with your local data protection authority, without prejudice to any other administrative or judicial remedy.</li>
  </ul>

  <p className="mb-4">
    <span className="font-semibold">Exercising your rights:</span> Taily will respond to any valid request within thirty (30) days of receipt. This period may be extended by up to sixty (60) days where necessary, taking into account the complexity and number of requests. In such a case, Taily will inform you of any extension and the reasons for it. Verification of your identity may be required before processing your request. Exercising your rights is free of charge unless your request is manifestly unfounded or excessive, in which case Taily may charge a reasonable fee or refuse to act on the request.
  </p>
</div>

<div className="mb-8">
  <h2 className="text-2xl font-bold text-orange-600 mb-4">
    6. STORAGE AND PROCESSING OF PERSONAL DATA
  </h2>
  <p className="mb-4">
    Taily declares that it stores and processes Personal Data within the European Union, Asia Pacific and North America. Laws in these countries may differ from the laws applicable to the User’s country of residence. To safeguard international data flows, Taily applies appropriate contractual safeguards, including Standard Contractual Clauses and where applicable, additional technical measures.
  </p>
  <p className="mb-4">
    Taily stores and processes Personal Data only for the duration necessary to fulfill the purposes described in this Privacy Policy. This means User data will be retained for as long as needed to answer queries, resolve issues, comply with legal obligations, and improve services. After this retention period, personal data is securely deleted or anonymized.
  </p>
  <p className="mb-4">
    Taily processes and stores data through integrated third-party platforms such as Airtable, Softr, and possibly Google Cloud, which may use data centers located within or outside the EEA. These service providers act as Processors under strict contractual agreements, including data protection clauses and confidentiality obligations. Taily only works with providers that ensure adequate protection in accordance with the GDPR.
  </p>
  <p className="mb-4">
    Transfers outside the EEA to recipients in jurisdictions not deemed adequate by the European Commission are governed by Standard Contractual Clauses (SCCs) or equivalent safeguards.
  </p>
  <p className="mb-4">
    Taily also performs limited profiling activities to improve User experience and platform personalization. These may include ranking sitter listings or suggesting relevant matches based on location, previous use, or public feedback.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">Media Uploads (Photos/Videos of Pets and Users)</h3>
  <p className="mb-4">
    Users may upload images of themselves, their pets, or interactions during pet sitting. These are stored on third-party cloud storage integrated with the platform. Users retain the right to request the deletion of uploaded images at any time by contacting us via the email listed in Section 10. Upon request, media files are deleted from active databases and flagged for permanent removal from backup systems within 60 days.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">Backup and Data Recovery Policy</h3>
  <p className="mb-4">
    Taily's third-party infrastructure partners may retain automated encrypted backups for up to 90 days as part of system integrity and disaster recovery processes. Backups are stored securely and are not used for live processing. Once the retention period expires, backup snapshots are permanently deleted. If a User requests full data erasure (under the Right to Erasure), this will also include deletion from backup systems at the next scheduled cycle.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">User Responsibility</h3>
  <p className="mb-4">
    The User is responsible for protecting their login credentials and device access. Taily is not responsible for unauthorized access resulting from negligence or weak device security. While Taily applies industry-standard technical and organizational measures, no system is infallible, and absolute data security cannot be guaranteed.
  </p>

  <p className="mb-4">
    In the event of a personal data breach likely to result in risk to User rights or freedoms, Taily will notify the competent supervisory authority and affected Users without undue delay, as required under Article 33 and 34 of the GDPR.
  </p>
</div>

<div className="mb-8">
  <h2 className="text-2xl font-bold text-orange-600 mb-4">
    7. SHARING PERSONAL DATA WITH THIRD PARTIES
  </h2>
  <p className="mb-4">
    Taily may share certain Personal Data with third parties when necessary for the performance of services, compliance with legal obligations, technical functionality, marketing purposes, and platform optimization. Taily does not sell Personal Data and will never use it for indirect marketing purposes without the User’s explicit consent.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">7.1 Disclosure to Business Partners and Subprocessors</h3>
  <p className="mb-4">
    Taily may disclose certain Personal Data (e.g. active sitter profiles) to carefully selected partners who support the delivery of the Platform’s services. These include services such as customer support, identity verification, payment processing, analytics, or infrastructure provisioning. Examples include, but are not limited to, Airtable (database and form infrastructure), Softr (web app interface), and email or SMS gateway services. These provisions apply only when payment processing through the Taily platform is activated in the future.
  </p>
  <p className="mb-4">
    All subprocessors are contractually obligated to process data exclusively on behalf of Taily, and in accordance with this Privacy Policy and applicable privacy regulations (including the GDPR). Taily will never disclose Users’ Personal Data to third parties for unrelated commercial or advertising purposes.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">7.2 Sharing Between Users</h3>
  <ul className="list-disc pl-6 space-y-2 mb-4">
    <li>When a Pet Owner submits a booking request, their full name and other profile details they’ve opted to share may be visible to the Sitter.</li>
    <li>Upon confirmation, further details such as contact phone number may be shared to coordinate the booking.</li>
    <li>Conversely, Sitters’ public profile name and relevant service details are visible to the Pet Owner.</li>
  </ul>
  <p className="mb-4">
    Payment and payout information is never shared between Users. These provisions apply only when payment processing through the Taily platform is activated in the future.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">7.3 Public Profiles, Listings, and Reviews</h3>
  <p className="mb-4">
    By using the Platform, Users acknowledge that certain information they provide (such as their first name, location, profile picture, listing description, calendar availability, ratings or reviews) may become publicly accessible through their listing pages.
  </p>
  <ul className="list-disc pl-6 space-y-2 mb-4">
    <li>Reviews and ratings written after a completed booking become part of the Sitter’s public profile.</li>
    <li>Any media or comments submitted to discussion threads, community spaces, or blog features may also be publicly visible.</li>
    <li>Public profile information may be indexed by third-party search engines. Taily offers the ability to opt out of search engine indexing where technically feasible.</li>
  </ul>
  <p className="mb-4">
    Taily may also display listings and profiles on third-party partner sites using widgets or API integration to promote sitter services.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">7.4 Third-Party Service Providers</h3>
  <ul className="list-disc pl-6 space-y-2 mb-4">
    <li>verify identities or review documentation,</li>
    <li>conduct risk assessment and fraud prevention,</li>
    <li>process payments securely (when activated),</li>
    <li>support customer communication,</li>
    <li>analyze traffic and usage data (e.g. via analytics providers),</li>
    <li>and improve the user interface.</li>
  </ul>
  <p className="mb-4">
    These providers may operate inside or outside the European Economic Area (EEA). Each is contractually required to safeguard Personal Data and use it solely for the purpose for which it was provided.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">7.5 Social Media Platforms</h3>
  <p className="mb-4">
    Where allowed by law, Taily may share limited user data such as hashed email addresses with platforms like Facebook or Google Ads to serve tailored ads, retarget existing users, or create custom audiences. These activities rely on Taily’s legitimate interest in promoting its services and are conducted under strict contractual and technical safeguards.
  </p>
  <p className="mb-4">
    Taily does not control the policies of these external platforms. Users are encouraged to review the Privacy Policies of any third-party platforms they interact with.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">7.6 Aggregated and Anonymized Data</h3>
  <p className="mb-4">
    Taily may share anonymized or aggregated data with partners or public agencies for the purpose of regulatory compliance, industry research, service improvement, demographic analysis, or marketing performance reviews. This data cannot be used to identify individual Users.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">7.7 Legal Requirements and Exceptions</h3>
  <ul className="list-disc pl-6 space-y-2 mb-4">
    <li>to competent public authorities if legally required or in the context of judicial proceedings;</li>
    <li>to defend Taily’s rights or property;</li>
    <li>to a third party acquiring all or a substantial part of Taily’s business or assets, in which case Personal Data may be transferred as part of the transaction, subject to appropriate privacy safeguards.</li>
  </ul>
  <p className="mb-4">
    Except as stated above, Personal Data will not be disclosed to other third parties unless: (i) the User has explicitly consented, and (ii) the receiving party is bound by a data processing agreement ensuring confidentiality and lawful processing.
  </p>
  <p className="mb-4">
    The Company shall not be held liable for any acts, omissions, damages, or harm caused by third parties, including other Users of the Platform, arising from or related to the use of the Platform or any services facilitated through it.
  </p>
</div>

<div className="mb-8">
   {/* Section 8 */}
<div className="mb-10">
  <h2 className="text-2xl font-bold text-orange-600 mb-4">
    8. SAFETY OF PERSONAL DATA
  </h2>
  <p className="mb-4">
    Taily declares that it takes all appropriate technical and organizational measures
    to protect the confidentiality and security of Personal Data. These measures include,
    but are not limited to: (i) storing personal information in secure operating
    environments that are not accessible to the public and accessible only by authorized
    persons, (ii) verifying the identities of Users before granting access to personal
    information, (iii) encryption of sensitive data in transit and at rest where
    applicable, and (iv) regular security audits and vulnerability testing.
  </p>
  <p className="mb-4">
    In the event of a personal data breach, Taily will assess the potential risk to Users’
    rights and freedoms. Where the breach is likely to result in such a risk, Taily will
    notify the relevant supervisory authority without undue delay, and, where feasible,
    no later than seventy-two (72) hours after becoming aware of it, in accordance with
    GDPR Article 33. Where the breach is likely to result in a high risk to the rights and
    freedoms of Users, Taily will also communicate the breach to the affected Users
    without undue delay, in accordance with GDPR Article 34.
  </p>
  <p className="mb-4">
    Taily also maintains audit logs to document GDPR-related requests (including access,
    erasure, and rectification) and applies automated retention rules to backups to
    ensure that outdated personal data is not kept longer than necessary.
  </p>
  <p className="mb-4">
    The User is required to comply with security standards, such as avoiding unauthorized
    access to their devices and Account. The User is solely responsible for the use of
    the Platform on their devices, IP address, and identification data, as well as for
    maintaining their confidentiality.
  </p>
  <p className="mb-4">
    Notwithstanding the security measures adopted, an infallible level of security cannot
    be guaranteed. Since no method of transmission over the Internet or method of
    electronic storage is 100% secure, Taily does not guarantee absolute security.
  </p>
  <h3 className="text-xl font-semibold text-orange-500 mb-3">
    8.1. Data Access, Backups, and Retention
  </h3>
  <p className="mb-4">
    Taily retains Personal Data only for as long as necessary to fulfill the purposes
    outlined in this Privacy Policy and to comply with legal obligations. Access to
    Personal Data within the Platform is strictly limited to authorized personnel, and all
    access may be subject to logging for accountability, where technically feasible.
  </p>
  <p className="mb-4">
    Backups of data may be maintained by our hosting or platform providers (such as
    Airtable or other integrated services), which apply their own retention and security
    policies. Where backups are maintained, Taily ensures that personal data subject to
    deletion requests is either excluded from future backups or removed within a
    reasonable period, consistent with applicable legal and technical constraints.
  </p>
  <p className="mb-4">
    Taily does not store offline copies of user data outside the Platform unless
    explicitly required for business continuity or legal compliance. Users may request
    access logs or confirmation of data erasure where applicable, and such requests will
    be processed in line with Taily’s obligations under the GDPR, including response
    times and record-keeping requirements.
  </p>
</div>

{/* Section 9 */}
<div className="mb-10">
  <h2 className="text-2xl font-bold text-orange-600 mb-4">9. USE OF COOKIES</h2>
  <p className="mb-4">
    Taily uses cookies and similar tracking technologies to distinguish user preferences,
    enhance the functionality of the Platform, and improve the user experience. Cookies
    are small data files placed on your device’s hard drive or in your browser memory,
    which allow the Platform to remember your actions and preferences over time.
  </p>
  <p className="mb-4">
    By accessing the Platform for the first time, you are presented with a cookie consent
    notice, where you may choose to accept or manage the types of cookies we use. Your
    continued use of the Platform after providing consent constitutes your agreement to
    the use of cookies as described in this Policy. If you do not consent to the use of
    cookies, you should adjust your browser settings to block them or delete your account.
  </p>
  <ul className="list-disc pl-6 mb-4">
    <li>Strictly Necessary Cookies – Required for basic operation of the Platform.</li>
    <li>Functionality Cookies – Enhance and customize platform preferences.</li>
    <li>
      Tracking Cookies – Record browsing behavior to improve services and suggestions.
    </li>
    <li>
      Performance Cookies – Used for analytics and performance monitoring (e.g., Google
      Analytics).
    </li>
  </ul>
  <p className="mb-4">
    The Platform may also contain web beacons and other similar technologies, used
    alongside cookies to compile aggregated statistics and assess marketing campaigns.
  </p>
  <p className="mb-4">
    Some cookies are set by third-party providers such as Softr, Airtable, or payment
    processors. These providers process personal data in accordance with our Privacy
    Policy and applicable data protection laws.
  </p>
</div>

{/* Section 10 */}
<div className="mb-10">
  <h2 className="text-2xl font-bold text-orange-600 mb-4">10. CONTACT INFORMATION</h2>
  <p className="mb-2">If you have any questions, you may contact us at:</p>
  <p className="mb-2">By email: <span className="font-semibold">tailypetlovers@gmail.com</span></p>
</div>

{/* Section 11 */}
<div className="mb-10">
  <h2 className="text-2xl font-bold text-orange-600 mb-4">11. FINAL PROVISIONS</h2>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">11.1 Use of the Platform</h3>
  <p className="mb-4">The User’s Account can be created only by a person who is at least 18 years old.</p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">11.2 Liability for User Content</h3>
  <p className="mb-4">Taily is not liable for any User Content. Users remain solely responsible for the content they share.</p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">11.3 Third Party Partners & Integrations</h3>
  <p className="mb-4">Taily is not liable for links to third-party websites. Users are responsible for reviewing third-party privacy provisions.</p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">11.4 Google Maps/Google Earth</h3>
  <p className="mb-4">
    Parts of the Platform may use Google Maps services. Use is subject to Google Maps/Earth
    Additional Terms of Use and the Google Privacy Policy.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">11.5 Analyzing the User's Communications</h3>
  <p className="mb-4">
    Taily may review, scan, or analyze communications for fraud prevention, compliance,
    customer support, and product improvement. These activities are based on legitimate
    interests and are not used for third-party marketing.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">11.6 Policy Updates</h3>
  <p className="mb-4">
    Taily reserves the right to modify or update this Privacy Policy at any time. In case
    of significant changes, Users will be notified.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">11.7 Severability</h3>
  <p className="mb-4">
    If any provision of this Privacy Policy is held invalid, the remaining provisions will
    remain in effect.
  </p>

  <h3 className="text-xl font-semibold text-orange-500 mb-2">11.8 Entry into Force</h3>
  <p className="mb-4">This Privacy Policy enters into force on [date of entry into force].</p>
</div>

</div>

        </div>
      </div>
    </div>
  );
}
