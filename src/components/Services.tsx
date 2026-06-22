import React from 'react';
import { Globe, Video, LineChart, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: 'website-development',
      indexLabel: '01',
      title: 'Website Development',
      tagline: 'Establish High-Conversion Credibility',
      description: 'Professional websites designed to build credibility, improve user experience, and convert visitors into customers.',
      icon: <Globe className="w-5 h-5 text-[#0D5B3E]" />,
      features: [
        'Custom-designed responsive interfaces (desktop & mobile)',
        'SEO-optimized architecture to improve organic discoverability',
        'Remarkably fast page speeds for lower visitor dropoff rates',
        'Clear, deliberate conversion paths and call-to-actions'
      ],
      accentColor: 'border-l-primary-green'
    },
    {
      id: 'ai-video-marketing',
      indexLabel: '02',
      title: 'AI Video Marketing',
      tagline: 'Scale Visual Content Production',
      description: 'Create engaging AI-powered video content for advertising, social media, and brand storytelling.',
      icon: <Video className="w-5 h-5 text-[#C9A55C]" />,
      features: [
        'Engaging narrative content assets for advertising campaigns',
        'Scripts and storyboards tailored for target demographics',
        'AI-guided visuals, automated caption loops & sound prep',
        'Scale content volume without high boutique agency retainers'
      ],
      accentColor: 'border-l-accent-gold'
    },
    {
      id: 'ai-growth-consulting',
      indexLabel: '03',
      title: 'AI Growth Consulting',
      tagline: 'Strategic Execution for Sustainable Growth',
      description: 'Identify opportunities to use AI, improve marketing effectiveness, strengthen online presence, and support business growth.',
      icon: <LineChart className="w-5 h-5 text-[#083A29]" />,
      features: [
        'Practical AI automation roadmaps to reduce overhead costs',
        'In-depth digital presence & lead-funnel technical audits',
        'Actionable roadmap to deploy software without tech-clutter',
        '1-on-1 strategic growth advisory sessions directly with Tung'
      ],
      accentColor: 'border-l-dark-green'
    }
  ];

  const scrollToConsultation = (serviceName: string) => {
    const element = document.getElementById('consultation-form-container');
    if (element) {
      // Find select field inside form and set its value to selected service
      const selectEl = document.getElementById('service-select') as HTMLSelectElement | null;
      if (selectEl) {
        let val = 'website';
        if (serviceName.includes('Website')) val = 'website';
        else if (serviceName.includes('Video')) val = 'video';
        else if (serviceName.includes('Consulting')) val = 'consulting';
        
        selectEl.value = val;
        // Dispatch "change" event so React state updates
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
      
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
      id="services" 
      className="py-20 md:py-28 bg-[#F5F1E8] border-b border-[#D9D4CA] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A55C] block">
            Executive Capabilities
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#083A29] font-bold tracking-tight">
            How Treelab Can Help
          </h2>
          <div className="w-12 h-[3px] bg-[#C9A55C] mx-auto mt-4" />
          <p className="text-stone-600 font-sans text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            We partner with SMEs to formulate, build, and distribute highly optimized digital channels that multiply real business metrics.
          </p>
        </div>

        {/* Services Stacked Custom Card Layout - Geometric Balance style with sharp borders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white/50 border border-[#D9D4CA] p-8 rounded-sm flex flex-col justify-between transition-all duration-300 hover:border-[#0D5B3E] hover:bg-[#0D5B3E]/[0.02] group"
              id={`service-card-${service.id}`}
            >
              <div className="space-y-6">
                {/* Index label and heading block */}
                <div className="flex justify-between items-center pb-4 border-b border-[#D9D4CA]/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white border border-[#D9D4CA] flex items-center justify-center text-[#0D5B3E] rounded-sm group-hover:bg-[#0D5B3E]/5 group-hover:border-[#0D5B3E] transition-colors">
                      {service.icon}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#083A29] text-left">
                      {service.title}
                    </h3>
                  </div>
                  <span className="text-[#C9A55C] font-mono text-sm italic font-bold tracking-wider">
                    {service.indexLabel}
                  </span>
                </div>

                <div className="space-y-2 text-left">
                  <p className="text-[10px] font-mono font-bold text-[#C9A55C] uppercase tracking-widest">
                    {service.tagline}
                  </p>
                  <p className="text-stone-700 text-xs md:text-sm leading-relaxed pt-1 font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Checklist of deliverables */}
                <ul className="space-y-3 pt-4 border-t border-[#D9D4CA]/50">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-stone-600 text-left">
                      <CheckCircle2 className="w-4 h-4 text-[#0D5B3E] shrink-0 mt-0.5" />
                      <span className="font-sans leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action trigger */}
              <div className="pt-8 text-left border-t border-[#D9D4CA]/30 mt-6">
                <button
                  onClick={() => scrollToConsultation(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#0D5B3E] hover:text-[#083A29] font-bold uppercase tracking-widest transition-colors group/btn cursor-pointer"
                >
                  Request Service
                  <ArrowUpRight className="w-4 h-4 text-[#C9A55C] transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner / Mini CTA - Geometric design */}
        <div className="mt-12 bg-white/40 border border-[#D9D4CA] rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-xl">
            <h4 className="font-serif font-bold text-lg text-[#083A29]">
              Unsure which avenue matches your current scale?
            </h4>
            <p className="text-stone-600 text-xs mt-1 leading-relaxed">
              Tung will execute a personal evaluation of your online footprint and digital presence, suggesting the clearest path to real value.
            </p>
          </div>
          <button
            onClick={() => scrollToConsultation('AI Growth Consulting')}
            className="shrink-0 bg-[#0D5B3E] hover:bg-[#083A29] text-[#F5F1E8] text-[11px] font-bold uppercase tracking-widest py-3.5 px-6 rounded-sm transition-colors cursor-pointer"
          >
            Claim Discovery Call
          </button>
        </div>

      </div>
    </section>
  );
}
