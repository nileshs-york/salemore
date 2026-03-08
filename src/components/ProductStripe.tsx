import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useEffect, useState } from 'react';
import productsData from '../data/products.json';

export default function ProductStripe() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Take first 5 products or featured ones
    const initialProducts = (productsData as any[]).slice(0, 5).map(p => ({ ...p, price: typeof p.price === 'number' ? p.price : parseFloat(p.price) }));
    setProducts(initialProducts);
  }, []);

  return (
    <section className="py-12 bg-brand-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...products, ...products].map((product, i) => (
            <Link key={i} to={`/products/${product.id}`} className="flex items-center gap-4 min-w-[250px]">
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-full object-cover border-2 border-brand-golden" />
              <span className="text-white font-black text-lg">{product.name}</span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
