'use client'

import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { urlFor } from "../lib/sanityClient"
import Image from "next/image"
import Link from 'next/link'

const PopularProductsCarousel = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ], 
  }

  return (
    <div>
      <Slider {...settings}>
        {products.map((product) => (
          <div className="mt-3 flex items-center p-2" key={product._id}>
            <Link href={`/shop/${product.slug.current}`}>
              <div className="flex flex-col bg-transparent showdow-lg justify-center place-content-center max-w-[330px] max-h-[520px] p-2">
                <div className="bg-white h-[380px] w-[280px] place-content-center rounded-md">
                  <Image
                    src={urlFor(product.image[0]).url()}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-contain p-1 hover:scale-105 duration-200"
                  />
                </div>
                <div className="text-sm space-y-2 text-left mt-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="font-extralight">GHS {product.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default PopularProductsCarousel