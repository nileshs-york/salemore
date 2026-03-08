import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Instagram, Mail, Phone, MapPin, Menu, X, ShoppingBag } from 'lucide-react';
import Loader from './Loader';
import WhatsAppPopup from './WhatsAppPopup';
import Popup from './Popup';
import { Category, Product } from '../types';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(setCategories);
    fetch('/api/products').then(res => res.json()).then(setProducts);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Collections', path: '/products', hasDropdown: true },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHeroPage = location.pathname === '/' || location.pathname === '/about';

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-accent selection:text-white">
      <Loader />
      <Popup />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || !isHeroPage
          ? 'bg-brand-primary py-4 shadow-xl'
          : 'bg-transparent py-8'
          }`}
        onMouseLeave={() => setIsCollectionsOpen(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-4 group">
              <motion.div
                whileHover={{ rotate: 360, backgroundColor: "#FFD700" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,0,128,0.4)]"
              >
                <span className="text-white font-display font-black text-2xl">$</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-black tracking-tighter transition-colors duration-500 text-white">
                  SALEMORE
                </span>
                {/* <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-brand-accent">
                  Manufacturing Excellence
                </span> */}
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <div key={link.name} className="relative" onMouseEnter={() => link.hasDropdown && setIsCollectionsOpen(true)}>
                  <Link
                    to={link.path}
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-brand-accent relative group text-white ${location.pathname === link.path ? 'text-brand-accent' : ''
                      }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-2 left-0 h-[2px] bg-brand-accent transition-all ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                  </Link>

                  {/* Dropdown */}
                  {link.hasDropdown && isCollectionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl p-6 max-h-[70vh] overflow-y-auto"
                    >
                      <div className="space-y-6">
                        {categories.map(cat => (
                          <div key={cat.id}>
                            <Link
                              to={`/products?category=${cat.id}`}
                              className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-3 block hover:text-brand-accent"
                              onClick={() => setIsCollectionsOpen(false)}
                            >
                              {cat.name}
                            </Link>
                            <div className="space-y-2 pl-4">
                              {products.filter(p => p.category_id === cat.id).slice(0, 5).map(prod => (
                                <Link
                                  key={prod.id}
                                  to={`/products/${prod.id}`}
                                  className="block text-sm font-medium text-slate-600 hover:text-brand-accent transition-colors"
                                  onClick={() => setIsCollectionsOpen(false)}
                                >
                                  {prod.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 transition-colors text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-brand-primary flex flex-col items-center justify-center p-8"
          >
            <button
              className="absolute top-8 right-8 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-display font-black text-white hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`flex-grow ${!isHeroPage ? 'pt-20 md:pt-24' : ''}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-primary text-white pt-32 pb-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 candy-gradient" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-24">
            <div className="md:col-span-5 space-y-8">
              <Link to="/" className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center">
                  <span className="text-white font-display font-black text-2xl">$</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-display font-black tracking-tighter text-white">
                    SALEMORE
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">
                    Global Confectionery Manufacturer
                  </span>
                </div>
              </Link>
              <p className="text-white text-sm max-w-md leading-relaxed font-medium">
                Salemore is a fast-growing FMCG brand dedicated to bringing joy, taste, and fun to households across India since 1999.
              </p>
              <div className="flex gap-6">
                <a
                  href="https://www.instagram.com/salemore.confectionery?igsh=Z2V4dm9paDNwYWVi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent transition-all group"
                >
                  <Instagram size={18} className="text-white/40 group-hover:text-white" />
                </a>
                <a
                  href="https://www.indiamart.com/sale-more/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent transition-all group"
                >
                  {/* <img src="/INDIAMARTlogo.png" alt="IndiaMart" className="w-[18px] h-[18px] object-contain brightness-0 invert opacity-40 group-hover:opacity-100 transition-all" /> */}
                  <ShoppingBag size={18} className="text-white/40 group-hover:text-white" />
                </a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">Navigation</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-white hover:text-brand-accent transition-colors text-sm font-medium">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">Manufacturing HQ</h4>
              <div className="space-y-6 text-white text-sm font-medium">
                <div className="flex gap-4">
                  <MapPin className="text-brand-accent shrink-0" size={20} />
                  <p>6, Somnath Industrial Estate, Nr.Canal , Ahmedabad -Himmatnagar Highway, Village - Valad , Taluka & District- Gandhinagar -382355</p>
                </div>
                <div className="flex gap-4 text-white">
                  <Phone className="text-brand-accent shrink-0" size={20} />
                  <a href="tel:+918780977648" className="hover:text-brand-accent transition-colors">+91 87809 77648</a>
                </div>
                <div className="flex gap-4 text-white">
                  <Mail className="text-brand-accent shrink-0" size={20} />
                  <a href="mailto:partner@salemore.co.in" className="hover:text-brand-accent transition-colors">partner@salemore.co.in</a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col items-center gap-4">
            <p className="text-white text-[10px] font-bold uppercase tracking-widest text-center">
              © {new Date().getFullYear()} Salemore. All rights reserved. | Website crafted with precision by <a href="https://strapnova.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">StrapNova</a>
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppPopup />
    </div>
  );
}
