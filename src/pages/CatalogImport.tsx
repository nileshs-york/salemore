import { catalog } from '../data/catalog';

export default function CatalogImport() {
  return (
    <div className="pb-24 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <h1 className="text-4xl font-black text-slate-900 mb-12 text-center">Imported Product Catalog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalog.map((cat, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-xl text-[#25D366] mb-4">{cat.category}</h3>
              <ul className="space-y-2">
                {cat.products.map((product, pIndex) => (
                  <li key={pIndex} className="text-sm text-slate-600 bg-slate-50 p-2 rounded">
                    {product}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
