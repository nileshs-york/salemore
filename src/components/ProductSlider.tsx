import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useData } from '../context/DataContext';

export default function ProductSlider() {
  const { products: allProducts } = useData();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Filter for candy, jelly, or related products
    const filtered = (allProducts as any[]).filter((p: any) =>
      p.name.toLowerCase().includes('candy') ||
      p.name.toLowerCase().includes('jelly') ||
      p.description.toLowerCase().includes('candy') ||
      p.description.toLowerCase().includes('jelly')
    );
    setProducts(filtered);
  }, [allProducts]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 2)) % Math.max(1, products.length - 2));
  };

  if (products.length === 0) return null;

  return (
    <section className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter">
            Candy & Jelly Delights
          </h2>
          <div className="flex gap-4">
            <button onClick={prevSlide} className="p-4 rounded-full bg-white border border-slate-200 hover:bg-brand-accent hover:text-white transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="p-4 rounded-full bg-white border border-slate-200 hover:bg-brand-accent hover:text-white transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{ x: `-${currentIndex * 33.33}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {products.map((product) => (
              <div key={product.id} className="min-w-[33.33%] group">
                <Link to={`/products/${product.id}`}>
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-sm mb-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-xl font-black text-brand-primary group-hover:text-brand-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-brand-accent font-bold text-sm">₹{product.price.toFixed(2)}</p>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
