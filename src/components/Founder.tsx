import React from 'react';
import { Mail, Linkedin, Quote } from 'lucide-react';
import tungImage from '../assets/images/regenerated_image_1782110765078.png';

export default function Founder() {
  const scrollToContact = () => {
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
      id="founder" 
      className="py-20 md:py-28 bg-[#F5F1E8] scroll-mt-16 border-b border-[#D9D4CA]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Founder Image Area - Geometric Balance */}
          <div className="lg:col-span-5 flex justify-center items-center relative" id="founder-media-block">
            <div className="relative w-full aspect-square max-w-[360px] lg:max-w-none animate-fadeIn">
              
              {/* Gold borders mimicking vintage premium paper frames */}
              <div className="absolute inset-0 border border-[#C9A55C]/40 rounded-sm translate-x-3 translate-y-3 pointer-events-none" />
              <div className="absolute inset-0 bg-[#D9D4CA]/20 rounded-sm translate-x-1.5 translate-y-1.5 pointer-events-none" />
              
              {/* Image Frame */}
              <div className="absolute inset-0 bg-white border border-[#D9D4CA] rounded-sm shadow-sm overflow-hidden p-2 flex items-center justify-center">
                <img
                  src={tungImage}
                  alt="Tung, Founder of Treelab digital consulting"
                  className="w-full h-full object-cover rounded-sm filter contrast-[1.01] pointer-events-none select-none hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Float Sig/Title Badge */}
              <div className="absolute bottom-5 left-5 bg-[#083A29] text-[#F5F1E8] px-4 py-2 rounded-sm shadow-sm border border-[#0D5B3E]/30 text-left">
                <span className="block font-serif font-bold text-sm text-[#C9A55C]">Tung</span>
                <span className="block text-[9px] font-mono uppercase tracking-widest text-[#D9D4CA] mt-0.5">Founder & Consultant</span>
              </div>
            </div>
          </div>

          {/* Founder Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6" id="founder-text-block">
            {/* Tagline */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A55C] block">
                Executive Leadership
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#083A29] font-bold tracking-tight">
                Meet Tung
              </h2>
              <div className="w-12 h-[3px] bg-[#C9A55C] block" />
            </div>

            {/* Quote block */}
            <div className="relative pl-6 border-l-2 border-[#C9A55C]">
              <Quote className="absolute top-[-8px] left-[-10px] w-5 h-5 text-[#C9A55C]/15 transform -scale-x-100" />
              <p className="font-serif text-lg md:text-xl text-[#083A29] italic leading-relaxed">
                "Hi, I'm Tung, founder of Treelab."
              </p>
            </div>

            {/* Paragraph Contents */}
            <div className="space-y-4 text-stone-700 text-sm md:text-base leading-relaxed">
              <p>
                I help businesses leverage modern technology, AI tools, and digital strategies to improve their online presence and support sustainable business growth.
              </p>
              <p className="font-medium text-[#083A29]">
                My focus is not simply implementing technology, but helping businesses use it in practical ways that create real value.
              </p>
              <p>
                Whether it's building a professional website, creating AI-powered marketing content, or developing a growth strategy, my goal is to help businesses move forward with confidence.
              </p>
            </div>

            {/* Social Connection/CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full">
              <button
                onClick={scrollToContact}
                className="bg-[#0D5B3E] hover:bg-[#083A29] text-[#F5F1E8] font-bold text-[11px] uppercase tracking-widest px-8 py-4 rounded-sm transition-colors cursor-pointer shadow-sm"
              >
                Collaborate with Tung
              </button>
              
              <div className="flex gap-2">
                <a
                  href="mailto:treelab16@gmail.com"
                  className="w-11 h-11 rounded-sm bg-white border border-[#D9D4CA] hover:bg-[#F5F1E8] text-[#083A29] flex items-center justify-center transition-colors shadow-sm"
                  title="Email Tung"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-sm bg-white border border-[#D9D4CA] hover:bg-[#F5F1E8] text-[#083A29] flex items-center justify-center transition-colors shadow-sm"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
