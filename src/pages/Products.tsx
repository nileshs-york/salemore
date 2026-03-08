import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Product, Category } from '../types';
import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';

import { useData } from '../context/DataContext';

export default function Products() {
  const { categories, products } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    searchParams.get('category') ? parseInt(searchParams.get('category')!) : null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    setSelectedCategory(categoryParam ? parseInt(categoryParam) : null);
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category_id === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="pb-24 min-h-screen candy-mesh font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block"
          >
            Our Products
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black text-brand-primary tracking-tighter leading-none mb-12"
          >
            Our Signature <br />Products.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-12"
          >
            From rich chocolates to tangy imli delights, explore our collection of treats crafted to bring joy, taste, and fun to every household.
          </motion.p>
        </div>

        {/* Categories Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-brand-primary mb-8">Categories</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-accent transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search confections..."
                className="w-full pl-16 pr-8 py-5 bg-white rounded-full border border-slate-100 shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all text-sm font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === null
                  ? 'bg-brand-primary text-white shadow-xl'
                  : 'bg-white text-brand-primary hover:bg-slate-50 border border-slate-100'
                  }`}
              >
                All Series
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat.id
                    ? 'bg-brand-accent text-white shadow-xl'
                    : 'bg-white text-brand-primary hover:bg-slate-50 border border-slate-100'
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-brand-primary mb-8">Our Products</h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {paginatedProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group"
              >
                <Link to={`/products/${product.id}`}>
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white mb-8 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:scale-[1.02] transition-all duration-500">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                      <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                        View Details <ArrowRight size={14} />
                      </span>
                    </div>
                    {product.is_featured === 1 && (
                      <div className="absolute top-6 right-6 px-4 py-2 bg-brand-accent text-white text-[8px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 px-2">
                    <h3 className="text-2xl font-black text-brand-primary group-hover:text-brand-accent transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-brand-muted text-[10px] font-bold uppercase tracking-widest">
                        {categories.find(c => c.id === product.category_id)?.name}
                      </p>
                      <p className="text-brand-accent font-black text-lg">
                        ₹{product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-100 hover:bg-slate-50 disabled:opacity-50 transition-all"
            >
              Previous
            </button>
            <span className="text-brand-primary text-sm font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-100 hover:bg-slate-50 disabled:opacity-50 transition-all"
            >
              Next
            </button>
          </div>
        )
        }

        {filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <p className="text-brand-muted text-xl font-medium">No confections found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
              className="mt-8 text-brand-accent font-bold uppercase tracking-widest text-[10px] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
