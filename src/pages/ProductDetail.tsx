import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { Product } from '../types';
import productsData from '../data/products.json';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    const foundProduct = productsData.find((p: any) => p.id === parseInt(id!));
    if (foundProduct) {
      setProduct({ ...foundProduct, price: parseFloat(foundProduct.price as any) } as any);
      setLoading(false);
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="bg-white min-h-screen pb-32 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-3 text-brand-muted font-bold uppercase tracking-[0.2em] text-[10px] hover:text-brand-accent transition-colors mb-16"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-brand-secondary">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div>
                <span className="text-brand-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">
                  Premium Collection
                </span>
                <h1 className="text-5xl md:text-7xl font-serif font-black text-brand-primary tracking-tight mb-6 leading-none">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-brand-accent text-brand-accent" />
                    ))}
                  </div>
                  <span className="text-brand-muted font-bold text-[10px] uppercase tracking-widest">4.9 Rating</span>
                </div>
              </div>

              <p className="text-3xl font-serif font-black text-brand-primary">
                ₹{product.price.toFixed(2)}
              </p>

              <div className="w-12 h-[2px] bg-brand-accent" />

              <p className="text-slate-500 text-base leading-relaxed font-medium">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <a
                  href="https://www.indiamart.com/sale-more/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow py-5 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-xl hover:bg-brand-accent transition-all flex items-center justify-center gap-3 group"
                >
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Inquire for Wholesale
                </a>
              </div>

              {/* Product Specifications */}
              <div className="grid grid-cols-2 gap-y-6 pt-8 border-t border-slate-100">
                {product.packaging_size && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-1">Packaging Size</h4>
                    <p className="text-sm font-black text-brand-primary">{product.packaging_size}</p>
                  </div>
                )}
                {product.shape && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-1">Shape</h4>
                    <p className="text-sm font-black text-brand-primary">{product.shape}</p>
                  </div>
                )}
                {product.packaging && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-1">Packaging</h4>
                    <p className="text-sm font-black text-brand-primary">{product.packaging}</p>
                  </div>
                )}
                {product.color && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-1">Color</h4>
                    <p className="text-sm font-black text-brand-primary">{product.color}</p>
                  </div>
                )}
                {product.per_piece_price && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-1">Per Piece Price</h4>
                    <p className="text-sm font-black text-brand-primary">{product.per_piece_price}</p>
                  </div>
                )}
                {product.mrp && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-1">MRP</h4>
                    <p className="text-sm font-black text-brand-primary">{product.mrp}</p>
                  </div>
                )}
              </div>

              {/* Manufacturing Specs */}
              <div className="grid grid-cols-1 gap-8 pt-16 border-t border-slate-100">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-brand-secondary rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-1">Quality Guaranteed</h4>
                    <p className="text-xs text-brand-muted font-medium">ISO 22000 Certified Production</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-brand-secondary rounded-full flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-1">Global Logistics</h4>
                    <p className="text-xs text-brand-muted font-medium">Worldwide Shipping from Gandhinagar</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

