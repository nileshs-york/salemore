import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-white px-4">
            {/* Decorative Blobs */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-24 -left-24 w-96 h-96 bg-brand-accent rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-primary rounded-full blur-[100px]"
                />
            </div>

            <div className="relative z-10 text-center max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Error 404</span>
                    <h1 className="text-8xl md:text-9xl font-black text-brand-primary tracking-tighter leading-none mb-8">
                        Lost <br />in the Shop?
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-lg mx-auto">
                        It looks like this treats corner doesn't exist yet! Let's get you back to where the magic happens.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            to="/"
                            className="px-10 py-5 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-2xl hover:scale-105 hover:bg-brand-accent transition-all flex items-center gap-3"
                        >
                            <Home className="w-4 h-4" /> Return Home
                        </Link>
                        <Link
                            to="/products"
                            className="px-10 py-5 bg-white text-brand-primary border border-brand-primary/10 shadow-sm text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-slate-50 transition-all flex items-center gap-3 group"
                        >
                            Our Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Candy Icons (Abstracted as Blobs) */}
                <div className="absolute inset-0 pointer-events-none -z-10">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 0.4, 0],
                                scale: [0.5, 1, 0.5],
                                y: [0, -100, 0],
                                x: [0, Math.sin(i) * 50, 0]
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                delay: i * 0.5
                            }}
                            className="absolute w-8 h-8 rounded-full bg-brand-accent/20 blur-sm"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
