import Link from 'next/link'
const SignInPage = () => {
  return (
    <div className="bg-gray-100 flex flex-col z-0 w-full items-center px-3">
        <div className="flex flex-col mx-60 px-3 py-10 mb-10 mt-10 w-[500px] space-y-10">
            <h3 className="text-5xl text-black font-light text-center">Sign In</h3>
            <form className="flex flex-col text-black space-y-7 px-4">
                <div className="flex flex-col space-y-2">
                    <p className="text-gray-700">Email</p>
                    <input
                        type='email'
                        className="border-b-[1px] border-b-black bg-gray-100 outline-none text-gray-900"
                    />
                </div>
                <div className="flex flex-col space-y-3">
                    <p className="text-gray-700">Password</p>
                    <input
                        type='password'
                        className="border-b-[1px] border-b-black bg-gray-100 outline-none text-gray-900"
                    />
                </div>
            </form>
            <div className="text-sm flex flex-col space-y-5 w-full -mb-3">
                <button className="flex justify-center p-3 text-black bg-transparent hover:text-white hover:bg-black transition-transform duration-150 rounded-full w-full h-[50px] border-[1px] border-black">Sign In</button>
                <div className="flex justify-between">
                <p>Don't have an account?</p>
                <Link href="/sign-up" className="hover:underline">Sign Up</Link>
            </div>
            </div>
            
            
        </div>
    </div>
  )
}

export default SignInPage