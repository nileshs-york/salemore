import { motion } from 'motion/react';
import { ShieldCheck, Zap, Users, Globe, Award, Heart, Factory, Package, Truck, Sparkles, Briefcase, TrendingUp, Building2, User } from 'lucide-react';

export default function About() {
  const timeline = [
    { year: '1999', title: 'The Foundation', desc: 'Salemore was established as a manufacturer of Toy Candy, Sugar Coated Fennel, and Jelly Cubes, laying the groundwork for a confectionery legacy.' },
    { year: '2017', title: 'GST Milestone', desc: 'Registered under GST on 01-07-2017, formalizing our operations for a new era of Indian commerce.' },
    { year: '2020', title: 'FMCG Expansion', desc: 'Transitioned into a fast-growing FMCG brand, expanding our range to include rich chocolates, tangy imli delights, and premium lollipops.' },
    { year: new Date().getFullYear().toString(), title: 'Smart Ecosystem', desc: 'Building a smart distribution ecosystem connecting manufacturers, distributors, and retailers with unprecedented efficiency.' },
  ];

  const stats = [
    { label: 'Nature of Business', value: 'Manufacturer', icon: <Factory className="w-6 h-6" /> },
    { label: 'Employees', value: '51-100', icon: <Users className="w-6 h-6" /> },
    { label: 'Annual Turnover', value: '1.5 - 5 Cr', icon: <TrendingUp className="w-6 h-6" /> },
    { label: 'Legal Status', value: 'Proprietorship', icon: <Briefcase className="w-6 h-6" /> },
  ];

  const corporateInfo = [
    { label: 'Company CEO', value: 'Manish Mohanlal Panjwani' },
    { label: 'GST Partner', value: 'Manish Mohanlal Panjwani' },
    { label: 'GST Number', value: '24AQCPP1030B1ZP' },
    { label: 'Banker', value: 'Bank of India (BOI)' },
    { label: 'GST Reg. Date', value: '01-07-2017' },
    { label: 'Business Type', value: 'Manufacturer, Wholesale & Retail' },
  ];

  return (
    <div className="bg-white font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary">
          <motion.img 
            initial={{ scale: 1.3, opacity: 0.2 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 15, ease: "linear" }}
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1920&h=1080" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/80 via-brand-primary/40 to-brand-primary" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.5em] mb-12 shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
            Established 1999
          </motion.div>
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-[12rem] font-black text-white tracking-tighter leading-[0.8] mb-12"
          >
            Taste. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-accent via-candy-teal to-brand-accent bg-[length:200%_auto] animate-gradient-x">
              Trust. Freshness.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed"
          >
            At Salemore, we believe everyday treats create everyday happiness. We are a fast-growing FMCG brand dedicated to bringing joy, taste, and fun to households across India. From rich chocolates and colourful candies to tangy imli delights and fresh, high-quality lollipops. Our products are crafted to be the part of daily life — in schools, homes, retail counters, and celebrations.
          </motion.p>
        </div>

        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-candy-teal/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>
      </section>

      {/* Stats Grid */}
      <section className="relative z-20 -mt-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 flex flex-col items-center text-center group hover:bg-brand-primary transition-all duration-500"
            >
              <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <div className="text-brand-accent group-hover:text-white transition-colors">
                  {stat.icon}
                </div>
              </div>
              <span className="text-2xl font-black text-brand-primary group-hover:text-white transition-colors mb-2">{stat.value}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted group-hover:text-white/60 transition-colors">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding relative candy-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px]">Our Vision</span>
                <h2 className="text-6xl md:text-8xl font-black text-brand-primary leading-[0.9] tracking-tighter">
                  Affordable <br />Indulgence.
                </h2>
              </div>
              <div className="space-y-8 text-slate-500 text-lg leading-relaxed font-medium">
                <p>
                  Salemore was established with a clear vision: To deliver affordable indulgence and trusted essentials through a strong, scalable, and efficient supply network.
                </p>
                <p>
                  In the highly competitive FMCG space, consistency is everything. That’s why we focus on maintaining strict quality standards, reliable sourcing, and seamless distribution — ensuring that every retailer receives fresh stock and every consumer enjoys dependable taste and quality.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center gap-4 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                  <ShieldCheck className="w-8 h-8 text-brand-accent" />
                  <span className="text-sm font-bold text-brand-primary">Quality Assurance</span>
                </div>
                <div className="flex items-center gap-4 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                  <Truck className="w-8 h-8 text-brand-accent" />
                  <span className="text-sm font-bold text-brand-primary">Seamless Distribution</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              {[
                { title: "Accessibility", desc: "Making indulgence available to everyone, everywhere.", icon: <Globe className="w-8 h-8 text-brand-accent" /> },
                { title: "Quality First", desc: "Uncompromising standards in every single batch.", icon: <ShieldCheck className="w-8 h-8 text-brand-accent" /> },
                { title: "Innovation", desc: "Constantly evolving to bring new joy to life.", icon: <Zap className="w-8 h-8 text-brand-accent" /> },
                { title: "Community", desc: "Building trust and happiness in every home.", icon: <Users className="w-8 h-8 text-brand-accent" /> }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2rem] shadow-lg border border-slate-100 hover:border-brand-accent transition-colors">
                  <div className="mb-6">{item.icon}</div>
                  <h4 className="text-xl font-black text-brand-primary mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Operational Backbone */}
      <section className="section-padding bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-candy-teal rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Operational Backbone</span>
              <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-12">
                Smart <br />Distribution <br />Ecosystem.
              </h2>
              <p className="text-white/60 text-xl font-medium leading-relaxed mb-12">
                What sets Salemore apart is our strong operational backbone. We are building a smart distribution ecosystem that connects manufacturers, distributors, retailers, and consumers with speed and efficiency. Our goal is not just to sell products — but to build long-term brand trust in every market we enter.
              </p>
              <h4 className="text-white text-lg font-bold mb-6">We focus on:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Quality assurance and hygiene standards",
                  "Efficient supply-chain and storage management",
                  "Strong retailer and distributor partnerships",
                  "Competitive pricing with consistent margins",
                  "Expanding reach in urban and rural markets"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/80">
                    <div className="w-2 h-2 bg-brand-accent rounded-full" />
                    <span className="text-sm font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl rounded-[4rem] p-16 border border-white/10"
            >
              <h3 className="text-3xl font-black text-white mb-12 tracking-tight">Our Commitment</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                At Salemore, we are not just manufacturing products; we are crafting experiences. Our commitment to quality, innovation, and community drives everything we do, ensuring that every bite brings a smile.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="section-padding bg-brand-secondary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32">
            <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Our Journey</span>
            <h2 className="text-6xl md:text-9xl font-black text-brand-primary tracking-tighter leading-none">The Sweet Path.</h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-primary/10 hidden lg:block" />
            
            <div className="space-y-24 lg:space-y-48">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-32 ${i % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
                >
                  <div className="flex-1 text-center lg:text-right">
                    <div className="space-y-6">
                      <span className="text-8xl font-black text-brand-accent/20">{item.year}</span>
                      <h3 className="text-4xl font-black text-brand-primary tracking-tight">{item.title}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed max-w-md mx-auto lg:ml-auto lg:mr-0">{item.desc}</p>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center shadow-2xl border-8 border-white group hover:bg-brand-accent transition-colors duration-500">
                      <div className="w-4 h-4 bg-white rounded-full group-hover:scale-150 transition-transform" />
                    </div>
                  </div>

                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Philosophy */}
      <section className="section-padding candy-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32">
            <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Our Philosophy</span>
            <h2 className="text-6xl md:text-9xl font-black text-brand-primary tracking-tighter leading-none">Made for Life.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Moments of Delight", desc: "Our chocolates and candies are designed to spark moments of delight.", icon: <Sparkles className="w-8 h-8 text-brand-accent" /> },
              { title: "Nostalgic Flavors", desc: "Our imli range celebrates India’s love for bold, nostalgic flavours.", icon: <Heart className="w-8 h-8 text-brand-accent" /> },
              { title: "Nutritious Care", desc: "Our special products represent our commitment to delivering nutritious essentials with care and responsibility.", icon: <Award className="w-8 h-8 text-brand-accent" /> }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-16 rounded-[4rem] bg-white shadow-2xl border border-slate-50 group text-center hover:-translate-y-4 transition-all duration-500"
              >
                <div className="w-24 h-24 bg-brand-secondary rounded-[2rem] flex items-center justify-center mx-auto mb-12 group-hover:bg-brand-accent transition-all duration-500">
                  <div className="group-hover:text-white transition-colors duration-500">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-4xl font-black text-brand-primary mb-8 tracking-tight">{value.title}</h3>
                <p className="text-slate-500 text-base leading-relaxed font-medium">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Promise */}
      <section className="section-padding bg-brand-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Package className="w-20 h-20 text-brand-accent mx-auto mb-16" />
          </motion.div>
          <h2 className="text-6xl md:text-[12rem] font-black text-white tracking-tighter leading-[0.8] mb-16">
            The Salemore <br />Promise.
          </h2>
          <p className="text-white/60 text-2xl max-w-4xl mx-auto font-medium leading-relaxed mb-20">
            At Salemore, every product leaving our facility carries more than just packaging — it carries our promise of taste, freshness, and reliability. We are committed to growing responsibly, innovating continuously, and delivering products that combine indulgence with everyday practicality. Salemore is for Delivering taste, trust, and freshness in every bite.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            <div className="text-center">
              <span className="block text-5xl font-black text-brand-accent mb-2">1999</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Founded</span>
            </div>
            <div className="text-center">
              <span className="block text-5xl font-black text-brand-accent mb-2">24/7</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Operational Backbone</span>
            </div>
            <div className="text-center">
              <span className="block text-5xl font-black text-brand-accent mb-2">100%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Quality Assurance</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
