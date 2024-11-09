'use client'

import { client, urlFor } from '../../../lib/sanityClient'
import { useState, useEffect, useMemo } from "react"
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ProductFilters from '../../../components/ProductFilters'

const ITEMS_PER_PAGE = 12

const getAllProducts = async () => {
  const AllProductsQuery = `*[_type == "product" && defined(category)]{
    _id,
    name,
    description,
    image,
    price,
    slug,
    brand,
    tags,
    "categories": category[]->{
      _id,
      title
    },
  }`
  
  const totalCountQuery = `count(*[_type == "product"])`

  const [products, totalCount] = await Promise.all([
    client.fetch(AllProductsQuery),
    client.fetch(totalCountQuery)
  ])

  return { products, totalCount }
}

const CustomSkeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`}></div>
)

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [filterValue, setFilterValue] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const { products, totalCount } = await getAllProducts()
        setProducts(products)
        setFilteredProducts(products)
        setTotalCount(totalCount)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleFilterChange = (filters) => {
    const filtered = products.filter(product => 
      (filters.brands.length === 0 || filters.brands.includes(product.brand)) &&
      (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
      (filters.tags.length === 0 || product.tags?.some(tag => filters.tags.includes(tag))) &&
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max
    )
    setFilteredProducts(filtered)
  }

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredProducts.slice(start, end)
  }, [filteredProducts, currentPage])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

  const handlePageChange = (newPage) => {
    router.push(`/shop?page=${newPage}`)
  }

  return (
    <div className="flex flex-col mx-2 p-5 mt-5 mb-20">
      <div className="flex justify-between w-full items-center px-2">
        <h1 className="font-extralight text-3xl">All Products</h1>
        <div>
          <ProductFilters products={products} onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-6 mt-6">
        {isLoading
          ? Array(ITEMS_PER_PAGE).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col bg-transparent shadow-md w-full">
                <div className="bg-gray-200 w-full aspect-square overflow-hidden">
                  <CustomSkeleton className="w-full h-full" />
                </div>
                <div className="flex flex-col text-sm space-y-1 mt-4 p-4">
                  <CustomSkeleton className="h-4 w-3/4" />
                  <CustomSkeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          : paginatedProducts.map((product) => (
              <div key={product._id} className="flex flex-col bg-transparent shadow-md w-full">
                <Link href={`/shop/${product.slug.current}`}>
                  <div className="bg-gray-200 w-full aspect-square overflow-hidden">
                    {product.image && product.image.length > 0 ? (
                      <Image
                        src={urlFor(product.image[0]).url()}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain p-4 hover:scale-105 duration-200"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200">
                        <span>No Image Available</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col text-sm space-y-2 mt-4 p-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="font-nomal text-gray-400 truncate">{product.description}</p>
                    <p className="font-extralight">GHS {product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
      </div>

      {paginatedProducts.length === 0 && !isLoading && (
        <p className="text-center mt-8 text-gray-500">No products found matching your criteria.</p>
      )}

      <div className="flex justify-center mt-10 space-x-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:bg-black focus:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="flex items-center px-2 py-2 bg-primary text-primary-foreground rounded-md">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:bg-black focus:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}