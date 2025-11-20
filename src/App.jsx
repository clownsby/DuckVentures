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
      name: "Craig Wiroll - DuckVentures Manager",
      desc: "Career Readiness Coach at the University Career Center. Reach out for guidance.",
      location: "University Career Center",
      link: "https://career.uoregon.edu/node/207",
      email: "cwiroll@uoregon.edu",
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
      link: "https://business.uoregon.edu/hands-on-learning/competitions/oregon-innovation-challenge",
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
      image: "https://covers.openlibrary.org/b/isbn/9781591846444-M.jpg"
    },
    { 
      title: "Creative Confidence", 
      author: "Tom & David Kelley", 
      desc: "Unleashing creativity.",
      link: "https://www.creativeconfidence.com/",
      image: "https://covers.openlibrary.org/b/isbn/9780385349369-M.jpg"
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

// This forces the root container to act like a normal website, not a centered card
const GlobalStyles = () => (
  <style>{`
    html, body, #root {
      margin: 0;
      padding: 0;
      width: 100%;
      max-width: 100% !important;
      min-width: 100% !important;
      text-align: left !important;
    }
  `}</style>
);

const Navigation = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Rocket className="w-4 h-4" /> },
    { id: 'roadmap', label: 'The Duck Map', icon: <Map className="w-4 h-4" /> },
    { id: 'idea-lab', label: 'Idea Lab', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'resources', label: 'Directory', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'library', label: 'Learning', icon: <Library className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-[#154733] text-white shadow-lg sticky top-0 z-50 w-full">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 font-bold text-xl tracking-tight cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-[#FEE123] text-[#154733] p-1.5 rounded-lg">
              <Rocket className="w-6 h-6" />
            </div>
            <span>Duck<span className="text-[#FEE123]">Ventures</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === item.id 
                    ? 'bg-[#1E6B4E] text-[#FEE123] font-medium' 
                    : 'bg-transparent text-gray-200 hover:bg-[#1E6B4E] hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#FEE123] focus:outline-none bg-transparent"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#123d2c] border-t border-[#1E6B4E]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-3 py-3 rounded-md text-base font-medium ${
                  activeTab === item.id 
                    ? 'bg-[#1E6B4E] text-[#FEE123]' 
                    : 'bg-transparent text-gray-100 hover:bg-[#1E6B4E]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ setActiveTab }) => (
  <div className="bg-gradient-to-b from-[#F4F9F6] to-white min-h-[85vh] flex items-center w-full">
    <div className="max-w-[1600px] mx-auto px-4 py-12 md:py-20 w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#E8F5E9] text-[#154733] text-sm font-medium border border-[#154733]/20">
            <GraduationCap className="w-4 h-4 mr-2" />
            For UO Students & Alumni
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#154733] leading-tight">
            From Dorm Room to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#154733] to-[#4CAF50]">Board Room</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            The comprehensive toolkit for University of Oregon students launching their own business. 
            Turn your ideas into action with local support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => setActiveTab('roadmap')}
              className="px-8 py-4 bg-[#154733] text-white rounded-xl font-semibold hover:bg-[#1E6B4E] transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('resources')}
              className="px-8 py-4 bg-white text-[#154733] border-2 border-[#154733] rounded-xl font-semibold hover:bg-[#F4F9F6] transition-all flex items-center justify-center"
            >
              Find Resources
            </button>
          </div>
          
          <div className="pt-8 flex items-center space-x-8 text-gray-500 text-sm font-medium">
            <div className="flex items-center"><Building2 className="w-4 h-4 mr-2 text-[#FEE123]" /> Local Focus</div>
            <div className="flex items-center"><BookOpen className="w-4 h-4 mr-2 text-[#FEE123]" /> Step-by-Step</div>
            <div className="flex items-center"><Users className="w-4 h-4 mr-2 text-[#FEE123]" /> Mentor Network</div>
          </div>
        </div>
        
        <div className="relative hidden md:block">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-[#FEE123] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-[#154733] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 border-b pb-4">
                <div className="w-12 h-12 bg-[#154733] rounded-full flex items-center justify-center text-white font-bold text-xl">DV</div>
                <div>
                  <h3 className="font-bold text-gray-800">Amazing Startup Idea</h3>
                  <p className="text-sm text-gray-500">Business Plan Draft</p>
                </div>
                <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Progress</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                <div className="h-2 bg-gray-100 rounded w-full"></div>
              </div>
              <div className="flex gap-2 pt-4">
                <div className="flex-1 bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Customer Interviews</p>
                  <p className="font-bold text-[#154733] text-xl">15/20</p>
                </div>
                <div className="flex-1 bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Mentoring</p>
                  <p className="font-bold text-[#154733] text-xl">Booked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Roadmap = () => {
  const [expandedStep, setExpandedStep] = useState(1);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#154733] mb-4">The Duck Map</h2>
        <p className="text-gray-600">A step-by-step guide to launching your business in Oregon.</p>
      </div>

      <div className="space-y-6 max-w-5xl mx-auto">
        {STEPS_DATA.map((step) => (
          <div 
            key={step.id} 
            className={`bg-white rounded-xl shadow-md border transition-all duration-300 overflow-hidden ${
              expandedStep === step.id ? 'border-[#154733] ring-1 ring-[#154733]' : 'border-gray-200 hover:border-[#154733]/50'
            }`}
          >
            <button 
              onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  expandedStep === step.id ? 'bg-[#154733] text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${expandedStep === step.id ? 'text-[#154733]' : 'text-gray-800'}`}>
                    {step.id}. {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 hidden sm:block">{step.description}</p>
                </div>
              </div>
              {expandedStep === step.id ? <ChevronDown className="w-5 h-5 text-[#154733]" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
            </button>

            {expandedStep === step.id && (
              <div className="px-6 pb-8 pt-0 animate-fadeIn">
                <div className="h-px w-full bg-gray-100 mb-6"></div>
                <ul className="space-y-4">
                  {step.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start space-x-3 group">
                      <CheckCircle2 className="w-5 h-5 text-[#FEE123] flex-shrink-0 mt-0.5 fill-[#154733] bg-[#154733] rounded-full" />
                      <span className="text-gray-700 group-hover:text-[#154733] transition-colors">{task}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-[#F4F9F6] rounded-lg border border-[#154733]/10">
                  <p className="text-sm text-[#154733] font-medium flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Pro Tip: Don't rush step 1. Most student startups fail because they build something nobody wants!
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const IdeaLab = () => {
  const [ideas, setIdeas] = useState(() => {
    // Lazy initialization to access localStorage safely
    const saved = localStorage.getItem('duck_ideas');
    return saved ? JSON.parse(saved) : {
      problem: "",
      solution: "",
      customer: "",
      advantage: ""
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdeas(prev => {
      const newIdeas = { ...prev, [name]: value };
      localStorage.setItem('duck_ideas', JSON.stringify(newIdeas));
      return newIdeas;
    });
  };

  const clearIdeas = () => {
    if(window.confirm("Are you sure you want to clear your canvas?")) {
      const empty = { problem: "", solution: "", customer: "", advantage: "" };
      setIdeas(empty);
      localStorage.setItem('duck_ideas', JSON.stringify(empty));
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12 w-full">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#154733] text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Idea Lab</h2>
            <p className="mb-6 text-green-100">
              Use this space to draft your business concept. This is a simplified "Lean Canvas" to help you articulate your value.
            </p>
            <div className="flex flex-col gap-3">
              <button className="flex items-center text-sm font-medium bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                <Save className="w-4 h-4 mr-2" /> Auto-saves to your browser
              </button>
              <button onClick={clearIdeas} className="flex items-center text-sm font-medium bg-red-500/20 text-red-200 p-3 rounded-lg hover:bg-red-500/30 transition-colors">
                <Trash2 className="w-4 h-4 mr-2" /> Clear Canvas
              </button>
            </div>
          </div>
          
          <div className="bg-[#FEE123]/10 border border-[#FEE123] p-6 rounded-xl">
            <h3 className="font-bold text-[#154733] mb-2">Why write it down?</h3>
            <p className="text-sm text-gray-700">
              Getting your idea out of your head and onto "paper" exposes gaps in your logic. Use these notes when you visit the LCE or talk to mentors.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <label className="flex items-center text-[#154733] font-bold mb-3">
              <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3">1</div>
              The Problem
            </label>
            <p className="text-xs text-gray-500 mb-2">What specific pain point are you solving? Be precise.</p>
            <textarea 
              name="problem"
              value={ideas.problem}
              onChange={handleChange}
              className="w-full h-32 p-4 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#154733] focus:ring-1 focus:ring-[#154733] outline-none transition-all resize-none"
              placeholder="e.g., Students in Eugene struggle to find affordable late-night food that is healthy..."
            ></textarea>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <label className="flex items-center text-[#154733] font-bold mb-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">2</div>
              Target Customer
            </label>
            <p className="text-xs text-gray-500 mb-2">Who are they? (Age, location, habits, major)</p>
            <textarea 
              name="customer"
              value={ideas.customer}
              onChange={handleChange}
              className="w-full h-32 p-4 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#154733] focus:ring-1 focus:ring-[#154733] outline-none transition-all resize-none"
              placeholder="e.g., UO Undergrads living off-campus in the West University neighborhood..."
            ></textarea>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <label className="flex items-center text-[#154733] font-bold mb-3">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">3</div>
              The Solution
            </label>
            <p className="text-xs text-gray-500 mb-2">What are you building? How does it solve the problem?</p>
            <textarea 
              name="solution"
              value={ideas.solution}
              onChange={handleChange}
              className="w-full h-32 p-4 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#154733] focus:ring-1 focus:ring-[#154733] outline-none transition-all resize-none"
              placeholder="e.g., A food truck that partners with local farms to serve $8 grain bowls after 10pm..."
            ></textarea>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <label className="flex items-center text-[#154733] font-bold mb-3">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3">4</div>
              Unfair Advantage
            </label>
            <p className="text-xs text-gray-500 mb-2">Why can YOU win this market? (Connections, skills, tech)</p>
            <textarea 
              name="advantage"
              value={ideas.advantage}
              onChange={handleChange}
              className="w-full h-32 p-4 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#154733] focus:ring-1 focus:ring-[#154733] outline-none transition-all resize-none"
              placeholder="e.g., My family owns a farm nearby, so I get ingredients at 50% cost..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResourceHub = () => {
  const [activeFilter, setActiveFilter] = useState('campus');

  const filters = [
    { id: 'campus', label: 'On Campus', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'eugene', label: 'Eugene Local', icon: <Map className="w-4 h-4" /> },
    { id: 'oregon', label: 'Statewide', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'national', label: 'National', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12 w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#154733] mb-4">Resource Directory</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          You don't have to do it alone. Eugene and Oregon have a thriving ecosystem specifically designed to help students and startups.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center px-6 py-2.5 rounded-full text-sm font-medium transition-all border ${
              activeFilter === filter.id
                ? 'bg-[#154733] text-white border-[#154733] shadow-lg transform scale-105'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#154733] hover:text-[#154733]'
            }`}
          >
            <span className="mr-2">{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCES_DATA[activeFilter].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#154733]/50 transition-all group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                item.type === 'Contact' ? 'bg-[#FEE123] text-[#154733]' : 'bg-gray-100 text-[#154733]'
              }`}>
                {item.type}
              </span>
              <div className="flex space-x-3">
                {item.email && (
                  <a href={`mailto:${item.email}`} className="text-gray-400 hover:text-[#154733]" title="Send Email">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#154733]" title="Visit Website">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#154733] transition-colors mb-2">
              {item.name}
            </h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
              {item.desc}
            </p>
            <div className="flex items-center text-xs text-gray-500 pt-4 border-t border-gray-100 mt-auto">
              <Map className="w-3 h-3 mr-1" /> {item.location}
            </div>
          </div>
        ))}
      </div>
      
      {activeFilter === 'oregon' && (
        <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100 flex items-start space-x-4">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
             <BookOpen className="w-5 h-5" />
          </div>
          <div>
             <h4 className="font-bold text-blue-900">State Registration Note</h4>
             <p className="text-sm text-blue-800 mt-1">
               Registering a business in Oregon is handled by the Secretary of State. It typically costs $100 for an LLC. 
               Always check if your business name is unique first using their online database.
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

const LearningLibrary = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#154733] mb-4">Learning Library</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Curated books, podcasts, and talks to build your entrepreneurial mindset.
        </p>
      </div>

      <div className="space-y-12">
        {/* Books Section */}
        <div>
          <div className="flex items-center mb-6 text-[#154733]">
            <BookOpen className="w-6 h-6 mr-2" />
            <h3 className="text-2xl font-bold">Essential Reading</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MEDIA_DATA.books.map((book, idx) => (
              <a 
                key={idx} 
                href={book.link}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group block relative"
              >
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#154733] z-10 bg-white rounded-full p-1 shadow-md">
                   <ExternalLink className="w-4 h-4" />
                </div>
                <div className="h-48 mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="h-full w-auto object-contain shadow-md group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.style.display = 'none'; 
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                    <BookOpen className="w-12 h-12" />
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 leading-tight mb-1 group-hover:text-[#154733] transition-colors line-clamp-1">{book.title}</h4>
                <p className="text-xs text-[#154733] font-medium mb-2">{book.author}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{book.desc}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Podcasts */}
          <div>
            <div className="flex items-center mb-6 text-[#154733]">
              <Headphones className="w-6 h-6 mr-2" />
              <h3 className="text-2xl font-bold">Podcasts</h3>
            </div>
            <div className="space-y-4">
              {MEDIA_DATA.podcasts.map((pod, idx) => (
                <a 
                  key={idx} 
                  href={pod.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#154733]/30 transition-all group"
                >
                  <div className="bg-[#FEE123] p-2 rounded-lg mr-4 text-[#154733] group-hover:scale-110 transition-transform">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#154733] transition-colors">{pod.title}</h4>
                      <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-[#154733]" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{pod.author}</p>
                    <p className="text-xs text-gray-600 mt-1">{pod.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div>
            <div className="flex items-center mb-6 text-[#154733]">
              <Video className="w-6 h-6 mr-2" />
              <h3 className="text-2xl font-bold">Must-Watch Talks</h3>
            </div>
            <div className="space-y-4">
              {MEDIA_DATA.videos.map((vid, idx) => (
                <a 
                  key={idx} 
                  href={vid.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all group"
                >
                  <div className="bg-red-50 p-2 rounded-lg mr-4 text-red-500 group-hover:scale-110 transition-transform">
                    <Video className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-900 text-sm group-hover:text-red-600 transition-colors">{vid.title}</h4>
                      <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-red-500" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{vid.author}</p>
                    <p className="text-xs text-gray-600 mt-1">{vid.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ setActiveTab }) => (
  <footer className="bg-[#154733] text-white py-12 mt-12 border-t border-[#1E6B4E] w-full">
    <div className="max-w-[1600px] mx-auto px-4 grid md:grid-cols-4 gap-8">
      <div className="col-span-2">
        <div className="flex items-center space-x-2 font-bold text-xl mb-4">
          <div className="bg-[#FEE123] text-[#154733] p-1 rounded">
            <Rocket className="w-4 h-4" />
          </div>
          <span>Duck<span className="text-[#FEE123]">Ventures</span></span>
        </div>
        <p className="text-green-100/70 text-sm leading-relaxed max-w-xs">
          Helping University of Oregon students navigate the startup ecosystem. Built for Ducks, by Ducks.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-[#FEE123] mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm text-green-100/70">
          <li><button onClick={() => setActiveTab('roadmap')} className="text-green-100/70 hover:text-white bg-transparent text-left">The Roadmap</button></li>
          <li><button onClick={() => setActiveTab('idea-lab')} className="text-green-100/70 hover:text-white bg-transparent text-left">Idea Canvas</button></li>
          <li><button onClick={() => setActiveTab('resources')} className="text-green-100/70 hover:text-white bg-transparent text-left">Resource Directory</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-[#FEE123] mb-4">External Tools</h4>
        <ul className="space-y-2 text-sm text-green-100/70">
          <li><a href="https://sos.oregon.gov/business/" target="_blank" rel="noopener noreferrer" className="text-green-100/70 hover:text-white flex items-center transition-colors">Oregon Business Registry <ExternalLink className="w-3 h-3 ml-1"/></a></li>
          <li><a href="https://business.uoregon.edu/directory/lce" target="_blank" rel="noopener noreferrer" className="text-green-100/70 hover:text-white flex items-center transition-colors">Lundquist Center <ExternalLink className="w-3 h-3 ml-1"/></a></li>
          <li><a href="https://www.raincatalysts.org/" target="_blank" rel="noopener noreferrer" className="text-green-100/70 hover:text-white flex items-center transition-colors">RAIN Catalysts <ExternalLink className="w-3 h-3 ml-1"/></a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-[1600px] mx-auto px-4 mt-12 pt-8 border-t border-[#1E6B4E] text-center text-xs text-green-100/40">
      <p>© {new Date().getFullYear()} DuckVentures. Not officially affiliated with the University of Oregon.</p>
    </div>
  </footer>
);

// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#F4F9F6] font-sans text-gray-900 w-full">
      <GlobalStyles />
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="animate-fadeIn w-full">
        {activeTab === 'home' && <Hero setActiveTab={setActiveTab} />}
        {activeTab === 'roadmap' && <Roadmap />}
        {activeTab === 'idea-lab' && <IdeaLab />}
        {activeTab === 'resources' && <ResourceHub />}
        {activeTab === 'library' && <LearningLibrary />}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;