import { motion } from 'motion/react';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function Catalogue() {
  // Placeholder PDF link
  const pdfUrl = "Salemore Catalogue.PDF";

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-candy-gradient pb-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8"
          >
            <FileText className="w-10 h-10" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Product Catalogue
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
            Download or view our full range of products in our latest digital catalogue. Everything you need to know about our sweet collections.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={pdfUrl}
              download
              className="px-10 py-5 bg-white text-slate-900 font-black rounded-full hover:bg-slate-100 transition-all flex items-center justify-center gap-3"
            >
              <Download className="w-5 h-5" /> DOWNLOAD PDF
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-slate-900 text-white font-black rounded-full hover:bg-black transition-all flex items-center justify-center gap-3"
            >
              <ExternalLink className="w-5 h-5" /> VIEW FULLSCREEN
            </a>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 aspect-[1/1.4] md:aspect-video relative">
            <iframe
              src={`${pdfUrl}#toolbar=0`}
              className="w-full h-full border-none"
              title="Product Catalogue"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
}
