import { catalog } from '../data/catalog';

export default function ProductCatalog() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalog.map((cat, index) => (
          <div key={index} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-[#25D366] mb-3">{cat.category}</h3>
            <ul className="space-y-1">
              {cat.products.map((product, pIndex) => (
                <li key={pIndex} className="text-sm text-gray-600">
                  • {product}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
