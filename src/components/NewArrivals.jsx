import { client, urlFor } from "../lib/sanityClient"
import Image from 'next/image'
import Link from 'next/link'

const getNewArrivals = async () => {
  const NewArrivalsQuery = `*[_type == "product" && "New" in tags][0...8] {
    _id,
    name,
    image,
    price,
    slug,
  }`
  return await client.fetch(NewArrivalsQuery)
}

const NewArrivals = async () => {
  const products = await getNewArrivals()

  return (
    <section className="flex flex-col mx-2 p-5 mt-10 mb-20 z-0">
      <div className="flex justify-between p-2">
        <h2 className="font-medium text-3xl md:text-4xl">New Arrivals</h2>
        <Link href="/shop" className="flex items-center gap-1 text-gray-500 hover:text-gray-800 p-2" aria-label="View all new arrivals">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 mt-6">
        {products.map((product, index) => (
          <article key={product._id} className="flex flex-col bg-transparent shadow-md w-full">
            <Link href={`/shop/${product.slug.current}`}>
              <div className="bg-white w-full aspect-square rounded-md overflow-hidden">
                {product.image ? (
                  <Image
                    src={urlFor(product.image[0]).url()}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain p-4 hover:scale-105 duration-200"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={index < 4}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-200">
                    <span>No Image Available</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col text-sm space-y-1 mt-4 p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="font-light">GHS {product.price}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default NewArrivals