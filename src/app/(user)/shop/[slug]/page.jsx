'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '../../../../lib/sanityClient'
import { useStateContext } from '../../../../lib/StateContext'
import { Star, Minus, Plus, ShoppingCart, ChevronDown } from 'lucide-react'

const getProduct = async (slug) => {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    description,
    image,
    price,
    specification,
    slug,
    reviews,
  }`
  return await client.fetch(query, { slug })
}

export default function ProductDetails() {
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mainImage, setMainImage] = useState(null)
  const [isSpecsOpen, setIsSpecsOpen] = useState(false)
  const params = useParams()
  const { slug } = params
  const { onAdd, Qty, setQty, incQty, decQty } = useStateContext();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      const fetchedProduct = await getProduct(slug)
      setProduct(fetchedProduct)
      if (fetchedProduct.image && fetchedProduct.image.length > 0) {
        setMainImage(urlFor(fetchedProduct.image[0]).url())
      }
      setIsLoading(false)
      setQty(1)
    }
    fetchProduct()
  }, [slug])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Something went wrong!</div>
  }

  return (
    <div className="container mx-auto px-6 py-10 mb-10">
      <Link href="/shop" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Shop
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-w-3 aspect-h-2 max-h-[500px] min-h-[400px] rounded-lg bg-gray-200 overflow-hidden">
            <Image 
              src={mainImage || '/placeholder.svg?height=400&width=600'} 
              alt={product.name} 
              width={600} 
              height={400} 
              className="object-cover w-full h-full" 
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.image && product.image.map((img, index) => (
              <button
                key={index}
                className="aspect-w-1 aspect-h-1 rounded-md overflow-hidden focus:outline-none border border-gray-300 focus:ring-2 bg-gray-300"
                onClick={() => setMainImage(urlFor(img).url())}
              >
                <Image 
                  src={urlFor(img).url()} 
                  alt={`${product.name} - Image ${index + 1}`} 
                  width={150} 
                  height={150} 
                  className="object-cover w-full h-full" 
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>
          <p className="text-xl font-semibold">GHS {product.price}</p>
          <div className="space-y-6">
            <p className="text-gray-600">{product.description}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button 
                  className="p-2 hover:bg-gray-100"
                  onClick={decQty}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4">{Qty}</span>
                <button 
                  className="p-2 hover:bg-gray-100"
                  onClick={incQty}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex w-40 bg-orange-600 text-white py-2 px-4 rounded-full hover:bg-black items-center" onClick={() => onAdd(product, Qty)}>
                <ShoppingCart className="inline-block mr-2 h-4 w-4" /> Add to Cart
              </button>
              <button className="w-40 bg-transparent text-black py-2 px-4 rounded-full hover:bg-gray-100 border border-black">
                Buy Now
              </button>
            </div>
            <div className="border border-black rounded-md mt-6">
              <button
                className="flex justify-between items-center w-full p-4 text-left"
                onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                aria-expanded={isSpecsOpen}
              >
                <span className="light">Full Specifications</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isSpecsOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {isSpecsOpen && (
                <div className="p-4 border-t border-gray-200 space-y-4">
                  <p>{product.specification}</p> 
                </div>
              )}
            </div>  
          </div>
        </div>
      </div>
    </div>
  )
}