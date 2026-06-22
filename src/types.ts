export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: 'all' | 'website' | 'video' | 'consulting';
  message?: string;
  status: 'new' | 'contacted' | 'completed' | 'archived';
  createdAt: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  metrics?: string;
  focus: 'Professionalism' | 'Communication' | 'Creativity' | 'Problem Solving' | 'Reliability' | 'Trustworthiness';
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  iconName: string;
}
