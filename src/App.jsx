import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Map, 
  Lightbulb, 
  Users, 
  Building2, 
  BookOpen, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  ArrowRight,
  Briefcase,
  GraduationCap,
  Landmark,
  Search,
  Menu,
  X,
  ExternalLink,
  Save,
  Trash2,
  Globe,
  Headphones,
  Video,
  Library,
  Mail
} from 'lucide-react';

// --- Data & Content ---

const STEPS_DATA = [
  {
    id: 1,
    title: "Ideation & Validation",
    description: "Before you register anything, prove people want what you're building.",
    icon: <Lightbulb className="w-6 h-6" />,
    tasks: [
      "Identify a specific problem you are solving.",
      "Interview at least 15 potential customers (students or locals).",
      "Draft a basic 'Lean Canvas' business model.",
      "Check out the 'Idea Lab' tab in this app to structure your thoughts.",
      "Visit the Lundquist Center for Entrepreneurship (LCE) in Lillis."
    ]
  },
  {
    id: 2,
    title: "Name & Structure",
    description: "Make it official. Decide what you are and what you're called.",
    icon: <Building2 className="w-6 h-6" />,
    tasks: [
      "Search the Oregon Business Registry to ensure your name is available.",
      "Decide structure: Sole Proprietorship (easiest) vs. LLC (protection).",
      "Secure your .com domain and social media handles.",
      "Design a simple logo (can use UO design lab resources)."
    ]
  },
  {
    id: 3,
    title: "Registration & Legal",
    description: "The paperwork required by the State of Oregon and the Feds.",
    icon: <Landmark className="w-6 h-6" />,
    tasks: [
      "Register with Oregon Secretary of State ($100 for LLCs).",
      "Get an EIN (Employer ID Number) from the IRS (Free & Online).",
      "Open a separate business bank account (Don't mix personal funds!).",
      "Check for local Eugene business licenses if operating off-campus."
    ]
  },
  {
    id: 4,
    title: "Launch & Growth",
    description: "Get your first users and find funding.",
    icon: <Rocket className="w-6 h-6" />,
    tasks: [
      "Apply for the 'New Venture Championship' at UO.",
      "Connect with 'Onward Eugene' for local mentorship.",
      "Build a Minimum Viable Product (MVP).",
      "Look into OEN (Oregon Entrepreneurs Network) for funding."
    ]
  }
];

const RESOURCES_DATA = {
  campus: [
    {
      name: "Craig Wiroll - Pathway Specialist",
      desc: "Career Readiness Coach at the University Career Center. Reach out for guidance.",
      location: "University Career Center",
      link: "mailto:cwiroll@uoregon.edu",
      type: "Contact"
    },
    {
      name: "Lundquist Center for Entrepreneurship",
      desc: "The central hub for innovation since 1989. Programs, events, competitions, and classes.",
      location: "Lillis Business Complex",
      link: "https://business.uoregon.edu/faculty/centers/lce",
      type: "Center"
    },
    {
      name: "Minor in Entrepreneurship",
      desc: "Open to non-business majors. Develop, test, and build a venture within an interdisciplinary framework.",
      location: "Lundquist College",
      link: "https://business.uoregon.edu/programs/undergraduate/minors-certificates/entrepreneurship",
      type: "Academic"
    },
    {
      name: "Oregon Innovation Challenge (OIC)",
      desc: "Flagship incubator program open to all majors. Workshops, mentorship, and up to $10k funding.",
      location: "Campus Wide",
      link: "https://www.uoic.org/",
      type: "Competition"
    },
    {
      name: "Translational Opportunity Fund",
      desc: "Competitive grants to UO researchers/innovators to translate research into startups.",
      location: "Research & Innovation",
      link: "https://research.uoregon.edu/plan/find-funding/internal-funding-opportunities",
      type: "Funding"
    },
    {
      name: "Duck Ventures",
      desc: "Student group educating on early-stage equity investments, VC, and angel investing.",
      location: "Student Org",
      link: "#",
      type: "Club"
    },
    {
      name: "Oregon Consulting Group",
      desc: "Professionally managed, student-run consulting agency working with real companies.",
      location: "Lundquist College",
      link: "https://business.uoregon.edu/organizations/ocg",
      type: "Experience"
    },
    {
      name: "NSF I-Corps Method",
      desc: "Training for commercializing research. $50k grant potential for customer discovery.",
      location: "Regional Hub",
      link: "https://venturecatalyst.ucdavis.edu/nsficorps",
      type: "Training"
    },
    {
      name: "V10 Summit",
      desc: "Weekend retreat at Timberline Lodge for top student entrepreneurs across the country.",
      location: "Timberline Lodge",
      link: "https://www.v10.org/",
      type: "Event"
    },
    {
      name: "New Venture Championship",
      desc: "International business competition for graduate students with a substantial prize purse.",
      location: "Lundquist College",
      link: "https://business.uoregon.edu/programs/graduate/new-venture-championship",
      type: "Competition"
    }
  ],
  eugene: [
    {
      name: "Lane SBDC",
      desc: "Free, confidential one-on-one business advising. Help with plans, financing, and marketing.",
      location: "LCC Downtown",
      link: "https://lanesbdc.com/business-advising/",
      type: "Advising"
    },
    {
      name: "Onward Eugene",
      desc: "Nonprofit fueling economic prosperity. Incubators, mentorship, and pitch competitions.",
      location: "Downtown Eugene",
      link: "https://onwardeugene.org/",
      type: "Accelerator"
    },
    {
      name: "Community LendingWorks",
      desc: "CDFI offering access to capital and asset-building services with technical assistance.",
      location: "Springfield/Eugene",
      link: "https://communitylendingworks.org/",
      type: "Funding"
    },
    {
      name: "RAIN Catalysts",
      desc: "Regional Accelerator & Innovation Network. Free mentorship and resources.",
      location: "Eugene/Springfield",
      link: "https://rainincubators.org/",
      type: "Network"
    },
    {
      name: "Eugene Chamber of Commerce",
      desc: "Advocacy, resources, and networking. Hosts Business Leaders Task Teams.",
      location: "1401 Willamette St",
      link: "https://www.eugenechamber.com/",
      type: "Chamber"
    },
    {
      name: "Open Eugene",
      desc: "Community-driven initiative for technologists, artists, and civic leaders. Hackathons & meetups.",
      location: "Eugene",
      link: "https://openeugene.org/",
      type: "Community"
    },
    {
      name: "Huerto de la Familia",
      desc: "Supports Latino families with organic agriculture training and business creation. (Spanish services).",
      location: "Lane County",
      link: "https://huertodelafamilia.org/",
      type: "Nonprofit"
    },
    {
      name: "Eugene-Springfield Startups",
      desc: "Meetup group for networking and 'PubTalk Entrepreneur Mixer' events.",
      location: "Various Locations",
      link: "https://www.meetup.com/en-AU/Eugene-Startups/",
      type: "Networking"
    },
    {
      name: "City of Eugene Loans",
      desc: "Business Growth Loans, Façade Improvement Loans, and Downtown Loans.",
      location: "City Gov",
      link: "https://www.eugene-or.gov/812/Economic-Development",
      type: "Funding"
    }
  ],
  oregon: [
    {
      name: "Oregon Entrepreneurs Network",
      desc: "Statewide nonprofit connecting peers, mentors, and funding. 28-year track record.",
      location: "Portland / Statewide",
      link: "https://www.oen.org/",
      type: "Network"
    },
    {
      name: "Oregon Secretary of State",
      desc: "Official business registration portal. Check name availability and file articles.",
      location: "Online",
      link: "https://sos.oregon.gov/business/",
      type: "Government"
    },
    {
      name: "GCAP",
      desc: "Government Contract Assistance Program. Help marketing goods to gov agencies.",
      location: "Statewide",
      link: "https://orapexaccelerator.org/",
      type: "Contracting"
    },
    {
      name: "Collaborative EDO",
      desc: "Supports innovation and business growth across Southern Oregon.",
      location: "Southern Oregon",
      link: "https://www.collaborativeedo.org/innovate",
      type: "Regional"
    }
  ],
  national: [
    {
      name: "Y Combinator",
      desc: "The world's most famous accelerator. Airbnb, Dropbox, Stripe alumni. $700B+ valuation.",
      location: "Mountain View / Remote",
      link: "https://www.ycombinator.com/",
      type: "Accelerator"
    },
    {
      name: "Techstars",
      desc: "Global investment business with mentorship and customized programming.",
      location: "Global",
      link: "https://www.techstars.com/",
      type: "Accelerator"
    },
    {
      name: "500 Global",
      desc: "One of the most active early-stage investors globally. Twilio, Canva alumni.",
      location: "Global",
      link: "https://500.co/",
      type: "VC/Accelerator"
    },
    {
      name: "MassChallenge",
      desc: "Zero-equity model accelerator. Provides resources without taking a stake.",
      location: "Boston / Global",
      link: "https://masschallenge.org/",
      type: "Non-profit"
    },
    {
      name: "AngelPad",
      desc: "Highly selective, hands-on program ranked among top US accelerators.",
      location: "NYC / SF",
      link: "https://angelpad.org/",
      type: "Accelerator"
    },
    {
      name: "Founder Institute",
      desc: "Global network helping entrepreneurs launch fundable businesses.",
      location: "Global",
      link: "https://fi.co/",
      type: "Incubator"
    },
    {
      name: "America's SBDC",
      desc: "The most comprehensive small business assistance network in the US.",
      location: "Nationwide",
      link: "https://americassbdc.org/",
      type: "Advising"
    }
  ]
};

const MEDIA_DATA = {
  books: [
    { 
      title: "The Lean Startup", 
      author: "Eric Ries", 
      desc: "Rapid iteration and learning.",
      link: "http://theleanstartup.com/book",
      image: "https://covers.openlibrary.org/b/isbn/9780307887894-M.jpg"
    },
    { 
      title: "Zero to One", 
      author: "Peter Thiel", 
      desc: "Building unique companies.",
      link: "https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296",
      image: "https://covers.openlibrary.org/b/isbn/9780804139298-M.jpg"
    },
    { 
      title: "The Hard Thing About Hard Things", 
      author: "Ben Horowitz", 
      desc: "Practical advice on struggle.",
      link: "https://www.amazon.com/Hard-Thing-About-Things-Building/dp/0062273205",
      image: "https://covers.openlibrary.org/b/isbn/9780062273208-M.jpg"
    },
    { 
      title: "Shoe Dog", 
      author: "Phil Knight", 
      desc: "Memoir of Nike's UO alum founder.",
      link: "https://www.simonandschuster.com/books/Shoe-Dog/Phil-Knight/9781501135927",
      image: "https://covers.openlibrary.org/b/isbn/9781501135910-M.jpg"
    },
    { 
      title: "Start with Why", 
      author: "Simon Sinek", 
      desc: "Inspiring action through purpose.",
      link: "https://simonsinek.com/books/start-with-why/",
      image: "https://covers.openlibrary.org/b/isbn/9780241958223-M.jpg"
    },
    { 
      title: "Creative Confidence", 
      author: "Tom & David Kelley", 
      desc: "Unleashing creativity.",
      link: "https://www.creativeconfidence.com/",
      image: "https://covers.openlibrary.org/b/isbn/9780007517978-M.jpg"
    },
    { 
      title: "The E-Myth Revisited", 
      author: "Michael E. Gerber", 
      desc: "Why most small businesses fail.",
      link: "https://emyth.com/",
      image: "https://covers.openlibrary.org/b/isbn/9780887307287-M.jpg"
    },
    { 
      title: "How I Built This", 
      author: "Guy Raz", 
      desc: "The unexpected paths to success from the world's most inspiring entrepreneurs.",
      link: "https://www.amazon.com/How-Built-This-Unexpected-Entrepreneurs/dp/0358216761",
      image: "https://covers.openlibrary.org/b/isbn/9780358216766-M.jpg"
    }
  ],
  podcasts: [
    { 
      title: "How I Built This", 
      author: "Guy Raz", 
      desc: "Stories behind the world's best companies.",
      link: "https://www.npr.org/series/490248027/how-i-built-this"
    },
    { 
      title: "StartUp", 
      author: "Gimlet Media", 
      desc: "A series about what it's really like to get a business off the ground.",
      link: "https://open.spotify.com/show/5C669Dwd3Wl36YJ9oZk7x9"
    },
    { 
      title: "The Tim Ferriss Show", 
      author: "Tim Ferriss", 
      desc: "Deconstructing world-class performers.",
      link: "https://tim.blog/podcast/"
    },
    { 
      title: "Financial Wellness", 
      author: "UO Financial Aid", 
      desc: "Becoming Your Own Boss.",
      link: "https://financialaid.uoregon.edu/financial_wellness"
    }
  ],
  videos: [
    { 
      title: "How to Build Creative Confidence", 
      author: "David Kelley", 
      desc: "TED Talk",
      link: "https://www.ted.com/talks/david_kelley_how_to_build_your_creative_confidence"
    },
    { 
      title: "How Great Leaders Inspire Action", 
      author: "Simon Sinek", 
      desc: "TED Talk",
      link: "https://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action"
    },
    { 
      title: "The Power of Vulnerability", 
      author: "Brené Brown", 
      desc: "TED Talk",
      link: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability"
    },
    { 
      title: "The Single Biggest Reason Startups Succeed", 
      author: "Bill Gross", 
      desc: "TED Talk",
      link: "https://www.ted.com/talks/bill_gross_the_single_biggest_reason_why_startups_succeed"
    }
  ]
};

// --- Components ---

const Navigation = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Rocket className="w-4 h-4" /> },
    { id: 'roadmap', label: 'The Duck Map', icon: <Map className="w-4 h-4" /> },
    { id: 'idea-lab', label: 'Idea Lab', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'resources', label: 'Directory', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'library', label: 'Learning', icon: <Library className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-[#154733] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4">