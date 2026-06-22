import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Benefits from './components/Benefits';
import Founder from './components/Founder';
import Testimonials from './components/Testimonials';
import AdminPortal from './components/AdminPortal';
import { Lead } from './types';
import { Mail, Phone, Calendar, Shield, ArrowRight, CheckCircle2, User, HelpCircle } from 'lucide-react';

export default function App() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState<'website' | 'video' | 'consulting'>('website');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      fullName,
      email,
      phone,
      serviceInterest: service,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
      notes: ''
    };

    // Submitting real-time data to Formspree endpoint
    fetch("https://formspree.io/f/xykqyzgy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        serviceInterest: service,
        message
      })
    })
      .then(async (response) => {
        if (response.ok) {
          const stored = localStorage.getItem('treelab_leads');
          let currentLeads: Lead[] = [];
          if (stored) {
            try {
              currentLeads = JSON.parse(stored);
            } catch (err) {
              currentLeads = [];
            }
          }
          
          const updated = [newLead, ...currentLeads];
          localStorage.setItem('treelab_leads', JSON.stringify(updated));
          
          setSubmittedLead(newLead);
          
          // Reset fields on successful submission
          setFullName('');
          setEmail('');
          setPhone('');
          setMessage('');
        } else {
          try {
            const data = await response.json();
            setSubmitError(data.error || "The gateway refused the request. Please check that your email looks valid.");
          } catch {
            setSubmitError("Failed to submit the form. Please verify values or try again later.");
          }
        }
      })
      .catch((error) => {
        console.error("Transmission error:", error);
        setSubmitError("A connection error occurred. Please verify your internet connection.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#083A29] selection:bg-[#0D5B3E]/10 selection:text-[#0D5B3E] font-sans antialiased relative">
      
      {/* Premium Navbar */}
      <Navbar />

      {/* Structured Sections */}
      <main className="relative">
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <Services />

        {/* Benefits Section */}
        <Benefits />

        {/* Founder Biographic Section */}
        <Founder />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Consultation Booking & Call to Action */}
        <section 
          id="book-consultation"
          className="py-20 md:py-28 bg-[#F5F1E8] border-b border-[#D9D4CA] scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Quick Contact and Value Props */}
              <div className="lg:col-span-5 space-y-8 text-left">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A55C] block">
                    Strategic Onboarding
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl text-[#083A29] font-bold tracking-tight">
                    Begin Growing Smarter
                  </h2>
                  <div className="w-12 h-[3px] bg-[#C9A55C]" />
                </div>

                <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                  Ready to optimize your website, design a high-converting AI marketing campaign, or schedule direct consulting with Tung? Fill out our simple registration card.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-[#D9D4CA] flex items-center justify-center text-[#0D5B3E] rounded-sm shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="text-left text-sm">
                      <p className="text-stone-400 text-xs font-bold uppercase tracking-wider">Direct Mailbox</p>
                      <a href="mailto:treelab16@gmail.com" className="font-semibold text-[#083A29] hover:underline">
                        treelab16@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#D9D4CA] pt-6 space-y-4">
                  <h4 className="font-serif font-bold text-sm text-[#083A29]">
                    What happens next?
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-xs text-stone-600">
                      <CheckCircle2 className="w-4 h-4 text-[#0D5B3E] shrink-0 mt-0.5" />
                      <span><strong>Lead Review:</strong> Tung reviews your request and digital footprint parameters within 24 hours.</span>
                    </li>
                    <li className="flex items-start gap-3 text-xs text-stone-600">
                      <CheckCircle2 className="w-4 h-4 text-[#0D5B3E] shrink-0 mt-0.5" />
                      <span><strong>Discovery Session:</strong> We run a focused 1-on-1 strategy call to discover low-hanging growth points.</span>
                    </li>
                    <li className="flex items-start gap-3 text-xs text-stone-600">
                      <CheckCircle2 className="w-4 h-4 text-[#0D5B3E] shrink-0 mt-0.5" />
                      <span><strong>SME Roadmap:</strong> You receive a clear, flat proposal with no complicated marketing jargon.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Booking Consultation Card */}
              <div className="lg:col-span-7 w-full" id="consultation-form-container">
                <div className="bg-white border border-[#D9D4CA] p-8 rounded-sm shadow-sm relative">
                  
                  {submittedLead ? (
                    /* High-Craft Confirmation Receipt - Replacing ugly native alert popups */
                    <div className="text-center py-8 space-y-6 animate-scaleIn">
                      <div className="w-16 h-16 bg-[#0D5B3E]/10 text-[#0D5B3E] rounded-full flex items-center justify-center mx-auto border border-[#0D5B3E]/30">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-serif font-bold text-2xl text-[#083A29]">
                          Receipt Confirmed
                        </h3>
                        <p className="text-stone-500 text-xs uppercase tracking-widest font-mono">
                          ID: {submittedLead.id}
                        </p>
                      </div>

                      <div className="bg-[#F5F1E8] border border-[#D9D4CA] rounded-sm p-5 text-left max-w-md mx-auto space-y-4 text-xs">
                        <span className="text-[9px] font-bold text-[#C9A55C] uppercase tracking-wider block border-b border-[#D9D4CA]/50 pb-2">
                          Client Request Parameter Details
                        </span>
                        <div className="grid grid-cols-2 gap-y-2.5">
                          <span className="text-stone-500 font-bold">Client Name:</span>
                          <span className="text-[#083A29] font-semibold">{submittedLead.fullName}</span>
                          
                          <span className="text-stone-500 font-bold">Inbound Channel:</span>
                          <span className="text-[#083A29] font-semibold uppercase">{submittedLead.serviceInterest}</span>
                          
                          <span className="text-stone-500 font-bold">Contact E-Mail:</span>
                          <span className="text-[#083A29] font-medium break-all">{submittedLead.email}</span>
                          
                          <span className="text-stone-500 font-bold">Logged Timestamp:</span>
                          <span className="text-[#083A29]">{new Date(submittedLead.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-4 max-w-sm mx-auto pt-4">
                        <p className="text-xs text-stone-600 leading-relaxed font-sans">
                          Tung has received your request and will contact you directly. You can inspect this live entry inside the <strong>Secure Admin Console</strong> at the bottom of the page.
                        </p>
                        <button
                          onClick={() => setSubmittedLead(null)}
                          className="bg-[#0D5B3E] hover:bg-[#083A29] text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-sm transition-colors cursor-pointer"
                        >
                          Book Another Consultation
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Initial Consultation Form */
                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                      {submitError && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-sm text-xs space-y-1">
                          <p className="font-bold">Form Submission Error</p>
                          <p>{submitError}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#0D5B3E]" />
                            Full Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            id="fullname-input"
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 bg-[#F5F1E8]/20 border border-[#D9D4CA] rounded-sm text-dark-green text-xs placeholder:text-stone-400 focus:bg-white"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#0D5B3E]" />
                            E-Mail Address <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="john@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-[#F5F1E8]/20 border border-[#D9D4CA] rounded-sm text-dark-green text-xs placeholder:text-stone-400 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#0D5B3E]" />
                            Phone Number <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="+84 90 876 5432"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 bg-[#F5F1E8]/20 border border-[#D9D4CA] rounded-sm text-dark-green text-xs placeholder:text-stone-400 focus:bg-white"
                          />
                        </div>

                        {/* Service Required */}
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#0D5B3E]" />
                            Requested Focus <span className="text-rose-500">*</span>
                          </label>
                          <select
                            id="service-select"
                            name="service"
                            value={service}
                            onChange={(e) => setService(e.target.value as 'website' | 'video' | 'consulting')}
                            className="w-full px-4 py-3 bg-[#F5F1E8]/20 border border-[#D9D4CA] rounded-sm text-dark-green text-xs focus:bg-white"
                          >
                            <option value="website">Website Development (Credibility)</option>
                            <option value="video">AI Video Marketing (Velocity)</option>
                            <option value="consulting">AI Growth Consulting (Advisory)</option>
                          </select>
                        </div>
                      </div>

                      {/* Message details */}
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-[#0D5B3E]" />
                          Scoping Parameters & Notes
                        </label>
                        <textarea
                          rows={4}
                          name="message"
                          placeholder="Tell us a bit about your business, target audience, or current website requirements..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full px-4 py-3 bg-[#F5F1E8]/20 border border-[#D9D4CA] rounded-sm text-dark-green text-xs placeholder:text-stone-400 focus:bg-white"
                        />
                      </div>

                      {/* Safe submission key trigger */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0D5B3E] hover:bg-[#083A29] text-[#F5F1E8] py-4 rounded-sm font-bold text-[11px] uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Registering Consultation Request...
                          </>
                        ) : (
                          <>
                            Submit Registration Proposal
                            <ArrowRight className="w-4 h-4 text-[#C9A55C]" />
                          </>
                        )}
                      </button>

                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Premium Footer */}
      <footer className="bg-[#083A29] text-[#F5F1E8] py-12 border-t border-[#D9D4CA]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif text-lg font-bold text-white tracking-widest">
              TREE LAB
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#C9A55C] font-semibold mt-1">
              HELPING BUSINESSES GROW SMARTER WITH AI
            </span>
            <p className="text-zinc-400 text-xs mt-3 max-w-md">
              Treelab is a digital channels development company helping SMEs and entrepreneurs formulate clean, premium online visibility infrastructures.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-[#D9D4CA] text-xs font-mono">
              &copy; 2026 TREELAB. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* Local Leadership CRM Admin Modal */}
      <AdminPortal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

    </div>
  );
}
