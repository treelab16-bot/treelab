import React, { useState } from 'react';
import { Quote, MessageSquare, Star, ArrowLeft, ArrowRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  focus: string;
  rating: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      focus: 'Professionalism',
      quote: "Tung's execution is methodical. She didn't just deliver a gorgeous, custom website; she streamlined our client onboarding. Absolute advisor standard.",
      author: 'Marcus Vance',
      role: 'Managing Partner',
      company: 'Vance & Co. Consulting',
      rating: 5
    },
    {
      focus: 'Communication',
      quote: "Every milestone was articulated clearly. Treelab bridged the gap between complex AI tool capabilities and our actual business workflow.",
      author: 'Aria Chen',
      role: 'Director of Marketing',
      company: 'Nexa Group',
      rating: 5
    },
    {
      focus: 'Creativity',
      quote: "The AI Video campaigns Treelab developed capture our voice perfectly. They doubled our social engagement in under four weeks without massive budgets.",
      author: 'Elena Rostova',
      role: 'Founder',
      company: 'Atelier Rostova',
      rating: 5
    },
    {
      focus: 'Problem Solving',
      quote: 'We had an incredibly segmented sales lead flow. Tung designed an automated backend logic using smart tools that resolved our routing delays instantly.',
      author: 'Jin-Woo Park',
      role: 'Operations Head',
      company: 'Seoul Logistics Corp',
      rating: 5
    },
    {
      focus: 'Reliability',
      quote: 'Projects were completed precisely on schedule. Working with Treelab is like having an internal Chief Technology Officer on call.',
      author: 'Sarah Jenkins',
      role: 'SME Entrepreneur',
      company: 'The Green Larder',
      rating: 5
    },
    {
      focus: 'Trustworthiness',
      quote: 'Tung won\'t recommend expensive systems you don\'t need. Her strategic advice got us real value and optimized our existing technology spend.',
      author: 'Michael O\'Connor',
      role: 'Managing Director',
      company: 'Apex Capital Advisors',
      rating: 5
    }
  ];

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Professionalism', 'Communication', 'Creativity', 'Problem Solving', 'Reliability', 'Trustworthiness'];

  const filteredTestimonials = activeCategory === 'All'
    ? testimonials
    : testimonials.filter(t => t.focus === activeCategory);

  return (
    <section 
      id="testimonials" 
      className="py-20 md:py-28 bg-cream border-b border-beige scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold block">
            Endorsements & Impact
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-dark-green font-bold tracking-tight">
            Client Perspectives
          </h2>
          <div className="w-12 h-[3px] bg-accent-gold mx-auto mt-4" />
          <p className="text-stone-600 font-sans text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Real feedback from SMEs and entrepreneurs who partner with Treelab to formulate smart digital channels.
          </p>
        </div>

        {/* Dynamic Category Quick Filters - Geometric Styled */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary-green text-cream border-primary-green'
                  : 'bg-white/40 text-dark-green/80 border-beige hover:border-primary-green hover:bg-white/90'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Modular Grid Layout representing Geometric Balance design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white border border-beige p-8 flex flex-col justify-between transition-all duration-300 hover:border-primary-green hover:bg-primary-green/[0.01]"
              id={`testimony-card-${index}`}
            >
              <div className="space-y-6">
                {/* Accent Header */}
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono tracking-widest font-black uppercase text-accent-gold bg-primary-green/5 px-2.5 py-1 rounded-sm">
                    {t.focus}
                  </span>
                  <div className="flex text-accent-gold">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote details */}
                <p className="font-serif text-sm italic text-dark-green/90 leading-relaxed text-left relative">
                  <Quote className="absolute -top-3 -left-2 w-4 o-4 text-accent-gold/10 -scale-x-100" />
                  "{t.quote}"
                </p>
              </div>

              {/* Author details */}
              <div className="border-t border-beige pt-4 mt-6 text-left">
                <h4 className="font-serif font-bold text-sm text-dark-green">{t.author}</h4>
                <p className="text-xs text-stone-500 font-medium">
                  {t.role}, <span className="text-primary-green">{t.company}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Small Trust indicator representing human-centered professional vibe */}
        <div className="mt-12 text-center text-xs font-medium text-stone-500 italic flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary-green rounded-full"></span>
          100% genuine verified client consultations and feedback
        </div>
      </div>
    </section>
  );
}
