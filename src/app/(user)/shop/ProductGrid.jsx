'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../../../lib/sanityClient'

const CustomSkeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`}></div>
)

export default function ProductGrid({ products, isLoading, currentPage, totalPages, onPageChange }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-6 mt-6">
        {isLoading
          ? Array(12).fill(0).map((_, index) => (
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
          : products.map((product) => (
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

      <div className="flex justify-center mt-10 space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:bg-black focus:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="flex items-center px-2 py-2 bg-primary text-primary-foreground rounded-md">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:bg-black focus:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </>
  )
}