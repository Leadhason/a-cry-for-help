import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '@/lib/StateContext';
import { client, urlFor } from '@/lib/sanityClient';
import Image from 'next/image';

const Cart = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, CartItems, setshowCart, toggleCartItemsQty, onRemove } = useStateContext();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity >= 0) {
            toggleCartItemsQty(productId, newQuantity);
        }
    };

    return (
        <div className="fixed top-0 right-0 w-screen h-full bg-black/50 z-[100] transition-all duration-1000 ease-in-out" ref={cartRef}>
            <div className="h-screen w-full sm:w-[400px] md:w-[470px] bg-white float-right px-5 p-3 md:p-3 sm:p-7 relative">
                <button
                    type="button"
                    className="flex items-center text-base sm:text-[18px] font-medium cursor-pointer gap-1"
                    onClick={() => setshowCart(false)}
                >
                    <AiOutlineLeft />
                    <span>Your Cart</span>
                    <span className="text-[#fc966d]">({totalQuantities} Items)</span>
                </button>

                {CartItems.length < 1 && (
                    <div className="flex flex-col mx-2 sm:mx-5 mt-10 sm:mt-20 py-6 sm:py-12 items-center gap-y-3 w-full h-auto">
                        <AiOutlineShopping size={100} className="sm:text-[150px]" />
                        <h3 className="text-lg sm:text-xl text-gray-300">Your shopping bag is empty</h3>
                        <Link href="/">
                            <button
                                type="button"
                                onClick={() => setshowCart(false)}
                                className="text-black/75 bg-transparent rounded-md border border-black p-2 hover:bg-black hover:text-white text-sm sm:text-base"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className="relative mt-3 p-2 overflow-y-auto h-[calc(100vh-180px)] sm:h-[70%] space-y-3">
                    {CartItems.length >= 1 && CartItems.map((product) => (
                        <div className="flex gap-2 sm:gap-3 p-2 items-center ml-0 sm:ml-2" key={product._id}>
                            {product?.image && product.image.length > 0 ? (
                                <div className="bg-transparent w-[100px] sm:w-[150px]">
                                    <Image 
                                        src={urlFor(product.image[0]).url()}
                                        alt={product.name}
                                        width={150}
                                        height={120}
                                        className="object-contain p-1 rounded-sm bg-transparent"
                                    />
                                </div>
                            ) : (
                                <div className="w-[100px] sm:w-[150px] h-[100px] sm:h-[120px] flex text-center items-center justify-center bg-gray-200">
                                    <span className="text-xs sm:text-sm">No Image Available</span>
                                </div>
                            )}

                            <div className="flex gap-2 sm:gap-4 w-full sm:w-[300px] h-[100px] sm:h-[120px] justify-between"> 
                                <div className="space-y-2 sm:space-y-3 w-full">
                                    <div className="flex flex-col w-full space-y-1">
                                        <h5 className="font-semibold text-sm sm:text-base text-wrap">{product.name}</h5>
                                        <h4 className="text-xs sm:text-sm text-gray-500">GHS {product.price}</h4>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onRemove(product)}
                                        className="text-xs text-red-500 underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                                
                                <div className="flex items-center bg-gray-100 w-16 sm:w-20 border border-gray-200 h-8 sm:h-9 text-xs mt-2 sm:mt-5 rounded-sm">
                                    <button
                                        type="button"
                                        className="w-1/3 h-full flex items-center justify-center"
                                        onClick={() => handleQuantityChange(product._id, product.quantity - 1)}
                                    >
                                        <AiOutlineMinus />
                                    </button>
                                    <span className="bg-transparent h-full text-center p-2 outline-none">{product.quantity}</span>
                                    <button
                                        type="button"
                                        className="w-1/3 h-full flex items-center justify-center"
                                        onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                                    >
                                        <AiOutlinePlus />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {CartItems.length >= 1 && (
                    <div className="absolute bottom-0 left-0 right-0 w-full p-3 sm:p-4 bg-white border-t">
                        <div className="mx-2 sm:mx-5">
                            <div className="flex justify-between text-xs sm:text-sm mb-3">
                                <h3>Subtotal</h3>
                                <h3>GHS {totalPrice}</h3>
                            </div>
                            <div className="w-full">
                                <Link href="/checkout">
                                    <button
                                        type="button"
                                        className="w-full text-xs sm:text-sm text-white bg-black rounded-md py-2 hover:bg-gray-800"
                                    >
                                        Continue to Checkout
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;