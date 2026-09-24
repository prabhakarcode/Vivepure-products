import React, { useState, useEffect, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';
import { Product, Category } from '../types';
import { Search, Filter, RotateCcw, ArrowUpDown, SlidersHorizontal, Check } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filters
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [prodList, catList] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);
        setProducts(prodList);
        setCategories(catList);
      } catch (err) {
        console.error('Failed to load shop products', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(
        p => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price
    result = result.filter(p => (p.discountPrice || p.price) <= priceRange);

    // Rating
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Stock
    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'popularity') {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, minRating, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange(1000);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header bar */}
      <div className="border-b border-[#E7E2D6] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#173F35]">
            Catalogue & Online Store
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#17372F] mt-1">
            All Products
          </h1>
          <p className="text-xs text-[#6A7B74] mt-1">
            Showing <span className="font-bold text-[#17372F] tabular-nums">{filteredProducts.length}</span> of {products.length} items
          </p>
        </div>

        {/* Sort & Mobile filter trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-[#DBD5C5] rounded-xl text-xs font-semibold text-[#17372F] cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 bg-white border border-[#DBD5C5] rounded-xl px-3 py-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#6A7B74]" />
            <label htmlFor="sort-select" className="text-[#6A7B74]">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-[#17372F] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="popularity">Popularity</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Filter Sidebar */}
        <aside className={`md:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D6] space-y-6 shadow-xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE2]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17372F]">
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#173F35] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Search Input Filter */}
            <div>
              <label className="block text-xs font-semibold text-[#17372F] mb-1.5">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by keyword..."
                  className="w-full bg-[#FAF8F5] border border-[#DBD5C5] rounded-xl py-1.5 pl-3 pr-8 text-xs text-[#1E2E2A] focus:outline-none focus:border-[#173F35]"
                />
                <Search className="w-3.5 h-3.5 text-[#7A8A84] absolute right-2.5 top-2.5" />
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <label className="block text-xs font-semibold text-[#17372F] mb-2">
                Categories
              </label>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategory === 'All'
                      ? 'bg-[#173F35] text-white font-semibold'
                      : 'text-[#4A5D56] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[11px] tabular-nums opacity-80">{products.length}</span>
                </button>
                {categories.map((cat) => {
                  const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#173F35] text-white font-semibold'
                          : 'text-[#4A5D56] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] tabular-nums opacity-80">{cat.itemCount || 0}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#17372F] mb-2">
                <span>Max Price:</span>
                <span className="tabular-nums text-[#173F35]">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="25"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#173F35] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#7A8A84] mt-1 tabular-nums">
                <span>₹100</span>
                <span>₹500</span>
                <span>₹1,000</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-xs font-semibold text-[#17372F] mb-2">
                Minimum Rating
              </label>
              <div className="space-y-1">
                {[4.5, 4.0, 3.5, 0].map((r) => (
                  <label
                    key={r}
                    className="flex items-center gap-2 text-xs text-[#4A5D56] cursor-pointer hover:text-[#17372F] py-1"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === r}
                      onChange={() => setMinRating(r)}
                      className="accent-[#173F35]"
                    />
                    <span>{r === 0 ? 'All Ratings' : `${r} Stars & Above`}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* In-Stock Only Toggle */}
            <div className="pt-2 border-t border-[#F0ECE2]">
              <label className="flex items-center gap-2 text-xs text-[#2C4039] font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#173F35] rounded"
                />
                <span>In Stock Only</span>
              </label>
            </div>

          </div>
        </aside>

        {/* Right Product Grid Area */}
        <main className="md:col-span-9">
          {loading ? (
            <div className="py-20 text-center text-[#6A7B74] text-xs">
              Loading handcrafted products...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E7E2D6] p-12 text-center space-y-4">
              <p className="font-serif text-xl font-bold text-[#17372F]">No products found</p>
              <p className="text-xs text-[#6A7B74] max-w-sm mx-auto">
                No items match your active filters. Try adjusting price range, category, or search keywords.
              </p>
              <button
                onClick={handleResetFilters}
                className="py-2 px-4 bg-[#173F35] text-white text-xs font-semibold rounded-xl hover:bg-[#235D4E] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </main>

      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
