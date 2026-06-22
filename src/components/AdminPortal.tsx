import React, { useState, useEffect } from 'react';
import { Lead } from '../types';
import { Shield, Download, Trash2, Search, ClipboardList, X, FileText, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPortal({ isOpen, onClose }: AdminPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [interestFilter, setInterestFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [adminNotes, setAdminNotes] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Initial mock data to show how lead collection works immediately upon load
  const initialMockLeads: Lead[] = [
    {
      id: 'lead-1',
      fullName: 'Siti Aminah',
      email: 'siti@kedaikopi.com',
      phone: '+60 12-345 6789',
      serviceInterest: 'website',
      message: 'We are an artisanal coffee shop chain looking to build a high-converting website with an integrated menu ordering system.',
      status: 'new',
      createdAt: new Date(Date.now() - 4 * 3600000).toISOString(), // 4 hrs ago
      notes: ''
    },
    {
      id: 'lead-2',
      fullName: 'Darren Tan',
      email: 'darren@tanlogistics.sg',
      phone: '+65 9123 4567',
      serviceInterest: 'consulting',
      message: 'Need advice on introducing AI agents to automate customer follow-ups and improve our routing dispatch processes.',
      status: 'contacted',
      createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
      notes: 'Sent initial discovery email and proposed calendar link for Wednesday.'
    },
    {
      id: 'lead-3',
      fullName: 'Nguyen Minh Tu',
      email: 'tu.nguyen@smartretail.vn',
      phone: '+84 90 876 5432',
      serviceInterest: 'video',
      message: 'Looking for engaging short-form video campaigns powered by AI avatars for our localized fashion apparel launch.',
      status: 'completed',
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
      notes: 'Completed discovery call. Project scope agreed upon. Downpayment received.'
    }
  ];

  // Load leads from localStorage
  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('treelab_leads');
      if (stored) {
        try {
          setLeads(JSON.parse(stored));
        } catch (e) {
          setLeads(initialMockLeads);
        }
      } else {
        localStorage.setItem('treelab_leads', JSON.stringify(initialMockLeads));
        setLeads(initialMockLeads);
      }
    }
  }, [isOpen]);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'treelab' || password === 'admin' || password === 'treelab2026') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Hint: Use "treelab" to unlock.');
    }
  };

  const handleStatusChange = (leadId: string, status: Lead['status']) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status } : l);
    localStorage.setItem('treelab_leads', JSON.stringify(updated));
    setLeads(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status });
    }
    showToast(`Lead status updated to ${status}.`);
  };

  const handleSaveNotes = (leadId: string) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, notes: adminNotes } : l);
    localStorage.setItem('treelab_leads', JSON.stringify(updated));
    setLeads(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, notes: adminNotes });
    }
    showToast('Consultation notes updated.');
  };

  const handleDeleteLead = (leadId: string) => {
    const updated = leads.filter(l => l.id !== leadId);
    localStorage.setItem('treelab_leads', JSON.stringify(updated));
    setLeads(updated);
    setSelectedLead(null);
    setShowDeleteConfirm(null);
    showToast('Lead entry removed successfully.');
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Service Interest', 'Message', 'Status', 'Booking Date', 'Admin Notes'];
    const rows = leads.map(lead => [
      lead.id,
      lead.fullName,
      lead.email,
      lead.phone,
      lead.serviceInterest,
      (lead.message || '').replace(/"/g, '""'),
      lead.status,
      lead.createdAt,
      (lead.notes || '').replace(/"/g, '""')
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `treelab_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter conditions
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.message || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesInterest = interestFilter === 'all' || lead.serviceInterest === interestFilter;

    return matchesSearch && matchesStatus && matchesInterest;
  });

  const getServiceLabel = (service: Lead['serviceInterest']) => {
    switch(service) {
      case 'website': return 'Website Development';
      case 'video': return 'AI Video Marketing';
      case 'consulting': return 'AI Growth Consulting';
      default: return 'All Growth Services';
    }
  };

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 text-[9px] font-bold rounded-sm bg-blue-100 text-blue-800 border border-blue-200">New Lead</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 text-[9px] font-bold rounded-sm bg-amber-100 text-amber-800 border border-amber-200">Contacted</span>;
      case 'completed':
        return <span className="px-2 py-0.5 text-[9px] font-bold rounded-sm bg-emerald-100 text-emerald-800 border border-emerald-200">Completed</span>;
      case 'archived':
        return <span className="px-2 py-0.5 text-[9px] font-bold rounded-sm bg-stone-200 text-stone-700 border border-stone-300">Archived</span>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#083A29]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="bg-[#F5F1E8] border border-[#D9D4CA] rounded-sm w-full max-w-6xl h-[85vh] shadow-xl flex flex-col overflow-hidden relative"
        id="admin-portal-modal"
      >
        {/* Custom Toast Messages */}
        {notification && (
          <div className="absolute top-4 right-4 bg-[#083A29] text-[#F5F1E8] border border-[#C9A55C] px-4 py-2.5 rounded-sm shadow-md z-50 text-xs font-bold uppercase tracking-wider animate-fadeIn">
            {notification}
          </div>
        )}

        {/* Header */}
        <div className="bg-[#083A29] text-[#F5F1E8] px-6 py-4 flex items-center justify-between border-b border-[#D9D4CA]/20 shrink-0">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#C9A55C]" />
            <h2 className="font-serif text-sm font-bold uppercase tracking-widest">Treelab CRM Dashboard</h2>
            <span className="text-[10px] bg-[#0D5B3E] px-2.5 py-0.5 rounded-sm font-mono text-[#F5F1E8] tracking-widest uppercase font-black">Authorized</span>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-300 hover:text-white transition-colors p-1"
            aria-label="Close Admin Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Screen */
          <div className="flex-1 flex items-center justify-center p-6 bg-[#F5F1E8]">
            <div className="bg-white border border-[#D9D4CA] p-8 rounded-sm max-w-sm w-full text-center">
              <div className="mx-auto w-10 h-10 bg-[#0D5B3E]/10 text-[#0D5B3E] flex items-center justify-center rounded-sm mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#083A29] mb-2">Treelab Executive</h3>
              <p className="text-stone-600 text-xs mb-6">
                Please enter the executive passcode to manage inbound booking requests.
              </p>
              
              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-1">
                    Passcode Entry
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-[#D9D4CA] rounded-sm text-dark-green text-xs"
                    autoFocus
                  />
                  {error && <p className="text-rose-700 text-xs mt-2 font-bold">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0D5B3E] hover:bg-[#083A29] text-[#F5F1E8] py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Unlock CRM Dashboard
                </button>
              </form>
              
              <div className="border-t border-[#D9D4CA]/50 mt-6 pt-4 text-center">
                <span className="text-[10px] text-stone-400 font-medium block">
                  Hint: code is <span className="font-mono bg-stone-100 px-1 py-0.5 rounded font-bold text-[#0D5B3E]">treelab</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* CRM Dashboard Screen */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 bg-white">
            {/* Leads List Panel */}
            <div className="w-full md:w-7/12 border-r border-[#D9D4CA] flex flex-col min-h-0">
              {/* Search and Filters */}
              <div className="p-4 bg-stone-50 border-b border-[#D9D4CA] space-y-3 shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search name, phone, or request details..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white pl-9 pr-4 py-2 text-xs border border-[#D9D4CA] rounded-sm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-[#C9A55C] font-black mb-1">
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full bg-white text-xs px-2.5 py-1.5 border border-[#D9D4CA] rounded-sm text-[#083A29]"
                    >
                      <option value="all">All Pipe Stages</option>
                      <option value="new">New Leads</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-[#C9A55C] font-black mb-1">
                      Platform Solution
                    </label>
                    <select
                      value={interestFilter}
                      onChange={(e) => setInterestFilter(e.target.value)}
                      className="w-full bg-white text-xs px-2.5 py-1.5 border border-[#D9D4CA] rounded-sm text-[#083A29]"
                    >
                      <option value="all">All Intent Types</option>
                      <option value="website">Website Dev</option>
                      <option value="video">AI Video</option>
                      <option value="consulting">Growth Advisory</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-[#D9D4CA]/50">
                  <span className="text-[10px] font-medium text-stone-500">
                    Displaying <strong className="text-[#0D5B3E]">{filteredLeads.length}</strong> of {leads.length} records
                  </span>
                  <button 
                    onClick={exportToCSV}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0D5B3E] hover:text-[#083A29] py-1 px-2.5 border border-[#D9D4CA] bg-white rounded-sm"
                  >
                    <Download className="w-3 h-3 text-[#C9A55C]" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Infinite Lead List */}
              <div className="flex-1 overflow-y-auto divide-y divide-stone-100 bg-stone-50/20">
                {filteredLeads.length === 0 ? (
                  <div className="p-12 text-center text-stone-400">
                    <ClipboardList className="w-10 h-10 stroke-[1.2] mx-auto mb-3 text-stone-300" />
                    <p className="text-xs font-semibold">No booking request entries match.</p>
                  </div>
                ) : (
                  filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setSelectedLead(lead);
                        setAdminNotes(lead.notes || '');
                      }}
                      className={`p-4 border-l-2 cursor-pointer hover:bg-[#F5F1E8]/20 transition-colors ${
                        selectedLead?.id === lead.id 
                          ? 'border-l-[#0D5B3E] bg-[#F5F1E8]/40' 
                          : lead.status === 'new' 
                            ? 'border-l-blue-400' 
                            : 'border-l-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="text-left">
                          <h4 className="font-serif font-bold text-sm text-[#083A29]">
                            {lead.fullName}
                          </h4>
                          <p className="text-[10px] text-stone-500 mt-0.5">
                            {lead.email} &bull; {lead.phone}
                          </p>
                        </div>
                        <span className="text-[9px] font-mono text-stone-400 uppercase">
                          {new Date(lead.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="px-2 py-0.5 text-[9px] rounded-sm bg-white border border-[#D9D4CA] text-stone-700 font-medium">
                          {getServiceLabel(lead.serviceInterest)}
                        </span>
                        {getStatusBadge(lead.status)}
                        {lead.notes && (
                          <span className="px-1.5 py-0.5 text-[8px] uppercase tracking-widest font-bold rounded-sm bg-amber-50 text-amber-700 border border-amber-200">
                            Has Notes
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Lead Details Panel */}
            <div className="w-full md:w-5/12 bg-stone-50/10 p-6 overflow-y-auto min-h-0 flex flex-col justify-between">
              {selectedLead ? (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    {/* Title */}
                    <div className="border-b border-[#D9D4CA] pb-4">
                      <div className="flex justify-between items-start mb-1 text-left">
                        <h3 className="font-serif font-bold text-lg text-[#083A29]">
                          {selectedLead.fullName}
                        </h3>
                        <div className="relative">
                          {showDeleteConfirm === selectedLead.id ? (
                            <div className="flex items-center gap-1 bg-white border border-rose-300 p-1 rounded-sm animate-scaleIn">
                              <button 
                                onClick={() => handleDeleteLead(selectedLead.id)}
                                className="bg-rose-600 text-white font-bold text-[9px] uppercase px-1.5 py-1 rounded-sm"
                              >
                                Yes, Delete
                              </button>
                              <button 
                                onClick={() => setShowDeleteConfirm(null)}
                                className="bg-stone-200 text-stone-700 font-bold text-[9px] uppercase px-1.5 py-1 rounded-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowDeleteConfirm(selectedLead.id)}
                              className="text-stone-400 hover:text-rose-600 p-1 hover:bg-stone-100 rounded-sm"
                              title="Remove lead record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-[9px] text-stone-400 font-mono tracking-widest uppercase text-left">
                        Database UID: {selectedLead.id}
                      </p>
                    </div>

                    {/* Metadata fields */}
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-[#C9A55C] font-black mb-0.5">
                          E-Mail Address
                        </span>
                        <a 
                          href={`mailto:${selectedLead.email}`} 
                          className="text-xs font-semibold text-[#0D5B3E] hover:underline"
                        >
                          {selectedLead.email}
                        </a>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-[#C9A55C] font-black mb-0.5">
                          Phone Number
                        </span>
                        <a 
                          href={`tel:${selectedLead.phone}`} 
                          className="text-xs font-semibold text-[#0D5B3E] hover:underline"
                        >
                          {selectedLead.phone}
                        </a>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-[#C9A55C] font-black mb-0.5">
                          Engagement Time
                        </span>
                        <span className="text-xs text-stone-700">
                          {new Date(selectedLead.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-[#C9A55C] font-black mb-0.5">
                          Inbound Service
                        </span>
                        <span className="text-xs font-bold text-[#083A29]">
                          {getServiceLabel(selectedLead.serviceInterest)}
                        </span>
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className="bg-white border border-[#D9D4CA] p-4 rounded-sm text-left">
                      <span className="block text-[8px] uppercase tracking-widest text-[#C9A55C] font-black mb-2">
                        Client Message
                      </span>
                      <p className="text-stone-700 text-xs whitespace-pre-line leading-relaxed italic">
                        "{selectedLead.message || 'No physical prompt compiled.'}"
                      </p>
                    </div>

                    {/* Pipeline modification */}
                    <div className="bg-white border border-[#D9D4CA] p-4 rounded-sm text-left space-y-2">
                      <span className="block text-[8px] uppercase tracking-widest text-[#C9A55C] font-black">
                        Deal Pipeline Progress
                      </span>
                      <div className="grid grid-cols-4 gap-1">
                        {(['new', 'contacted', 'completed', 'archived'] as Lead['status'][]).map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(selectedLead.id, status)}
                            className={`py-1.5 text-[9px] font-bold rounded-sm capitalize border transition-all cursor-pointer ${
                              selectedLead.status === status
                                ? 'bg-[#0D5B3E] text-white border-[#0D5B3E]'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Admin Consultation Notes */}
                    <div className="space-y-1.5 text-left">
                      <label className="block text-[8px] uppercase tracking-widest text-[#C9A55C] font-black">
                        Internal Consultation Notes
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Log strategy roadmaps, budget details, followups..."
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        className="w-full bg-white text-xs p-3.5 border border-[#D9D4CA] rounded-sm focus:border-[#0D5B3E] font-sans"
                      />
                      <button
                        onClick={() => handleSaveNotes(selectedLead.id)}
                        className="bg-[#083A29] hover:bg-[#0D5B3E] text-white text-[9px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-sm transition-colors cursor-pointer ml-auto block"
                      >
                        Keep Notes
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-stone-400 p-8 h-full">
                  <FileText className="w-12 h-12 stroke-[1] text-stone-300 mb-3" />
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">No Request Selected</p>
                  <p className="text-[10px] text-stone-400 max-w-xs mt-1 leading-relaxed">
                    Select an inbound prospect from the database sidebar list to view direct messages, modify pipeline phase indicators, or append consultation logs.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
