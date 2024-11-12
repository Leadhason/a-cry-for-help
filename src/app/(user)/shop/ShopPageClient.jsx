'use client'

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import ProductFilters from '../../../components/ProductFilters'
import ProductGrid from './ProductGrid'

const ITEMS_PER_PAGE = 12

export default function ShopPageClient({ initialProducts, totalCount, initialPage }) {
  const [products, setProducts] = useState(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState(initialProducts)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const handleFilterChange = (filters) => {
    setIsLoading(true)
    const filtered = products.filter(product => 
      (filters.brands.length === 0 || filters.brands.includes(product.brand)) &&
      (filters.categories.length === 0 || product.categories.some(cat => filters.categories.includes(cat.title))) &&
      (filters.tags.length === 0 || product.tags?.some(tag => filters.tags.includes(tag))) &&
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max
    )
    setFilteredProducts(filtered)
    setCurrentPage(1)
    setIsLoading(false)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    router.push(`/shop?page=${page}`, { scroll: false })
  }

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="flex flex-col mx-2 p-5 mt-5 mb-20 w-auto">
      <div className="flex justify-between items-center w-full p-2">
        <h1 className="font-extralight text-3xl">All Products</h1>
        <div className="justify-end">
          <ProductFilters products={products} onFilterChange={handleFilterChange} />
        </div>
      </div>

      <ProductGrid 
        products={paginatedProducts} 
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {paginatedProducts.length === 0 && !isLoading && (
        <p className="text-center mt-8 text-gray-500">No products found matching your criteria.</p>
      )}
    </div>
  )
}