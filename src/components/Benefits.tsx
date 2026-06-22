import React from 'react';
import { Eye, UserCheck, Shield, Zap, DollarSign, Activity } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      title: 'Increase Online Visibility',
      description: 'Strengthen search footprint and capture organic traffic so SMEs are found easily by high-intent local and international buyers.',
      icon: <Eye className="w-4 h-4 text-[#C9A55C]" />,
      tag: '01 / DISCOVERABILITY'
    },
    {
      title: 'Attract More Customers',
      description: 'Design digital funnels and elegant customer paths that naturally convert curious visitors into actively paying clients.',
      icon: <UserCheck className="w-4 h-4 text-[#C9A55C]" />,
      tag: '02 / LEAD FLOW'
    },
    {
      title: 'Strengthen Brand Credibility',
      description: 'Establish a refined, high-end professional appearance that represents stability, scale, and customer satisfaction.',
      icon: <Shield className="w-4 h-4 text-[#C9A55C]" />,
      tag: '03 / AUTHORITY'
    },
    {
      title: 'Create Content Faster',
      description: 'Accelerate creation with custom-tailored AI scripts, video campaigns, and organic newsletters in a fraction of the time.',
      icon: <Zap className="w-4 h-4 text-[#C9A55C]" />,
      tag: '04 / VELOCITY'
    },
    {
      title: 'Reduce Marketing Costs',
      description: 'Minimize dependence on bloated marketing agency retainer budgets by utilizing in-house AI-backed systems.',
      icon: <DollarSign className="w-4 h-4 text-[#C9A55C]" />,
      tag: '05 / EFFICIENCY'
    },
    {
      title: 'Scale More Efficiently',
      description: 'Automate repetitive follow-ups and layout generation, leaving founder minds free to focus on product and delivery.',
      icon: <Activity className="w-4 h-4 text-[#C9A55C]" />,
      tag: '06 / EXPANSION'
    }
  ];

  return (
    <section 
      id="benefits" 
      className="py-20 md:py-28 bg-[#083A29] text-[#F5F1E8] relative overflow-hidden scroll-mt-16 border-b border-[#D9D4CA]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A55C] block">
            Real Business Impact
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F5F1E8] font-bold tracking-tight">
            What AI Can Achieve For You
          </h2>
          <div className="w-12 h-[3px] bg-[#C9A55C] mx-auto mt-4" />
          <p className="text-[#D9D4CA]/80 font-sans text-sm max-w-lg mx-auto leading-relaxed">
            By shifting from manual pipelines to smart AI-assisted workflows, SMEs can reclaim bandwidth and unlock scalable operations.
          </p>
        </div>

        {/* Benefits Grid - Sharp Geometric blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-[#0D5B3E]/30 border border-[#0D5B3E]/50 p-8 rounded-sm flex flex-col justify-between text-left group hover:border-[#C9A55C]/60 hover:bg-[#0D5B3E]/50 transition-all duration-300"
              id={`benefit-card-${index}`}
            >
              <div className="space-y-6">
                {/* Top indicator & icon */}
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-sm bg-[#083A29] flex items-center justify-center border border-[#0D5B3E]">
                    {benefit.icon}
                  </div>
                  <span className="text-[9px] font-mono text-[#D9D4CA]/65 uppercase tracking-widest font-black">
                    {benefit.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-lg text-white tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-[#D9D4CA]/90 text-xs leading-relaxed font-sans pt-1">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Decorative accent divider line */}
              <div className="w-6 h-[1.5px] bg-[#C9A55C] mt-6 group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
