import Image from 'next/image'
import Link from 'next/link'
import {client, urlFor} from "../lib/sanityClient"

const getPromoDeals = async () => {
    const promoDealsQuery = `*[_type == "promoDeals"]{
        _id,
        title,
        image,
        discount,
        link
    }`
    return await client.fetch(promoDealsQuery)
}

const PromoDeals = async () => {
    const promoDeals = await getPromoDeals()

    const colors = ["bg-blue-100", "bg-red-200", "bg-green-100"]

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 sm:mx-6 lg:mx-10 mt-10 sm:mt-20 mb-10 sm:mb-20 z-0">
            {promoDeals.map((promoDeal, index) => (
                <article key={promoDeal._id} className={`flex flex-col p-4 sm:p-6 h-auto rounded-md ${colors[index % colors.length]}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex flex-col space-y-1 mb-4 sm:mb-0">
                            <p className="text-sm underline text-gray-900">{promoDeal.discount} discount</p>
                            <h2 className="text-lg font-medium text-black">{promoDeal.title}</h2>
                        </div>
                        <div className="h-[170px] w-full sm:w-[300px]">
                            <Image
                                src={urlFor(promoDeal.image).url()}
                                alt={promoDeal.title}
                                width={300}
                                height={300}
                                className="object-contain w-full h-full sm:ml-8 sm:mb-7 sm:mt-5 hover:scale-95 duration-150"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mt-5">
                        <Link href={promoDeal.link || '#'} className="flex w-full sm:w-[140px] text-black p-2 rounded-md hover:bg-gray-100 duration-150 text-sm items-center justify-center bg-white">
                            Shop Now
                            <Image
                                src="/arrow-right-black.svg"
                                alt=""
                                width={20}
                                height={20}
                                className="object-contain ml-2"
                            />
                        </Link>
                    </div>
                </article>
            ))}
        </section>
    )
}

export default PromoDeals