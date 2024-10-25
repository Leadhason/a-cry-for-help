import PromoDeals from "../../components/PromoDeals";
import Hero from "../../components/Hero";
import PopularProducts from "../../components/PopularProducts";
import Image from "next/image";
import NewArrivalSection from "../../components/NewArrivals";

export default function Home() {
  return (
    <div className="mx-2 mt-[70px] flex flex-col">
      <Hero />
      <section className="bg-gray-50 flex flex-col w-full">

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-4 space-x-5 py-8 mb-7">
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
        <div>
          <PopularProducts />
          <PromoDeals />
          <NewArrivalSection />
        </div>
      </section>
    </div>
  );
}
