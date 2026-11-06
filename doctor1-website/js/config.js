/**
 * Dr. Neelima - Nephrologist & Kidney Specialist
 * Shared Configuration & Doctor Information
 * All details strictly conform to verified credentials.
 */

/* =========================================================================
   EMAILJS CONFIGURATION (Appointment Confirmation Emails)
   Active verified EmailJS credentials for automated patient confirmations:
   ========================================================================= */
const EMAILJS_CONFIG = {
  publicKey: "AKQHr6OCf_s1cOXcg",
  serviceId: "service_mq7h8s8",
  templateId: "template_1dj11uf",
  doctorEmail: "drneelima@gmail.com",
  hospitalName: "MIMS Hospital, Kannur"
};

if (typeof window !== "undefined") {
  window.EMAILJS_CONFIG = EMAILJS_CONFIG;
}

const CONFIG = {
  // EmailJS integration reference
  emailjs: EMAILJS_CONFIG,

  // SEO & Base URL (do not invent a domain; canonical & og:url are only injected if non-empty)
  siteUrl: "",

  // Doctor Profile
  doctor: {
    name: "Dr. Neelima",
    designation: "Nephrologist / Kidney Specialist",
    hospital: "MIMS Hospital",
    address: "Chala East, Chala Bypass, Kannur, Kerala 670621, India",
    area: "Kannur",
    state: "Kerala",
    pincode: "670621",
    country: "India",
    phone: "+91 7306003583",
    tel: "+917306003583",
    whatsapp: "+91 9037822668",
    wa: "919037822668",
    email: "drneelima@gmail.com",
    timings: "Monday to Saturday: 9:00 AM to 4:00 PM; Sunday: 9:00 AM to 5:30 PM",
    t1: "Monday to Saturday: 9:00 AM to 4:00 PM",
    t2: "Sunday: 9:00 AM to 5:30 PM",
    qualifications: "MBBS, MD (General Medicine), DM (Nephrology)",
    experience: "14 years",
    experienceYears: 14,
    previousHospitals: "Amrutha Hospital, Kochi; Vinsta Clinic, Kannur",
    memberships: "ASN, ISOT, ISNSC",
    registration: "Registered with Kerala State Medical Council (KSMC)",
    achievements: "University Rank Holder; Gold Medal in MBBS / MD / DM; Academic Excellence Awards",
    mapLink: "https://share.google/ST4qcN1ybpTRSNb7W",
    mapEmbedUrl: "https://www.google.com/maps?q=MIMS+Hospital+Chala+Bypass+Kannur+Kerala+670621&output=embed"
  },

  // 7 Condition Detail Pages
  conditions: [
    {
      id: "chronic-kidney-disease",
      url: "condition-chronic-kidney-disease.html",
      title: "Chronic Kidney Disease (CKD)",
      summary: "A long-term, gradual loss of kidney function that can go unnoticed for years."
    },
    {
      id: "acute-kidney-injury",
      url: "condition-acute-kidney-injury.html",
      title: "Acute Kidney Injury (AKI)",
      summary: "A sudden drop in kidney function over hours or days."
    },
    {
      id: "kidney-stones",
      url: "condition-kidney-stones.html",
      title: "Kidney Stones",
      summary: "Hard deposits of minerals and salts that form in the kidneys."
    },
    {
      id: "diabetic-kidney-disease",
      url: "condition-diabetic-kidney-disease.html",
      title: "Diabetic Kidney Disease",
      summary: "Kidney damage linked to long-standing diabetes."
    },
    {
      id: "high-blood-pressure-and-kidney-problems",
      url: "condition-high-blood-pressure-and-kidney-problems.html",
      title: "High Blood Pressure and Kidney Problems",
      summary: "Blood pressure and kidney health affect each other."
    },
    {
      id: "glomerular-diseases",
      url: "condition-glomerular-diseases.html",
      title: "Glomerular Diseases",
      summary: "Conditions that affect the tiny filters of the kidneys."
    },
    {
      id: "kidney-transplant-care",
      url: "condition-kidney-transplant-care.html",
      title: "Kidney Transplant Care",
      summary: "Care before and after a kidney transplant."
    }
  ],

  // 6 Clinical Services Detail Pages
  services: [
    {
      id: "kidney-function-evaluation",
      url: "service-kidney-function-evaluation.html",
      title: "Kidney Function Evaluation",
      summary: "A clear picture of how well your kidneys are working."
    },
    {
      id: "dialysis-care",
      url: "service-dialysis-care.html",
      title: "Dialysis Care",
      summary: "Guidance and follow-up for people who need dialysis."
    },
    {
      id: "kidney-disease-management",
      url: "service-kidney-disease-management.html",
      title: "Kidney Disease Management",
      summary: "A steady plan to protect your kidney function over time."
    },
    {
      id: "kidney-transplant-follow-up",
      url: "service-kidney-transplant-follow-up.html",
      title: "Kidney Transplant Follow-up",
      summary: "Regular check-ups after a kidney transplant."
    },
    {
      id: "blood-pressure-management",
      url: "service-blood-pressure-management.html",
      title: "Blood Pressure Management",
      summary: "Blood pressure care that keeps your kidneys in mind."
    },
    {
      id: "preventive-kidney-care",
      url: "service-preventive-kidney-care.html",
      title: "Preventive Kidney Care",
      summary: "Screening and daily habits that help protect your kidneys."
    }
  ],

  // 6 Blog Articles
  articles: [
    {
      url: "blog-early-signs-of-kidney-disease.html",
      title: "Early Signs of Kidney Disease: What Your Body May Be Telling You",
      summary: "Kidney damage often progresses quietly. Recognizing subtle changes early is crucial for effective kidney protection.",
      readTime: "3 min read"
    },
    {
      url: "blog-keeping-kidneys-healthy.html",
      title: "7 Everyday Habits for Keeping Your Kidneys Healthy",
      summary: "Practical, evidence-backed lifestyle choices to protect your renal filters and overall vitality.",
      readTime: "4 min read"
    },
    {
      url: "blog-diabetes-and-kidney-health.html",
      title: "Diabetes and Kidney Health: Understanding Diabetic Nephropathy",
      summary: "How high blood glucose impacts kidney filters and the routine tests every diabetic patient needs.",
      readTime: "4 min read"
    },
    {
      url: "blog-creatinine-test.html",
      title: "Understanding Your Serum Creatinine and eGFR Test Results",
      summary: "What normal and elevated creatinine levels mean, and why a single number is only one piece of the puzzle.",
      readTime: "3 min read"
    },
    {
      url: "blog-what-is-dialysis.html",
      title: "What is Dialysis? Types, Expectations and Patient Guidance",
      summary: "A gentle, plain-language walkthrough of hemodialysis and peritoneal dialysis for patients and families.",
      readTime: "4 min read"
    },
    {
      url: "blog-kidney-friendly-lifestyle.html",
      title: "A Kidney-Friendly Lifestyle: Diet, Hydration and Daily Care",
      summary: "Sensible nutrition, safe painkiller use, and balanced salt and water intake tailored for renal well-being.",
      readTime: "4 min read"
    }
  ]
};

// Expose globally
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
