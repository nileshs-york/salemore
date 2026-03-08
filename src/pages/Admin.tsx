import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Package, LayoutGrid, AlertCircle, CheckCircle, LogOut, Lock, MessageSquare } from 'lucide-react';
import { Category, Product } from '../types';
import { useData } from '../context/useData';

export default function Admin() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const { products, categories, contacts, setProducts, setCategories, setContacts } = useData();
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'contacts'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [productPage, setProductPage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [newProduct, setNewProduct] = useState({
    category_id: '',
    name: '',
    description: '',
    price: '',
    image: null as File | null,
    is_featured: false,
    packaging_size: '',
    shape: '',
    packaging: '',
    color: '',
    per_piece_price: '',
    mrp: ''
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: null as File | null
  });

  useEffect(() => {
    // Contacts are managed globally, but we might want to check login state here if needed
  }, [token]);

  const fetchData = () => {
    // Data is provided by DataContext
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const uploadFile = async (file: File): Promise<string> => {
    // We only do real file uploads in DEV mode via our Vite middleware
    const base64Data = await fileToBase64(file);
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    try {
      const response = await fetch('/api/upload-local-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, base64Data })
      });
      const result = await response.json();
      return result.url; // Returns e.g. /uploads/123-image.png
    } catch (err) {
      console.error('Upload failed, falling back to Base64', err);
      return base64Data;
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Using static credentials as requested to bypass API
    const STATIC_USER = "admin_manish";
    const STATIC_PASS = "Manish@SaleMore#1999";

    if (username === STATIC_USER && password === STATIC_PASS) {
      const fakeToken = "fake-jwt-token-salemore";
      setToken(fakeToken);
      localStorage.setItem('adminToken', fakeToken);
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const imageUrl = newProduct.image ? await uploadFile(newProduct.image) : '/placeholder.jpg';
      const productToAdd = {
        ...newProduct,
        id: Date.now(),
        category_id: parseInt(newProduct.category_id),
        price: parseFloat(newProduct.price),
        is_featured: newProduct.is_featured ? 1 : 0,
        image: imageUrl
      } as any;

      setProducts(prev => [productToAdd, ...prev]);
      setStatus({ type: 'success', message: 'Product added successfully!' });
      setNewProduct({
        category_id: '', name: '', description: '', price: '', image: null, is_featured: false,
        packaging_size: '', shape: '', packaging: '', color: '', per_piece_price: '', mrp: ''
      });
    } catch (err) {
      console.error('Image conversion failed', err);
      setStatus({ type: 'error', message: 'Failed to process image' });
    }

    setIsAdding(false);
    setTimeout(() => setStatus(null), 3000);
  };

  const handleAddCategory = async (e: FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const imageUrl = newCategory.image ? await uploadFile(newCategory.image) : '/placeholder.jpg';
      const categoryToAdd = {
        id: Date.now(),
        ...newCategory,
        image: imageUrl
      } as Category;

      setCategories(prev => [categoryToAdd, ...prev]);
      setStatus({ type: 'success', message: 'Category added successfully!' });
      setNewCategory({ name: '', description: '', image: null });
    } catch (err) {
      console.error('Upload failed', err);
      setStatus({ type: 'error', message: 'Failed to process image' });
    }

    setIsAdding(false);
    setTimeout(() => setStatus(null), 3000);
  };

  const handleDeleteProduct = (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setProducts(prev => prev.filter(p => p.id !== id));
    setStatus({ type: 'success', message: 'Product deleted successfully' });
    setTimeout(() => setStatus(null), 3000);
  };

  const handleDeleteCategory = (id: number) => {
    const hasProducts = products.some(p => p.category_id === id);
    if (hasProducts) {
      setStatus({ type: 'error', message: 'Cannot delete category with products' });
      return;
    }
    setCategories(prev => prev.filter(c => c.id !== id));
    setStatus({ type: 'success', message: 'Category removed' });
    setTimeout(() => setStatus(null), 3000);
  };

  const handleUpdateProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsAdding(true);

    try {
      const imageUrl = newProduct.image ? await uploadFile(newProduct.image) : editingProduct.image;
      const updatedProduct = {
        ...editingProduct, // Start with original
        ...newProduct,     // Overlay new values
        category_id: parseInt(newProduct.category_id),
        price: parseFloat(newProduct.price),
        is_featured: newProduct.is_featured ? 1 : 0,
        image: imageUrl
      } as any;

      setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p));
      setStatus({ type: 'success', message: 'Product updated successfully!' });
      setEditingProduct(null);
    } catch (err) {
      console.error('Upload failed', err);
      setStatus({ type: 'error', message: 'Failed to process image' });
    }

    setIsAdding(false);
    setTimeout(() => setStatus(null), 3000);
  };

  const handleUpdateCategory = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setIsAdding(true);

    try {
      const imageUrl = newCategory.image ? await uploadFile(newCategory.image) : editingCategory.image;
      const updatedCategory = {
        ...editingCategory,
        ...newCategory,
        image: imageUrl
      } as Category;

      setCategories(prev => prev.map(c => c.id === editingCategory.id ? updatedCategory : c));
      setStatus({ type: 'success', message: 'Category updated successfully!' });
      setEditingCategory(null);
    } catch (err) {
      console.error('Upload failed', err);
      setStatus({ type: 'error', message: 'Failed to process image' });
    }

    setIsAdding(false);
    setTimeout(() => setStatus(null), 3000);
  };

  const handleBulkDeleteProducts = () => {
    setProducts(prev => prev.filter(p => !selectedProductIds.includes(p.id)));
    setSelectedProductIds([]);
    setStatus({ type: 'success', message: 'Products removed' });
  };

  const handleBulkDeleteCategories = () => {
    setCategories(prev => prev.filter(c => !selectedCategoryIds.includes(c.id)));
    setSelectedCategoryIds([]);
    setStatus({ type: 'success', message: 'Categories removed' });
  };

  if (!token) {
    return (
      <div className="min-h-screen candy-mesh flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100"
        >
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-brand-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Lock className="text-white w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black text-brand-primary tracking-tighter">Admin Login</h1>
            <p className="text-brand-muted text-[10px] font-bold uppercase tracking-widest mt-2">Wholesale Portal Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-4">Username</label>
              <input
                required
                type="text"
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                placeholder="admin"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-4">Password</label>
              <input
                required
                type="password"
                value={password || ''}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-xs font-bold text-center">{loginError}</p>
            )}
            <button className="w-full py-5 bg-brand-primary text-white font-black rounded-2xl shadow-xl hover:bg-brand-accent transition-all">
              Access Portal
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-brand-primary tracking-tighter mb-2">Wholesale Portal</h1>
            <p className="text-brand-muted font-bold uppercase tracking-[0.4em] text-[10px]">Manufacturing Management</p>
          </div>

          <div className="flex items-center gap-4">
            {status && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`px-6 py-3 rounded-full flex items-center gap-3 shadow-lg ${status.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                  }`}
              >
                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span className="text-xs font-bold uppercase tracking-widest">{status.message}</span>
              </motion.div>
            )}
            <button
              onClick={handleLogout}
              className="p-4 bg-white text-brand-muted hover:text-brand-accent rounded-2xl shadow-sm transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-3 ${activeTab === 'products' ? 'bg-brand-primary text-white shadow-xl' : 'bg-white text-brand-muted hover:bg-slate-100'
              }`}
          >
            <Package size={16} /> Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-3 ${activeTab === 'categories' ? 'bg-brand-primary text-white shadow-xl' : 'bg-white text-brand-muted hover:bg-slate-100'
              }`}
          >
            <LayoutGrid size={16} /> Categories
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-3 ${activeTab === 'contacts' ? 'bg-brand-primary text-white shadow-xl' : 'bg-white text-brand-muted hover:bg-slate-100'
              }`}
          >
            <MessageSquare size={16} /> Contacts
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-4">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 sticky top-32">
              <h2 className="text-2xl font-black text-brand-primary mb-8 flex items-center gap-3">
                <Plus className="text-brand-accent" /> {activeTab === 'products' ? 'Add Product' : activeTab === 'categories' ? 'Add Category' : 'Contact Info'}
              </h2>

              {activeTab === 'products' ? (
                <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Category</label>
                    <select
                      required
                      value={newProduct.category_id || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Product Name</label>
                    <input
                      required
                      type="text"
                      value={newProduct.name || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                      placeholder="e.g. Sour Gummy Worms"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Price (₹)</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      value={newProduct.price || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                      placeholder="4.99"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Product Image</label>
                    {editingProduct && editingProduct.image && (
                      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <img src={editingProduct.image} alt="current" className="w-12 h-12 rounded-lg object-cover" />
                        <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Current Image</span>
                      </div>
                    )}
                    <input
                      required={!editingProduct}
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files?.[0] || null })}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Packaging Size</label>
                      <input
                        type="text"
                        value={newProduct.packaging_size || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, packaging_size: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                        placeholder="24 Piece"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Shape</label>
                      <input
                        type="text"
                        value={newProduct.shape || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, shape: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                        placeholder="Round (Gems)"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Packaging</label>
                      <input
                        type="text"
                        value={newProduct.packaging || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, packaging: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                        placeholder="Box"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Color</label>
                      <input
                        type="text"
                        value={newProduct.color || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                        placeholder="Multi Color"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Per Piece Price</label>
                      <input
                        type="text"
                        value={newProduct.per_piece_price || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, per_piece_price: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                        placeholder="15 Rupaye"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">MRP</label>
                      <input
                        type="text"
                        value={newProduct.mrp || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, mrp: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                        placeholder="360 Rupaye"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={newProduct.description || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium resize-none"
                      placeholder="Short description..."
                    />
                  </div>
                  <div className="flex items-center gap-3 ml-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={newProduct.is_featured}
                      onChange={(e) => setNewProduct({ ...newProduct, is_featured: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-300 text-brand-accent focus:ring-brand-accent"
                    />
                    <label htmlFor="featured" className="text-xs font-bold text-brand-muted uppercase tracking-widest">Featured</label>
                  </div>
                  <button
                    disabled={isAdding}
                    className="w-full py-5 bg-brand-primary text-white font-black rounded-2xl shadow-xl hover:bg-brand-accent transition-all disabled:opacity-50"
                  >
                    {isAdding ? 'Processing...' : (editingProduct ? 'Update Product' : 'Add Product')}
                  </button>
                </form>
              ) : activeTab === 'categories' ? (
                <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Category Name</label>
                    <input
                      required
                      type="text"
                      value={newCategory.name || ''}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                      placeholder="e.g. Jelly Cubes"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Category Image</label>
                    {editingCategory && editingCategory.image && (
                      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <img src={editingCategory.image} alt="current" className="w-12 h-12 rounded-lg object-cover" />
                        <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Current Image</span>
                      </div>
                    )}
                    <input
                      required={!editingCategory}
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewCategory({ ...newCategory, image: e.target.files?.[0] || null })}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={newCategory.description || ''}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium resize-none"
                      placeholder="Short description..."
                    />
                  </div>
                  <button
                    disabled={isAdding}
                    className="w-full py-5 bg-brand-primary text-white font-black rounded-2xl shadow-xl hover:bg-brand-accent transition-all disabled:opacity-50"
                  >
                    {isAdding ? 'Processing...' : (editingCategory ? 'Update Category' : 'Add Category')}
                  </button>
                </form>
              ) : (
                <div className="text-brand-muted text-sm">
                  Contact submissions are read-only.
                </div>
              )}
            </div>
          </div>

          {/* List Column */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-10 border-b border-slate-50 flex justify-between items-center">
                <h2 className="text-2xl font-black text-brand-primary flex items-center gap-3">
                  {activeTab === 'products' ? <Package className="text-brand-accent" /> : activeTab === 'categories' ? <LayoutGrid className="text-brand-accent" /> : <MessageSquare className="text-brand-accent" />}
                  {activeTab === 'products' ? 'Product Inventory' : activeTab === 'categories' ? 'Categories' : 'Contacts'}
                </h2>

                {activeTab !== 'contacts' && (
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      className="px-6 py-3 bg-slate-50 rounded-full border-none focus:ring-4 focus:ring-brand-accent/10 transition-all font-medium text-sm"
                      value={activeTab === 'products' ? productSearch : categorySearch}
                      onChange={(e) => activeTab === 'products' ? setProductSearch(e.target.value) : setCategorySearch(e.target.value)}
                    />
                    {((activeTab === 'products' && selectedProductIds.length > 0) || (activeTab === 'categories' && selectedCategoryIds.length > 0)) && (
                      <button
                        onClick={activeTab === 'products' ? handleBulkDeleteProducts : handleBulkDeleteCategories}
                        className="px-6 py-3 bg-red-500 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-all"
                      >
                        Bulk Delete
                      </button>
                    )}
                  </div>
                )}

                <span className="px-6 py-2 bg-slate-50 rounded-full text-[10px] font-black text-brand-muted uppercase tracking-widest">
                  {activeTab === 'products' ? `${products.length} Items` : activeTab === 'categories' ? `${categories.length} Series` : `${contacts.length} Submissions`}
                </span>
              </div>

              <div className="overflow-x-auto">
                {activeTab === 'products' ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">
                          <input type="checkbox" onChange={(e) => setSelectedProductIds(e.target.checked ? products.map(p => p.id) : [])} />
                        </th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Product</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Category</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Price</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {products
                        .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()))
                        .slice((productPage - 1) * 10, productPage * 10)
                        .map((product) => (
                          <tr key={product.id} className="hover:bg-slate-50/30 transition-colors">
                            <td className="px-10 py-8">
                              <input type="checkbox" checked={selectedProductIds.includes(product.id)} onChange={(e) => setSelectedProductIds(e.target.checked ? [...selectedProductIds, product.id] : selectedProductIds.filter(id => id !== product.id))} />
                            </td>
                            <td className="px-10 py-8">
                              <div className="flex items-center gap-6">
                                <img src={product.image} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                                <div>
                                  <p className="font-bold text-brand-primary text-lg">{product.name}</p>
                                  {product.is_featured === 1 && (
                                    <span className="text-[8px] font-black uppercase tracking-widest text-brand-accent">Featured</span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-10 py-8">
                              <span className="px-4 py-2 bg-slate-100 rounded-full text-[10px] font-bold text-brand-muted uppercase tracking-widest">
                                {categories.find(c => c.id === product.category_id)?.name || 'Unknown'}
                              </span>
                            </td>
                            <td className="px-10 py-8 font-black text-brand-primary">₹{product.price.toFixed(2)}</td>
                            <td className="px-10 py-8 text-right flex gap-2">
                              <button onClick={() => {
                                setEditingProduct(product);
                                setNewProduct({
                                  ...product,
                                  category_id: product.category_id.toString(),
                                  price: product.price.toString(),
                                  is_featured: !!product.is_featured,
                                  image: null as any,
                                  packaging_size: product.packaging_size || '',
                                  shape: product.shape || '',
                                  packaging: product.packaging || '',
                                  color: product.color || '',
                                  per_piece_price: product.per_piece_price || '',
                                  mrp: product.mrp || ''
                                } as any);
                              }} className="p-4 text-slate-300 hover:text-brand-accent hover:bg-brand-accent/10 rounded-2xl transition-all">Edit</button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                              >
                                <Trash2 size={20} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : activeTab === 'categories' ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">
                          <input type="checkbox" onChange={(e) => setSelectedCategoryIds(e.target.checked ? categories.map(c => c.id) : [])} />
                        </th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Category</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Description</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {categories
                        .filter(c => c.name.toLowerCase().includes(categorySearch.toLowerCase()))
                        .slice((categoryPage - 1) * 10, categoryPage * 10)
                        .map((cat) => (
                          <tr key={cat.id} className="hover:bg-slate-50/30 transition-colors">
                            <td className="px-10 py-8">
                              <input type="checkbox" checked={selectedCategoryIds.includes(cat.id)} onChange={(e) => setSelectedCategoryIds(e.target.checked ? [...selectedCategoryIds, cat.id] : selectedCategoryIds.filter(id => id !== cat.id))} />
                            </td>
                            <td className="px-10 py-8">
                              <div className="flex items-center gap-6">
                                <img src={cat.image} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                                <p className="font-bold text-brand-primary text-lg">{cat.name}</p>
                              </div>
                            </td>
                            <td className="px-10 py-8">
                              <p className="text-xs text-brand-muted font-medium line-clamp-2 max-w-xs">{cat.description}</p>
                            </td>
                            <td className="px-10 py-8 text-right flex gap-2">
                              <button onClick={() => { setEditingCategory(cat); setNewCategory({ name: cat.name, description: cat.description, image: null }); }} className="p-4 text-slate-300 hover:text-brand-accent hover:bg-brand-accent/10 rounded-2xl transition-all">Edit</button>
                              <button
                                onClick={() => handleDeleteCategory(cat.id)}
                                className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                              >
                                <Trash2 size={20} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Name</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Email</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Subject</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-10 py-8 font-bold text-brand-primary">{contact.name}</td>
                          <td className="px-10 py-8 text-brand-muted">{contact.email}</td>
                          <td className="px-10 py-8 text-brand-primary font-medium">{contact.subject}</td>
                          <td className="px-10 py-8 text-brand-muted text-sm">{contact.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab !== 'contacts' && (
                  <div className="flex justify-center items-center gap-4 py-10">
                    <button
                      onClick={() => activeTab === 'products' ? setProductPage(p => Math.max(p - 1, 1)) : setCategoryPage(p => Math.max(p - 1, 1))}
                      disabled={(activeTab === 'products' ? productPage : categoryPage) === 1}
                      className="px-6 py-3 bg-slate-50 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 disabled:opacity-50 transition-all"
                    >
                      Previous
                    </button>
                    <span className="text-brand-primary text-sm font-bold">
                      Page {activeTab === 'products' ? productPage : categoryPage}
                    </span>
                    <button
                      onClick={() => activeTab === 'products' ? setProductPage(p => p + 1) : setCategoryPage(p => p + 1)}
                      disabled={(activeTab === 'products' ? productPage : categoryPage) >= Math.ceil((activeTab === 'products' ? products.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase())).length : categories.filter(c => c.name.toLowerCase().includes(categorySearch.toLowerCase())).length) / 10)}
                      className="px-6 py-3 bg-slate-50 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 disabled:opacity-50 transition-all"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>

              {((activeTab === 'products' && products.length === 0) || (activeTab === 'categories' && categories.length === 0) || (activeTab === 'contacts' && contacts.length === 0)) && !loading && (
                <div className="py-32 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-slate-200" />
                  </div>
                  <p className="text-brand-muted font-bold uppercase tracking-widest text-[10px]">No items found in this section.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
