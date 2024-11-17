import Image from 'next/image'
import Link from 'next/link'
import { client } from "../lib/sanityClient"
import PopularProductsCarousel from './PopularProductsCarousel'

const getPopularProducts = async () => {
  const popularProductsQuery = `*[_type == "product" && "Popular" in tags] {
    _id,
    name,
    image,
    price,
    slug,
  }`
  return await client.fetch(popularProductsQuery)
}

const PopularProducts = async () => {
  const products = await getPopularProducts()

  return (
    <section className="flex flex-col mt-10 mx-2 p-5 mb-24 z-0">
      <div className="flex justify-between p-3">
        <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-0">Popular Products</h2>
        <Link href="/shop" className="flex items-center gap-1 text-gray-500 hover:text-gray-800 p-2" aria-label="View all popular products">
          View All
          <Image
            src="/arrow-right-black.svg"
            alt=""
            width={20}
            height={20}
            className="pt-1"
          />
        </Link>
      </div>
      <hr className="w-full bg-gray-300 my-4"/>

      <PopularProductsCarousel products={products} />
    </section>
  )
}

export default PopularProducts