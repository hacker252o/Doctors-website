/* ---------- Site Configuration ---------- */

const siteConfig = {
  brand: {
    name: "Lumière Clinic",

    tagline: "Expert Healthcare You Can Trust",

    subtagline:
      "A premium modern healthcare experience with expert doctors and advanced treatment.",

    logoMark: "L",
  },

  contact: {
    phone: "+1 (555) 000-0000",

    whatsapp: "15550000000",

    email: "hello@clinic.com",

    address:
      "1200 Wellness Avenue, Suite 400, New York, NY 10001",

    hours: [
      {
        label: "Mon - Fri",
        value: "8:00 AM - 8:00 PM",
      },

      {
        label: "Saturday",
        value: "9:00 AM - 5:00 PM",
      },

      {
        label: "Sunday",
        value: "Emergency Only",
      },
    ],

    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.123!2d-73.9857!3d40.7484",
  },

  emergency: {
    label: "24/7 Emergency Hotline",

    number: "+1 (555) 000-9111",
  },

  social: {
    instagram: "https://instagram.com",

    facebook: "https://facebook.com",

    twitter: "https://twitter.com",

    linkedin: "https://linkedin.com",

    youtube: "https://youtube.com",
  },

  stats: [
    {
      value: "15+",
      label: "Years of Care",
    },

    {
      value: "10k+",
      label: "Happy Patients",
    },

    {
      value: "50+",
      label: "Expert Specialists",
    },

    {
      value: "24/7",
      label: "Emergency Support",
    },
  ],

  services: [
    {
      key: "general",

      title: "General Consultation",

      blurb:
        "Comprehensive checkups and personalized treatment plans.",

      icon: "Stethoscope",
    },

    {
      key: "child",

      title: "Child Care",

      blurb:
        "Expert pediatric care in a calm and friendly environment.",

      icon: "Baby",
    },

    {
      key: "heart",

      title: "Heart Care",

      blurb:
        "Advanced cardiology and preventive heart treatment.",

      icon: "HeartPulse",
    },

    {
      key: "dental",

      title: "Dental Care",

      blurb:
        "Modern cosmetic and restorative dentistry.",

      icon: "Smile",
    },

    {
      key: "skin",

      title: "Skin Treatment",

      blurb:
        "Dermatology and aesthetic skincare solutions.",

      icon: "Sparkles",
    },

    {
      key: "diagnostics",

      title: "Diagnostics",

      blurb:
        "Advanced lab testing and medical imaging.",

      icon: "Microscope",
    },

    {
      key: "emergency",

      title: "Emergency Care",

      blurb:
        "24/7 emergency response and trauma care.",

      icon: "Ambulance",
    },
  ],

  whyChooseUs: [
    {
      title: "Experienced Doctors",

      blurb:
        "Board-certified specialists with years of experience.",

      icon: "GraduationCap",
    },

    {
      title: "Advanced Equipment",

      blurb:
        "Latest medical technology and diagnostics.",

      icon: "Activity",
    },

    {
      title: "Emergency Support",

      blurb:
        "Critical care support available anytime.",

      icon: "Siren",
    },

    {
      title: "Affordable Care",

      blurb:
        "Transparent pricing and flexible plans.",

      icon: "ShieldCheck",
    },

    {
      title: "Trusted Treatment",

      blurb:
        "Evidence-based treatment with compassionate care.",

      icon: "Award",
    },
  ],

  testimonials: [
    {
      name: "Eleanor R.",

      role: "Cardiology Patient",

      rating: 5,

      quote:
        "The doctors were calm, professional and genuinely caring.",
    },

    {
      name: "Marcus T.",

      role: "General Care",

      rating: 5,

      quote:
        "Beautiful clinic and exceptional medical service.",
    },

    {
      name: "Priya S.",

      role: "Mother of Two",

      rating: 5,

      quote:
        "Amazing pediatric care and friendly staff.",
    },

    {
      name: "James W.",

      role: "Diagnostics Patient",

      rating: 5,

      quote:
        "Fast reports and premium healthcare experience.",
    },
  ],

  faqs: [
    {
      q: "Do I need an appointment?",

      a:
        "Appointments are recommended to reduce waiting times.",
    },

    {
      q: "Do you accept insurance?",

      a:
        "Yes, we work with major insurance providers.",
    },

    {
      q: "How fast can I get an appointment?",

      a:
        "Most appointments are available within 24 to 48 hours.",
    },

    {
      q: "Do you provide online consultation?",

      a:
        "Yes, secure video consultations are available.",
    },

    {
      q: "Is parking available?",

      a:
        "Yes, complimentary parking is available onsite.",
    },
  ],

  gallery: [
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80",
  ],

  images: {
    hero:
      "https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?auto=format&fit=crop&w=1400&q=85",

    about:
      "https://images.unsplash.com/photo-1673865641073-4479f93a7776?auto=format&fit=crop&w=1200&q=85",
  },

  timings: [
    {
      label: "Mon - Fri",
      value: "08:00 - 20:00",
    },

    {
      label: "Saturday",
      value: "09:00 - 17:00",
    },

    {
      label: "Sunday",
      value: "Emergency Only",
    },
  ],
};

export default siteConfig;