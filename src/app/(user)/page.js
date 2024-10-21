import Image from "next/image";
import BestSellingProducts from "../../components/BestSellingProducts";

export const PEOPLE_URL = [
  '/headshot-1.png',
  '/headshot-2.png',
  '/headshot-3.png',
];

export default function Home() {
  return (
    <div className="mx-2 mt-[70px]">
      {/* Hero */}
      <section className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex p-5 gap-5">
            <div className="flex flex-col p-4 space-y-6">
              <div className="p-2 space-y-5">
                <h2 className="font-weight-700 space-y-4 text-6xl text-left text-black sm:text-justify">Find Your<br/> Perfect Tech<br/> Companion Here</h2>
                <p className="text-left text-md text-gray-500">
                  Founded with a vision to redefine the way you shop for <br/>electronics, HiTech is your one-stop destination for all things tech
                </p>
              </div>
              <div className="flex w-[500px] mx-3">
                <button className=" flex gap-2 rounded-full bg-orange-400 py-2 px-4 text-white text-md">
                  Shop Now 
                  <Image
                    src="/arrow-right.svg"
                    alt="arrow right"
                    width={20}
                    height={20}
                    className="py-1"
                  />
                </button>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="bg-teal-50 border rounded-md w-[300px] h-[350px] items-center bg-gradient-to-b from-white to-transparent border-none">
                <Image
                  src="/Hero-image-2.png"
                  alt="Hero image"
                  width={300}
                  height={300}
                  className="object-fill z-10"
                />
              </div>
              <div className="bg-red-100 border rounded-md w-[370px] h-[500px] flex items-center bg-gradient-to-t from-white to-transparent border-none">
                <div className="flex rounded-full  bg-white p-3 w-20 h-20 items-center absolute z-10 place-content-center ml-72 -mt-40">
                  <p className="justify-center text-gray-500 text-sm font-extralight ">15%<br/>OFF</p>
                </div>
                <Image
                  src="/Hero-image-1.png"
                  alt="Hero image"
                  width={300}
                  height={300}
                  className="object-fill px-3 py-2"
                />
              </div> 
            </div>  
          </div>
          <div className="flex items-center gap-6 mx-10 -mt-5 mb-14">
            <span className="flex -space-x-3 overflow-hidden ">
              {PEOPLE_URL.map((url) => (
                <Image
                  className="inline-block h-10 w-10 rounded-full bg-orange-100"
                  src={url}
                  key={url}
                  alt="person"
                  width={52}
                  height={52}
                />
              ))}
            </span>
            <p className="text-gay-400 font-extralight text-left">Proven Excellence <span className="font-bold">4.5</span>-Star Rating <br/>Over <span className="font-semibold">3,500 </span>Customers</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 flex flex-col w-full">

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-4 space-x-5 py-8">
          <div className="flex flex-col">
            <div className="flex flex-col bg-transparent items-center">
              <Image
                src="/location.svg"
                alt="location"
                width={60}
                height={60}
              />
            </div>  
            <div className="flex flex-col">
              <h3 className="text-lg font-weight-500 text-center">Order Tracking</h3>
              <p className="text-center text-sm font-thin text-gray-500">Track your orders in realtime</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col bg-transparent items-center">
              <Image
                src="/wallet.svg"
                alt="wallet"
                width={60}
                height={60}
              />
            </div>  
            <div className="flex flex-col">
              <h3 className="text-lg font-weight-500 text-center">Flexible Payment</h3>
              <p className="text-center text-sm font-thin text-gray-500">Pay wit MoMo or your card of choice</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col bg-transparent items-center">
              <Image
                src="/delivery.svg"
                alt="delivery"
                width={60}
                height={60}
              />
            </div>  
            <div className="flex flex-col">
              <h3 className="text-lg font-weight-500 text-center">Fast Delivery</h3>
              <p className="text-center text-sm font-thin text-gray-500">Experience the joy of fast delivery</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col bg-transparent items-center">
              <Image
                src="/support.svg"
                alt="support"
                width={60}
                height={60}
              />
            </div>  
            <div className="flex flex-col">
              <h3 className="text-lg font-weight-500 text-center">Premium Support</h3>
              <p className="text-center text-sm font-thin text-gray-500">Outstanding customer support 24/7</p>
            </div>
          </div>
        </div>

        {/*Best Selling*/}
        <BestSellingProducts/>
      </section>
    </div>
  );
}
