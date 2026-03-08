import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Quote, Zap, ShieldCheck, Users } from 'lucide-react';
import { Category, Product } from '../types';
import ProductSlider from '../components/ProductSlider';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "Slider1.mp4",
      type: "video",
    },
    {
      image: "Slider3.jpg",
      type: "image",
    }
  ];

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(setCategories);
    fetch('/api/products?featured=1').then(res => res.json()).then(setFeaturedProducts);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white overflow-hidden font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[35vh] sm:h-[50vh] lg:h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden bg-black">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-brand-primary/40 z-10" />
            {heroSlides[currentSlide].type === "video" ? (
              <motion.video
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6 }}
                src={heroSlides[currentSlide].image}
                className="w-full h-full object-contain lg:object-cover lg:object-center"
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                // @ts-ignore
                webkit-playsinline="true"
                referrerPolicy="no-referrer"
              />
            ) : (
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6 }}
                src={heroSlides[currentSlide].image}
                className="w-full h-full object-contain lg:object-cover lg:object-center"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            {heroSlides[currentSlide].subtitle && (
              <span className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
                {heroSlides[currentSlide].subtitle}
              </span>
            )}
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] text-balance">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${heroSlides[currentSlide].accent || ''}`}>
                {(heroSlides[currentSlide].title || '').split(' ').slice(0, -1).join(' ')}
              </span>
              <br />
              {(heroSlides[currentSlide].title || '').split(' ').slice(-1)}
            </h1>
            {heroSlides[currentSlide].description && (
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link
                to="/products"
                className="px-10 py-5 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_0_30px_rgba(255,0,128,0.4)] hover:scale-105 transition-all"
              >
                Explore Collection
              </Link>
              <Link
                to="/contact"
                className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white/20 transition-all"
              >
                Wholesale Inquiry
              </Link>
            </div>
          </motion.div>
        </div> */}

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-2xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </section>

      {/* Legacy Section */}
      <section className="section-padding relative candy-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 aspect-[4/5] flex items-center justify-center group">
                <div className="relative grid grid-cols-2 gap-8 md:gap-12 justify-items-center items-center w-full">
                  <img src="/candy.png" alt="Candy" className="w-40 h-40 md:w-56 md:h-56 object-contain mix-blend-multiply hover:scale-110 transition-transform duration-300 animate-bounce" />
                  <img src="/lollipop.png" alt="Lollipop" className="w-40 h-40 md:w-56 md:h-56 object-contain mix-blend-multiply hover:scale-110 transition-transform duration-300 animate-pulse" />
                  <img src="/chocolate.png" alt="Chocolate" className="w-40 h-40 md:w-56 md:h-56 object-contain mix-blend-multiply hover:scale-110 transition-transform duration-300 animate-pulse delay-300" />
                  <img src="/gummy.png" alt="Gummy" className="w-40 h-40 md:w-56 md:h-56 object-contain mix-blend-multiply hover:scale-110 transition-transform duration-300 animate-bounce delay-300" />
                </div>
              </div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-accent rounded-full z-0 blur-3xl opacity-20 animate-pulse" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px]">Our Legacy</span>
              <h2 className="text-5xl md:text-8xl font-black text-brand-primary leading-[0.9] tracking-tighter">
                Crafting <br />Sweet <br />Masterpieces.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                At Salemore, we believe everyday treats create everyday happiness. We are a fast-growing FMCG brand dedicated to bringing joy, taste, and fun to households across India. From rich chocolates and colourful candies to tangy imli delights and fresh, high-quality lollipops. Our products are crafted to be the part of daily life — in schools, homes, retail counters, and celebrations.
              </p>
              <div className="grid grid-cols-2 gap-12 pt-8">
                <div>
                  <h4 className="text-4xl font-black text-brand-accent mb-2">90+</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Unique Varieties</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-brand-accent mb-2">15+</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Global Markets</p>
                </div>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary hover:text-brand-accent transition-colors group"
              >
                Discover Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manufacturing Standards */}
      <section className="section-padding bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-accent via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Excellence in Production</span>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">Global Standards.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "ISO 22000 Certified",
                desc: "Our production lines meet the highest international safety and hygiene protocols.",
                icon: <ShieldCheck className="w-8 h-8 text-brand-accent" />
              },
              {
                title: "Electric Innovation",
                desc: "Utilizing state-of-the-art machinery to create textures and flavors that defy convention.",
                icon: <Zap className="w-8 h-8 text-brand-accent" />
              },
              {
                title: "Wholesale Scalability",
                desc: "Capable of producing massive volumes without compromising a single gram of quality.",
                icon: <Users className="text-brand-accent" />
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-12 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group"
              >
                <div className="mb-8 p-4 bg-white/10 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-6 tracking-tight">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding candy-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Signature Series</span>
              <h2 className="text-5xl md:text-8xl font-black text-brand-primary leading-none tracking-tighter">
                The Electric <br />Collection.
              </h2>
            </div>
            <Link
              to="/products"
              className="px-8 py-4 bg-brand-secondary text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-brand-primary hover:text-white transition-all"
            >
              View All 90+ Products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/products/${product.id}`}>
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-brand-secondary mb-8">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-brand-primary group-hover:text-brand-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-brand-accent font-bold text-[10px] uppercase tracking-widest">
                      ₹{product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProductSlider />

      {/* Partners Reviews */}
      <section className="section-padding bg-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Trusted Worldwide</span>
            <h2 className="text-5xl md:text-8xl font-black text-brand-primary tracking-tighter leading-none">Partners Reviews.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                text: "Working with Salemore has been a very positive experience. The products have good market demand, especially the candies and imli range. Their supply is consistent and the team is supportive, which makes distribution smooth for us.",
                author: "SM Distributor"
              },
              {
                text: "Salemore products sell well at our retail counter. Customers like the taste and color, and the packaging also attracts attention. It’s a reliable brand to keep in stock.",
                author: "End Point Retailer"
              },
              {
                text: "Salemore offers a good combination of quality products and competitive margins. Their chocolates and candy range are performing well in our market, and we look forward to expanding the partnership.",
                author: "Salemore Super Stockist"
              }
            ].map((review, i) => (
              <div key={i} className="p-16 bg-white rounded-[3rem] shadow-sm border border-slate-100 relative group hover:shadow-2xl transition-all flex flex-col justify-between">
                <div>
                  <Quote className="absolute top-12 right-12 w-12 h-12 text-brand-secondary group-hover:text-brand-accent/20 transition-colors" />
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                    ))}
                  </div>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium mb-10 italic">
                    "{review.text}"
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-black text-brand-primary">{review.author}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-32 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/Background%20image%20for%20Partnership%20with%20us.png")' }}
      >
        <div className="absolute inset-0 bg-brand-primary/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-12">
            Partner <br />With Us
          </h2>
          <p className="text-white/90 text-xl md:text-2xl max-w-2xl mx-auto mb-16 font-medium">
            Join our smart distribution ecosystem and deliver taste, trust, and freshness in every bite.
          </p>
          <Link
            to="/contact"
            className="inline-block px-12 py-6 bg-white text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] rounded-full shadow-2xl hover:scale-105 transition-all"
          >
            Partner with us
          </Link>
        </div>
      </section>
    </div>
  );
}
