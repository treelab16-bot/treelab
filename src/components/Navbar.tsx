import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, Calendar } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const targetId = id === 'book-consultation' ? 'consultation-form-container' : id;
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of the navbar with padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      if (targetId === 'consultation-form-container') {
        setTimeout(() => {
          const input = document.getElementById('fullname-input');
          if (input) {
            input.focus();
          }
        }, 700);
      }
    }
  };

  const navLinks = [
    { name: 'Services', id: 'services' },
    { name: 'Why AI', id: 'benefits' },
    { name: 'Founder', id: 'founder' },
    { name: 'Testimonials', id: 'testimonials' },
  ];

  return (
    <nav
      id="treelab-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#D9D4CA] py-2'
          : 'bg-[#F5F1E8] border-b border-[#D9D4CA]/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo and Brand */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1 cursor-pointer group"
          aria-label="Treelab Home"
        >
          <Logo size={36} />
        </button>

        {/* Desktop Navigation matching Geometric design: uppercase, tracking, semantic */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-[#083A29] hover:text-[#0D5B3E] text-[11px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer relative py-1"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Desktop CTA matching Geometric Theme: rounded-sm, uppercase tracking, bold */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => scrollToSection('book-consultation')}
            className="flex items-center gap-2 bg-[#0D5B3E] hover:bg-[#083A29] text-[#F5F1E8] font-bold text-[11px] uppercase tracking-widest px-6 py-3 rounded-sm transition-all cursor-pointer shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C9A55C]" />
            Request Consultation
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#083A29] p-1 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F5F1E8] border-b border-[#D9D4CA] absolute top-full left-0 right-0 shadow-lg py-6 px-8 flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left text-[#083A29] font-bold text-xs uppercase tracking-wider py-2 border-b border-[#D9D4CA]/30"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('book-consultation')}
            className="flex items-center justify-center gap-2 bg-[#0D5B3E] hover:bg-[#083A29] text-[#F5F1E8] font-bold py-3.5 px-6 rounded-sm text-xs uppercase tracking-widest transition-colors mt-2"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C9A55C]" />
            Request Consultation
          </button>
        </div>
      )}
    </nav>
  );
}
