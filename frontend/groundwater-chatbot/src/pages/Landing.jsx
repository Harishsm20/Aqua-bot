import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: "💧",
      title: "Real-Time Water Level Monitoring",
      description: "Access live groundwater level data from 24,000+ CGWB monitoring stations across India. Get instant insights into water table depths, seasonal trends, and critical alerts.",
      color: "bg-blue-500",
      stat: "24K+ Stations"
    },
    {
      icon: "🗺️",
      title: "Comprehensive Hydrogeological Data",
      description: "Explore detailed aquifer maps, geological formations, and groundwater flow patterns. Understand your area's unique hydrogeological characteristics with AI-powered analysis.",
      color: "bg-purple-500",
      stat: "All India Coverage"
    },
    {
      icon: "🧪",
      title: "Water Quality Assessment",
      description: "Check groundwater quality parameters against BIS/WHO standards. Identify contamination risks including fluoride, arsenic, nitrate, and salinity levels in your region.",
      color: "bg-red-500",
      stat: "10+ Parameters"
    },
    {
      icon: "📊",
      title: "GEC  Resource Assessment",
      description: "Get accurate groundwater resource assessments following official GEC  methodology. Understand extraction stages, recharge potential, and categorization status.",
      color: "bg-orange-500",
      stat: "385 Blocks (TN)"
    },
    {
      icon: "📋",
      title: "NOC Guidance & Compliance",
      description: "Navigate the CGWA NOC application process with step-by-step guidance. Understand regulatory requirements, documentation needs, and compliance conditions.",
      color: "bg-yellow-500",
      stat: "100% Compliant"
    },
    {
      icon: "🌱",
      title: "Management & Solutions",
      description: "Discover sustainable groundwater management practices, artificial recharge techniques, and conservation strategies tailored to your geological terrain.",
      color: "bg-green-500",
      stat: "50+ Techniques"
    }
  ];

  const stats = [
    { number: "25+", label: "Knowledge Domains" },
    { number: "24K+", label: "Monitoring Stations" },
    { number: "385", label: "Assessment Units" },
    { number: "24/7", label: "AI Availability" }
  ];

  const useCases = [
    {
      title: "Government Agencies",
      description: "CGWB, State Water Departments, Municipal Corporations",
      icon: "🏛️"
    },
    {
      title: "Industries & Businesses",
      description: "Manufacturing, Agriculture, Real Estate, Mining",
      icon: "🏭"
    },
    {
      title: "Consultants & Engineers",
      description: "Hydrogeologists, Environmental Consultants, Planners",
      icon: "👨‍💼"
    },
    {
      title: "Researchers & Students",
      description: "Academic Institutions, Research Organizations",
      icon: "🎓"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💧</span>
            <div>
              <h1 className="text-xl font-bold text-slate-800">AquaBot AI</h1>
              <p className="text-xs text-slate-500">Groundwater Intelligence System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900">Features</a>
            <a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900">How It Works</a>
            <a href="#use-cases" className="text-sm text-slate-600 hover:text-slate-900">Use Cases</a>
            <button
              onClick={() => navigate("/chat")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              Launch AquaBot
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Powered by RAG + LLM
              </div>
              <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                India's First AI-Powered Groundwater Information System
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Get instant answers to groundwater queries using cutting-edge Retrieval-Augmented Generation (RAG) technology. Access real-time data from CGWB, comprehensive hydrogeological insights, and expert guidance—all through natural conversation.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/chat")}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition font-medium text-lg shadow-lg hover:shadow-xl"
                >
                  Start Chatting Now
                </button>
                <button
                  onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-slate-700 px-8 py-4 rounded-xl hover:bg-slate-50 transition font-medium text-lg border-2 border-slate-200"
                >
                  Watch Demo
                </button>
              </div>
              <div className="mt-12 flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-600">Live Data from India-WRIS</span>
                </div>
                <div className="text-sm text-slate-600">Trusted by CGWB</div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl p-8 text-white">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      👤
                    </div>
                    <div className="bg-white/20 rounded-2xl rounded-tr-none px-4 py-3 flex-1">
                      <p className="text-sm">What is the current water level in Coimbatore district?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      💧
                    </div>
                    <div className="bg-white text-slate-800 rounded-2xl rounded-tl-none px-4 py-3 flex-1 text-sm">
                      <p className="font-medium mb-2">Real-time Data from Coimbatore:</p>
                      <p className="text-xs leading-relaxed">Station COIM250 (Peruntholavu) shows water level at -19.2 m below ground level. Station COIM261 records -7.5 m. Both stations show stable seasonal trends with adequate recharge during NE monsoon...</p>
                      <div className="flex gap-2 mt-3">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Real-time WRIS Data</span>
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Water Level Monitoring</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-2xl font-bold">25+</p>
                    <p className="text-xs opacity-80">Knowledge Domains</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-2xl font-bold">&lt;2s</p>
                    <p className="text-xs opacity-80">Response Time</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-2xl font-bold">99%</p>
                    <p className="text-xs opacity-80">Accuracy</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Comprehensive Groundwater Intelligence</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to understand, manage, and protect groundwater resources—powered by AI and backed by official CGWB data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveFeature(i)}
                className={`bg-white rounded-xl p-6 border-2 transition-all cursor-pointer ${
                  activeFeature === i
                    ? "border-blue-500 shadow-xl scale-105"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-lg"
                }`}
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{feature.description}</p>
                <div className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                  {feature.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How AquaBot Works</h2>
            <p className="text-xl text-slate-600">Advanced RAG technology meets groundwater expertise</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Ask Your Question</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Simply type your groundwater query in natural language. Ask about water levels, quality, NOC procedures, or request comprehensive reports.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">AI Retrieves Data</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Our RAG engine searches through 25+ knowledge domains and fetches real-time data from India-WRIS telemetric stations to find the most relevant information.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Get Expert Answer</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Receive accurate, contextualized answers backed by official sources. Every response shows which knowledge chunks and data sources were used.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Retrieval-Augmented Generation (RAG)</h3>
                <p className="text-slate-600">Combining the power of knowledge retrieval with AI generation</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Unlike traditional chatbots that rely solely on training data, AquaBot uses RAG to retrieve the most current, relevant information from our curated knowledge base and live data sources before generating responses. This ensures accuracy, transparency, and up-to-date information every time.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Who Uses AquaBot?</h2>
            <p className="text-xl text-slate-600">Trusted by professionals across the water sector</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition text-center">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-slate-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">See AquaBot in Action</h2>
            <p className="text-xl text-slate-300">Watch how easy it is to get groundwater insights</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="bg-slate-700 rounded-t-xl px-4 py-3 flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-300 text-sm ml-4">AquaBot Chat Interface</span>
            </div>

            <div className="space-y-4 bg-slate-50 rounded-b-xl p-6 max-h-96 overflow-y-auto">
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-none max-w-md">
                  What are the NOC conditions for groundwater extraction?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 px-4 py-3 rounded-2xl rounded-bl-none max-w-md shadow">
                  <p className="font-medium mb-2">CGWA NOC Conditions:</p>
                  <p className="text-sm mb-2">Standard conditions include:</p>
                  <ul className="text-sm space-y-1 ml-4 list-disc">
                    <li>Install calibrated water meter</li>
                    <li>Submit quarterly extraction returns</li>
                    <li>Construct rainwater harvesting structure</li>
                    <li>Maintain 30m setback from public wells</li>
                    <li>Treat and reuse wastewater</li>
                  </ul>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded">NOC Regulation</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-none max-w-md">
                  Generate a comprehensive report for Coimbatore
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 px-4 py-3 rounded-2xl rounded-bl-none max-w-md shadow">
                  <p className="font-medium mb-2">Comprehensive Groundwater Report - Coimbatore</p>
                  <p className="text-sm mb-2">Generating 13-section report with:</p>
                  <ul className="text-sm space-y-1 ml-4 list-disc">
                    <li>Hydrogeological Setting</li>
                    <li>Water Level Scenario</li>
                    <li>Resource Assessment</li>
                    <li>Water Quality Analysis</li>
                    <li>Management Recommendations...</li>
                  </ul>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">Real-time WRIS Data</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Comprehensive Report</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/chat")}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Try It Yourself
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Groundwater Management?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of professionals using AquaBot for accurate, real-time groundwater intelligence.
          </p>
          <button
            onClick={() => navigate("/chat")}
            className="bg-white text-blue-600 px-10 py-4 rounded-xl hover:bg-slate-100 transition font-medium text-lg shadow-xl"
          >
            Launch AquaBot Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💧</span>
                <span className="text-white font-bold">AquaBot AI</span>
              </div>
              <p className="text-sm">
                India's first AI-powered groundwater information system, backed by CGWB data and cutting-edge RAG technology.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">Features</h3>
              <ul className="space-y-2 text-sm">
                <li>Water Level Monitoring</li>
                <li>Hydrogeological Data</li>
                <li>Quality Assessment</li>
                <li>NOC Guidance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">Data Sources</h3>
              <ul className="space-y-2 text-sm">
                <li>CGWB Publications</li>
                <li>India-WRIS Portal</li>
                <li>GEC Reports</li>
                <li>State GW Departments</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">Technology</h3>
              <ul className="space-y-2 text-sm">
                <li>RAG Architecture</li>
                <li>Google Gemini AI</li>
                <li>React Frontend</li>
                <li>FastAPI Backend</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm">
            <p>Built with RAG technology for groundwater professionals. Data sources: CGWB, India-WRIS, GEC .</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
