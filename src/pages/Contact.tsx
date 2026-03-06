import { motion } from 'motion/react';
import { MessageCircle, Mail, Phone, MapPin, Send, Instagram } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Thank you for your wholesale inquiry. Our regional representative will contact you within 24 hours.');
        setFormData({ name: '', email: '', subject: '', message: '', company: '' });
      } else {
        alert('Failed to submit inquiry. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to submit inquiry. Please try again later.');
    }
  };

  return (
    <div className="bg-white font-sans overflow-hidden">
      {/* Header */}
      <section className="relative pb-32 overflow-hidden">
        <div className="absolute inset-0 candy-mesh opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block"
          >
            Global Presence
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black text-brand-primary tracking-tighter mb-8 leading-[0.85]"
          >
            Connect with <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-accent to-candy-teal">
              Our Team
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-xl mx-auto font-medium leading-relaxed"
          >
            Join our smart distribution ecosystem. Whether you're a retailer, distributor, or looking for wholesale partnerships, we're here to deliver taste, trust, and freshness.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-candy-teal/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 relative z-10">
          {/* Contact Info */}
          <div className="space-y-16">
            <div>
              <h2 className="text-5xl font-black text-brand-primary mb-12 tracking-tighter">Manufacturing HQ</h2>
              <div className="space-y-10">
                {[
                  { 
                    icon: <MapPin className="w-6 h-6 text-white" />, 
                    label: "Address", 
                    content: "6, Somnath Industrial Estate, Nr.Canal , Ahmedabad -Himmatnagar Highway, Village - Valad , Taluka & District- Gandhinagar -382355" 
                  },
                  { 
                    icon: <Phone className="w-6 h-6 text-white" />, 
                    label: "Wholesale Hotline", 
                    content: "+91 87809 77648" 
                  },
                  { 
                    icon: <Mail className="w-6 h-6 text-white" />, 
                    label: "Export Inquiries", 
                    content: "partner@salemore.co.in" 
                  },
                  { 
                    icon: <Instagram className="w-6 h-6 text-white" />, 
                    label: "Follow Us", 
                    content: "@salemore.confectionery" 
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-8 group"
                  >
                    <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-accent transition-all shadow-lg group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">{item.label}</h4>
                      <p className="text-brand-primary font-black text-lg leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="aspect-video rounded-[3rem] overflow-hidden bg-brand-secondary border border-slate-100 shadow-2xl relative group"
            >
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <MapPin className="w-16 h-16 text-brand-accent animate-bounce" />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800&h=450" 
                className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 candy-gradient" />
            <h3 className="text-4xl font-black text-brand-primary mb-12 tracking-tighter">Wholesale Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-muted">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-brand-accent/10 focus:bg-white border-none outline-none transition-all font-bold text-brand-primary"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-muted">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-brand-accent/10 focus:bg-white border-none outline-none transition-all font-bold text-brand-primary"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-muted">Business Email</label>
                <input
                  type="email"
                  required
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-brand-accent/10 focus:bg-white border-none outline-none transition-all font-bold text-brand-primary"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-muted">Subject</label>
                <select
                  value={formData.subject || ''}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-brand-accent/10 focus:bg-white border-none outline-none transition-all font-bold text-brand-primary appearance-none"
                >
                  <option value="">Select a topic</option>
                  <option value="wholesale">Wholesale Partnership</option>
                  <option value="manufacturing">Custom Manufacturing</option>
                  <option value="export">Export Distribution</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-muted">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message || ''}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-brand-accent/10 focus:bg-white border-none outline-none transition-all font-bold text-brand-primary resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-6 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-full shadow-[0_0_30px_rgba(255,0,128,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-4 group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                Submit Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
