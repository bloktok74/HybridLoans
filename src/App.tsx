import { useState, useEffect } from 'react';
import { Shield, CheckCircle2, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    callbackNumber: '',
    email: '',
    state: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const webhookUrl = 'https://maruti21.app.n8n.cloud/webhook/debtrelief';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({ firstName: '', callbackNumber: '', email: '', state: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-blue-500 selection:text-white overflow-hidden relative">

      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-sky-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/80 backdrop-blur-xl border-b border-slate-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-sky-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">The Debt Resource Group</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a href="#contact" className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-semibold transition-all shadow-lg shadow-blue-500/25">
              Get Started
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Empowering Financial Freedom Since 1998
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.05]">
              Debt Settlement that feels{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400">
                secure.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Reduce your debt strategically. Regain financial control confidently. Start fresh with a clean slate. Expert debt settlement solutions tailored to your unique financial situation.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-4">
              <a
                href="#contact"
                className="h-14 px-10 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-semibold transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2 group text-lg"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" /> Fiduciary Advisors
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" /> $2 Trillion+ Managed
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" /> 1,000+ Happy Clients
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
                Why Choose{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">
                  The Debt Resource Group?
                </span>
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                We're committed to empowering financial freedom through personalized debt relief strategies and dedicated support.
              </p>
              <div className="space-y-5">
                {[
                  'Fiduciary commitment to act in your best interest',
                  'Personalized strategies tailored to your goals',
                  'Comprehensive planning across all life stages',
                  'Transparent fee structure with no hidden costs',
                  'Ongoing support and portfolio monitoring'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-blue-500/30 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-slate-300 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-600/20 to-sky-600/20 blur-3xl -z-10 rounded-full" />
              <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10">
                <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-slate-400 text-lg mb-10">
                  Take the first step towards financial freedom. Our team is ready to help you resolve your debt and regain control.
                </p>
                <div className="space-y-6">
                  {[
                    { num: '1', text: 'Schedule a free consultation' },
                    { num: '2', text: 'Receive your personalized plan' },
                    { num: '3', text: 'Start building your future' }
                  ].map((step) => (
                    <div key={step.num} className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                        {step.num}
                      </div>
                      <span className="text-lg text-white">{step.text}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="mt-10 w-full h-12 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-semibold transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  Get Your Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
              Let's Start Planning{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">
                Your Future
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              Fill out the form below and one of our financial advisors will contact you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-slate-300 mb-3">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder:text-slate-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="callbackNumber" className="block text-sm font-semibold text-slate-300 mb-3">
                  Best Callback Number *
                </label>
                <input
                  type="tel"
                  id="callbackNumber"
                  name="callbackNumber"
                  value={formData.callbackNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder:text-slate-500"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-3">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder:text-slate-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-slate-300 mb-3">
                  State *
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder:text-slate-500"
                >
                  <option value="">Select a state</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Alaska">Alaska</option>
                  <option value="Arizona">Arizona</option>
                  <option value="Arkansas">Arkansas</option>
                  <option value="California">California</option>
                  <option value="Colorado">Colorado</option>
                  <option value="Connecticut">Connecticut</option>
                  <option value="Delaware">Delaware</option>
                  <option value="Florida">Florida</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Hawaii">Hawaii</option>
                  <option value="Idaho">Idaho</option>
                  <option value="Illinois">Illinois</option>
                  <option value="Indiana">Indiana</option>
                  <option value="Iowa">Iowa</option>
                  <option value="Kansas">Kansas</option>
                  <option value="Kentucky">Kentucky</option>
                  <option value="Louisiana">Louisiana</option>
                  <option value="Maine">Maine</option>
                  <option value="Maryland">Maryland</option>
                  <option value="Massachusetts">Massachusetts</option>
                  <option value="Michigan">Michigan</option>
                  <option value="Minnesota">Minnesota</option>
                  <option value="Mississippi">Mississippi</option>
                  <option value="Missouri">Missouri</option>
                  <option value="Montana">Montana</option>
                  <option value="Nebraska">Nebraska</option>
                  <option value="Nevada">Nevada</option>
                  <option value="New Hampshire">New Hampshire</option>
                  <option value="New Jersey">New Jersey</option>
                  <option value="New Mexico">New Mexico</option>
                  <option value="New York">New York</option>
                  <option value="North Carolina">North Carolina</option>
                  <option value="North Dakota">North Dakota</option>
                  <option value="Ohio">Ohio</option>
                  <option value="Oklahoma">Oklahoma</option>
                  <option value="Oregon">Oregon</option>
                  <option value="Pennsylvania">Pennsylvania</option>
                  <option value="Rhode Island">Rhode Island</option>
                  <option value="South Carolina">South Carolina</option>
                  <option value="South Dakota">South Dakota</option>
                  <option value="Tennessee">Tennessee</option>
                  <option value="Texas">Texas</option>
                  <option value="Utah">Utah</option>
                  <option value="Vermont">Vermont</option>
                  <option value="Virginia">Virginia</option>
                  <option value="Washington">Washington</option>
                  <option value="West Virginia">West Virginia</option>
                  <option value="Wisconsin">Wisconsin</option>
                  <option value="Wyoming">Wyoming</option>
                </select>
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-medium">Thank you! We'll be in touch within 24 hours.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-5 bg-red-500/10 border border-red-500/30 rounded-xl">
                <span className="text-red-300 font-medium">Something went wrong. Please try again.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white text-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 group"
            >
              {isSubmitting ? 'Submitting...' : 'Request Consultation'}
              {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>

            <p className="text-center text-sm text-slate-500 mt-6">
              By submitting this form, you agree to be contacted by our team regarding your inquiry.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-sky-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">The Debt Resource Group</span>
            </div>
            <p className="text-slate-400 text-lg mb-2">Empowering Financial Freedom in America</p>
          </div>

          <div className="text-center text-slate-500 text-sm border-t border-slate-800 pt-8">
            <p>© {new Date().getFullYear()} The Debt Resource Group. All rights reserved.</p>
            <p className="mt-2">Securities and advisory services offered through licensed professionals.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
