'use client';

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {client, urlFor} from "../lib/sanityClient";
import Image from "next/image";

const getPopularProducts = async () => {
  const popularProductsQuery = `*[_type == "products" && position == "Popular Products"]{
    _id,
    name,
    image,
    price,
  }`;
  const products = await client.fetch(popularProductsQuery);
  return products;
};

const PopularProductsCarousel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const popularProducts = await getPopularProducts();
      setProducts(popularProducts);
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  return (
    <div>
      <Slider {...settings}>
        {products.map((product) => (
          <div className="mt-3 flex items-center p-2">
            <div key={product._id} className="flex flex-col bg-transparent showdow-lg justify-center place-content-center max-w-[330px] max-h-[520px] p-2">
              <div className="bg-white h-[380px] w-[280px] place-content-center rounded-md">
                <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                width={500}
                height={500}
                className="object-contain p-1"
                />
              </div>
              <div className="text-sm space-y-2 text-left mt-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="font-extralight">GHS { product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularProductsCarousel;