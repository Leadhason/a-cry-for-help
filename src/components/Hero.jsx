import Image from "next/image";

export const PEOPLE_URL = [
  '/headshot-1.png',
  '/headshot-2.png',
  '/headshot-3.png',
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row p-5 gap-5">
            <div className="flex flex-col p-4 space-y-4 lg:w-1/2">
              <div className="p-2 space-y-5 -mt-3">
                <h2 className="font-weight-700 space-y-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-left text-black sm:text-justify">Technolgy<br/>Designed Just <br/>For You</h2>
                <p className="text-left text-md text-gray-500">
                  Founded with a vision to redefine the way you shop for <br className="hidden sm:inline"/>electronics, HiTech is your one-stop destination for all things tech
                </p>
              </div>
              <div className="flex w-[150px] mx-1 -mt-5">
                <button className="flex gap-2 justify-center rounded-full w-full bg-orange-500 py-2 px-4 text-white text-md hover:bg-orange-400">
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
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 lg:w-1/2">
              <div className="bg-sky-200 border rounded-md w-full sm:w-[300px] h-[350px] items-center bg-gradient-to-b from-white to-transparent border-none">
                <Image
                  src="/Hero-image-2.png"
                  alt="Hero image"
                  width={300}
                  height={300}
                  className="object-contain w-full h-full z-10"
                />
              </div>
              <div className="bg-red-100 border rounded-md w-full sm:w-[410px] h-[500px] flex items-center bg-gradient-to-t from-white to-transparent border-none place-content-center relative">
                <div className="flex rounded-full bg-white p-3 w-20 h-20 items-center absolute z-0 place-content-center right-4 top-4">
                  <p className="justify-center text-gray-500 text-sm font-extralight text-center">15%<br/>OFF</p>
                </div>
                <Image
                  src="/Hero-image-1.png"
                  alt="Hero image"
                  width={300}
                  height={300}
                  className="object-contain w-full h-full px-3 py-2"
                />
              </div> 
            </div>  
          </div>
        </div>
      </section>
    </div>
  );
}