'use client';
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from 'next/navigation';

const AllProducts = () => {
  const { products } = useAppContext();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const filteredProducts = products.filter(product => {
    const lowerName = product.name.toLowerCase();
    const categoryWords = product.category.toLowerCase().split(' ');
    
    // Check if searchQuery is anywhere in product name
    const nameMatches = lowerName.includes(searchQuery);

    // Check if searchQuery matches start of any category word
    const categoryMatches = categoryWords.some(word => word.startsWith(searchQuery));

    return nameMatches || categoryMatches;
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-end pt-12">
          <p className="text-2xl font-medium">All Products</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
        </div>

        {searchQuery && (
          <p className="mt-6 text-gray-600/60 italic">
            Showing results for: <span className="font-semibold">{searchQuery}</span>
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-8 pb-14 w-full">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
