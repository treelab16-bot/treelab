import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar } from 'lucide-react';

export default function Hero() {
  const scrollToConsultation = () => {
    const element = document.getElementById('consultation-form-container');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        const input = document.getElementById('fullname-input');
        if (input) {
          input.focus();
        }
      }, 700);
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[70vh] flex items-center pt-28 pb-16 md:py-24 overflow-hidden bg-[#F5F1E8] border-b border-[#D9D4CA]"
    >
      {/* Background Decorative Graphic Grid lines - Very subtle, high design standard */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0D5B3E" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Adjusted to elegant full-width single column layout with generous proportions */}
        <div className="max-w-3xl flex flex-col items-start text-left space-y-6">
          {/* Trust badge - Geometric Balance */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#0D5B3E]/10 text-[#0f6c49] border border-[#0D5B3E]/15 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A55C] fill-[#C9A55C]" />
            <span>SME Consulting & Website Engineering</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#083A29] font-bold tracking-tight leading-[1.1]"
            id="hero-heading"
          >
            Helping Businesses<br />
            <span className="text-[#0D5B3E] italic font-normal">Grow Smarter</span> with AI.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-stone-700 text-sm md:text-base max-w-xl leading-relaxed font-sans"
          >
            Treelab helps businesses build professional websites, create AI-powered marketing content, and develop growth strategies that improve visibility, attract customers, and support long-term growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto pt-2"
          >
            <button
              onClick={scrollToConsultation}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#0D5B3E] hover:bg-[#083A29] text-[#F5F1E8] font-bold text-[11px] uppercase tracking-widest px-8 py-4 rounded-sm transition-all shadow-sm cursor-pointer"
            >
              Book a Consultation
              <Calendar className="w-4 h-4 text-[#C9A55C]" />
            </button>
          </motion.div>

          {/* Small subtle visual features indicator (no tech larping) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-[#D9D4CA] w-full max-w-lg mt-4"
          >
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[#0D5B3E]">100%</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Custom Solutions</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[#0D5B3E]">3x</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Digital Velocity</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[#0D5B3E]">SME</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Tailored Roadmap</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
