import PromoDeals from "../../components/PromoDeals";
import Hero from "../../components/Hero";
import PopularProducts from "../../components/PopularProducts";
import Image from "next/image";
import NewArrivalSection from "../../components/NewArrivals";

export default function Home() {
  return (
    <div className="mx-2 mt-[50px] flex flex-col z-0">
      <Hero />
      <section className="bg-gray-50 flex flex-col w-full">
        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8 mb-7 px-4">
          <div className="flex flex-col items-center">
            <div className="flex flex-col bg-transparent items-center mb-4">
              <Image
                src="/location.svg"
                alt="location"
                width={60}
                height={60}
              />
            </div>  
            <div className="flex flex-col text-center">
              <h3 className="text-lg font-weight-500">Order Tracking</h3>
              <p className="text-sm font-thin text-gray-500">Track your orders in realtime</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col bg-transparent items-center mb-4">
              <Image
                src="/wallet.svg"
                alt="wallet"
                width={60}
                height={60}
              />
            </div>  
            <div className="flex flex-col text-center">
              <h3 className="text-lg font-weight-500">Flexible Payment</h3>
              <p className="text-sm font-thin text-gray-500">Pay with MoMo or your card of choice</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col bg-transparent items-center mb-4">
              <Image
                src="/delivery.svg"
                alt="delivery"
                width={60}
                height={60}
              />
            </div>  
            <div className="flex flex-col text-center">
              <h3 className="text-lg font-weight-500">Fast Delivery</h3>
              <p className="text-sm font-thin text-gray-500">Experience the joy of fast delivery</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col bg-transparent items-center mb-4">
              <Image
                src="/support.svg"
                alt="support"
                width={60}
                height={60}
              />
            </div>  
            <div className="flex flex-col text-center">
              <h3 className="text-lg font-weight-500">Premium Support</h3>
              <p className="text-sm font-thin text-gray-500">Outstanding customer support 24/7</p>
            </div>
          </div>
        </div>
        <div className="px-4">
          <PopularProducts />
          <PromoDeals />
          <NewArrivalSection />
        </div>
      </section>
    </div>
  );
}