/* ──────────────────────────────────────────────
   Demo Data — hardcoded realistic test data
   used across all demo pages.
   ────────────────────────────────────────────── */

export const company = {
  name: "TechVista Solutions Pvt. Ltd.",
  email: "hr@techvista.com",
  accessStatus: "active",
};

export const customerUser = {
  id: "usr_cust_001",
  name: "Neha Kapoor",
  email: "neha.kapoor@techvista.com",
  role: "admin" as const,
  companyName: company.name,
  companyAccessStatus: "active",
};

export const candidateUser = {
  id: "usr_cand_001",
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98765 43210",
};

export const adminUser = {
  id: "usr_admin_001",
  name: "Priya Mehta",
  email: "priya.mehta@cluso.com",
  role: "superadmin" as const,
};

export const verifierUser = {
  id: "usr_verifier_001",
  name: "Amit Patel",
  email: "amit.patel@cluso.com",
  role: "verifier" as const,
};

export const services = [
  { serviceId: "svc_001", serviceName: "Employment Verification", isPackage: false },
  { serviceId: "svc_002", serviceName: "Education Verification", isPackage: false },
  { serviceId: "svc_003", serviceName: "Address Verification", isPackage: false },
  { serviceId: "svc_004", serviceName: "Criminal Record Check", isPackage: false },
  { serviceId: "svc_005", serviceName: "Reference Check", isPackage: false },
  {
    serviceId: "svc_pkg_001",
    serviceName: "Comprehensive BGV Package",
    isPackage: true,
    includedServiceNames: [
      "Employment Verification",
      "Education Verification",
      "Address Verification",
      "Criminal Record Check",
    ],
  },
];

export const demoRequests = [
  {
    _id: "req_001",
    candidateName: "Rahul Sharma",
    candidateEmail: "rahul.sharma@email.com",
    candidatePhone: "+91 98765 43210",
    customerName: company.name,
    status: "pending" as const,
    candidateFormStatus: "pending" as const,
    createdAt: "2026-05-20T09:15:00Z",
    selectedServices: [
      { serviceId: "svc_001", serviceName: "Employment Verification" },
      { serviceId: "svc_002", serviceName: "Education Verification" },
      { serviceId: "svc_003", serviceName: "Address Verification" },
    ],
    verificationCountry: "India",
  },
  {
    _id: "req_002",
    candidateName: "Ananya Gupta",
    candidateEmail: "ananya.gupta@email.com",
    candidatePhone: "+91 87654 32100",
    customerName: company.name,
    status: "approved" as const,
    candidateFormStatus: "submitted" as const,
    createdAt: "2026-05-18T14:30:00Z",
    selectedServices: [
      { serviceId: "svc_001", serviceName: "Employment Verification" },
      { serviceId: "svc_004", serviceName: "Criminal Record Check" },
    ],
    verificationCountry: "India",
  },
  {
    _id: "req_003",
    candidateName: "Vikram Desai",
    candidateEmail: "vikram.desai@email.com",
    candidatePhone: "+91 76543 21098",
    customerName: company.name,
    status: "verified" as const,
    candidateFormStatus: "submitted" as const,
    createdAt: "2026-05-15T10:00:00Z",
    selectedServices: [
      { serviceId: "svc_001", serviceName: "Employment Verification" },
      { serviceId: "svc_002", serviceName: "Education Verification" },
      { serviceId: "svc_005", serviceName: "Reference Check" },
    ],
    verificationCountry: "India",
  },
  {
    _id: "req_004",
    candidateName: "Sneha Iyer",
    candidateEmail: "sneha.iyer@email.com",
    candidatePhone: "+91 65432 10987",
    customerName: company.name,
    status: "rejected" as const,
    candidateFormStatus: "submitted" as const,
    createdAt: "2026-05-16T11:20:00Z",
    rejectionNote: "Incomplete employment history provided",
    selectedServices: [
      { serviceId: "svc_001", serviceName: "Employment Verification" },
    ],
    verificationCountry: "India",
  },
  {
    _id: "req_005",
    candidateName: "Arjun Nair",
    candidateEmail: "arjun.nair@email.com",
    candidatePhone: "+91 54321 09876",
    customerName: company.name,
    status: "pending" as const,
    candidateFormStatus: "submitted" as const,
    createdAt: "2026-05-21T08:45:00Z",
    selectedServices: [
      { serviceId: "svc_002", serviceName: "Education Verification" },
      { serviceId: "svc_003", serviceName: "Address Verification" },
    ],
    verificationCountry: "India",
  },
  {
    _id: "req_006",
    candidateName: "Meera Joshi",
    candidateEmail: "meera.joshi@email.com",
    candidatePhone: "+91 43210 98765",
    customerName: company.name,
    status: "approved" as const,
    candidateFormStatus: "submitted" as const,
    createdAt: "2026-05-17T16:10:00Z",
    selectedServices: [
      { serviceId: "svc_001", serviceName: "Employment Verification" },
      { serviceId: "svc_002", serviceName: "Education Verification" },
    ],
    verificationCountry: "India",
  },
  {
    _id: "req_007",
    candidateName: "Karan Singh",
    candidateEmail: "karan.singh@email.com",
    candidatePhone: "+91 32109 87654",
    customerName: company.name,
    status: "verified" as const,
    candidateFormStatus: "submitted" as const,
    createdAt: "2026-05-12T13:55:00Z",
    selectedServices: [
      { serviceId: "svc_001", serviceName: "Employment Verification" },
      { serviceId: "svc_003", serviceName: "Address Verification" },
      { serviceId: "svc_004", serviceName: "Criminal Record Check" },
    ],
    verificationCountry: "India",
  },
  {
    _id: "req_008",
    candidateName: "Priyanka Reddy",
    candidateEmail: "priyanka.reddy@email.com",
    candidatePhone: "+91 21098 76543",
    customerName: company.name,
    status: "pending" as const,
    candidateFormStatus: "pending" as const,
    createdAt: "2026-05-22T07:30:00Z",
    selectedServices: [
      { serviceId: "svc_002", serviceName: "Education Verification" },
    ],
    verificationCountry: "India",
  },
  {
    _id: "req_009",
    candidateName: "Deepak Verma",
    candidateEmail: "deepak.verma@email.com",
    candidatePhone: "+91 10987 65432",
    customerName: company.name,
    status: "approved" as const,
    candidateFormStatus: "submitted" as const,
    createdAt: "2026-05-19T12:00:00Z",
    selectedServices: [
      { serviceId: "svc_001", serviceName: "Employment Verification" },
      { serviceId: "svc_005", serviceName: "Reference Check" },
    ],
    verificationCountry: "India",
  },
  {
    _id: "req_010",
    candidateName: "Kavita Malhotra",
    candidateEmail: "kavita.malhotra@email.com",
    candidatePhone: "+91 09876 54321",
    customerName: "InnoWorks Digital",
    status: "pending" as const,
    candidateFormStatus: "submitted" as const,
    createdAt: "2026-05-23T10:15:00Z",
    selectedServices: [
      { serviceId: "svc_001", serviceName: "Employment Verification" },
      { serviceId: "svc_002", serviceName: "Education Verification" },
      { serviceId: "svc_004", serviceName: "Criminal Record Check" },
    ],
    verificationCountry: "India",
  },
  {
    _id: "req_011",
    candidateName: "Rohit Agarwal",
    candidateEmail: "rohit.agarwal@email.com",
    candidatePhone: "+91 98712 34560",
    customerName: "InnoWorks Digital",
    status: "verified" as const,
    candidateFormStatus: "submitted" as const,
    createdAt: "2026-05-10T09:00:00Z",
    selectedServices: [
      { serviceId: "svc_001", serviceName: "Employment Verification" },
      { serviceId: "svc_002", serviceName: "Education Verification" },
    ],
    verificationCountry: "India",
  },
];

export const candidateFormFields = {
  employmentVerification: [
    { question: "Current / Most Recent Employer Name", value: "Wipro Technologies Ltd.", fieldType: "text" },
    { question: "Designation / Job Title", value: "Senior Software Engineer", fieldType: "text" },
    { question: "Employee ID", value: "WPR-2024-78542", fieldType: "text" },
    { question: "Date of Joining", value: "2022-03-15", fieldType: "date" },
    { question: "Date of Leaving (if applicable)", value: "2026-04-30", fieldType: "date" },
    { question: "Reason for Leaving", value: "Career growth opportunity", fieldType: "text" },
    { question: "Last Drawn CTC (Annual)", value: "₹18,50,000", fieldType: "text" },
    { question: "Reporting Manager Name", value: "Suresh Kumar", fieldType: "text" },
    { question: "Reporting Manager Email", value: "suresh.kumar@wipro.com", fieldType: "email" },
    { question: "HR Contact Email", value: "hr.verification@wipro.com", fieldType: "email" },
  ],
  educationVerification: [
    { question: "Highest Qualification", value: "Bachelor of Technology (B.Tech)", fieldType: "text" },
    { question: "University / Institution Name", value: "Indian Institute of Technology, Delhi", fieldType: "text" },
    { question: "Year of Passing", value: "2022", fieldType: "text" },
    { question: "Specialization / Branch", value: "Computer Science & Engineering", fieldType: "text" },
    { question: "Roll Number / Registration Number", value: "2018CS10342", fieldType: "text" },
    { question: "CGPA / Percentage", value: "8.7 CGPA", fieldType: "text" },
  ],
  personalDetails: [
    { question: "Full name (as per government ID)", value: "Rahul Sharma", fieldType: "text" },
    { question: "Date of birth", value: "1999-07-14", fieldType: "date" },
    { question: "Mobile number", value: "+91 98765 43210", fieldType: "text" },
    { question: "Current residential address", value: "Flat 402, Maple Heights, Sector 62, Noida, UP 201301", fieldType: "text" },
    { question: "Primary government ID number", value: "XXXX XXXX 4523", fieldType: "text" },
    { question: "Email address", value: "rahul.sharma@email.com", fieldType: "email" },
    { question: "Nationality", value: "Indian", fieldType: "text" },
    { question: "Gender", value: "Male", fieldType: "text" },
  ],
};

export const uploadedDocuments = [
  { name: "Aadhaar_Card_Rahul.pdf", size: "1.2 MB", type: "application/pdf", uploadedAt: "2026-05-20T10:30:00Z" },
  { name: "B.Tech_Degree_Certificate.pdf", size: "2.8 MB", type: "application/pdf", uploadedAt: "2026-05-20T10:32:00Z" },
  { name: "Experience_Letter_Wipro.pdf", size: "890 KB", type: "application/pdf", uploadedAt: "2026-05-20T10:35:00Z" },
  { name: "Payslip_March_2026.pdf", size: "450 KB", type: "application/pdf", uploadedAt: "2026-05-20T10:36:00Z" },
  { name: "PAN_Card.jpg", size: "320 KB", type: "image/jpeg", uploadedAt: "2026-05-20T10:38:00Z" },
];

export const reportData = {
  reportNumber: "CLR-2026-00347",
  generatedAt: "2026-05-23T18:30:00Z",
  generatedByName: adminUser.name,
  candidate: {
    name: candidateUser.name,
    email: candidateUser.email,
    phone: candidateUser.phone,
  },
  company: {
    name: company.name,
    email: company.email,
  },
  status: "verified",
  createdAt: "2026-05-15T10:00:00Z",
  createdByName: customerUser.name,
  verifiedByName: verifierUser.name,
  personalDetails: candidateFormFields.personalDetails,
  services: [
    {
      serviceId: "svc_001",
      serviceName: "Employment Verification",
      status: "verified",
      verificationMode: "Manual",
      comment: "Employment details confirmed with Wipro HR department.",
      candidateAnswers: candidateFormFields.employmentVerification,
      attempts: [
        {
          attemptedAt: "2026-05-21T14:00:00Z",
          status: "verified",
          verificationMode: "Manual",
          comment: "Contacted Wipro HR. All details confirmed as accurate.",
          verifierName: verifierUser.name,
          managerName: adminUser.name,
          respondentName: "Priya Singh",
          respondentEmail: "priya.singh@wipro.com",
          respondentComment: "Confirmed. Employee worked from March 2022 to April 2026.",
        },
      ],
    },
    {
      serviceId: "svc_002",
      serviceName: "Education Verification",
      status: "verified",
      verificationMode: "Manual",
      comment: "Degree verified with IIT Delhi registrar office.",
      candidateAnswers: candidateFormFields.educationVerification,
      attempts: [
        {
          attemptedAt: "2026-05-22T10:30:00Z",
          status: "verified",
          verificationMode: "Manual",
          comment: "Verified with IIT Delhi academic records department.",
          verifierName: verifierUser.name,
          managerName: adminUser.name,
          respondentName: "Dr. Rajesh Gupta",
          respondentEmail: "registrar@iitd.ac.in",
          respondentComment: "Student records confirmed. B.Tech CS, 2022 batch, 8.7 CGPA.",
        },
      ],
    },
    {
      serviceId: "svc_005",
      serviceName: "Reference Check",
      status: "verified",
      verificationMode: "Manual",
      comment: "Positive feedback from professional reference.",
      candidateAnswers: [
        { question: "Reference 1 - Name", value: "Suresh Kumar", fieldType: "text" },
        { question: "Reference 1 - Designation", value: "Technical Lead, Wipro", fieldType: "text" },
        { question: "Reference 1 - Contact", value: "suresh.kumar@wipro.com", fieldType: "email" },
        { question: "Reference 1 - Relationship", value: "Direct Reporting Manager", fieldType: "text" },
      ],
      attempts: [
        {
          attemptedAt: "2026-05-22T16:00:00Z",
          status: "verified",
          verificationMode: "Manual",
          comment: "Professional reference provided positive feedback about candidate's performance.",
          verifierName: verifierUser.name,
          managerName: adminUser.name,
          respondentName: "Suresh Kumar",
          respondentEmail: "suresh.kumar@wipro.com",
          respondentComment: "Excellent team player with strong technical skills. Would recommend.",
        },
      ],
    },
  ],
};

/* ──────────────────────────────────────────────
   Step definitions for flow navigation
   ────────────────────────────────────────────── */

export type FlowStep = {
  slug: string;
  label: string;
  emoji: string;
  phase: "order" | "review" | "report";
  circleClass: string;
  animationClass: string;
};

export const flowSteps: FlowStep[] = [
  // Order & Submission
  { slug: "company-hr", label: "Company HR", emoji: "🏢", phase: "order", circleClass: "stakeholder company", animationClass: "float" },
  { slug: "creates-order", label: "Creates Order", emoji: "📋", phase: "order", circleClass: "step-blue", animationClass: "float-delay1" },
  { slug: "invite-sent", label: "Invite Sent", emoji: "📧", phase: "order", circleClass: "step-yellow", animationClass: "float-delay2" },
  { slug: "candidate", label: "Candidate", emoji: "👤", phase: "order", circleClass: "stakeholder candidate", animationClass: "float-delay3" },
  { slug: "fills-forms", label: "Fills Forms", emoji: "📝", phase: "order", circleClass: "step-green", animationClass: "float" },
  { slug: "uploads-docs", label: "Uploads Docs", emoji: "📎", phase: "order", circleClass: "step-green", animationClass: "float-delay1" },
  // Review & Verification
  { slug: "hr-reviews", label: "HR Reviews", emoji: "🏢", phase: "review", circleClass: "stakeholder company", animationClass: "pop" },
  { slug: "approved", label: "Approved", emoji: "✅", phase: "review", circleClass: "step-green", animationClass: "float" },
  { slug: "admin", label: "Admin", emoji: "🛡️", phase: "review", circleClass: "stakeholder admin", animationClass: "float-delay1" },
  { slug: "verifier", label: "Verifier", emoji: "🕵️", phase: "review", circleClass: "stakeholder verifier", animationClass: "float-delay2" },
  { slug: "checks-done", label: "Checks Done", emoji: "🔍", phase: "review", circleClass: "step-purple", animationClass: "spin-slow" },
  // Report & Decision
  { slug: "report-ready", label: "Report Ready", emoji: "📄", phase: "report", circleClass: "step-teal", animationClass: "float" },
  { slug: "delivered", label: "Delivered", emoji: "📬", phase: "report", circleClass: "step-blue", animationClass: "float-delay1" },
  { slug: "company-hr-review", label: "Company HR", emoji: "🏢", phase: "report", circleClass: "stakeholder company", animationClass: "float-delay2" },
  { slug: "hire-decision", label: "Hire Decision", emoji: "🎯", phase: "report", circleClass: "step-green", animationClass: "pop" },
];

export function getStepIndex(slug: string) {
  return flowSteps.findIndex((s) => s.slug === slug);
}

export function getPrevStep(slug: string) {
  const idx = getStepIndex(slug);
  return idx > 0 ? flowSteps[idx - 1] : null;
}

export function getNextStep(slug: string) {
  const idx = getStepIndex(slug);
  return idx >= 0 && idx < flowSteps.length - 1 ? flowSteps[idx + 1] : null;
}

export function getPhaseLabel(phase: "order" | "review" | "report") {
  const map = { order: "Order & Submission", review: "Review & Verification", report: "Report & Decision" };
  return map[phase];
}
